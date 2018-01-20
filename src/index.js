import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// import _ from 'lodash'
import { EventEmitter } from 'events'

import BufferLoader from './lib/audio/buffer-loader'

import SpotifyAPI from './services/SpotifyAPI'

import './styles/App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.eventEmitter = new EventEmitter()
    this.audioContext = new AudioContext();
    this.audioBuffer = new BufferLoader(
      this.audioContext,
      [],
      () => {}
    );
  }

  componentWillMount() {
    window.SpotifyAPI = SpotifyAPI
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <div className="view-container">
          <h1>HELLO THO</h1>
        </div>
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
