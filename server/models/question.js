'use strict'
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema

var questionSchema  = Schema({
  user_id: { type: Number, ref: 'User' },
  title: String,
  content: String,
  answer: [{
    user_id: { type: Number, ref: 'User' },
    comment: String,
    author: String,
    upvote: [],
    downvote: []
  }],
  upvote: [{
    user_id: { type: Number, ref: 'User' },
    voter: String
  }],
  downvote: [{
    user_id: { type: Number, ref: 'User' },
    voter: String
  }],
  author: String,
  slug: String
}, {timestamps: true})

var question = mongoose.model('Question', questionSchema)

module.exports = question
