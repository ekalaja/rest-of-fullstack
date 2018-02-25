import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const voteClick =  (props, anecdote) => {
  const votedAnecdote = { ...anecdote, votes: anecdote.votes +1 }
  return async () => { await anecdoteService.vote(anecdote.id, votedAnecdote)
    props.anecdoteVote(anecdote.id)}
}

const AnecdoteList = (props) => {
  const sortedList = props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={voteClick(props, anecdote)}>
          vote
        </button>
      </div>
    </div>
  )
  return (
    <div>
      <Filter/>
      <div>{sortedList}</div>
    </div>)
}

const anecdotesToShow = (anecdotes, filter) => {
  if (anecdotes.size === 0) {
    return anecdotes
  } else {
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
    return filteredAnecdotes
  }
}


const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}


export default connect(
  mapStateToProps,
  { anecdoteVote }
)(AnecdoteList)