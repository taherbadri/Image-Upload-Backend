const Product = require("../models/product");

const uploadImage = async (req, res) => {
	return res.send("Upload image");
};

module.exports = { uploadImage };
