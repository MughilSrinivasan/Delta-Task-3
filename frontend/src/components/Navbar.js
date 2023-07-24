import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from "../context/userContext"
import { QuizContext } from "../context/quizContext"
import { ScoreContext } from "../context/scoreContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Navbar = () => {
  
  const { user , dispatch } = useContext(UserContext)
  const {  dispatch : quizDispatch } = useContext(QuizContext)
  const {  dispatch : scoreDispatch } = useContext(ScoreContext)

    const handleLogout = () => {
      toast.success('Logged out successfully...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      localStorage.removeItem('user')
      dispatch({ type: 'LOGOUT' })
      quizDispatch({type : 'SET_QUIZ',payload : null})
      scoreDispatch({type : 'RESET_SCORE',payload : null})
    }

  return (
    <header>
      <nav> 
          <div className="navigation">
            {!user && 
              <div className='authActions'>
            <Link to="/login" className='login'>Login</Link>
            <Link to="/signup" className='signup'>Signup</Link>
            </div>}
            {user &&
            <div className='logoutDiv'>
              <div className='essentials'>
              <span className="username">{user.username}</span>
              </div>
              <div className='logoutSide'>
              <button onClick={handleLogout} className='logoutButton'>Logout</button>
              </div>
            </div>}
          </div>
        </nav>
        <ToastContainer />
    </header>
  )
}

export default Navbar