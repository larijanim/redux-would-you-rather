import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import {
    BrowserRouter as Router,
    Route, withRouter
} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SimpleSelect from './selectTest'

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
    button:{
        marginTop:50 ,


    },
    formControl: {
     //  margin: spacing(1),

        minWidth: 120,
    },
    selectEmpty: {
      //  marginTop: spacing(2),
    },
}

class Logon extends Component {
    state = {
        userId: null,

    }

    handleSelectedChang = function(event) {
        const userId = event.target.value;

        this.setState(function(previousState) {
            return {
                ...previousState,
                userId,
            };
        });
    }

    handleLogon = (event)=>{
        const { userId } = this.state;
        const { dispatch } = this.props;

        dispatch(setAuthedUser(userId));

        this.setState(function(previousState) {
            return {
                ...previousState,

            };
        });
        this.props.history.push('/');
    }




    render() {
        const {classes}=this.props;
        const { userId } = this.state;
        const {  users } = this.props;
        const selected = userId ? userId : -1;
    //    const avatar = userId ? users[userId].avatarURL : 'placeholder.jpg';



    return (
        <Grid container >
            <Grid item sm/>
            <Grid item sm>
                <Card className={classes.root}>
                    <CardContent>
                          <h2> Whould You Rather Game</h2><br/>
                          <br/>
                          <div>Please select a user and logon . </div>
                          <br/>
                          <br/>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-label">user ID</InputLabel>
                            <Select
                                labelId="select-label"
                                id="demo-simple-select"
                                value={userId}
                                onChange={(event) => this.handleSelectedChang(event)}
                            >

                                <MenuItem value=""> <em>None</em> </MenuItem>
                                {Object.keys(users).map(function(key) {
                                    return (

                                        <MenuItem value={users[key].id} key={key} >{users[key].id}</MenuItem>
                                    );
                                })}

                            </Select>
                            <FormHelperText>Some important helper text</FormHelperText>
                        </FormControl> <br/><br/>
                         <Button
                            variant="outlined" color='primary'
                            disabled={userId === null}
                            onClick={(event) => this.handleLogon(event)}
                            className='classes.button'
                          > Logon
                        </Button>
                    </CardContent>
                </Card>

            </Grid>
            <Grid item sm/>

        </Grid>
    );
    }
}
function mapStateToProps({ users }) {
    return {
        users,
    };
}

export default  withStyles(styles)(withRouter(connect(mapStateToProps)(Logon)));
