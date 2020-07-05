export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}


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
