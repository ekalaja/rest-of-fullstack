import React from 'react'
import { newFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.newFilter(event.target.value)
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}


const ConnectedFilter = connect(
  null,
  { newFilter }
)(Filter)


export default ConnectedFilter
