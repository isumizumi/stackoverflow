'use strict'
var Question       = require('../models/question');

module.exports = {
  createQuestion : (req, res, next) => {
    var newQuestion = Question(
      {
        title: req.body.title,
        content: req.body.content,
        vote: req.body.vote,
        answer: req.body.answer
      })

    newQuestion.save((err, data) => {
      if (err) {
        res.json(err)
      } else {
        res.status(200).json(data)
      }
    })
  },

  getQuestions : (req, res, next) => {
    Question.find({}, (err, data) => {
      if (err) {
        res.json(err)
      } else {
        res.status(200).json(data);
      }
    })
  },

  getOneQuestion : (req, res, next) => {
    Question.find({
      _id: req.params.id
    }, (err, data) => {
      if (err) {
        res.json(err)
      } else {
        res.status(200).json(data);
      }
    })
  },

  updateQuestion : (req, res, next) => {
    Question.findOneAndUpdate(
      {
        _id: req.params.id
      }, req.body, {new: true}, (err, data) => {
        if (err) {
          res.json(err)
        } else {
          res.status(200).json(data);
        }
      })
  },

  deleteQuestion : (req, res, next) => {
    Question.findOneAndRemove(
      {
        _id: req.params.id
      }, (err, data) => {
        if (err) {
          res.json(err)
        } else {
          res.status(200).json(data);
        }
      })
  }

}
