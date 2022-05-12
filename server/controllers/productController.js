import Product from '../models/Product.js';

// @desc    Add product
// @route   POST /api/products
// @access  Admin

const addProduct = async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    desc: req.body.desc,
    img: req.body.img,
    categories: req.body.categories,
    size: req.body.size,
    color: req.body.colors,
    price: req.body.price,
    createdBy: req.user._id,
  });

  const savedProduct = await newProduct.save();

  res.status(201).json(savedProduct);
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Admin

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { title, desc, img, categories, size, color, price } = req.body;
  if (product) {
    product.title = title || product.title;
    product.desc = desc || product.desc;
    product.img = img || product.img;
    product.categories = categories || product.categories;
    product.size = size || product.size;
    product.color = color || product.color;
    product.price = price || product.price;
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product was not found!');
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Admin

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.status(200).json({ msg: 'Product deleted succesfully' });
  } else {
    res.status(404);
    throw new Error('User was not found');
  }
};

// @desc    Get products
// @route   GET /api/products/
// @access  Public

const getProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategories = req.query.category;
  let products;

  if (qNew) {
    products = await Product.find().sort({ createdAt: -1 }).limit(1);
  } else if (qCategories) {
    products = await Product.find({ categories: { $in: [qCategories] } });
  } else {
    products = await Product.find({});
  }

  res.status(200).json(products);
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('Product was not found!');
  }
};

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
};
