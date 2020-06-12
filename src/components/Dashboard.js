import React, {Component} from 'react';
import { connect } from 'react-redux';
import Question from "./Question";

class Dashboard extends Component {

    state = {
        shAnswered: false,
    }

    handleFilterClicked = function(answered) {
        this.setState(function() {
            return {
                shAnswered: answered
            };
        });
    }

    render() {

        const { shAnswered } = this.state;
        const { authedUser, questions } = this.props;
        const questionsArray = Object.keys(questions).map((key) => questions[key]);
        return (
          <div>
              <ul>
                 ----- {authedUser}-----
                  { questionsArray.map((question)=>(
                  <li>
                      <Question question={question}/>

                      <div>{question.id}-{question.optionOne.votes}</div>
                      <div>{question.id}-{question.optionTwo.votes}</div>
                  </li>

                  ))}

              </ul>
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
