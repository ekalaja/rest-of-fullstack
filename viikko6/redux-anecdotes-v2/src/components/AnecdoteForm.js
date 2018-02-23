import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { newNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'


class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    /* HUOM! ilman this.props. alkua käyttää suoraan importtia, jossa ei dispatchia*/
    const newAnecdote = await anecdoteService.createNew(content)
    this.props.anecdoteCreation(newAnecdote)
    this.props.newNotification(content)

    setTimeout(() => {
      this.props.newNotification('')
    }, 5000)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}
const ConnectedForm = connect(
  null,
  { anecdoteCreation,
    newNotification
  }
)(AnecdoteForm)
export default ConnectedForm
