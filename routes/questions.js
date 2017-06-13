const express = require('express');
const router = express.Router();

const { Question } = require('../models');

// questions#index PATH: /questions/ METHOD: get
router.get('/', (req, res) => {
  Question
    .findAll()
    .then(questions => {
      // passing a second argument to the render of the response
      // object will make available all its properties
      // as variables inside the template
      res.render('questions/index', {questions: questions});
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
router.get('/:id', async (req, res) => {
  // To get params from your url (i.e. /:id),
  // grab them the params property on the request object
  // as shown below 👇
  const { id } = req.params;
  const question = await Question.findById(id);
  res.render('questions/show', {question: question});
});

// 👇 version of the above 👆 route without an
// async/await function
/*
router.get('/:id', (req, res) => {
  // To get params from your url (i.e. /:id),
  // grab them the params property on the request object
  // as shown below 👇
  const { id } = req.params;
  const question = Question
    .findById(id)
    .then(question => {
      res.send(question);
    });
});
*/

module.exports = router;









//
