import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.props.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps,
  null
)(Notification)
export default ConnectedNotification


/* ALTERNATIVE
import React from 'react'
import { newNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {console.log('divissä mennään: ',props.notification)}
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: Notification(state)
  }
}

export default connect(
  mapStateToProps,
)(Notification)
 */