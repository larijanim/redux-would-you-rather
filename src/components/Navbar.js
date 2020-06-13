import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';




class Navbar extends Component {
    handleLogout = () => { // Handle logout button click
        const { dispatch } = this.props;
        dispatch(setAuthedUser(null));
    }

    render() {

        const { authedUser, users } = this.props
      //  const avatar = authedUser ? users[authedUser].avatarURL : 'placeholder.jpg';
        const loggedOn = authedUser !== null
        return (
            <nav>
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
                    {
                        loggedOn
                            ? <li>
                                <NavLink to='/logon' exact activeClassName='active'>
                                    <div className="nav-user">
                                        <button onClick={this.handleLogout}>
                                            Logout
                                        </button>
                                        <span>{authedUser}</span>
                                    </div>
                                </NavLink>
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


export default connect(mapStateToProps)(Navbar);
