import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Hardened CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connection without hardcoded fallback
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => console.error('MongoDB connection error:', err));

const outfitSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productImage: { type: String, required: true },
  productPrice: { type: String, required: true },
  productUrl: { type: String, required: true },
  savedAt: { type: Date, default: Date.now }
});

const Outfit = mongoose.model('Outfit', outfitSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  profileImage: { type: String },
  preferences: {
    style: [String],
    colors: [String],
    brands: [String],
    size: String
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const upload = multer({ dest: 'uploads/' });

app.post('/api/register', upload.single('profileImage'), async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
      profileImage: req.file ? `/uploads/${req.file.filename}` : null
    });

    await newUser.save();

    res.status(201).json({
      message: 'Registration successful',
      user: {
        email: newUser.email,
        fullName: newUser.fullName,
        profileImage: newUser.profileImage
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.post('/api/check-email', async (req, res) => {
  try {
    const email = String(req.body.email);
    const user = await User.findOne({ email });
    res.json({ exists: !!user });
  } catch (error) {
    console.error('Email check error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/user-profile', async (req, res) => {
  try {
    const email = String(req.query.email);
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({
      name: user.fullName,
      profileImage: user.profileImage.startsWith('http')
        ? user.profileImage
        : process.env.BACKEND_URL || "http://localhost:5000"

    });
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

app.post('/api/save-outfit', async (req, res) => {
  try {
    const userEmail = String(req.body.userEmail);
    const productId = String(req.body.productId);
    const action = String(req.body.action);

    const requiredFields = ['userEmail', 'productId', 'action'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing: ${missingFields.join(', ')}`,
        missingFields
      });
    }

    if (action === 'like') {
      const existing = await Outfit.findOne({ userEmail, productId });
      if (existing) {
        return res.status(200).json({
          success: true,
          message: 'Outfit already saved'
        });
      }

      const { productPrice, productName, productImage, productUrl } = req.body;
      const outfit = new Outfit({
        userEmail,
        productId,
        productName,
        productImage,
        productPrice,
        productUrl,
        savedAt: new Date()
      });
      await outfit.save();

      return res.json({ success: true });

    } else if (action === 'unlike') {
      const { deletedCount } = await Outfit.deleteOne({
        userEmail: String(userEmail),
        productId: String(productId)
      });
      return res.json({
        success: true,
        removed: deletedCount > 0
      });
    }

    return res.status(400).json({ success: false, message: 'Invalid action' });

  } catch (error) {
    console.error('Save outfit error:', error);
    res.status(500).json({
      success: false,
      message: 'Processing failed'
    });
  }
});

app.get('/api/saved-outfits', async (req, res) => {
  try {
    const email = String(req.query.email);
    const saved = await Outfit.find({ userEmail: email });
    res.json(saved);
  } catch (error) {
    console.error('Fetch outfits error:', error);
    res.status(500).json({ error: 'Failed to fetch outfits' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
