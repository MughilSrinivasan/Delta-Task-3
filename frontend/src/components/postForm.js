import { useState , useContext } from 'react'
import { QuizContext } from "../context/quizContext"
import { UserContext } from "../context/userContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/spinner'

const PostForm = () => {
  const { dispatch } = useContext(QuizContext)
  const { user } = useContext(UserContext)

  const [category, setCategory] = useState('')
  //const [author, setAuthor] = useState('')
  const [question, setQuestion] = useState('')
  const [option_1, setOption_1] = useState('')
  const [option_2, setOption_2] = useState('')
  const [option_3, setOption_3] = useState('')
  const [option_4, setOption_4] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading,setLoading] = useState(false)
  // const [error, setError] = useState(null)
  //const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      // setError('You must be logged in')
      toast.error('You must be logged in', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return
    }
    
    let author = user.username

    const quiz = {category, author, question,option_1,option_2,option_3,option_4,answer,status : "not answered"}

    console.log(quiz)

    setLoading(true)
    
    const response = await fetch('/quiz/post', {
      method: 'POST',
      body: JSON.stringify(quiz),
      headers: {
        'Content-Type': 'application/json',
        'authorization' : `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setLoading(false)
      // setError(json.error)
      toast.error(json.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      //setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setLoading(false)
      //setEmptyFields([])
      // setError(null)
      setCategory('')
      setQuestion('')
      setOption_1('')
      setOption_2('')
      setOption_3('')
      setOption_4('')
      setAnswer('')
      console.log('new post added:', json)
      toast.success( 'New post added successfully...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      dispatch({type: 'CREATE_QUIZ', payload: json})
    }

  }

  return (
    <form className="newQuiz" onSubmit={handleSubmit}> 
      <h3 className='formHeading'>Add a new Quizlet...</h3>

    <div className='data'>

    <div className="formSection">
      <label className='formLabel'>Category : </label>
      <input 
        type="text" 
        placeholder='Enter category...'
        onChange={(e) => setCategory(e.target.value)} 
        value={category}
        className='formInput'
      />
      </div>

    <div className="formSection">
      <label className='formLabel'>Author : </label>
      <input 
        type="text" 
        readOnly
        value={user.username}
        className='formInput'
      />
      </div>

    <div className="formSection">
      <label className='formLabel'>Question : </label>
      <input 
        type="text" 
        placeholder='Enter question..'
        onChange={(e) => setQuestion(e.target.value)} 
        value={question}
        className='formInput'
      />
      </div>

    <div className="formSection">
      <label className='formLabel'>Option_1 : </label>
      <input 
        type="text" 
        placeholder='Enter option_1...'
        onChange={(e) => setOption_1(e.target.value)} 
        value={option_1} 
        className='formInput'
      />
      </div>

    <div className="formSection">
      <label className='formLabel'>Option_2 : </label>
      <input 
        type="text" 
        placeholder='Enter option_2...'
        onChange={(e) => setOption_2(e.target.value)} 
        value={option_2} 
        className='formInput'
      />
      </div>

    <div className="formSection">
      <label className='formLabel'>Option_3 : </label>
      <input 
        type="text" 
        placeholder='Enter option_3...'
        onChange={(e) => setOption_3(e.target.value)} 
        value={option_3} 
        className='formInput'
      />
      </div>

    <div className="formSection">
      <label className='formLabel'>Option_4 : </label>
      <input 
        type="text" 
        placeholder='Enter option_4...'
        onChange={(e) => setOption_4(e.target.value)} 
        value={option_4} 
        className='formInput'
      />
      </div>

    <div className="formSection">
      <label className='formLabel'>Answer : </label>
      <input 
        type="text" 
        placeholder='Enter answer...'
        onChange={(e) => setAnswer(e.target.value)} 
        value={answer}
        className='formInput' 
      />
      </div>

      {loading ? <Spinner /> : <button className='postButton'>Add Quiz</button>}
      {/* {error && <div className="error">{error}</div>} */}
      <ToastContainer />
      </div>
    </form>
  )
}

export default PostForm