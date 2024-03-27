const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
	const customErrorObj = {
		message: err.message || "Something went wrong try agin later.",
		status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
	};

	return res
		.status(customErrorObj.status)
		.json({ message: customErrorObj.message, err });
};

module.exports = errorHandlerMiddleware;
