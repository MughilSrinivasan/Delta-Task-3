const Quiz = require('../models/quizModel')
const mongoose = require('mongoose')


const getQuizes = async (req, res) => {

  const username = req.user.username

  const quizes = await Quiz.find({author : username}).sort({createdAt: -1})

  if(quizes)
  res.status(200).json(quizes)
  else
  res.status(404).body("No such user")
}

const getQuiz = async (req, res) => {
  const { username } = req.params

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({error: 'No such Quiz'})
  // }

  const quiz = await Quiz.find({author : username})

  if (!quiz) {
    return res.status(404).json({error: 'No such Quiz'})
  }

  res.status(200).json(quiz)
}

const getCategoryQuiz = async (req, res) => {
  const { username , category } = req.params

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({error: 'No such Quiz'})
  // }

  const catSearch = await Quiz.find({category : category})

  if (!catSearch) {
    return res.status(404).json({error: 'No such categories created...'})
  }

  res.status(200).json(catSearch)
}

const createQuiz = async (req, res) => {
  const {category , author , question , option_1 ,option_2 , option_3 , option_4 ,answer } = req.body

  let emptyFields = []

  if (!category) {
    emptyFields.push('category')
  }
  if (!author) {
    emptyFields.push('author')
  }
  if (!question) {
    emptyFields.push('question')
  }
  if (!option_1) {
    emptyFields.push('option_1')
  }
  if (!option_2) {
    emptyFields.push('option_2')
  }
  if (!option_3) {
    emptyFields.push('option_3')
  }
  if (!option_4) {
    emptyFields.push('option_4')
  }
  if (!answer) {
    emptyFields.push('answer')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields' })
  }


  try {
    const quiz = await Quiz.create({category , author , question , option_1 ,option_2 , option_3 , option_4 ,answer , answeredCorrect : [] , answeredIncorrect : []})
    res.status(200).json(quiz)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// const deleteQuiz = async (req, res) => {
//     const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({error: 'No such quiz'})
//   }

//   const quiz = await Quiz.findOneAndDelete({_id: id})

//   if(!quiz) {
//     return res.status(400).json({error: 'No such quiz'})
//   }

//   res.status(200).json(quiz)
// }

const updateQuiz = async (req, res) => {
    const { id , username , status } = req.params

    console.log(status)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such quiz'})
    }

    if(status === "correct"){
      const quiz = await Quiz.findOneAndUpdate({_id: id}, 
      { $push: { answeredCorrect : username }})
      if (!quiz) {
        return res.status(400).json({error: 'No such quiz'})
      }
    
      res.status(200).json(quiz)
    }

    if(status === "incorrect"){
      const quiz = await Quiz.findOneAndUpdate({_id: id}, 
      { $push: { answeredIncorrect : username }})
      if (!quiz) {
        return res.status(400).json({error: 'No such quiz'})
      }
    
      res.status(200).json(quiz)
    }
}

module.exports = {
  getQuizes,
  getQuiz,
  createQuiz,
  getCategoryQuiz,
  //deleteQuiz,
  updateQuiz
}