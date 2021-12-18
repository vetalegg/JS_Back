const {Router} = require("express");
const Token = require("../database/models/Token.model");
const User = require("../database/models/User.model");
const {asyncHandler, validateToken} = require("../middlewares");
const ErrorResponse = require("../exeptions/error-response");

const router = new Router();

async function getUser(req, res, next) {
    const user = await User.findByPk(req.userId);
    res
        .status(200)
        .json(user);
}

async function updateUser(req, res, next) {
    const data = await User.update(req.body, {
        where: {
            id: req.userId,
        },
        returning: true,
    });
    res
        .status(200)
        .json(data);
}

async function logoutUser(req, res, next) {
    await Token.destroy({
        where: {
            value: req.header("token")
        }
    })
    res
        .status(200)
        .json({message: "You successful logout"});
}

router.get("/me", asyncHandler(validateToken), asyncHandler(getUser));
router.patch("/me", asyncHandler(validateToken), asyncHandler(updateUser));
router.post("/logout", asyncHandler(validateToken), asyncHandler(logoutUser));

module.exports = router;
