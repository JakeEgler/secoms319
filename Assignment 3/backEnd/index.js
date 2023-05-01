// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// Connect to MongoDB database
mongoose.connect("mongodb://localhost/reactdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Product schema
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

// Define the Product model
const Product = mongoose.model("product", productSchema, "fakestore_catalog");

// Create the Express app
const app = express();

// Use bodyParser middleware to parse request body as JSON
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Add a new product
app.post("/products", async (req, res) => {
  try {
    const data = req;

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

    console.log(products);

    // Insert the products into the database
    await Product.insertMany(products);

    // Respond with success message
    res.status(201).json({ message: "Products added successfully." });
  } catch (err) {
    // Respond with error message
    res.status(500).json({ message: "Error adding products." });
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

    console.log(req.params.id);
    console.log(product);

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

    console.log(req.body.price);

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
