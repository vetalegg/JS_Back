const ToDoRouter = require('./routers/ToDo');
const ToDo = require('../lib/controllers/ToDo')

ToDoRouter.route('/')
    .post(ToDo.create);

ToDoRouter.route('/:id')
    .get(ToDo.read)
    .put(ToDo.update)
    .delete(ToDo.delete);

module.exports = {
    ToDoRouter
}