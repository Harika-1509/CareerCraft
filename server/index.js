const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  onboarding: { type: Boolean, default: false },
  domain: { type: String, default: null },
  onboardingData: {
    personalBackground: {
      education: String,
      fieldOfStudy: String,
      workPreference: String
    },
    interests: {
      activities: [String],
      industries: [String]
    },
    skills: {
      currentSkills: [String],
      technicalLevel: String
    },
    workPreferences: {
      workWith: String,
      workLocation: String,
      workEnvironment: String
    },
    goals: {
      motivation: String,
      longTermVision: String
    },
    constraints: {
      openToAbroad: String,
      learningTime: String,
      higherStudies: String,
      financialConstraints: String
    }
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (firstName.length > 50 || lastName.length > 50) {
      return res.status(400).json({ error: 'First name and last name must be 50 characters or less' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      if (existingUser.phone === phone) {
        return res.status(400).json({ error: 'Phone number already exists' });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update onboarding data endpoint
app.post('/api/user/onboarding', async (req, res) => {
  try {
    const { userId, domain, onboardingData, isComplete = false } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user with onboarding data
    if (domain) {
      user.domain = domain;
    }
    
    if (onboardingData) {
      user.onboardingData = { ...user.onboardingData, ...onboardingData };
    }
    
    // Only set onboarding to true if it's complete
    if (isComplete) {
      user.onboarding = true;
    }
    
    await user.save();

    res.json({
      success: true,
      message: isComplete ? 'Onboarding completed successfully' : 'Progress saved successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        onboarding: user.onboarding,
        domain: user.domain,
        onboardingData: user.onboardingData
      }
    });
  } catch (error) {
    console.error('Onboarding update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile endpoint
app.get('/api/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
