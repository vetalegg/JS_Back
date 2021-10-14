const Settings = require("./settings");

const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const httpLoggerMiddleware = require("./middlewares/httpLogger");
const errorMiddleware = require("./middlewares/error");
const Models = require("./lib/models/");
const {ToDoRouter} = require('./lib/routes');

app.use(cors());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.text());
app.use(httpLoggerMiddleware);

const init = async () => {

    app.use('/todo', ToDoRouter);
    app.use(errorMiddleware);

    try {
        await Models.sequelize
            .authenticate();

        console.log('Connection has been established successfully.\n')
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        return;
    }

    await Models.sequelize.sync();

    http.createServer(app).listen(Settings.port, () => {
        console.log(`Server is working on port ${Settings.port}`);
    });
};

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

init();