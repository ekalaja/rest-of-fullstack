import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

const voteClick = (props, anecdote) => {
  return () => {
    props.anecdoteVote(anecdote)
    props.notify(`you voted '${anecdote.content}'`, 4)
  }
}


const AnecdoteList = (props) => {
  const sortedList = props.anecdotes.map(anecdote =>
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
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.includes(filter))
    return filteredAnecdotes
  }
}

const mapStateToProps =  (state) => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { anecdoteVote,
    notify
  }
)(AnecdoteList)