const { StatusCodes } = require("http-status-codes");

const notFoundMiddleWare = (req, res) => {
	console.log(req.params);
	return res
		.status(StatusCodes.NOT_FOUND)
		.send(
			`<h1>${StatusCodes.NOT_FOUND} Not Found</h1><p>the route ${req.url} does not exist</p>`
		);
};

module.exports = notFoundMiddleWare;
