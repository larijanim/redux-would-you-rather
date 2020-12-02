import React, {Component} from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import Moment from 'moment';
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


class Question extends Component {
    render() {
        //console.log(this.props)
        const {classes}=this.props;
        const { authedUser,users, question } = this.props;
        const answers = Object.keys(users[authedUser].answers);
        //todo : should show answer of current user
        const { author, timestamp}=question;
        const userIns=users[author];
        return (


            <Card className={classes.root}>
                <CardContent>
                    <CardActions>
                        <Button variant="outlined" color='primary' color='inherit'  component={Link} to={`/questions/${question.id}`}>Your answer</Button>
                    </CardActions>
                    <img
                    src={'/'+userIns.avatarURL}
                    alt={`Avatar of ${userIns.name}`}
                    className='avatar'/>

                    {author }|{Moment(timestamp).format("lll")}<br/><br/>
                    <Typography className={classes.title} color="textSecondary" gutterBottom> Would you rather:</Typography><br/>
                    <Typography variant="h5" component="h2">Option One: {this.props.question.optionOne.text}</Typography><br/>

                    <Typography variant="h5" component="h2">Option Two: {this.props.question.optionTwo.text}</Typography>
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

export default withStyles(styles)(connect(mapStateToProps)(Question))
