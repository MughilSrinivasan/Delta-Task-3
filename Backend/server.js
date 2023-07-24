require("dotenv").config();

const express =require("express");
const quizRouter = require("./routes/router");
const mongoose = require('mongoose');
const userRoutes = require('./routes/user')

const app = express();

const PORT = 4000 || process.env.PORT;

app.use(express.json())
app.use("/quiz" , quizRouter);
app.use('/user', userRoutes)


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connected to database and listening to port', PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 