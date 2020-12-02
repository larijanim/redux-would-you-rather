import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';
import { handleNewQuestion } from '../actions/questions';
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

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toUnAnQuestion: false,
    }
    handleSubmit=(event)=>{
        event.preventDefault();

        const { optionOne, optionTwo } = this.state;

        this.props.dispatch(handleNewQuestion(optionOne, optionTwo));

        this.setState(function(previousState) {
            return {
                ...previousState,
                toUnAnQuestion: true,
            };
        })
    }

    handleChange=(event,optionID)=>{

        const text = event.target.value;
        this.setState(function(pState) {
            return optionID === 1
                   ? { ...pState, 'optionOne': text }
                   : { ...pState, 'optionTwo': text };
        });
    }

    render() {
        const {classes}=this.props;
        if(this.state.toUnAnQuestion)
            return <Redirect to='/' />
        return (
            <div className='centered'><h3> Write New Question</h3><br/>

                <Card className={classes.root}>
                    <CardContent>
                            <form  onSubmit={(event) => this.handleSubmit(event)} >
                                <span >Whould you rather: </span>

                                 <div><span className='label' >Option One: </span>
                                        <textarea
                                         value={this.state.optionOne}
                                         onChange={(event) => this.handleChange(event, 1)}
                                        />

                                 </div>
                                  <div><span className='label' > Option Two: </span>
                                      <textarea
                                          value={this.state.optionTwo}
                                          onChange={(event) => this.handleChange(event, 2)}
                                      />

                                  </div>
                                  <button
                                        className='btn'
                                        type='submit'
                                        disabled={this.state.optionOne === '' || this.state.optionTwo === ''}
                                    >Submit</button>
                            </form>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(connect()(NewQuestion))
