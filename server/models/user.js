'use strict'
var mongoose    = require('mongoose');

var userSchema  = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  activity: String,
  location: String
}, {timestamps: true})

var user = mongoose.model('User', userSchema)

module.exports = user
