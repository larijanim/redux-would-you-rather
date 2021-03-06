
import { saveAnswer , saveQuestion } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}


export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function answerQuestion(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleNewQuestion(optionOneText, optionTwoText) {
  return function(dispatch, getState) {
    const { authedUser } = getState();

    const questionData = {
      optionOneText,
      optionTwoText,
      author: authedUser,
    };

    return saveQuestion(questionData)
        .then(function(question) { dispatch(addQuestion(question)) });
  };

}

export function handleAnsweredQ(question, answer) {
  return (dispatch, getState) =>{
    const { authedUser } = getState();

    const answerInfo = {
      authedUser:authedUser ,
      qid: question,
      answer:answer,
    };
   // console.log("zzzzz"+JSON.stringify(answerInfo));
    return saveAnswer(answerInfo)
        .then(function() { dispatch((answerQuestion(authedUser, question, answer))) })
  }
}

