const Product = require('../models/productModel.js');
const cloudinary = require('../config/cloudinary');
const ratings = require('../models/ratingModel.js');
const mongoose = require('mongoose');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
        .populate('reviews') // Populate reviews
        .populate('ratings'); // Populate ratings if needed
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};


// Create new product
exports.createProduct = async (req, res) => {
  const {
    title, slug, description, price, discountPrice, category, brand, quantity, color, tags, warranty, returnPolicy, length, width, height, weight
  } = req.body;
  let images = [];
  let images360 = [];

  if (req.files) {
    if (req.files.images) {
      images = await Promise.all(req.files.images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'products' });
        return {
          public_id: result.public_id,
          url: result.secure_url
        };
      }));
    }
    if (req.files.images360) {
      images360 = await Promise.all(req.files.images360.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'products/360' });
        return {
          public_id: result.public_id,
          url: result.secure_url
        };
      }));
    }
  }

  const newProduct = new Product({
    title,
    slug,
    description,
    price,
    discountPrice,
    category,
    brand,
    quantity,
    color: Array.isArray(color) ? color : (color ? color.split(',') : []),
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',') : []),
    images,
    images360,
    warranty,
    returnPolicy,
    dimensions: { length, width, height },
    weight
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  const {
    title, slug, description, price, discountPrice, category, brand, quantity, color, tags, warranty, returnPolicy, length, width, height, weight
  } = req.body;
  let images = [];
  let images360 = [];

  if (req.files) {
    if (req.files.images) {
      images = await Promise.all(req.files.images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'products' });
        return {
          public_id: result.public_id,
          url: result.secure_url
        };
      }));
    }
    if (req.files.images360) {
      images360 = await Promise.all(req.files.images360.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'products/360' });
        return {
          public_id: result.public_id,
          url: result.secure_url
        };
      }));
    }
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.title = title !== undefined ? title : product.title;
    product.slug = slug !== undefined ? slug : product.slug;
    product.description = description !== undefined ? description : product.description;
    product.price = price !== undefined ? price : product.price;
    product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
    product.category = category !== undefined ? category : product.category;
    product.brand = brand !== undefined ? brand : product.brand;
    product.quantity = quantity !== undefined ? quantity : product.quantity;
    product.color = color !== undefined ? color.split(',') : product.color;
    product.tags = tags !== undefined ? tags.split(',') : product.tags;
    product.warranty = warranty !== undefined ? warranty : product.warranty;
    product.returnPolicy = returnPolicy !== undefined ? returnPolicy : product.returnPolicy;
    product.dimensions.length = length !== undefined ? length : product.dimensions.length;
    product.dimensions.width = width !== undefined ? width : product.dimensions.width;
    product.dimensions.height = height !== undefined ? height : product.dimensions.height;
    product.weight = weight !== undefined ? weight : product.weight;
    if (images.length > 0) {
      product.images = images;
    }
    if (images360.length > 0) {
      product.images360 = images360;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Remove images from Cloudinary
    await Promise.all(product.images.map(img => cloudinary.uploader.destroy(img.public_id)));
    await Promise.all(product.images360.map(img => cloudinary.uploader.destroy(img.public_id)));

    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
