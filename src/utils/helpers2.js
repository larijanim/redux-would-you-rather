

export function formatQuestion(question, author){
  const {id, optionOne, optionTwo}= question
  const { name, avatarURL}=author

  return{
    name,
    id,
    optionOne: optionOne.text,
    optionTwo: optionTwo.text,
    avatarURL,
    votesOne: optionOne.votes.length,
    votesTwo: optionTwo.votes.length,
  }
}
