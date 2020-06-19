import React  from 'react';
import {connect} from "react-redux";

function LeaderBoard (props) {
    const { users } = props;
const usersData = Object.keys(users).map((key) => users[key]);



        return (
            <div>
                <h3 >Leaderboard</h3>
                <ul >
                    {usersData.map((user) => (
                        <li key={user.id}>
                            <div >
                                <span>{user.name}</span>
                                <div >
                                    <p>Asked : {user.questions.length}</p>
                                    <p>Voted: {Object.keys(user.answers).length}</p>
                                </div>
                                -----------------------------
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
