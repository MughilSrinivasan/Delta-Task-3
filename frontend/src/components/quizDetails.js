import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const QuizDetails = ({ quiz }) => {

   return (
      <div className="quiz-details">
        {/* <p><strong className='determiner'>Author : </strong>{quiz.author}</p> */}
        <h3><strong className='determiner'>Question :</strong> {quiz.question}</h3>
        <p><strong className='determiner'>Category : </strong>{quiz.category}</p>
        <p><strong className='determiner'>Options : </strong></p>
        <div className="optionList">
        <p className="optionP">{quiz.option_1}</p>
        <p className="optionP">{quiz.option_2}</p>
        <p className="optionP">{quiz.option_3}</p>
        <p className="optionP">{quiz.option_4}</p>
        </div>
        <p className='date'><strong  className='determiner'>Posted : </strong>{formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })}</p>
      </div>
    )
  }
  
  export default QuizDetails