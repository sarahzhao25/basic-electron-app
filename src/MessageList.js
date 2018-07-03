import React, { Component } from 'react';
import {
  ListView,
  ListViewSection,
  ListViewSectionHeader,
  ListViewRow,
  Text
} from 'react-desktop/macOs';

class MessageList extends Component {
  renderItem(message) {
    return (
      <ListView key={message.id}>
        <Text color="#414141" size="13" bold>
          {message.sender.name}:
        </Text>
        <Text color="#414141" size="13">
          {message.text}
        </Text>
      </ListView>
    )
  }

  render() {
    const { messages } = this.props;
    return (
      <ListView>
        <ListViewSection>
          {messages.map((message, index) => this.renderItem(message)
          )}
        </ListViewSection>
      </ListView>
    )
  }
}

export default MessageList;
