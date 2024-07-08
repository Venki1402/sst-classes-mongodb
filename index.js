const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());


// test route
app.get("/test", (req, res) => {
  res.send("Its Working...!");
});

// connect to mongodb
mongoose
  .connect(
    process.env.MONGODB_URI,
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
// app.get("/api/products", async (req, res) => {
//   const products = await productModel.find();
//   res.send(products);
// });
// other way to get all products
app.get("/api/products", async(req, res) => {
  const products = await productModel.find({isInStock:true})
  return res.send(products);
});


// update product
app.put("/api/products/:id", async (req, res) => {
  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    {
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      isInStock: req.body.isInStock,
      category: req.body.category,
    },
    { new: true }
  );
  if (!product) {
    res.status(404).send("Product with given id is not found");
  }
  console.log(product);
  res.send(product);
});


// get product by id
app.get("/api/products/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);
  // if (!product) {
    // res.status(404).send("Product with given id is not found");
  // }
  res.send(product);
});

// delete product
// app.delete("/api/products/:id", async (req, res) => {
//   const product = await productModel.findByIdAndRemove(req.params.id);
//   if (!product) {
//     res.status(404).send("Product with given id is not found");
//   }
//   res.send(product);
// });
// other way to delete product
app.delete("/api/products/:id", async (req, res) => {
  const product = await productModel.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404).send("Product with given id is not found");
  }
  res.send(product);
});

// listen to port
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
