const {ToDo} = require("../models");
let methods = {};

methods.create = async(req, res, next) => {
    const {title, description} = req.query;
    if(!title && !description) return next({message: 'Invalid title & description'});

    try {
        const {dataValues} = await ToDo.create({ title: title || undefined, description: description || undefined});

        res.json({
            success: true,
            data: dataValues
        });
    } catch (e) {
        return next({httpCode: 500, message: 'Database error'})
    }
};

methods.read = async(req, res, next) => {
    if(!req.todoID) return next({message: 'Invalid id'});

    try {
        const data = await ToDo.findByPk(req.todoID);
        if(data !== null){
            res.json({
                success: true,
                data: data
            });
        } else return next({message: `ToDo with id = ${req.todoID} not exits`});
    } catch (e) {
       return next({httpCode: 500, message: 'Database error'})
    }
};

methods.update = async(req, res, next) => {
    const {title, description} = req.query;
    if(!req.todoID) return next({message: 'Invalid id'});

    let doc = {};

    if(title) doc.title = title;
    if(description) doc.description = description;

    try {
        const [success] = await ToDo.update(doc, {
            where: {
                id: req.todoID
            }
        });

        res.json({
            success: !!success
        });
    } catch (e) {
        return next({httpCode: 500, message: 'Database error'})
    }
};

methods.delete = async(req, res, next) => {
    if(!req.todoID) return next({message: 'Invalid id'});
    try {
        const success = await ToDo.destroy({
            where: {
                id: req.todoID
            }
        });

        res.json({
            success: !!success
        });
    } catch (e) {
        console.log(e)
        next({ httpCode: 500, message: 'Database error' })
    }
};

module.exports = methods;