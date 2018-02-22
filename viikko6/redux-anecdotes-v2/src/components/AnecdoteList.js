import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import Filter from './Filter'


class AnecdoteList extends React.Component {

  anecdotesToShow(anecdotess, filter) {
    const anecdotes = anecdotess.filter(anecdote => anecdote.content.includes(filter))
    return (anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() =>
            this.props.store.dispatch(anecdoteVote(anecdote.id))
          }>
            vote
          </button>
        </div>
      </div>
    ))

  }
  render() {
    const { anecdotes , filter } = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store}/>
        {this.anecdotesToShow(anecdotes, filter)}
      </div>
    )
  }
}

export default AnecdoteList
