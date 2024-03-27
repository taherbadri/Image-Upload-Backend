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
// --- import middlewares

// --- use the json parser middleware and morgan
app.use(express.json());
app.use(morgan("tiny"));
// --- use the json parser middleware and morgan

// --- set an initial route to display something on the screen
app.get("/", (req, res) => {
	return res.status(200).send("Image Upload Backend");
});
// --- set an initial route to display something on the screen

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
