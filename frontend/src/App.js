import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Home from './pages/home.js'
import Navbar from './components/Navbar'
import Login from './pages/login'
import Signup from './pages/signup'
import Search from './components/search.js'
import { useContext , useEffect} from "react"
import { UserContext } from "../src/context/userContext"
import { ScoreContext } from './context/scoreContext.js'


function App() {

//   window.onbeforeunload = function() {
//     localStorage.clear();
//  }

  const { user } = useContext(UserContext)
  const {  dispatch } = useContext(ScoreContext)
  var value
  if( localStorage.length === 0)
  value = 0;
  else
  value = JSON.parse(localStorage.getItem("user")).score
   useEffect(() => {
     dispatch({type: 'SET_SCORE', payload: value})
   }, [dispatch,value])
  
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <div className='navBar'>
            <Link to="/quiz" className='heading'><h1>QuizAcademy</h1></Link>
            <Navbar />
          </div>
          <div className='searchDiv'>
            {user ? <Search /> : <h3 className='loginHeading'>Please Login/SignUp....</h3>}
          </div>
          <Routes>
            <Route 
              path='/'
              element={user ? <Home /> : <Navigate to = '/login'/>}
            />
            <Route 
              path="/quiz" 
              element={user ? <Home /> : <Navigate to = "/login" />} 
            />
            <Route
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/quiz" /> } 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/quiz" /> } 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
