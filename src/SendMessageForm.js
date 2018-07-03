import React, { Component } from 'react';
import { Button, TextInput } from 'react-desktop/macOs';

class SendMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSend(this.state.text);
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ text: e.target.value })
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  render() {
    const { text } = this.state;
    return (
      <div className="send-message-form-container">
        <form onSubmit={this.onSubmit} className="send-message-form">
          <TextInput
            type="text"
            onChange={this.onChange}
            value={text}
            className="message-input"
          />
          <Button color="blue" type="submit">
            Send
          </Button>
        </form>
      </div>
    )
  }
}

export default SendMessageForm;
