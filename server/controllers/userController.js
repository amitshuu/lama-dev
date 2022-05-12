import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { checkPermissions } from '../utils/checkPermissions.js';

// @desc    Update user
// @route   PUT /api/auth/profile
// @access  Private

const updateUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { email, password, username } = req.body;
  if (user) {
    user.email = email || user.email;
    user.username = username || user.username;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      email: updatedUser.email,
      username: updatedUser.username,
      _id: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
      token: updatedUser.createJWT(),
    });
  } else {
    res.status(404);
    throw new Error('User was not found');
  }
};

// @desc    Delete user
// @route   DELETE /api/user/:id
// @access  Private

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (user) {
    checkPermissions(req.user._id.toString(), userId);
    await user.remove();
    res.status(200).json({ msg: 'User deleted successfuly' });
  } else {
    res.status(404);
    throw new Error('User was not found!');
  }
};

// @desc    Get user data
// @route   GET /api/user/find/:id
// @access  Admin

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User was not found');
  }
};

// @desc    Get all users
// @route   GET /api/user
// @access  Admin

const getAllUsers = async (req, res) => {
  const query = req.query.new;
  const users = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();
  res.status(200).json(users);
};

const getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json(data);
};

export { updateUser, deleteUser, getUser, getAllUsers, getStats };
