const express = require("express");
const ProductModel = require("./model/product");
const UserModel = require("./model/user")
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require('cors')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

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
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/api/allproducts", (req, res) => {
  ProductModel.find({})
    .sort({ id: -1 })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

app.get("/api/allproducts/product/:id", (req, res) => {
  const id = req.params.id;
  ProductModel.findById(id)
  .then((data) => res.status(200).json(data))
  .catch((err) => res.status(500).json(err))
})

app.get("/api/allproducts/:category", (req, res) => {
  const category = req.params.category;
  const availableCategories =  {'fashion'  : 'fashion', 'technology' : 'technology',  'footwear' : 'footwear', 'sports': 'sports',}

  if (!(category in availableCategories)){
    return res.status(404).json({
      response : `${category} is not available in the database`,
      status : 404,
    })
  }

  ProductModel.find({ category: category })
    .sort({ id: -1 })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});


app.post("/api/google/register", async (req, res) => {

  const ticket = await client.verifyIdToken({
    idToken: req.body.tokenId,
    audience: process.env.CLIENT_ID
});

const { name, email } = ticket.getPayload();  
const newUser = new UserModel({
  name,
  email
})
newUser
.save()
.then((response) => res.status(200).json(response))
.catch((err) => res.status(500).json(err))
})

app.post("/api/google/login", async (req, res) => {

  const ticket = await client.verifyIdToken({
    idToken: req.body.tokenId,
    audience: process.env.CLIENT_ID
});

const { email } = ticket.getPayload();  

UserModel.findOne({email : email})
.then((response) => res.status(200).json(response))
.catch((err) => res.status(500).json(err))
})

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
    const product = new ProductModel({
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
