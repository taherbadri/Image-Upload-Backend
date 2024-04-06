// --- import dot env and express async error module
require("dotenv").config();
require("express-async-errors");
// --- import dot env and express async error module

// --- import express
const express = require("express");
const app = express();
// --- import express

// --- import the database connection function
const connectDB = require("./db/connect");
// --- import the database connection fu

// --- import middlewares
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
// --- import middlewares

// --- import routes
const productRoutes = require("./routes/productRouter");
// --- import routes

// --- use the json parser middleware, morgan, cloudinary and fileupload
app.use(express.json());
app.use(express.static("./public"));
app.use(morgan("tiny"));
app.use(fileUpload({ useTempFiles: true }));
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});
// --- use the json parser middleware, morgan, cloudinary and fileupload

// --- set an initial route to display something on the screen
app.get("/", (req, res) => {
	return res.status(200).send("Image Upload Backend");
});
// --- set an initial route to display something on the screen

// --- use the routes
app.use("/api/v1/products", productRoutes);
// --- use the routes

// --- setup our error handling middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// --- setup our error handling middlewares

// --- set up the port variable
const port = process.env.PORT || 5000;
// --- set up the port variable

// --- function to check for database connection and server
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log("db connected");
		app.listen(port, console.log(`Server listening on port ${port}`));
	} catch (error) {
		console.log(error);
	}
};
// --- function to check for database connection and server
start();
