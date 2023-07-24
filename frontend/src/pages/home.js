import { useEffect,useContext,useState }from 'react'
import { QuizContext } from "../context/quizContext"
import { UserContext } from "../context/userContext"
import { ScoreContext } from "../context/scoreContext"
import Spinner from '../components/spinner'

import QuizDetails from '../components/quizDetails'
import PostForm from '../components/postForm'
import LeaderBorad from '../components/leaderBoard'
import SearchCategory from '../components/searchCategory'

const Home = () => {
  const {quiz, dispatch} = useContext(QuizContext)
  const {user} = useContext(UserContext)
  const { scoreUpdate } = useContext(ScoreContext)
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true)
      const response = await fetch('/quiz', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        setLoading(false)
        dispatch({type: 'SET_QUIZ', payload: json})
      }
    }

    if (user) {
      fetchQuiz()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className='homeTitle'>
      <h3 className='listHeading'>Your quizlets...</h3>
      <span className="score">Score : {scoreUpdate} </span>
      </div>
      <div className="post">
        {loading ? <Spinner /> : quiz && quiz.map((quiz) => (
          <QuizDetails key={quiz._id} quiz={quiz} />
        ))}
      </div>
      <div className='searchDivCategory'>
        {user ? <SearchCategory /> : <h3 className='loginHeading'>Please Login/SignUp....</h3>}
      </div>
      <div className='bottomDivs'>
      <PostForm />
      <LeaderBorad />
      </div>
    </div>
  )
}

export default Home