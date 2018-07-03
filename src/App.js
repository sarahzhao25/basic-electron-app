import React, { Component } from 'react';
import UsernameForm from './UsernameForm';
import Chat from './Chat';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUsername: null,
      currentId: null,
      currentScreen: 'usernameForm'
    };
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          currentId: data.id,
          currentUsername: data.name,
          currentScreen: 'chat'
        })
      })
      .catch(console.error);
  }

  render() {
    let { currentScreen, currentId } = this.state;
    if (currentScreen === 'usernameForm') {
      return  <UsernameForm handleSubmit={this.onUsernameSubmitted} />
    }
    if (currentScreen === 'chat') {
      return <Chat currentId={ currentId } />
    }
  }
}

export default App;
