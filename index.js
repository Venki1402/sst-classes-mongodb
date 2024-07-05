const express = require("express");
const mongoose = require("mongoose");

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

const app = express();
const port = 3000;

app.get("/test", (req, res) => {
  res.send("Its Working...!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
