const {nanoid} = require("nanoid");
const {Router} = require("express")
const {asyncHandler} = require("../middlewares");
const ErrorResponse = require("../exeptions/error-response");
const Token = require("../database/models/Token.model");
const User = require("../database/models/User.model");
const {Op} = require("sequelize");


const router = new Router();

async function registration(req, res, next) {
    const user = await User.findOne({
        where: {
            [Op.or]: {
                login: req.body.login,
                email: req.body.email,
            },
        },
    });
    if (user) throw new ErrorResponse("Login or email already in system", 400);
    const data = await User.create(req.body);
    res
        .status(200)
        .json(data);
}

async function login(req, res, next) {
    const user = await User.findOne({
        where: {
            login: req.body.login,
            password: req.body.password,
        },
    });

    if (!user) throw new ErrorResponse("Wrong login or password", 400);
    const token = await Token.create({
        userId: user.id,
        value: nanoid(128),
    });
    res
        .status(200)
        .json({token: token.value});
}

router.post("/registration", asyncHandler(registration));
router.post("/login", asyncHandler(login));

module.exports = router;
