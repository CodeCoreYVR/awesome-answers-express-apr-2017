const express = require('express');
const router = express.Router();
const answers = require('./answers');

const { Question } = require('../models');

// questions#index PATH: /questions/ METHOD: get
router.get('/', (req, res) => {
  Question
    .findAll({
      order: [[ 'createdAt', 'DESC' ]]
    })
    .then(questions => {
      // passing a second argument to the render of the response
      // object will make available all its properties
      // as variables inside the template
      res.render('questions/index', {questions: questions});
    });
});

// questions#edit PATH: /questions/:id/edit METHOD: get
router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;

  Question
    .findById(id)
    .then(question => {
      res.render('questions/edit', { question })
    })
    .catch(error => {
      next(error);
    })

});

// questions#update PATH: /questions/:id METHOD: patch
router.patch('/:id', async function (req, res, next) {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const question = await Question.findById(id);
    await question.update({ title, description });
    res.redirect(`/questions/${question.id}`);
  } catch (error) {
    next(error);
  }
});

// questions#new PATH: /questions/new METHOD: get
router.get('/new', (req, res) => {
  const question = Question.build();
  res.render('questions/new', {question: question});
});

// questions#create PATH: /questions METHOD: post
// router.post('/', questionCreate);
router.post('/', (req, res, next) => {
  // We destructure the values of the form inputs
  // from req.body to make sure that we only get attributes
  // that we want for creating a Question
  const { title, description } = req.body
  Question
    .create({ title, description })
  // 👆 is syntax sugar for 👇
  // { title: title, description: description }
    .then(question => {
      res.redirect(`/questions/${question.id}`);
    })
    .catch(error => {
      next(error);
    });
});

// questions#show PATH: /questions/:id METHOD: get
// when declaring a function, prefix with the `async`
// keyword to make it an async/await function.
// async/await functions can treat Promises as if
// they are synchronous.
// They always return their value wrapped in a Promise. In
// other words, the return value will be the resolved value
// of the promise.

// async function () {}
router.get('/:id', async (req, res, next) => {
  // To get params from your url (i.e. /:id),
  // grab them the params property on the request object
  // as shown below 👇
  const { id } = req.params;
  // try .. catch block is javascript from catching errors.
  // In other words, we can use this syntax preventing our
  // application from crashing when error occurs
  try {
    // put the code that might crash inside of the try block
    const question = await Question.findById(id);
    const answers = await question.getAnswers({
      order: [
        ['updatedAt', 'DESC']
      ]
    });
    res.render('questions/show', {question, answers});
  } catch (error) {
    // the `error` variable will hold the error object
    // describing what happened
    // if it craches, do something here instead
    next(error);
  }
});


// 👇 version of the above 👆 route without an
// async/await function
/*
router.get('/:id', (req, res, next) => {
  // To get params from your url (i.e. /:id),
  // grab them the params property on the request object
  // as shown below 👇
  const { id } = req.params;
  const question = Question
    .findById(id)
    .then(question => {
      res.send(question);
    })
    .catch(error => {
      next(error);
    })
});
*/

// PATH: /questions/:questionId/answers/... METHOD: all of them
router.use('/:questionId/answers', answers);

module.exports = router;









//
