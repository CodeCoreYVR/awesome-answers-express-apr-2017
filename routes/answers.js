const express = require('express');
const router = express.Router({mergeParams: true});
// setting the option mergeParams to true when creating a
// router will preserve the params from req.params when
// nesting routers
const { Answer } = require('../models');

// answers#destroy PATH: /questions/:questionId/answers/:id METHOD: delete
router.delete('/:id', (req, res, next) => {
  const { id, questionId } = req.params;

  Answer
    .findById(id)
    .then(answer => {
      return answer.destroy();
    })
    .then(() => {
      res.redirect(`/questions/${questionId}`)
    })
    .catch(error => {
      next(error);
    })
});

// answers#create PATH: /questions/:questionId/answers METHOD: post
router.post('/', async (req, res, next) => {
  const { questionId } = req.params;
  const { content } = req.body;

  try {
    const answer = await Answer.create({ QuestionId: questionId, content });
    res.redirect(`/questions/${questionId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
