import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { newNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'


class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    /* HUOM! ilman this.props. alkua käyttää suoraan importtia, jossa ei dispatchia*/
    this.props.anecdoteCreation(content)
    this.props.newNotification(content)
    setTimeout(() => {
      this.props.newNotification('')
    }, 5000)
    e.target.anecdote.value = ''
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
