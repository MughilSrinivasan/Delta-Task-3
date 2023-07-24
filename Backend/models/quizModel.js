const mongoose = require('mongoose')

const Schema = mongoose.Schema

const quizSchema = new Schema({
    category : {
        type : String,
        required :true
    },
    author : {
        type : String,
        required : true
    },
    question : {
        type : String,
        required :true
    },
    option_1 : {
        type : String,
        required :true
    },
    option_2 : {
        type : String,
        required :true
    },
    option_3 : {
        type : String,
        required :true
    },
    option_4 : {
        type : String,
        required :true
    },
    answer : {
        type : String,
        required :true
    },
    answeredCorrect : {
        type : Array,
    },
    answeredIncorrect : {
        type : Array,
    }
}, { timestamps: true })

module.exports = mongoose.model('quizzes', quizSchema)