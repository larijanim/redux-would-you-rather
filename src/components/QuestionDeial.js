import React, {Component} from 'react';
import {connect} from "react-redux";
import Moment from "moment";
import {Redirect} from "react-router-dom";

class QuestionDetial extends Component {
    render() {
        const { authedUser,users, questions } = this.props;
        const idquestion=this.props.match.params.id;
        const authedUserInfo = users[authedUser];
        const question=questions[idquestion];
        if(question == null) {
            return <Redirect from='*' to='/notFound' />
        }
        const{answers , name}=authedUserInfo;
        const { author, timestamp, optionOne,optionTwo,id}=question;
        const userIns=users[author]
        const myAnswer=answers[idquestion]==='optionOne'?true:false;

        return (

                <div className='centered' className='list'>
                    <h3>Would you rather:</h3><br/>
                     <img
                    src={'/'+userIns.avatarURL}
                    alt={`Avatar of ${userIns.name}`}
                    className='avatar'
                     />
                     {author }|{Moment(timestamp).format("lll")}<br/><br/>


                    <div className= {myAnswer?'active item':'body item'} >
                        <span className='label' >Option One: </span>  {optionOne.text}<br/>
                        <span className='rightText' >  Voted by:
                        {optionOne.votes.length}-{((optionOne.votes.length*100)/(optionOne.votes.length + optionTwo.votes.length)).toFixed(1)}%
                        </span>
                     </div>
                    <div className= {!myAnswer?'active item':'body item'} >
                        <span className='label' >Option Two: </span>   {optionTwo.text}<br/>
                        <span className='rightText' > Voted by:
                        {optionTwo.votes.length}-{((optionTwo.votes.length*100)/(optionOne.votes.length + optionTwo.votes.length)).toFixed(1)}%
                        </span>
                      </div>
                    <div className='active item'><span className='label' > Your vote:</span>
                        {answers[idquestion]}</div>
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

export default connect(mapStateToProps)(QuestionDetial);
