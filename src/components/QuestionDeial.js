import React, {Component} from 'react';
import {connect} from "react-redux";
import Moment from "moment";
import {Redirect} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";



const styles={
    card:{display:'flex'},
    root: {
        minWidth: 275,
        
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}

class QuestionDetial extends Component {
    render() {
        const {classes}=this.props;
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
                    <Card className={classes.root}>
                        <CardContent>
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
                        </CardContent>
                    </Card>
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

export default withStyles(styles)(connect(mapStateToProps)(QuestionDetial));
