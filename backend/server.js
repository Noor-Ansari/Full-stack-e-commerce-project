const express = require("express");
const Model = require("./model/product");
const multer = require("multer");
const fs = require("fs");
require("./.env");
const bodyParser = require("body-parser");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-"));
  },
});
const upload = multer({ storage: storage });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/allproducts", (req, res) => {
  Model.find({})
    .sort({ id: -1 })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

app.get("/products/:category", (req, res) => {
  const category = req.params.category;
  const availableCategories =  {'fashion'  : 'fashion', 'technology' : 'technology',  'footwear' : 'footwear', 'sports': 'sports',}

  if (!(category in availableCategories)){
    return res.status(404).json({
      response : `${category} is not available in the database`,
      status : 404,
    })
  }

  Model.find({ category: category })
    .sort({ id: -1 })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});


// admin specific route
app.get("/products", (req, res) => {
  res.render("index");
});

// admin specific route
app.post("/products/upload", upload.single("image"), (req, res, next) => {
  const { name, description, owner, category, price } = req.body;
  if (req.file) {
    const newImg = fs.readFileSync(req.file.path);
    const encodedImg = newImg.toString("base64");
    const product = new Model({
      name,
      description,
      price,
      owner,
      category,
      image: encodedImg,
    });
    product
      .save()
      .then((response) => res.json(response))
      .catch((err) => console.log(err));
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is runing on port  ${PORT}`));
