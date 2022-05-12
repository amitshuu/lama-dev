import Order from '../models/Order.js';

// @desc    Create order
// @route   POST /api/orders
// @access  Private

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  const savedOrder = await newOrder.save();

  res.status(201).json(savedOrder);
};

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Admin

const updateOrder = async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedOrder);
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Admin

const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    await order.remove();
    res.status(200).json({ msg: 'Order deleted succesfully' });
  } else {
    res.status(404);
    throw new Error('Order was not found');
  }
};

// @desc    Get user order
// @route   GET /api/orders/find/:userId
// @access  Admin

const getUserOrder = async (req, res) => {
  const order = await Order.findOne({ userId: req.params.userId });
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('No order found');
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin
const getAllOrders = async (req, res) => {
  const order = await Order.find({});

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order was not found!');
  }
};

// @desc    Get montlhy incomes
// @route   GET /api/orders/income
// @access  Admin
const getIncomes = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const income = await Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
      $project: {
        month: { $month: '$createdAt' },
        sales: '$amount',
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: '$sales' },
      },
    },
  ]);
  res.status(200).json(income);
};
export {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllOrders,
  getIncomes,
};
