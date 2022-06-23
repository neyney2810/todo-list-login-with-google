const mongoose = require('mongoose');

const db_config = {
    connect : async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/todos_dev');

        console.log("Connect to DB")
    }
};

module.exports = db_config;