const authenticationController = require("./authenticationController");
const todoController = require("./todoController");
const isLoggedIn = require("../middlewares/isLoggedInMiddleware");

module.exports = (app) => {
    app.get('/', (req, res) => res.redirect('/index'));
    app.get('/index', (req, res) => {
        if (req.user) {
            res.redirect('/todo');
            return;
        }
        res.render('index', {})
    })

    app.get('/todo', todoController.index);
    app.post('/todo', isLoggedIn, todoController.create);
    app.put('/todo', isLoggedIn, todoController.completeTodo)
    app.delete('/todo', isLoggedIn, todoController.delete);

    app.get('/login', authenticationController.googleLogin);
    app.get('/oauth2callback', authenticationController.googleCallback);

    app.get('/failed', (req, res) => res.send('You Failed to log in!'));
    app.get('/logout', authenticationController.logout);
}