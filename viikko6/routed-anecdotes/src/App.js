import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, Media } from 'react-bootstrap'
import turing from'./Alan_Turing_Aged_16.jpg';


const Menu = () => {
  const menuBoxStyle =  {
    backgroundColor: 'lightBlue',
    padding: '10px',
    border: '5px solid gray',
    margin: '0'
  }
  const menuStyle={
    fontWeight: 'bold',
    color: 'blue',
    backgroundColor: 'lightBlue'
  }
  return (
    <div style={menuBoxStyle}>
      <NavLink exact activeStyle={menuStyle} to="/">anecdotes</NavLink> &nbsp;
      <NavLink exact activeStyle={menuStyle} to="/create">create new</NavLink> &nbsp;
      <NavLink exact activeStyle={menuStyle} to="/about">about</NavLink> &nbsp;
    </div>)
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      <ListGroup>

      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <ListGroupItem>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </ListGroupItem>
        </li>)}
      </ListGroup>
    </ul>  
  </div>
)

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see &nbsp;
        <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
    )
}

const Notification = ({message}) => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    border: 'solid',
    paddingLeft: '30px',
  }
  return (
    <div style={footerStyle}>
      <h3>{message}</h3>
    </div>
  )
}



const About = () => (
  <Grid>
    <Row className="show-grid">
      <Col xs={12} md={8}>
        <code>
          <h2>About anecdote app</h2>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </code>

      </Col>
      <Col xs={6} md={4}>
        <code>
          <Media>
            <Media.Right>
                <img style={{maxWidth:"100%",
                  objectFit: "contain",
                  maxHeight:"100%"}} src={turing} alt="Alan Turing"/>
            </Media.Right>
          </Media>
        </code>
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {

    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
    this.newNotification('a new anecdote ' + anecdote.content + ' created')
  }

  newNotification = (message) => {
    this.setState({
      notification: message,
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) => {
    return(
      this.state.anecdotes.find(a => Number(a.id) === Number(id))
    )
  }

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div>
        <h1>Software anecdotes</h1>
        {this.state.notification === '' ? null : <Notification message={this.state.notification}/>}
        <Router>
          <div>
          <Menu />
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew}/>} />
            <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;