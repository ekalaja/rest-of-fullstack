const anecdotesAtStart = []

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

/*const initialState = anecdotesAtStart.map(asObject)*/

const anecdoteReducer = (state = [], action) => {
  if (action.type==='VOTE') {
    const old = state.filter(a => a.id !==action.id)
    const voted = state.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 } ]
  }
  if (action.type === 'CREATE') {
    console.log('ACTION: ', action)
    return [...state, { content: action.data.content, id: action.data.id, votes: 0 }]
  }

  return state
}

/*const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
  case 'VOTE':
    const old = state.filter(a => a.id !==action.id)
    const voted = state.find(a => a.id === action.id)
    return [...old, { ...voted, votes: voted.votes+1 } ]

  case 'CREATE':
    return [...state, action.data]
  case 'INITIATION':
    return action.data
  case 'default':
    return state
  }
  return state
}*/



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

/*export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_NOTES',
    data
  }
}*/


export default anecdoteReducer