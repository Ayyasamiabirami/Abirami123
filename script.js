// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/flifcart', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Product schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String
});

// Create a Product model
const Product = mongoose.model('Product', productSchema);

// API endpoint to get all products
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// API endpoint to add a new product
app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});