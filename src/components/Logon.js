import React, {Component} from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser, clearAuthedUser } from '../actions/authedUser';

class Logon extends Component {
    state = {
        userId: null,
        toHome: false,
    }

    handleSelectedChang = function(event) {
        const userId = event.target.value;

        this.setState(function(previousState) {
            return {
                ...previousState,
                userId,
            };
        });
    }

    handleLogon = function(event) {
        const { userId } = this.state;
        const { dispatch } = this.props;

        dispatch(setAuthedUser(userId));

        this.setState(function(previousState) {
            return {
                ...previousState,
                toHome: true,
            };
        });
    }




    render() {

       const { userId, toHome } = this.state;
        const { history, users } = this.props;
        const selected = userId ? userId : -1;
    //    const avatar = userId ? users[userId].avatarURL : 'placeholder.jpg';


        if(toHome) {

          return <Redirect to='/' />
        }
        return (
            <div className='centered'>
                <h3> Whould You Rather Game</h3><br/>
            <h3 >Logon</h3>
            <div  className='item'><br/>
                <span>Please select a user and press the logon button.</span>
                <div >

                    <select value={selected} onChange={(event) => this.handleSelectedChang(event)}>
                        <option value={-1} disabled>Select user...</option>
                        {Object.keys(users).map(function(key) {
                            return (
                                <option value={users[key].id} key={key}>{users[key].id}</option>
                            );
                        })}
                    </select>
                </div>
                <button
                    className='btn'
                    disabled={userId === null}
                    onClick={(event) => this.handleLogon(event)}
                >Logon
                </button>

            </div>

        </div>
    );
    }
}
function mapStateToProps({ users }) {
    return {
        users,
    };
}

export default connect(mapStateToProps)(Logon);
