const {Router} = require("express");
const ErrorResponse = require("../exeptions/error-response");
const {asyncHandler, validateToken} = require("../middlewares");
const ToDo = require("../database/models/ToDo.model");

const router = new Router();

async function getAll(req, res, next) {
    const todos = await ToDo.findAll({
        where: {
            userId: req.userId,
        },
    });
    res
        .status(200)
        .json(todos);
}

async function getById(req, res, next) {
    const todo = await ToDo.findOne({
        where: {
            id: req.params.id,
            userId: req.userId,
        },
    });
    if (!todo) throw new ErrorResponse("Not found todo", 404);
    res
        .status(200)
        .json(todo);
}

async function createTodo(req, res, next) {
    const todo = await ToDo.create({
        ...req.body,
        userId: req.userId,
    });
    res
        .status(200)
        .json(todo);
}

async function updateTodo(req, res, next) {
    let todo = await ToDo.update(req.body, {
        where: {
            id: req.params.id,
            userId: req.userId,
        },
        returning: true,
    });
    res
        .status(200)
        .json(todo);
}

async function deleteAll(req, res, next) {
    await ToDo.destroy({
        where: {
            userId: req.userId,
        },
    });
    res
        .status(200)
        .json({message: "Deleted all todos"});
}

async function deleteById(req, res, next) {
    let todo = await ToDo.findOne({
        where: {
            id: req.params.id,
            userId: req.userId,
        },
    });

    if (!todo) throw new ErrorResponse("Not found todo", 404);

    await todo.destroy();

    res
        .status(200)
        .json({message: "Deleted"});
}

router.get("/", asyncHandler(validateToken), asyncHandler(getAll));
router.get("/:id", asyncHandler(validateToken), asyncHandler(getById));
router.post("/", asyncHandler(validateToken), asyncHandler(createTodo));
router.patch("/:id", asyncHandler(validateToken), asyncHandler(updateTodo));
router.delete("/", asyncHandler(validateToken), asyncHandler(deleteAll));
router.delete("/:id", asyncHandler(validateToken), asyncHandler(deleteById));

module.exports = router;
