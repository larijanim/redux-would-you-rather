import React, {Component} from 'react';
import { connect } from 'react-redux';
import Question from "./Question";
import UnAnQuestion from "./UnAnQuestion";
import {Link} from "react-router-dom";
import './../App.css';


class Dashboard extends Component {

    state = {
        showVoted: false,  // tabs clicking
    }


// update state  on tab click
    handleFilterClicked = ( showVoted) => {
        this.setState({ showVoted });
    }

    render() {

        const { showVoted } = this.state;
        const { authedUser, questions, users } = this.props;
       // const questionsArray = Object.keys(questions).map((key) => questions[key]);

        const votedIDbyAuthedUser=Object.keys(users[authedUser].answers).sort((a,b)=>questions[b].timestamp-questions[a].timestamp);;
        console.log("aa"+votedIDbyAuthedUser);
        const unvotedID = Object.keys(questions).filter(q => !votedIDbyAuthedUser.includes(q)).sort((a,b)=>questions[b].timestamp-questions[a].timestamp);;

        return (
          <div cassName='container'>
              <h3 className='centered'>Choose:</h3>
              <div  className='centered'>
              <button onClick={(event) => this.handleFilterClicked(true)} className={showVoted?'active':'body'} >Answered</button>
              <button onClick={(event) => this.handleFilterClicked(false)} className={!showVoted?'active':'body'}>UnAnswered</button>
              </div>
              {showVoted === true &&
                   <div className='list'> <ul>
                      { votedIDbyAuthedUser.map((question)=>(

                          <li>
                              <Question id={question}/>

                          </li>
                      ))}
                  </ul></div>}
              {showVoted === false &&
                  <div className='list'>
                      <ul>
                          { unvotedID.map((question)=>(

                              <li>   <UnAnQuestion id={question}/>

                              </li>
                          ))}
                      </ul>
                  </div>
              }

            </div>
        );
    }
}

function mapStateToProps({ authedUser, questions, users }) {
    return {
        authedUser,
        questions,
        users,
    };
}

export default connect(mapStateToProps)(Dashboard)
