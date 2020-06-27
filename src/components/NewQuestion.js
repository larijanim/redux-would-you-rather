import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';
import { handleNewQuestion } from '../actions/questions';

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
        if(this.state.toUnAnQuestion)
            return <Redirect to='/' />
        return (
            <div className='centered'><h3> Write New Question</h3><br/>
            <div className='item'>
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
            </div>
            </div>
        );
    }
}

export default connect()(NewQuestion)
