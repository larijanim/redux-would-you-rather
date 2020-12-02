import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Route, withRouter
} from 'react-router-dom';





class Navbar extends Component {


    handleLogout = () => { // Handle logout button click
        const { dispatch } = this.props;
        this.props.history.push('/');
        dispatch(setAuthedUser(null));

    }

    render() {

        const { authedUser, users  } = this.props
        const loggedOn = authedUser !== null
        const userIns=users[authedUser];

        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' exact activeClassName='active'>
                            Leaderboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' exact activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>

                    <li>
                        <span > Whould you Rather</span>
                    </li>
                    {
                        loggedOn
                            ? <li>

                                    <div>
                                        <button onClick={this.handleLogout}>
                                            Logout
                                        </button>
                                        <span> {authedUser} <img
                                               src={'/'+userIns.avatarURL}
                                               alt={`Avatar of ${userIns.name}`}
                                                className='nav-avatar'/></span>
                                    </div>

                            </li>

                            : <li>
                                <NavLink to='/logon' exact activeClassName='active'>
                                    Logon
                                </NavLink>

                             </li>
                    }
                </ul>

            </nav>

        );
    }
}
function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        users
    };
}


export default withRouter(connect(mapStateToProps)(Navbar));
