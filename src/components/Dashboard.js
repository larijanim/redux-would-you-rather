import React, {Component} from 'react';
import { connect } from 'react-redux';
import Question from "./Question";

class Dashboard extends Component {

    state = {
        shAnswered: false,
    }
//<div>{question.id}-{question.optionOne.votes}</div>
//<div>{question.id}-{question.optionTwo.votes}</div>

    handleFilterClicked = ( shAnswered) => { // update state value on tab click
        this.setState({ shAnswered });
    }

    render() {

        const { shAnswered } = this.state;
        const { authedUser, questions, users } = this.props;
        const questionsArray = Object.keys(questions).map((key) => questions[key]);
        const answeredQuestion=Object.keys(users[authedUser].answers)
        const unansweredQuestion = Object.keys(questions).filter(q => !answeredQuestion.includes(q))
        return (
          <div>
              ----- {authedUser}-----<br/>
              <div>
              <button onClick={(event) => this.handleFilterClicked(true)}>Answered</button>
              <button onClick={(event) => this.handleFilterClicked(false)}>UnAnswered</button>
              </div>
              {shAnswered === true &&
                   <div> <ul>
                      { answeredQuestion.map((question)=>(

                          <li>   <Question id={question}/>

                          </li>
                      ))}
                  </ul></div>}
              {shAnswered === false && <div> <ul>hhhhhh
                      { unansweredQuestion.map((question)=>(

                          <li>   <Question id={question}/>

                          </li>
                      ))}
                  </ul></div>
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
