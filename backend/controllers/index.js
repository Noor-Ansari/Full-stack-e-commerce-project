const ProductModel = require("../model/product");
const UserModel = require("../model/user");
const CommentModel = require("../model/comment");
const CartModel = require("../model/cart");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

module.exports = {
	getAllProducts: (req, res) => {
		ProductModel.find({})
			.sort({ id: -1 })
			.exec()
			.then((data) => res.status(200).json(data))
			.catch((err) => res.status(500).json({ error: err }));
	},
	getProductById: (req, res) => {
		const id = req.params.id;

		ProductModel.findById(id)
			.exec()
			.then((product) => res.status(200).json(product))
			.catch((err) => res.status(500).json({ error: err }));
	},
	getProductComments: (req, res) => {
		CommentModel.find({ product: req.params.product_id })
			.sort({ time_stamp: -1 })
			.populate("user")
			.exec()
			.then((comments) => res.status(200).json(comments))
			.catch((err) => res.status(500).json({ error: err }));
	},
	addProductComments: async (req, res) => {
		const { comment, product, user } = req.body;
		const newComment = await new CommentModel({
			product: mongoose.Types.ObjectId(product),
			user: mongoose.Types.ObjectId(user),
			comment: comment,
		});
		newComment
			.save()
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).json({ error: err }));
	},
	getProductsByCategory: (req, res) => {
		const category = req.params.category;

		ProductModel.find({ category: category })
			.sort({ id: -1 })
			.exec()
			.then((data) => {
				if (data.length) {
					res.status(200).json(data);
				} else {
					res.status(200).json({
						info: `${category} is not available in the database`,
					});
				}
			})
			.catch((err) => res.status(500).json({ error: err }));
	},
	registerWithGoogle: async (req, res) => {
		const ticket = await client.verifyIdToken({
			idToken: req.body.tokenId,
			audience: process.env.CLIENT_ID,
		});

		const { name, email } = ticket.getPayload();

		UserModel.findOne({ email: email })
			.exec()
			.then((doc) => {
				if (doc) {
					res.status(200).json({ info: "Email already exists." });
				} else {
					const newUser = new UserModel({
						name,
						email,
					});
					newUser
						.save()
						.then((response) => res.status(200).json(response))
						.catch((err) => res.status(500).json({ error: err }));
				}
			})
			.catch((err) => res.status(500).json({ error: err }));
	},
	loginWithGoogle: async (req, res) => {
		const ticket = await client.verifyIdToken({
			idToken: req.body.tokenId,
			audience: process.env.CLIENT_ID,
		});

		const { email } = ticket.getPayload();

		UserModel.findOne({ email: email })
			.exec()
			.then((doc) => {
				if (!doc) {
					res.status(200).json({ info: "Email does not exist." });
				} else {
					res.status(200).json(doc);
				}
			})
			.catch((err) => res.status(500).json({ error: err }));
	},
	customeLogin: (req, res) => {
		const { email, password } = req.body;
		UserModel.findOne({ email: email })
			.exec()
			.then(async (doc) => {
				if (!doc) {
					res.status(200).json({ info: "Email does not exist." });
				}
				const hashedPassword = doc.password || "";
				const result = await bcrypt.compare(password, hashedPassword);
				if (result) {
					res.status(200).json(doc);
				} else {
					res.status(200).json({ info: "Password does not match." });
				}
			})
			.catch((err) => res.status(500).json({ error: err }));
	},
	customeRegister: (req, res) => {
		const { name, email, password, confirmPassword } = req.body;
		console.log(req.body);
		UserModel.findOne({ email: email })
			.exec()
			.then(async (doc) => {
				if (doc) {
					res.status(200).json({ info: "Email already exists." });
				} else {
					const hashedPassword = await bcrypt.hash(password, 10);
					newUser = new UserModel({
						name: name,
						email: email,
						password: hashedPassword,
					});
					newUser
						.save()
						.then((response) => res.status(200).json(response))
						.catch((err) => res.status(500).json({ error: err }));
				}
			})
			.catch((err) => res.status(500).json({ error: err }));
	},
	getCart: (req, res) => {
		const user = req.params.id;
		CartModel.findOne({ user: user })
			.populate({ path: "products", populate: { path: "product_id" } })
			.sort({ added_at: -1 })
			.exec()
			.then((data) => res.status(200).json(data))
			.catch((err) => res.status(500).json({ error: err }));
	},
	addToCart: (req, res) => {
		const { user_id, product_id } = req.body;
		CartModel.findOne({ user: user_id })
			.exec()
			.then((doc) => {
				if (doc) {
					const item = doc.products.filter(
						(product) => String(product.product_id) === product_id
					);

					if (item.length) {
						item[0].quantity += 1;
						doc
							.save()
							.then((data) => {
								res.status(200).json(data);
							})
							.catch((err) => {
								res.status(500).json({ error: err });
							});
					} else {
						doc.products.push({ product_id: product_id });
						doc
							.save()
							.then((data) => {
								res.status(200).json(data);
							})
							.catch((err) => {
								res.status(500).json({ error: err });
							});
					}
				} else {
					const newCart = new CartModel({
						user: user_id,
						products: { product_id: product_id },
					});
					newCart
						.save()
						.then((doc) => res.status(200).json(doc))
						.catch((err) => res.status(500).json({ error: err }));
				}
			})
			.catch((err) => res.status(500).json({ error: err }));
	},
	removeFromCart: (req, res) => {
		const { user_id, product_id } = req.body;
		CartModel.findOne({ user: user_id })
			.exec()
			.then((doc) => {
				if (doc && doc.products) {
					[removedProduct] = doc.products.filter(
						(product) => String(product.product_id) === product_id
					);

					newCart = doc.products.filter(
						(product) => String(product.product_id) !== product_id
					);

					doc.products = newCart;
					doc
						.save()
						.then((response) =>
							res
								.status(200)
								.json({ removedProduct: removedProduct.product_id })
						)
						.catch((err) => res.status(500).json({ error: err }));
				}
			})
			.catch((err) => res.status(500).json({ error: err }));
	},
};
