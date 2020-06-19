import React, {Component} from 'react';
import {connect} from "react-redux";


class QuestionDeial extends Component {
    render() {
        const { authedUser,users, questions } = this.props;
        const idquestion=this.props.match.params.id;
        const authedUserInfo = users[authedUser];
        const question=questions[idquestion];
        const{answers , name}=authedUserInfo;
        const { author, timestamp, optionOne,optionTwo,id}=question;
        return (


                <div>
                    Question Author:{author }-{timestamp}<br/><br/>
                    Would you rather:<br/>
                    Option One: {optionOne.text}-----
                    Voted by: {optionOne.votes}<br/>
                    Option Two: {optionTwo.text}-----
                    Voted by: {optionTwo.votes}<br/><br/>
                    Your vote:{name}-{answers[idquestion]}
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
