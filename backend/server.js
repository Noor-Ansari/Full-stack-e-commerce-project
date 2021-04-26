const express = require("express");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const controllers = require("./controllers/index")
const ProductModel = require("./model/product");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
	},
});
const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use("/uploads", express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/api/allproducts", controllers.getAllProducts);

app.get("/api/allproducts/product/:id", controllers.getProductById);

app.get("/api/allproducts/:category", controllers.getProductsByCategory);

app.get("/api/comments/:product_id", controllers.getProductComments)

app.post("/api/google/register", controllers.registerWithGoogle);

app.post("/api/google/login", controllers.loginWithGoogle);

app.post("/api/register", controllers.customeRegister);

app.post("/api/login", controllers.customeLogin);

app.post("/api/comment",  controllers.addProductComments)

app.get("/api/getcart/:id", controllers.getCart)

app.post("/api/addtocart", controllers.addToCart)

app.post("/api/removefromcart", controllers.removeFromCart)


// admin specific route
app.get("/products", (req, res) => {
	res.render("index");
});

// admin specific route
app.post("/products/upload", upload.single("image"), (req, res, next) => {
	const { name, description, owner, category, price } = req.body;
	if (req.file) {
		const product = new ProductModel({
			name,
			description,
			price,
			owner,
			category,
			image: req.file.path
		});
		product
			.save()
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).json(err));
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is runing on port  ${PORT}`));
