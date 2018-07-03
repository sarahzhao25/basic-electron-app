import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
const instanceLocator = 'v1:us1:8e7525cf-01c7-4e5a-81c2-1ca635184af1';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      currentRoom: {},
      messages: []
    };
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    const chatkit = new ChatManager({
      instanceLocator: instanceLocator,
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/8e7525cf-01c7-4e5a-81c2-1ca635184af1/token`
      })
    });

    chatkit
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        console.log('You are connected to ChatKit!');
        return currentUser.subscribeToRoom({
          roomId: 10850627,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(console.error);
  }

  onSend(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="wrapper">
        <div className="chat">
          <MessageList messages={messages}/>
          <SendMessageForm onSend={this.onSend} />
        </div>
      </div>
    )
  }
}

export default Chat;
