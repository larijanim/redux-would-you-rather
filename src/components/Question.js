import React, {Component} from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';

class Question extends Component {
    render() {
        //console.log(this.props)

       const { authedUser,users, question } = this.props;
        const answers = Object.keys(users[authedUser].answers);
        //todo : should show answer of current user
        const { author, timestamp}=question;
        return (
<Link to={`/questions/${question.id}`}>
            <div>

                Question Author:{author }-{timestamp}<br/>
                Would you rather:<br/>
               Option One: {this.props.question.optionOne.text}

               Option Two: {this.props.question.optionTwo.text}

            </div>
</Link>

        );
    }
}

function mapStateToProps({ authedUser, users, questions },{id}) {
  const question = questions[id];
    return {
        question,
        authedUser,
        users,
    };
}

export default connect(mapStateToProps)(Question)
