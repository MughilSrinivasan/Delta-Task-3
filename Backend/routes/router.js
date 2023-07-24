const express = require("express");
const router = express.Router();

const {
  getQuizes, 
  getQuiz, 
  createQuiz, 
  getCategoryQuiz,
  //deleteQuiz, 
  updateQuiz
} = require("../controller/quizController")

const auth = require('../middleware/auth')

router.patch('/:id/:username/:status', updateQuiz)

router.use(auth)

router.get('/', getQuizes)

router.get('/:username', getQuiz)

router.get('/category/:username/:category', getCategoryQuiz)

router.post('/post', createQuiz)

// router.delete('/:id', deleteQuiz)

module.exports = router