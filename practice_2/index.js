require('dotenv').config()

const {sequelize, Sequelize} = require('./db');
const express = require('express');
const http = require('http');
const cors = require('cors');
const ToDo = require('./ToDo');
const app = express();
const router = express.Router()

app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.text());


app.use((req, res, next) => {
    console.log('URL = ', req.url);
    console.log('Original_URL = ', req.originalUrl);
    console.log('METHOD = ', req.method);
    console.log('HOST = ', req.headers.host);
    console.log('IsSecure = ', req.secure);
    console.log('BODY', req.body);
    console.log('QUERY', req.query);

    return next();
});

app.use('/todo', router);

router.param('id', function (req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.todoID = id;
    next();
})

async function run(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await ToDo.sync();
    } catch (error) {
        throw new Error('Unable to connect to the database:' + error);
    }
}
run()

app.post('/todo',(req, res, next) => {
    const {title, description} = req.query;
    if(!title && !description) return next({message: 'Invalid title & description'});

    ToDo.create({ title: title || undefined, description: description || undefined}).then(({dataValues}) => {
        res.json({
            success: true,
            data: dataValues
        });
    });
});

router.route('/:id')
    .get((req, res, next) => {
        if(!req.todoID) return next({message: 'Invalid id'});

        ToDo.findByPk(req.todoID).then((data) => {
            if(data !== null){
                res.json({
                    success: true,
                    data: data
                });
            } else next({message: `ToDo with id = ${req.todoID} not exits`});
        });
    })
    .put((req, res, next) => {
        const {title, description} = req.query;
        if(!req.todoID) return next({message: 'Invalid id'});

        let doc = {};

        if(title) doc.title = title;
        if(description) doc.description = description;

        ToDo.update(doc, {
            where: {
                id: req.todoID
            }
        }).then(([success]) => {
            res.json({
                success: !!success
            });
        });
    })
    .delete((req, res) => {
        if(!req.todoID) return next({message: 'Invalid id'});

        ToDo.destroy({
            where: {
                id: req.todoID
            }
        }).then((success) => {
            res.json({
                success: !!success
            });
        });
    });

app.use((err, req, res, next) => {
    err.error = true;
    console.log(err)
    res.json(err);
});

http.createServer(app).listen(3000, () => {
    console.log('Server is working on port 3000');
})