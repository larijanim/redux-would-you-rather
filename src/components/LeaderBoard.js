import React  from 'react';
import {connect} from "react-redux";

function LeaderBoard (props) {
    const { users } = props;
const usersData = Object.keys(users).
sort((a,b)=>((Object.keys(users[b].questions).length+Object.keys(users[b].answers).length)-(Object.keys(users[a].questions).
    length+Object.keys(users[a].answers).length))).map((key) => users[key]);


        return (
            <div className='centered'>
                <h3 >Leaderboard</h3>
                <ul  className='list'>
                    {usersData.map((user) => (
                        <li key={user.id}>
                            <div className='item' >
                                <img
                                    src={user.avatarURL}
                                    alt={`Avatar of ${user.name}`}
                                    className='avatar'
                                />
                                <span>{user.name}</span>
                                <div >
                                    <p>Asked : {user.questions.length}</p>
                                    <p>Voted: {Object.keys(user.answers).length}</p>
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );

}

function mapStateToProps ({  users }) {

    return {
        users,
    }
}

export default connect(mapStateToProps)(LeaderBoard)
