import React , {Component} from 'react';
import {connect} from 'react-redux';
import{handleInitialData} from "../actions/shared";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './../logo.svg';
import './../App.css';
import Dashboard from "./Dashboard";
import Logon from './Logon';
import Navbar from "./Navbar";

class  App extends Component {

    componentDidMount(){

     this.props.dispatch(handleInitialData())
    }

    render() {
        const { loggedOn } = this.props;
        console.log('hh'+ loggedOn);

        return (

            <div>
                {this.props.loggedOn
                    ? <div>
                        <Navbar/>
                         Learn React_Redux
                        <Dashboard  />
                      </div>

                    : <Logon />
                }
            </div>
        );
    }
};

function mapStateToProps({ authedUser }) {

    return {

        loggedOn: authedUser !== null,
    };
}
export default connect(mapStateToProps) (App);
