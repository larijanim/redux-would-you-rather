import React, {Component} from 'react';
import { connect } from 'react-redux';
import Question from "./Question";
import UnAnQuestion from "./UnAnQuestion";
import {Link} from "react-router-dom";

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
        const votedIDbyAuthedUser=Object.keys(users[authedUser].answers);
        const unvotedID = Object.keys(questions).filter(q => !votedIDbyAuthedUser.includes(q));
       // const questionListVoted=questionsArray.filter(q=>q.id===(votedIDbyAuthedUser.includes(q.id)))
      //  console.log("bbbb"+JSON.stringify(questionsArray));
        return (
          <div>
              ----- {authedUser}-----<br/>
              <div>
              <button onClick={(event) => this.handleFilterClicked(true)}>Answered</button>
              <button onClick={(event) => this.handleFilterClicked(false)}>UnAnswered</button>
              </div>
              {showVoted === true &&
                   <div> <ul>
                      { votedIDbyAuthedUser.map((question)=>(

                          <li>
                              <Question id={question}/>
                              ----------------------------

                          </li>
                      ))}
                  </ul></div>}
              {showVoted === false &&
                  <div>
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
