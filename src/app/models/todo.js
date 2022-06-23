const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    description:  String, // String is shorthand for {type: String}
    isCompleted: Boolean,
    user: ObjectId
  });

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo