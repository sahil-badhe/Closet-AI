import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  const legalSupportPage = '/LegalSupportPage';

  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AI Stylist</h3>
            <p className="text-gray-800">
              Revolutionizing fashion with AI-powered personal styling recommendations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-fashion-gold">Home</Link></li>
              <li><Link to="/customize" className="text-gray-600 hover:text-fashion-gold">Style Quiz</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-fashion-gold">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to={legalSupportPage} className="text-gray-600 hover:text-fashion-gold">FAQ</Link></li>
              <li><Link to={legalSupportPage} className="text-gray-600 hover:text-fashion-gold">Contact</Link></li>
              <li><Link to={legalSupportPage} className="text-gray-600 hover:text-fashion-gold">Privacy Policy</Link></li>
              <li><Link to={legalSupportPage} className="text-gray-600 hover:text-fashion-gold">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-fashion-gold">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-fashion-gold">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-fashion-gold">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-fashion-gold">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-600">
            © 2025 AI Stylist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;