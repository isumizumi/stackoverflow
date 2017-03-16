'use strict'
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema

var questionSchema  = Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String,
  answer: Schema.Types.Mixed,
  vote: Schema.Types.Mixed
}, {timestamps: true})

var question = mongoose.model('Question', questionSchema)

module.exports = question
