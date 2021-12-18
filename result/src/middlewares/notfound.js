const ErrorResponse = require("../exeptions/error-response");

module.exports = (req, res, next) => {
    next(
        new ErrorResponse(`Not found - ${req.originalUrl}`, 404)
    );
}
