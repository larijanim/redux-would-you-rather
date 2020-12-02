import React, {Component} from 'react';
import {connect} from "react-redux";
import {handleAnsweredQ} from  '../actions/questions';
import {Link, Redirect} from 'react-router-dom';
import Moment from "moment";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const styles={
    card:{display:'flex'},
    root: {
        minWidth: 275,
        maxWidth: 600,
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

class UnAnQuestion extends Component {
    state = {
        UnAnQuestion: false,
    }


    handleOptionClicked = (event, option)=> {
        event.preventDefault();
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
        const {classes}=this.props;

        if(this.state.UnAnQuestion) {
            const {  question } = this.props;
            return <Redirect to={`/questions/${question.id}`} />

        }
        const { authedUser,users, question } = this.props;
        const answers = Object.keys(users[authedUser].answers);
        const { author, timestamp}=question;
        const userIns=users[author];
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom> Would you rather:</Typography><br/>
                    <p> <img
                    src={'/'+userIns.avatarURL}
                    alt={`Avatar of ${userIns.name}`}
                    className='avatar'/>{author }|{Moment(timestamp).format("lll")}<br/><br/>
                    </p>
                    <CardActions>
                        <Button variant="outlined" color='primary'  onClick={(event) => this.handleOptionClicked(event,1)}> option One: {question.optionOne.text}</Button>
                    </CardActions>
                    <CardActions>
                        <Button variant="outlined" color="secondary" onClick={(event) => this.handleOptionClicked(event,2)}> option Two: {question.optionTwo.text}</Button>
                    </CardActions>
                </CardContent>
            </Card>

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

export default withStyles(styles)(connect(mapStateToProps)(UnAnQuestion))
