const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");

app.use(express.static("./public"));

// 連接到mongoDB
mongoose
  .connect("mongodb://localhost:27017/tryDB")
  .then(() => {
    console.log("Connected Success");
  })
  .catch(() => {
    console.log("Connection failed");
  });

// 建立一個Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  appearance: {
    color: String,
    size: String,
  },
});

// 建立一個model套用到指定的Schema
const Product = mongoose.model("Product", productSchema);

// 在指定的model裡面建立資料
const iPhoneX = new Product({
  name: "iPhoneX ",
  price: 25000,
  appearance: {
    color: "black",
    size: "Max",
  },
});

const iPhone8Max = new Product({
  name: "iPhone8 ",
  price: 18000,
  appearance: {
    color: "silver",
    size: "regular",
  },
});

// 把資料丟進DB
// iPhone8Max.save().then(() => {
//   console.log("Save Success");
// });

// 搜尋指定的model
Product.find({}).then((data) => {
  console.log(data);
});

// update
// Product.updateMany({ name: "iPhoneX" }, { name: "iPhoneXR" }).then(() => {
//   console.log("update success");
// });

app.get("/", (req, res) => {
  app.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
