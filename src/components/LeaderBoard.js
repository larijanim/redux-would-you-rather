import React  from 'react';
import {connect} from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";



const styles={
    card:{
        display:'flex'
    },
    root: {
        minWidth: 275,
        maxWidth: 400,
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


function LeaderBoard (props) {

    const {classes}=props;
    const { users } = props;
    const usersData = Object.keys(users).
    sort((a,b)=>((Object.keys(users[b].questions).length+Object.keys(users[b].answers).length)-(Object.keys(users[a].questions).
    length+Object.keys(users[a].answers).length))).map((key) => users[key]);


        return (
            <div >
                <h3 >Leaderboard</h3>
                <Grid container spacing={6}
                      direction="row"
                      justify="center"
                      alignItems="center">


                    {usersData.map((user) => (

                    <Grid item sm>
                         <Card className={classes.root} key={user.id}>
                             <CardContent>
                                <img
                                        src={user.avatarURL}
                                        alt={`Avatar of ${user.name}`}
                                        className='avatar'
                                />
                                 <span>{user.name}</span>
                                 <div >
                                    <p>Asked : {user.questions.length}</p>
                                    <p>Voted: {Object.keys(user.answers).length}</p>
                                </div>
                            </CardContent>
                        </Card>
                   </Grid>
                    ))}
                </Grid  >

    </div>
        );

}

function mapStateToProps ({  users }) {

    return {
        users,
    }
}

export default withStyles(styles)(connect(mapStateToProps)(LeaderBoard))
