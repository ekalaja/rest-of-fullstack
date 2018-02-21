import React from 'react'


class App extends React.Component {

  statistiikka() {
    const values = this.props.store.getState()
    if (values['sumOfAll'] < 1) {
      return (
        <div>
          <h2>statistiikka</h2>
          <div>ei yhtään palautetta annettu</div>
        </div>
      )
    } else {
      return (
        <div>
          <h2>statistiikka</h2>
          <table>
            <tbody>
            <tr>
              <td>hyvä</td>
              <td>{this.props.store.getState()['good']}</td>
            </tr>
            <tr>
              <td>neutraali</td>
              <td>{this.props.store.getState()['ok']}</td>
            </tr>
            <tr>
              <td>huono</td>
              <td>{this.props.store.getState()['bad']}</td>
            </tr>
            <tr>
              <td>hyviä</td>
              <td>{100*this.props.store.getState()['good']/this.props.store.getState()['sumOfAll']} %</td>
            </tr>
            </tbody>
          </table>

          <button onClick={this.klik('ZERO')}>nollaa tilasto</button>
        </div >
      )
    }
  }


  klik = (nappi) => () => {
    this.props.store.dispatch({ type: nappi})
  }

  render() {
    return (
      <div>
        {this.statistiikka()}

        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
      </div>
    )
  }
}

export default App
