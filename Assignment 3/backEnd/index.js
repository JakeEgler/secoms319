// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Connect to MongoDB database
mongoose.connect("mongodb://localhost/assignment3", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Product schema
const productSchema = new mongoose.Schema({
  id: String,
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

// Define the Product model
const Product = mongoose.model("Product", productSchema);

// Create the Express app
const app = express();

// Use bodyParser middleware to parse request body as JSON
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Route to add a new product
app.post("/products", async (req, res) => {
  try {
    // Read data from fakestoreapi.com/products
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    // Create a new Product for each item in the data array
    const products = data.map(
      (item) =>
        new Product({
          _id: item.id,
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
          rating: {
            rate: item.rating.rate,
            count: item.rating.count,
          },
        })
    );

    // Insert the products into the database
    await Product.insertMany(products);

    // Respond with success message
    res.status(201).json({ message: "Products added successfully." });
  } catch (err) {
    // Respond with error message
    res.status(500).json({ message: "Error adding products." });
  }
});

// Route to get all products
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

// Route to get a single product by id
app.get("/products/:id", async (req, res) => {
  try {
    // Get the product with the given id from the database
    const product = await Product.findById(req.params.id);

    // Respond with product as JSON
    res.json(product);
  } catch (err) {
    // Respond with error message
    res.status(500).json({ message: "Error getting product." });
  }
});

// Route to update the price of a product by id
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

// Route to delete a product by id
app.delete("/products/:id", async (req, res) => {
  try {
    // Get the product with the given id from the database
    const product = await Product.findById(req.params.id);
  } catch (err) {
    // Respond with error message
    res.status(500).json({ message: "Error deleting product." });
  }
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
