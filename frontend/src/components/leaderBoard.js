import { useEffect , useState }from 'react'
import LeaderBoardDetails from './leaderBoardDetails'

const LeaderBorad = () => {

    const [users , setUsers] = useState('')
    
    useEffect(() => {
      
        const fetchUsers = async () => {
          const response = await fetch('/user/users', {
          })
          const json = await response.json()
    
          if (response.ok) {
            setUsers(json);
          }
        }
          fetchUsers()
      })

   return (
    <div>
    <div className='leaderIntro'>Check your ranking...</div>
      <div className='leaderBoard'>
        <h3 className='leaderHeading'>LeaderBoard</h3>
        <div className='leaderBody'>
            {
                users && users && users.map(user => (
                  <LeaderBoardDetails key={user._id} user={user} />
                ))
            }
        </div>
      </div>
      </div>
    )
  }
  
  export default LeaderBorad