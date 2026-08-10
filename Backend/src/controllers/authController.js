import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const toAuthUserResponse = (user) => ({
  id: user._id.toString(),
  name: user.name,
  firstName: user.firstName || '',
  lastName: user.lastName || '',
  email: user.email,
  avatar: user.avatar || '',
  role: user.role,
  phone: user.phone || '',
  gender: user.gender || '',
  birthday: user.birthday || '',
  address: user.address || '',
  city: user.city || '',
  state: user.state || '',
  zip: user.zip || '',
});

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;
    const trimmedEmail = email?.trim?.().toLowerCase();

    if (!name || !trimmedEmail || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Name, email, password and confirmPassword are required' });
    }

    if (!isValidEmail(trimmedEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and confirmPassword do not match' });
    }

    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: trimmedEmail,
      password: hashedPassword,
      role: role || 'user',
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: toAuthUserResponse(user),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const trimmedEmail = email?.trim?.().toLowerCase();

    if (!trimmedEmail || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@haierah.com').trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (trimmedEmail === adminEmail && password === adminPassword) {
      let adminUser = await User.findOne({ email: adminEmail });

      if (!adminUser) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        adminUser = await User.create({
          name: 'Admin',
          email: adminEmail,
          password: hashedPassword,
          role: 'admin',
        });
      }

      return res.status(200).json({
        message: 'Login successful',
        user: toAuthUserResponse(adminUser),
      });
    }

    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: toAuthUserResponse(user),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body || {};

    if (!credential) {
      return res.status(400).json({ message: 'Google credential is required' });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({ message: 'Google auth is not configured on the server.' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({ message: 'Google account email is missing.' });
    }

    const email = payload.email.toLowerCase();
    const name = payload.name || payload.given_name || 'Google User';
    const avatar = payload.picture || '';

    let user = await User.findOne({ email });

    if (!user) {
      const generatedPassword = `google-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      user = await User.create({
        name,
        email,
        avatar,
        password: await bcrypt.hash(generatedPassword, 10),
        role: 'user',
      });
    }

    return res.status(200).json({
      message: 'Google login successful',
      user: toAuthUserResponse({
        ...user.toObject(),
        avatar: user.avatar || avatar,
      }),
    });
  } catch (error) {
    console.error('Google auth failed:', error);
    return res.status(401).json({ message: 'Google authentication failed.' });
  }
};
