require('dotenv').config();

const { initDatabase } = require("./database")
const express = require("express")
const http = require("http")
const cors = require("cors")
const app = express()

const todoRouter = require("./controllers/todos.controller")
const authRouter = require("./controllers/auth.controller")
const userRouter = require("./controllers/users.controller")
const { notFound, errorHandler, httpLogger } = require("./middlewares")

const start = async() => {
    await initDatabase()

    app.use(cors())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.use(httpLogger)

    app.use("/api/todo", todoRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)

    app.use(notFound)
    app.use(errorHandler)

    http.createServer(app)
        .listen(process.env.HTTP_PORT, () => {
            console.log("Server is listen on port " + process.env.HTTP_PORT);
        });
}

start();

process.on("unhandledRejection", err => {
    console.log(err)
    process.exit(1)
});
