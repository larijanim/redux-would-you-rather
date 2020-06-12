import React, {Component} from 'react';
import {connect} from "react-redux";

class Question extends Component {
    render() {
        //console.log(this.props)

       const { authedUser,users } = this.props;
       //--------------------------when  we had just id of question
      //  console.log(id);
      //  const questionarray = Object.keys(questions).map((key) => questions[key]);
      //  const question= questionarray.filter(Q=>( Q.id === id ))
       // console.log(question[0].id)
        //<div>Question Author:{//question[0].author</div>
        //------------------
        const answers = Object.keys(users[authedUser].answers);
        const xy=answers.filter(xx=>(xx===this.props.question.id));
        console.log("jjjj"+xy);
        const { author, timestamp}=this.props.question;
        return (
            <div>

                Question Author:{author }-{timestamp}<br/>

                {this.props.question.optionOne.text}<br/>
                {this.props.question.optionOne.votes}
                {this.props.question.optionTwo.text}<br/>
                {this.props.question.optionTwo.votes}
            </div>
        );
    }
}

function mapStateToProps({ authedUser, users },{question}) {
   // const question = questions[id];
    return {
        authedUser,
        users,
    };
}

export default connect(mapStateToProps)(Question)
