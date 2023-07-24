const User = require('../models/userModel')
// const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET)
}

const getUsers = async (req, res) => {

  const users = await User.find({}).sort({score: -1})

  if(users)
  res.status(200).json(users)
  else
  res.status(404).body("No users found")
}


const loginUser = async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await User.login(username, password)

    let score = user.score

    const token = createToken(user._id)

    res.status(200).json({username, token ,score})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const signupUser = async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await User.signup(username, password)

    let score = user.score

    const token = createToken(user._id)

    res.status(200).json({username, token,score})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const updateUser = async (req, res) => {
  const {username} = req.params

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({error: 'No such user'})
  // }

  const user = await User.findOneAndUpdate({username  : username}, {
    ...req.body
  })

  if (!user) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

module.exports = { getUsers , signupUser, loginUser, updateUser}