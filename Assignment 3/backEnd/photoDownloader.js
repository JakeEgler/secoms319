const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const request = require("request");

// Connect to the database
mongoose.connect("mongodb://localhost:27017/reactdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the product schema
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

// Create the images folder if it doesn't exist
const imagesFolder = path.join(__dirname, "images");
if (!fs.existsSync(imagesFolder)) {
  fs.mkdirSync(imagesFolder);
}

// Download all images
Product.find({})
  .then((products) => {
    products.forEach((product) => {
      // Download the image
      request(product.image).pipe(
        fs.createWriteStream(path.join(imagesFolder, `${product.id}.jpg`))
      );
    });

    console.log(`Downloaded ${products.length} images.`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
    mongoose.disconnect();
  });
