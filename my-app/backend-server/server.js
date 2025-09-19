import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/styleAI', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

app.post('/api/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/user-profile', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({
      name: user.fullName,
      profileImage: user.profileImage.startsWith('http')
        ? user.profileImage
        : `http://localhost:5000${user.profileImage}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/save-outfit', async (req, res) => {
  try {
    const { userEmail, productId, action } = req.body;

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

      await new Outfit({
        ...req.body,
        savedAt: new Date()
      }).save();

      return res.json({ success: true });

    } else if (action === 'unlike') {
      const { deletedCount } = await Outfit.deleteOne({ userEmail, productId });
      return res.json({
        success: true,
        removed: deletedCount > 0
      });
    }

    return res.status(400).json({ success: false, message: 'Invalid action' });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

app.get('/api/saved-outfits', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const saved = await Outfit.find({ userEmail: email });
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch outfits', message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
