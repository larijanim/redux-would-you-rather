import React, {Component} from 'react';
import {connect} from "react-redux";


class QuestionDeial extends Component {
    render() {
        const { authedUser,users, questions } = this.props;
        const idq=this.props.match.params.id;
        const authedUserInfo = users[authedUser];
        const question=questions[idq];
        const{answers}=authedUserInfo;
        const { author, timestamp, optionOne,optionTwo,id}=question;
        return (


                <div>
                    Question Author:{author }-{timestamp}<br/><br/>
                    Would you rather:<br/>
                    Option One: {optionOne.text}-----
                    Voted by: {optionOne.votes}<br/>
                    Option Two: {optionTwo.text}
                    Voted by: {optionTwo.votes}<br/><br/>
                    Your vote:{answers[idq]}
                </div>
        );
    }
}


function mapStateToProps({ authedUser,users, questions }) {

    return {
        questions,
        authedUser,
        users,

    };
}

export default connect(mapStateToProps)(QuestionDeial);
