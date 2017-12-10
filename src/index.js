import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import _ from 'lodash'
import { EventEmitter } from 'events'

import ToolsMenu from './components/ToolsMenu'
import MainCanvas from './components/MainCanvas'

import './styles/App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      barLayers: []
    }
    this.eventEmitter = new EventEmitter()
    this.audioContext = new AudioContext();
  }

  componentWillMount() {
    this.eventEmitter.on('add-layer', ({sound}) => {
      var newBarLayers = this.state.barLayers
      newBarLayers.push({sound})
      this.setState({
        barLayers: newBarLayers
      })
    })

    this.eventEmitter.on('remove-layer', ({layerIndex}) => {
      var newBarLayers = this.state.barLayers
      newBarLayers.splice(layerIndex, 1)
      this.setState({
        barLayers: newBarLayers
      })
    })
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <div className="view-container">
          <ToolsMenu
            eventEmitter={this.eventEmitter}
            audioContext={this.audioContext} />
          <MainCanvas
            eventEmitter={this.eventEmitter}
            audioContext={this.audioContext}
            barLayers={this.state.barLayers} />
        </div>
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
