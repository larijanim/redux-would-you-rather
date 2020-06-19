import React , {Component} from 'react';
import {connect} from 'react-redux';
import{handleInitialData} from "../actions/shared";
import { Route } from 'react-router-dom';
import './../App.css';
import Dashboard from "./Dashboard";
import Logon from './Logon';
import Navbar from "./Navbar";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import QuestionDeial from "./QuestionDeial";

class  App extends Component {

    componentDidMount(){

     this.props.dispatch(handleInitialData())
    }

    render() {
        const { loggedOn } = this.props;

        return (

            <div>
                {this.props.loggedOn
                    ? <div>
                        <Navbar/>
                         Learn React_Redux<br/>
                         ---------------------
                          <br/>
                        <Route path='/add' exact component={NewQuestion} loggedIn={this.props.loggedOn}/>
                        <Route path='/' exact component={Dashboard} loggedIn={this.props.loggedIn} />
                        <Route path='/questions/:id' exact component={QuestionDeial} loggedIn={this.props.loggedIn}/>
                        <Route  path='/leaderBoard' exact component={LeaderBoard} loggedIn={this.props.loggedIn} />
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
