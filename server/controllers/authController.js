import User from '../models/User.js';

// @desc    Register
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400);
    throw new Error('Missing values');
  }

  const user = await User.create({ email, username, password });
  res.status(201).json({
    user: {
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      _id: user._id,
      token: user.createJWT(),
    },
  });
};

// @desc    Login
// @route   POST /api/auth/login
// @access  Public

const login = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    res.status(400);
    throw new Error('Missing values');
  }

  const user = await User.findOne({ email, username }).select('+password');

  if (user && (await user.comparePassword(password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.createJWT(),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Credentials');
  }
};

export { register, login };
