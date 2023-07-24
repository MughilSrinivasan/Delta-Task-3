const LeaderBoardDetails = ({ user }) => {
    return(
    <div className='leaderList'>
        <p className='leaderName'>{user.username}</p>
        <p className='leaderScore'>{user.score}</p>
    </div>)
}

export default LeaderBoardDetails
