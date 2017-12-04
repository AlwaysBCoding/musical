import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { EventEmitter } from 'events'

import DrumlineScreen from './screens/DrumlineScreen'

import './styles/App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.eventEmitter = new EventEmitter()

    // NO EVENTS YET
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <div className="view-container">
          <DrumlineScreen eventEmitter={this.eventEmitter} />
        </div>
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
