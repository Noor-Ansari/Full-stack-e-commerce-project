const ProductModel = require("../model/product");
const UserModel = require("../model/user");
const CommentModel = require("../model/comment");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports = {
	getAllProducts: (req, res) => {
		ProductModel.find({})
			.sort({ id: -1 })
			.then((data) => res.status(200).json(data))
			.catch((err) => res.status(500).json(err));
	},
	getProductById: (req, res) => {
		const id = req.params.id;

		ProductModel.findById(id)
			.then((product) => res.status(200).json(product))
			.catch((err) => res.status(500).json(err));
	},
	getProductComments: (req, res) => {
		CommentModel.find({ product_id: req.params.id })
			.sort({ time_stamp: -1 })
			.then((comments) => {
				let allComments = comments.map((comment) =>
					UserModel.findById(comment.user_id).then((user) => {
						return {
							text: comment.comment,
							user_name: user.name,
							time_stamp: comment.time_stamp,
							id: comment._id,
						};
					})
				);
				Promise.all(allComments).then((data) => res.status(200).json(data));
			})
			.catch((err) => res.status(500).json(err));
	},
	getProductsByCategory: (req, res) => {
		const category = req.params.category;
		const availableCategories = {
			fashion: "fashion",
			technology: "technology",
			footwear: "footwear",
			sports: "sports",
		};

		if (!(category in availableCategories)) {
			return res.status(404).json({
				response: `${category} is not available in the database`,
				status: 404,
			});
		}

		ProductModel.find({ category: category })
			.sort({ id: -1 })
			.then((data) => res.status(200).json(data))
			.catch((err) => res.status(500).json(err));
	},
	registerNewUser: async (req, res) => {
		const ticket = await client.verifyIdToken({
			idToken: req.body.tokenId,
			audience: process.env.CLIENT_ID,
		});

		const { name, email } = ticket.getPayload();
		const newUser = new UserModel({
			name,
			email,
		});
		newUser
			.save()
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).json(err));
	},
	loginUser: async (req, res) => {
		const ticket = await client.verifyIdToken({
			idToken: req.body.tokenId,
			audience: process.env.CLIENT_ID,
		});

		const { email } = ticket.getPayload();

		UserModel.findOne({ email: email })
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).json(err));
	},
	addProductComments: async (req, res) => {
		const { comment, product_id, user_id } = req.body;

		const newComment = await new CommentModel({
			product_id: product_id,
			user_id: user_id,
			comment: comment,
		});
		newComment
			.save()
			.then((response) => res.status(200).json(response))
			.catch((err) => res.status(500).json(err));
	},
	addToCart: (req, res) => {
		const { user_id, product_id } = req.body;
		if (user_id && product_id) {
			UserModel.findById(user_id)
				.then((response) => {
					response.cart.push(product_id);
					response
						.save()
						.then((response) => res.status(200).json(response))
						.catch((err) => res.status(500).json(err));
				})
				.catch((err) => res.status(500).json(err));
		}
	},
};
