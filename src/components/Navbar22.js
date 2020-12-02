import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Route, withRouter
} from 'react-router-dom';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';



class Navbar2 extends Component {
    handleLogout = () => { // Handle logout button click
        const { dispatch } = this.props;
        this.props.history.push('/logon');
        dispatch(setAuthedUser(null));

    }

    render() {

        const { authedUser, users } = this.props
        const loggedOn = authedUser !== null
        const userIns=users[authedUser];

        return (
            <AppBar>
                <Toolbar>
                     {
                            loggedOn
                                ?<div className='nav_Contain'>
                                <Button color='inherit' component={Link} to="/"  >Dashboard</Button>
                                <Button  color='inherit' component={Link} to="/leaderboard">Leaderboard</Button>
                                <Button  color='inherit' component={Link} to="/add">Add</Button>
                                <Button color='inherit'  onClick={this.handleLogout}>Logout</Button>

                                        <span> {authedUser} <img
                                            src={'/'+userIns.avatarURL}
                                            alt={`Avatar of ${userIns.name}`}
                                            className='nav-avatar'/></span>
                                </div>

                                :   <div className='nav_Contain'>
                                    <Button color='inherit' component={Link} to="/logon">LogOn</Button>
                                </div>
                        }

                </Toolbar>
            </AppBar>


        );
    }
}
function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        users
    };
}

export default withRouter(connect(mapStateToProps)(Navbar2));
