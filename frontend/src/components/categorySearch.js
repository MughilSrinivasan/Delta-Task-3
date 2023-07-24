import { useState , useContext } from 'react'
import { ScoreContext } from "../context/scoreContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/spinner'


const CategorySearch = ({ result }) => {

    const { dispatch } = useContext(ScoreContext)

    const [answer , setAnswer ] = useState("")
    const [state , setState ] = useState("")
    const [className , setClassName ] = useState("searchList")
    const [correctClassName  , setCorrectClassName] = useState("")
    const [loading,setLoading] = useState(false)
    // const [error , setError ] = useState("")

    let username = JSON.parse(localStorage.getItem("user")).username
    console.log(result)

    let userCheckCorrect = result.answeredCorrect.includes(username)
    let userCheckIncorrect = result.answeredIncorrect.includes(username)
    var status

    if(userCheckCorrect)
    {
      status = "Correct"
    }
    else if(userCheckIncorrect)
    {
      status = "Incorrect"
    }

    const checkAnswer = (event) => {
        let temp = event.target.value
        setAnswer(temp)
    }

    const answerCheck = async () => {
        setClassName("searchList")
        // setError("")
        setState("")
        setLoading(true)
        setCorrectClassName("")
        if(answer === result.answer)
        {
            // const update = {answeredCorrect}
            const response = await fetch('/quiz/' + result._id + "/" + JSON.parse(localStorage.getItem("user")).username + '/correct', {
              method: 'PATCH',
              // body: JSON.stringify(update),
              headers: {
                'Content-Type': 'application/json',
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
            }
            else{
              setLoading(false)
                setState("😀 Correct!")
                toast.success( '😎 Good Job!..', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
                setClassName("searchListDisabled")
                setCorrectClassName("correctState")
            }


            let currScore = JSON.parse( localStorage.getItem("user")).score
            let changeScore = currScore + 100
            let currentUser = JSON.parse( localStorage.getItem("user")).username
            const userCorrectUpdate = {score : changeScore}
            const correctScoreUpdate = await fetch('user/' + currentUser, {
              method: 'PATCH',
              body: JSON.stringify(userCorrectUpdate),
              headers: {
                'Content-Type': 'application/json',
              }
            })
            const jsonCorrectScore = await correctScoreUpdate.json()
            if (!correctScoreUpdate.ok) {
              // setError(jsonCorrectScore.error)
              toast.error(jsonCorrectScore.error, {
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
            else{
                console.log("Score added...")
                toast.info("😃 Superb...Score of 100 added...", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                dispatch({type: 'UPDATE_SCORE', payload: changeScore})
                let data = JSON.parse(localStorage.getItem("user"));
                data.score = changeScore;
                localStorage.setItem("user",JSON.stringify(data));
            }
        }
        else if(answer === "")
        // setError("Select any one option...")
        {
          toast.error("Select any one option...", {
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
        else
        {
          setLoading(true)  
          const response = await fetch('/quiz/' + result._id + "/" + JSON.parse(localStorage.getItem("user")).username + '/incorrect', {
              method: 'PATCH',
              // body: JSON.stringify(update),
              headers: {
                'Content-Type': 'application/json',
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
            }
            else{
              setLoading(false)
                setState("😕 Incorrect!")
                toast.warn('😖 OMG!!!...', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
                setClassName("searchListDisabled")
                setCorrectClassName("incorrectState")
            }


            let currScore = JSON.parse( localStorage.getItem("user")).score
            let changeScore = currScore - 15
            let currentUser = JSON.parse( localStorage.getItem("user")).username
            const userIncorrectUpdate = {score : changeScore}
            const incorrectScoreUpdate = await fetch('user/' + currentUser, {
              method: 'PATCH',
              body: JSON.stringify(userIncorrectUpdate),
              headers: {
                'Content-Type': 'application/json',
              }
            })
            const jsonIncorrectScore = await incorrectScoreUpdate.json()
            if (!incorrectScoreUpdate.ok) {
              // setError(jsonIncorrectScore.error)
              toast.error(jsonIncorrectScore.error, {
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
            else{
                console.log("Score reduced...")
                toast.info("☹️ Sorry...Score of 15 reduced...", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
                dispatch({type: 'UPDATE_SCORE', payload: changeScore})
                let data = JSON.parse(localStorage.getItem("user"));
                data.score = changeScore;
                localStorage.setItem("user",JSON.stringify(data));
            }
        }
    }

   return (
      <div className="quiz_search">
        <h3 className="searchText"><strong className="searchCategory">Question : </strong>{result.question}</h3>
        <p className="searchText"><strong className="searchCategory">Author : </strong>{result.author}</p>
        {/* <p className="searchText"><strong className="searchCategory">Category : </strong>{result.category}</p> */}
        <div className="statusDiv">
        
        {loading ? <Spinner /> : status || 
        <div className={className}>
            <form>
                <div className="optionItem">
                    <p className="searchText"><strong className="searchCategory">Options : </strong></p>
                </div>
                <div className="optionItem">
                    <input 
                        type="radio" 
                        id={`${result._id} + option_1`}
                        name="option" 
                        value={result.option_1} 
                        onClick={checkAnswer}
                        className="searchResultInput" ></input>
                    <label htmlFor={`${result._id} + option_1`} className="searchResultLabel">{result.option_1}</label>
                </div>
                <div className="optionItem">
                    <input type="radio" 
                        id={`${result._id} + option_2`} 
                        name="option" 
                        value={result.option_2}
                        onClick={checkAnswer}
                        className="searchResultInput"></input>
                    <label htmlFor={`${result._id} + option_2`} className="searchResultLabel">{result.option_2}</label>
                </div>
                <div className="optionItem">
                    <input type="radio" 
                        id={`${result._id} + option_3`} 
                        name="option" 
                        value={result.option_3} 
                        onClick={checkAnswer}
                        className="searchResultInput"></input>
                    <label htmlFor={`${result._id} + option_3`}  className="searchResultLabel">{result.option_3}</label>
                </div>
                <div className="optionItem">
                    <input type="radio" 
                        id={`${result._id} + option_4`}
                        name="option" 
                        value={result.option_4}
                        onClick={checkAnswer} 
                        className="searchResultInput"></input>
                    <label htmlFor={`${result._id} + option_4`} className="searchResultLabel">{result.option_4}</label>
                </div>
            </form>
            <button className="checkButton" onClick={answerCheck}>Check</button>
        </div>}
        </div>
        {state && <div className={correctClassName}>{state}</div>}
        {/* {error && <div className='searchError'>{error}</div>} */}
        <ToastContainer />
      </div>
    )
  }
  
  export default CategorySearch 