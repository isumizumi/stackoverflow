'use strict'
var Question       = require('../models/question');
var slug           = require('slug')

module.exports = {
  createQuestion : (req, res, next) => {
    var newQuestion = Question(
      {
        title: req.body.title,
        content: req.body.content,
        answer: [],
        upvote: [],
        downvote: [],
        author: req.body.author,
        slug: slug(req.body.title).toLowerCase()
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
      slug: req.params.slug
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
        slug: req.params.slug
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
        slug: req.params.slug
      }, (err, data) => {
        if (err) {
          res.json(err)
        } else {
          res.status(200).json(data);
        }
      })
  },

  addAnswer : (req, res, next) => {
    Question.findByIdAndUpdate(req.params.id, {
      $push: {
        'answer': {
          user_id: Number(req.body.user_id),
          comment: req.body.comment,
          author: req.body.author,
          upvote: [],
          downvote: []
        }
      }
    }, {
      new: true,
      upsert: true
    }, (err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.status(200).json(data);
      }
    })
  },

  deleteOneAnswer : (req, res, next) => {
    Question.findByIdAndUpdate(req.params.id, {
      $pull: {
        'answer': {
          user_id: Number(req.params.answerId)
        }
      }
    }, {
      new: true,
      upsert: true
    }, (err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.status(200).json(data);
      }
    })
  },

  deleteAnswers : (req, res, next) => {
    Question.findByIdAndUpdate(req.params.id, {
      answer: []
    }, {
      new: true
    }, (err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.status(200).json(data);
      }
    })
  },

  upvoteQuestion : (req, res, next) => {
    let upvoteStatus  = true
    let questionId    = Number(req.body.id)

    Question.findOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.send(err)
      } else if (!data) {
        res.send('Question ID not found!')
      }

      data.upvote.forEach(vote => {
        if (vote == req.body.id) {
          upvoteStatus = false
        }
      })

      if (upvoteStatus) {
        Question.findByIdAndUpdate(req.params.id,
          { $push: { upvote: questionId } },
          { new: true }, (err, vote) => {
            if (err) {
              res.send(err)
            } else {
              res.send(vote)
            }
          })
      } else {
        Question.findByIdAndUpdate(req.params.id,
          { $pull: { upvote: questionId } },
          { new: true }, (err, vote) => {
            if (err) {
              res.send(err)
            } else {
              res.send(vote)
            }
          })
      }
    })
  },

  downvoteQuestion : (req, res, next) => {
    let downvoteStatus  = true
    let questionId      = Number(req.body.id)

    Question.findOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.send(err)
      } else if (!data) {
        res.send('Question ID not found!')
      }

      data.upvote.forEach(vote => {
        if (vote == req.body.id) {
          downvoteStatus = false
        }
      })

      if (downvoteStatus) {
        Question.findByIdAndUpdate(req.params.id,
          { $push: { downvote: questionId } },
          { new: true }, (err, vote) => {
            if (err) {
              res.send(err)
            } else {
              res.send(vote)
            }
          })
      } else {
        Question.findByIdAndUpdate(req.params.id,
          { $pull: { downvote: questionId } },
          { new: true }, (err, vote) => {
            if (err) {
              res.send(err)
            } else {
              res.send(vote)
            }
          })
      }
    })
  },

  upvoteAnswer: (req, res) => {
    let questionid = req.params.id
    let answerid = req.params.answerId
    let userid = req.body.user_id
    Question.findById(questionid, function(err, question){
      let vote = false
      question.answer.id(answerid).upvote.forEach(function(data){
        if (data.user_id == userid){
          vote = true
        }
      })
      if (!vote){
        question.answer.id(answerid).upvote.push({user_id: userid})
        question.save(function(err){
          if (err) {
            res.send(err)
          } else {
            res.send(question)
          }
        })
      } else {
        res.send("You've already upvote this answer!")
      }
    })
  },

  downvoteAnswer: (req, res) => {
    let questionid = req.params.id
    let answerid = req.params.answerId
    let userid = req.body.user_id
    Question.findById(questionid, function(err, question){
      let vote = false
      question.answer.id(answerid).downvote.forEach(function(data){
        if (data.user_id == userid){
          vote = true
        }
      })
      if (!vote){
        question.answer.id(answerid).downvote.push({user_id: userid})
        question.save(function(err){
          if (err) {
            res.send(err)
          } else {
            res.send(question)
          }
        })
      } else {
        res.send("You've already downvote this answer")
      }
    })
  }
}
