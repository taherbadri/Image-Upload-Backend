const express = require("express");
const router = express.Router();
const {
	getAllProducts,
	createProduct,
} = require("../controllers/productController");
const {
	uploadImage,
	uploadToCloud,
} = require("../controllers/uploadController");
router.route("/").get(getAllProducts).post(createProduct);
router.route("/uploads").post(uploadImage);
router.route("/uploads/cloud").post(uploadToCloud);
module.exports = router;
