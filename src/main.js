const express = require('express');
const path = require('path');

//DB connect
const db = require('./config/db');
db.connect();

const port = 3000;
const app = express();

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//Cookie-session
const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],

    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './resources/views'));

//Controllers
const route = require('./app/controllers')
route(app);

app.listen(port, () => {
    console.log(`App run at http://localhost:${port}`);
});