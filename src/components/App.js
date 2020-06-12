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

        return (

            <div>
                <Navbar/>

                Learn React_Redux

                <Route path='/' exact component={Dashboard} loggedOn={loggedOn} />
                  <Route path='/logon' exact component={Logon} />

            </div>
        );
    }
};

function mapStateToProps({ authedUser }) {

    return {

        loggedOn: authedUser !== null,
    };
}
export default connect() (App);
