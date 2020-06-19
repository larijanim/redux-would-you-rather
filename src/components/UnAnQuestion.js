import React, {Component} from 'react';
import {connect} from "react-redux";
import {handleAnsweredQ} from  '../actions/questions';
import { Redirect } from 'react-router-dom';

class UnAnQuestion extends Component {
    state = {
        UnAnQuestion: false,
    }


    handleOptionClicked = (event, option)=> {
        event.preventDefault();
        console.log("props"+JSON.stringify(this.props))
        const { answerQuestion, authedUser, question,dispatch} = this.props;
        const answer = option === 1 ? 'optionOne' : 'optionTwo';
       this.props.dispatch(handleAnsweredQ(this.props.question.id, answer));
        this.setState(function(previousState) {
            return {
                ...previousState,
                UnAnQuestion: true,
            };
        })
    }


    render() {
        if(this.state.UnAnQuestion) {
            const {  question } = this.props;
            return <Redirect to={`/questions/${question.id}`} />

        }
        const { authedUser,users, question } = this.props;

        const answers = Object.keys(users[authedUser].answers);

        const { author, timestamp}=question;
        return (
            <div>


                Question Author:{author }-{timestamp}<br/>
                Would you rather:<br/>
                <button onClick={(event) => this.handleOptionClicked(event,1)}> option One: {question.optionOne.text}</button><br/>

                <button onClick={(event) => this.handleOptionClicked(event,2)}> Option Two: {question.optionTwo.text}</button><br/>

                ---------------------
            </div>
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

export default connect(mapStateToProps)(UnAnQuestion)
