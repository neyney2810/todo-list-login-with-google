const Todo = require('../models/todo');
const User = require('../models/user');

class TodoController {

    //[GET] /todo
    async index(req, res) {
        if (!req.session) {
            res.redirect('index');
        }

        const user = await User.findOneAndUpdate(
            { email: req.session.email },
            {},
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        )

        const todos = await Todo.find({ user: user._id })
        res.render('todo', {
            username: req.session.username,
            avatar: req.session.avatar,
            todos: todos
        })
    }

    //[POST] /todo
    async create(req, res) {
        const user = await User.findOne({ email: req.session.email });
        const todos = await Todo.create({ 
            description: req.body.description, 
            isCompleted: false, 
            user: user._id 
        });

        res.redirect('todo');
        
    }

    //[PUT] /todo 
    async completeTodo(req, res) {
        const id = req.body.id;
        const todos = await Todo.findByIdAndUpdate(
            id,
            { isCompleted: true }
        );

        res.sendStatus(200);
    }

    //[DELETE] /todo
    async delete(req, res) {
        const id = req.body.id;
        const todos = await Todo.findByIdAndDelete(id);
        res.sendStatus(200);
    }
}

module.exports = new TodoController;