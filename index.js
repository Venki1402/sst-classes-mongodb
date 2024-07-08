const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const productRoutes = require("./routes/productRouter");
const userRoutes = require("./routes/userRouter");

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((err) => {
    console.log("MongoDb connection Failed", err);
  });

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(8086, () => {
  console.log("Server sarted at port http://localhost:8086");
});
