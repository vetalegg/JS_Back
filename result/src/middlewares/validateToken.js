const ErrorResponse = require("../exeptions/error-response");
const Token = require("../database/models/Token.model");
module.exports = async (req, _res, next) => {
    const tokenHeader = req.header("token")

    if (!tokenHeader) throw new ErrorResponse("Token not found", 400)

    const { userId } = await Token.findOne({
        where: {
            value: tokenHeader,
        }
    });

    if (!userId) throw new ErrorResponse("Invalid token", 401)

    req.userId = userId
    next()
}
