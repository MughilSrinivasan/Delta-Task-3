import { useState , useContext } from 'react'
import { UserContext } from "../context/userContext"
import { SearchCategoryContext } from "../context/searchCategoryContext"
import CategorySearch from "../components/categorySearch"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/spinner'


const SearchCategory = () => {

    const { user } = useContext(UserContext)
    const { result  , dispatch} = useContext(SearchCategoryContext)

    const [searchValue , setSearchValue ] = useState('')
    const [foundCategory , setFoundCategory ] = useState(false)
    const [loading,setLoading] = useState(false)
    // const [error , setError ] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        console.log(searchValue)
        setFoundCategory(false)
        setLoading(true)
        if(searchValue === "")
        // 
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
        // else if(searchValue === user.username)
        // setError("Do not enter your username...")
        else
        {
            // setError("")
            setLoading(true)
            setFoundCategory(true)
            const response = await fetch('/quiz/category/' + JSON.parse( localStorage.getItem("user")).username + '/' + searchValue ,{
            headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if(json.length === 0)
            {
                setLoading(false)
                //setError(`There are no quizes posted my any user in ${searchValue} category...`)
                toast.error(`There are no quizes posted my any user in ${searchValue} category...`, {
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
              dispatch({type: 'SET_SEARCH_CATEGORY', payload: json})
              setSearchValue('')
            }
        }
    }

    return(
        <div>
            <form >
                <div className="search">
                <input type='text' className="searchInput" placeholder='Search by category...' name="search" value={searchValue} onChange = {(e) => setSearchValue(e.target.value)}></input>
                <button className="searchButton" onClick={handleSearch}>Search</button>
                </div>
                {/* {error && <div className="error">{error}</div>} */}
                <ToastContainer/>
            </form>

            <div className="searchResultAreaCategory">
                {foundCategory &&
                <div>
                {loading ? <Spinner /> : result && result.map((result) => (
                    result.author !== JSON.parse( localStorage.getItem("user")).username ? <CategorySearch key={result._id} result={result} /> : null
                ))}
                </div>
                }
            </div>
        </div>
    )
}

export default SearchCategory