const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product");

const createProduct = async (req, res) => {
	const product = await Product.create(req.body);
	return res
		.status(StatusCodes.CREATED)
		.json({ message: "product creates successfully", product });
};

const getAllProducts = async (req, res) => {
	const products = await Product.find({});
	return res.status(StatusCodes.OK).json({ message: "success", products });
};

module.exports = { getAllProducts, createProduct };
