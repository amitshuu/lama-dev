import Cart from '../models/Cart.js';

// @desc    Create cart
// @route   POST /api/cart
// @access  Private

const createCart = async (req, res) => {
  const newCart = new Cart(req.body);

  const savedCart = await newCart.save();

  res.status(201).json(savedCart);
};

// @desc    Update cart
// @route   PUT /api/cart/:id
// @access  Private

const updateCart = async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  const { productId, quantity } = req.body;
  if (cart) {
    cart.productId = productId || cart.productId;
    cart.quantity = quantity || cart.quantity;
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } else {
    res.status(404);
    throw new Error('Cart was not found!');
  }
};

// @desc    Delete cart
// @route   DELETE /api/cart/:id
// @access  Private

const deleteCart = async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (cart) {
    await cart.remove();
    res.status(200).json({ msg: 'Cart deleted succesfully' });
  } else {
    res.status(404);
    throw new Error('Cart was not found');
  }
};

// @desc    Get user cart
// @route   GET /api/cart/find/:userId
// @access  Private

const getUserCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404);
    throw new Error('No cart found');
  }
};

// @desc    Get all carts
// @route   GET /api/cart
// @access  Public
const getAllCarts = async (req, res) => {
  const cart = await Cart.find({});

  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404);
    throw new Error('Cart was not found!');
  }
};

export { createCart, updateCart, deleteCart, getUserCart, getAllCarts };
