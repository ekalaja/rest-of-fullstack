const anecdoteReducer = (state = [], action) => {
  if (action.type==='VOTE') {
    console.log('äänestys REDUCERISSA!')
    const old = state.filter(a => a.id !==action.id)
    const voted = state.find(a => a.id === action.id)
    return [...old, { ...voted, votes: voted.votes + 1 } ]
  }
  if (action.type === 'CREATE') {
    console.log('ACTION: ', action)
    return [...state, { content: action.data.content, id: action.data.id, votes: 0 }]
  }
  if (action.type === 'INIT') {
    console.log('INIT KÄYNTIIN')
    return action.data
  }

  return state
}


export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const anecdoteVote = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}



export default anecdoteReducer