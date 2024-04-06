const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product");
const errors = require("../errors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadImage = async (req, res) => {
	if (!req.files) {
		throw new errors.BadRequestError("No file uploaded");
	}
	const image = req.files.image;
	if (!image.mimetype.startsWith("image")) {
		throw new errors.BadRequestError("Please upload image");
	}
	const maxSize = 1000 * 1024;
	if (image.size > maxSize) {
		throw new errors.BadRequestError("Please upload image smaller than 1mb ");
	}
	const imagePath = path.join(__dirname, "../public/images/" + `${image.name}`);
	await image.mv(imagePath);
	return res
		.status(StatusCodes.OK)
		.json({ image: { src: `/images/${image.name}` } });
};

const uploadToCloud = async (req, res) => {
	if (!req.files) {
		throw new errors.BadRequestError("Please upload an image");
	}
	const image = req.files.image;
	if (!image.mimetype.startsWith("image")) {
		throw new errors.BadRequestError("upload an image file");
	}
	const result = await cloudinary.uploader.upload(
		req.files.image.tempFilePath,
		{
			use_filename: true,
			folder: "image upload project",
		}
	);
	fs.unlinkSync(req.files.image.tempFilePath);
	return res
		.status(StatusCodes.OK)
		.json({ image: { src: `${result.secure_url}` } });
};

module.exports = { uploadImage, uploadToCloud };
