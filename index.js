const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// test route
app.get("/test", (req, res) => {
  res.send("Its Working...!");
});

// connect to mongodb
mongoose
.connect(
  "mongodb+srv://venkiacademic:eTmTDWmNBZmJPoko@cluster0.bmzyfmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("Connected to MongoDB!");
})
.catch((err) => {
  console.log("Failed: ", err);
});

// product schema
const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },
  isInStock: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// product model
const productModel = mongoose.model("Product", productSchema);

// create product
app.post("/api/products", async (req, res) => {
  const product = new productModel({
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    isInStock: req.body.isInStock,
    category: req.body.category,
  });
  // console.log(product);
  // return res.status(200).json(product);
  const result = await product.save();
  res.send(result);
});

// get all products
app.get("/api/products", async (req, res) => {
  const products = await productModel.find();
  res.send(products);
});



// listen to port
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
