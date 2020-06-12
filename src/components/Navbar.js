import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';




class Navbar extends Component {

    render() {

        const { authedUser, users } = this.props
        const avatar = authedUser ? users[authedUser].avatarURL : 'placeholder.jpg';
        const loggedOn = authedUser !== null
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' exact activeClassName='active'>
                            Leaderboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' exact activeClassName='active'>
                            New
                        </NavLink>
                    </li>
                    {
                        loggedOn
                            ? <li>
                                <NavLink to='/login' exact activeClassName='active'>
                                    <div className="nav-user">
                                        Logout
                                        <img
                                            src={avatar}
                                            alt={`Avatar of ${authedUser}`}
                                            className='nav-avatar'
                                        />
                                        {authedUser}
                                    </div>
                                </NavLink>
                            </li>
                            : <li>
                                <NavLink to='/login' exact activeClassName='active'>
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


export default connect(mapStateToProps)(Navbar);
