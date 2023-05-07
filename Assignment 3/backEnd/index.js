const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// Connect to MongoDB database
mongoose.connect("mongodb://localhost/reactdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Product schema
const productSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

// Product model
const Product = mongoose.model("product", productSchema, "fakestore_catalog");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

// Add a new product
app.post("/products", async (req, res) => {
  try {
    const data = req.body;

    // Create a new Product from the request body
    const product = new Product({
      _id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.image,
      rating: {
        rate: data.rating.rate,
        count: data.rating.count,
      },
    });

    // Insert the product into the database
    await product.save();

    // Respond with success message
    res.status(201).json({ message: "Product added successfully." });
  } catch (err) {
    // Respond with error message
    res.status(500).json({ message: "Error adding product." });
    console.log(err);
  }
});

// Get all products
app.get("/products", async (req, res) => {
  try {
    // Get all products from the database
    const products = await Product.find();

    // Respond with products as JSON
    res.json(products);
  } catch (err) {
    // Respond with error message
    res.status(500).json({ message: "Error getting products." });
  }
});

// Get a single product by id
app.get("/products/:id", async (req, res) => {
  try {
    // Get the product with the given id from the database
    const product = await Product.findById(req.params.id).exec();

    // Respond with product as JSON
    res.json(product);
  } catch (err) {
    // Respond with error message
    console.log(err);
    res.status(500).json({ message: "Error getting product." });
  }
});

// Update the price of a product by id
app.put("/products/:id", async (req, res) => {
  try {
    // Get the product with the given id from the database
    const product = await Product.findById(req.params.id);

    // Update the price of the product
    product.price = req.body.price;

    // Save the updated product to the database
    await product.save();

    // Respond with success message
    res.json({ message: "Product updated successfully." });
  } catch (err) {
    // Respond with error message
    res.status(500).json({ message: "Error updating product." });
  }
});

// Delete a product by id
app.delete("/products/:id", async (req, res) => {
  try {
    // Delete the product with the given id from the database
    await Product.deleteOne({ _id: req.params.id });

    // Respond with success message
    res.json({ message: "Product deleted successfully." });
  } catch (err) {
    // Respond with error message
    res.status(500).json({ message: "Error deleting product." });
  }
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
