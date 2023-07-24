import { useState , useContext } from 'react'
// import { QuizContext } from "../context/quizContext"
import { UserContext } from "../context/userContext"
import { SearchContext } from "../context/searchContext"
// import QuizDetails from "../components/quizDetails"
import QuizSearch from "../components/quizSearch"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/spinner'
// import { set } from 'date-fns';

const Search = () => {

    const { user  } = useContext(UserContext)
    const { result  , dispatch} = useContext(SearchContext)
    // const { dispatch } = useContext(QuizContext)

    const [searchValue , setSearchValue ] = useState('')
    const [foundPlayer , setFoundPlayer ] = useState(false)
    const [loading,setLoading] = useState(false)
    // const [error , setError ] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        console.log(searchValue)
        setFoundPlayer(false)
        setLoading(true)
        if(searchValue === "")
        //setError("No input given...")
        {
            setLoading(false)
            toast.error("No input given...", {
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
        else if(searchValue === user.username)
        // setError("Do not enter your username...")
        {
            setLoading(false)
            toast.error("Do not enter your username...", {
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
            // setError("")
            setFoundPlayer(true)
            setLoading(true)
            const response = await fetch('/quiz/' + searchValue ,{
            headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if(json.length === 0)
            {
                //setError(`${searchValue} has no quizes...`)
                setLoading(false)
                toast.error(`${searchValue} has no quizes...`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                setSearchValue('')
            }
        
            if (response.ok) {
                setLoading(false)
              dispatch({type: 'SET_SEARCH', payload: json})
              setSearchValue('')
            }
        }
    }

    return(
        <div>
            <form className='searchArea'>
                <div className="search">
                <input type='text' className="searchInput" placeholder='Search players...' name="search" value={searchValue} onChange = {(e) => setSearchValue(e.target.value)}></input>
                <button className="searchButton" onClick={handleSearch}>Search</button>
                </div>
                {/* {error && <div className="error">{error}</div>} */}
                <ToastContainer />
            </form>

            <div className="searchResultArea">
                {foundPlayer &&
                <div>
                {loading ? <Spinner /> : result && result.map((result) => (
                  <QuizSearch key={result._id} result={result} />
                ))}
                </div>
                }
            </div>
        </div>
    )
}

export default Search