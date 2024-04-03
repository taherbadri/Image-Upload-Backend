const express = require("express");
const router = express.Router();
const {
	getAllProducts,
	createProduct,
} = require("../controllers/productController");
const { uploadImage } = require("../controllers/uploadController");
router.route("/").get(getAllProducts).post(createProduct);
router.route("/uploads").post(uploadImage);
module.exports = router;
