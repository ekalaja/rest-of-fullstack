import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import Filter from './Filter'
import { connect } from 'react-redux'


/*class AnecdoteList extends React.Component {*/

const AnecdoteList = (props) => {
  /*console.log('ennen mapstateToProps lisaysta, ei ymmärtänyt sorttia??? näytti kuitenkin arraylta',props.anecdotes)
  const anecdotes = anecdotess.filter(anecdote => anecdote.content.includes(filter))*/
  const kukka = props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() =>
          props.anecdoteVote(anecdote.id)
        }>
          vote
        </button>
      </div>
    </div>
  )
  return (
    <div>
      <Filter/>
      <div>{kukka}</div>
    </div>)
}
/*
  render() {
    const { anecdotes , filter } = this.props
    console.log('props:', this.props)
    console.log('fILTER', filter)
    */
/*
*/
const anecdotesToShow = (anecdotes, filter) => {
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
  return filteredAnecdotes
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