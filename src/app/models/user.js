const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email:  String, 
    apiCode: String
  });

const User = mongoose.model('user', userSchema);

module.exports = User
