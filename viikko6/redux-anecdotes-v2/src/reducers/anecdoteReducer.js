import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  if (action.type==='VOTE') {
    const old = state.filter(a => a.id !==action.anecdote.id)
    return [...old, action.anecdote]
    /*    return [...old, { ...voted, votes: voted.votes + 1 } ]
*/
  }
  if (action.type === 'CREATE') {
    return [...state, { content: action.data.content, id: action.data.id, votes: 0 }]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return state
}


/*export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}*/

export const anecdoteCreation = (data) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'CREATE',
      data: { ...anecdote, votes: 0 }
    })
  }
}

export const anecdoteVote = (data) => {
  return async (dispatch) => {
    const votedAnecdote = { ...data, votes: data.votes +1 }
    const anecdote = await anecdoteService.vote(data.id, votedAnecdote)
    dispatch({
      type: 'VOTE',
      anecdote
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}


export default anecdoteReducer