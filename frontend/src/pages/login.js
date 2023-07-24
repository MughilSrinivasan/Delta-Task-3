import { useState , useContext } from "react"
import { UserContext } from "../context/userContext"
import { ScoreContext } from "../context/scoreContext" 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/spinner'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  // const [error, setError] = useState(null)
  const { dispatch } = useContext(UserContext)
  const {dispatch : scoreDispatch} = useContext(ScoreContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // setError(null)
    const response = await fetch('/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    })
    const json = await response.json() 
    if (!response.ok) {
      // setError(json.error)
      setLoading(false)
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
    }
    if (response.ok){
      setLoading(false)
    toast.success( `${username} successfully logged in!...`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
      localStorage.setItem("user", JSON.stringify(json))
      dispatch({type: 'LOGIN', payload: json})
      scoreDispatch({type:'SET_SCORE' , payload : JSON.parse(localStorage.getItem("user")).score})
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div className="authBlock">
    <form className="auth" onSubmit={handleSubmit}>
      <h3 className="authHeading">Login</h3>
      <div className="userAuth">
      <div className="userLogin">
        <label className="userLabel">Username :</label>
        <input 
          type="text" 
          onChange={(e) => setUsername(e.target.value)} 
          value={username} 
          placeholder="enter username..."
          className="authInput"
          name="username"
        />
      </div>
      <div className="userLogin">
        <label className="userLabel">Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          placeholder="enter password..."
          className="authInput"
          name="password"
        />
      </div>
      </div>
      {loading ? <Spinner / > : <button className="authButton" >Log in</button>}
      <ToastContainer />
      {/* {error && <div className="error">{error}</div>} */}
    </form>
    </div>
  )
}

export default Login