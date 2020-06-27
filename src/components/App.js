import React , {Component} from 'react';
import {connect} from 'react-redux';
import{handleInitialData} from "../actions/shared";
import {Link, Route} from 'react-router-dom';
import './../App.css';
import Dashboard from "./Dashboard";
import Logon from './Logon';
import Navbar from "./Navbar";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import QuestionDeial from "./QuestionDeial";
import NotFound from "./NotFound";

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
                       <br/>
                       <br/>
                        <Route path='/add' exact component={NewQuestion} loggedOn={this.props.loggedOn}/>
                        <Route path='/' exact component={Dashboard} loggedOn={this.props.loggedOn} />
                        <Route path='/questions/:id' exact component={QuestionDeial} loggedOn={this.props.loggedOn}/>
                        <Route  path='/leaderBoard' exact component={LeaderBoard} loggedOn={this.props.loggedOn} />
                        <Route path='/notFound' exact component={NotFound} loggedOn={this.props.loggedOn} />
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
