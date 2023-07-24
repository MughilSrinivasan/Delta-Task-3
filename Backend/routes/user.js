const express = require('express')

const { getUsers , loginUser, signupUser , updateUser} = require('../controller/userController')

const router = express.Router()

router.get("/users" , getUsers)

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.patch("/:username",updateUser)

module.exports = router