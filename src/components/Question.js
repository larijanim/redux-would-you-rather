import React, {Component} from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import Moment from 'moment';

class Question extends Component {
    render() {
        //console.log(this.props)

       const { authedUser,users, question } = this.props;
        const answers = Object.keys(users[authedUser].answers);
        //todo : should show answer of current user
        const { author, timestamp}=question;
        const userIns=users[author];
        return (

<Link to={`/questions/${question.id}`} className='item'  >
            <div>
                <h3> You did Answer:</h3>
                <img
                src={'/'+userIns.avatarURL}
                alt={`Avatar of ${userIns.name}`}
                className='avatar'/>
                {author }|{Moment(timestamp).format("lll")}<br/><br/>
                Would you rather:<br/>
               Option One: {this.props.question.optionOne.text}<br/>

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
