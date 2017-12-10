import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import _ from 'lodash'
import { EventEmitter } from 'events'

import BufferLoader from './lib/audio/buffer-loader'

import ToolsMenu from './components/ToolsMenu'
import MainCanvas from './components/MainCanvas'

import './styles/App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      audioSettings: {
        beatsPerMinute: 120
      },
      barLayers: [],
      currentAudioInterval: undefined,
      currentBeat: 0
    }
    this.eventEmitter = new EventEmitter()
    this.audioContext = new AudioContext();
    this.audioBuffer = new BufferLoader(
      this.audioContext,
      [],
      () => {}
    );
  }

  componentWillMount() {
    var renderContext = this

    this.eventEmitter.on('add-layer', ({sound}) => {

      var newBarLayers = this.state.barLayers
      newBarLayers.push(Object.assign(sound, {beats: new Array(16).fill(false) }))

      // Load sound into Audio Buffer
      renderContext.audioBuffer = new BufferLoader(
        renderContext.audioContext,
        _.map(newBarLayers, (sound) => { return sound.path }),
        () => {}
      )
      renderContext.audioBuffer.load()
      // =====================

      this.setState({
        barLayers: newBarLayers
      })

    })

    this.eventEmitter.on('remove-layer', ({layerIndex}) => {
      var newBarLayers = this.state.barLayers
      newBarLayers.splice(layerIndex, 1)

      // Load sound into Audio Buffer
      renderContext.audioBuffer = new BufferLoader(
        renderContext.audioContext,
        _.map(newBarLayers, (sound) => { return sound.path }),
        () => {}
      )
      renderContext.audioBuffer.load()
      // =====================

      this.setState({
        barLayers: newBarLayers
      })
    })

    this.eventEmitter.on('trigger-beat', ({layerIndex, beatIndex}) => {
      var newBarLayers = this.state.barLayers
      newBarLayers[layerIndex].beats[beatIndex] = true
      this.setState({
        barLayers: newBarLayers
      })
    })

    this.eventEmitter.on('untrigger-beat', ({layerIndex, beatIndex}) => {
      var newBarLayers = this.state.barLayers
      newBarLayers[layerIndex].beats[beatIndex] = false
      this.setState({
        barLayers: newBarLayers
      })
    })

    this.eventEmitter.on('update-audio-settings', ({setting, value}) => {
      var newAudioSettings = this.state.audioSettings
      newAudioSettings[setting] = value
      this.setState({
        audioSettings: newAudioSettings
      })
    })

    this.eventEmitter.on('play', ({}) => {
      var renderContext = this
      var intervalDelay = (1000.0 / (4 * (this.state.audioSettings.beatsPerMinute / 60.0)))
      var interval = setInterval(() => {
        _.each(this.state.barLayers, (barLayer, index) => {
          if(barLayer.beats[renderContext.state.currentBeat]) {
            var sound = renderContext.audioContext.createBufferSource()
            sound.buffer = renderContext.audioBuffer.bufferList[index]
            sound.connect(renderContext.audioContext.destination)
            sound.start()
          }
        })
        renderContext.setState({currentBeat: (renderContext.state.currentBeat + 1)})
        if(renderContext.state.currentBeat > 15) { renderContext.setState({currentBeat: 0}) }
      }, intervalDelay)
      this.setState({currentAudioInterval: interval})
    })

    this.eventEmitter.on('stop', ({}) => {
      clearInterval(this.state.currentAudioInterval);
      this.setState({
        currentAudioInterval: undefined,
        currentBeat: 0
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
            audioContext={this.audioContext}
            audioSettings={this.state.audioSettings} />
          <MainCanvas
            eventEmitter={this.eventEmitter}
            audioContext={this.audioContext}
            audioSettings={this.state.audioSettings}
            currentAudioInterval={this.state.currentAudioInterval}
            currentBeat={this.state.currentBeat}
            barLayers={this.state.barLayers} />
        </div>
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
