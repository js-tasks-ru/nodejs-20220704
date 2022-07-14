import React, { Component, useEffect } from 'react';
import socketio from 'socket.io-client';

export default class Chat extends Component {
  componentDidMount() {
    this.client = socketio({
      extraHeaders: {
        authorization: 'token...'
      }
    });
  
    this.client.on('connect', () => console.log('connect'));
    this.client.on('connect_error', () => console.log('connect_error'));
    this.client.on('error', () => console.log('error'));
    this.client.on('reconnect', () => console.log('reconnect'));
  
    // '/api/matches/updates'
    // 'api-matches-update'

    this.client.on('server_user_message', msg => console.log('server_user_message', msg));
    this.client.on('server_system_message', msg => console.log('server_system_message', msg));

    this.client.on('server_user_typing', msg => console.log('server_user_typing', msg));

    this.client.on('lala', (cb) => {
      cb(Math.random());
    });
  }
  
  render() {
    return (
      <div>
        <h1>hi from chat component</h1>
        <input onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
        <button onClick={this.sendMessage.bind(this)}>send event</button>
      </div>
    );
  }

  onFocus() {
    this.client.emit('client_user_typing', true);
  }

  onBlur() {
    this.client.emit('client_user_typing', false);
  }
  
  sendMessage() {
    this.client.emit('client_user_message', 'hello world!');
  }
}
