const express           = require('express');
const router            = express.Router();
const controllerQA      = require('../controllers/controllerQA')

/* GET question listing. */
router.post('/', controllerQA.createQuestion);

router.get('/', controllerQA.getQuestions);

router.get('/:slug', controllerQA.getOneQuestion);

router.put('/:slug', controllerQA.updateQuestion);

router.delete('/:slug', controllerQA.deleteQuestion);

router.put('/:id/upvote', controllerQA.upvoteQuestion);

router.put('/:id/downvote', controllerQA.downvoteQuestion);

router.post('/:id/answer', controllerQA.addAnswer);

router.put('/:id/answer', controllerQA.deleteAnswers);

router.put('/:id/answer/:answerId', controllerQA.deleteOneAnswer);

router.put('/:id/answer/:answerId/upvote', controllerQA.upvoteAnswer);

router.put('/:id/answer/:answerId/downvote', controllerQA.downvoteAnswer);

module.exports = router;
