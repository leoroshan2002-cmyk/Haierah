import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const toUserResponse = (user) => {
  const doc = user.toObject();
  doc.id = doc._id.toString();
  delete doc._id;
  return doc;
};

export const listCustomers = async (_req, res) => {
  try {
    const customers = await User.find({ role: { $ne: 'admin' } }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, customers: customers.map(toUserResponse) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await User.findById(id);

    if (!customer) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, customer: toUserResponse(customer) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const payload = req.body;
    const user = await User.create(payload);
    res.status(201).json({ success: true, customer: toUserResponse(user) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    if (req.file) {
      payload.avatar = req.file.path || req.file.secure_url || req.file.url || req.file.location || '';
    }

    const updatedUser = await User.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, customer: toUserResponse(updatedUser) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
