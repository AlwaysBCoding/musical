import React, { Component } from 'react'
import BarLayer from '../components/daw/BarLayer'
import Instrument from '../components/daw/Instrument'
import BufferLoader from '../lib/audio/buffer-loader'

class DrumlineScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.kickBeats = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    this.snareBeats = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    this.clapBeats = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    this.audioContext = new AudioContext();
    this.bufferLoader = new BufferLoader(
      this.audioContext,
      [
        "./sounds/kick.wav",
        "./sounds/snare.wav",
        "./sounds/clap.wav"
      ],
      () => {}
    )
  }

  componentWillMount() {
    this.bufferLoader.load()

    this.props.eventEmitter.on("triggerBeat", ({instrument, beatIndex}) => {
      if(instrument.ident === "kick") { this.kickBeats[beatIndex] = true }
      if(instrument.ident === "snare") { this.snareBeats[beatIndex] = true }
      if(instrument.ident === "clap") { this.clapBeats[beatIndex] = true }
    })

    this.props.eventEmitter.on("untriggerBeat", ({instrument, beatIndex}) => {
      if(instrument.ident === "kick") { this.kickBeats[beatIndex] = false }
      if(instrument.ident === "snare") { this.snareBeats[beatIndex] = false }
      if(instrument.ident === "clap") { this.clapBeats[beatIndex] = false }
    })
  }

  _playDrumline(event) {
    var renderContext = this
    var playIndex = 0;
    setInterval(() => {
      if(renderContext.kickBeats[playIndex]) {
        var kick = renderContext.audioContext.createBufferSource()
        kick.buffer = this.bufferLoader.bufferList[0];
        kick.connect(this.audioContext.destination);
        kick.start()
      }
      if(renderContext.snareBeats[playIndex]) {
        var snare = renderContext.audioContext.createBufferSource()
        snare.buffer = this.bufferLoader.bufferList[1];
        snare.connect(this.audioContext.destination);
        snare.start()
      }
      if(renderContext.clapBeats[playIndex]) {
        var clap = renderContext.audioContext.createBufferSource()
        clap.buffer = this.bufferLoader.bufferList[2];
        clap.connect(this.audioContext.destination);
        clap.start()
      }
      playIndex++
      if(playIndex > 15) { playIndex = 0 }
    }, 125)
  }

  render() {
    return (
      <div className="screen drumline-screen">
        <BarLayer eventEmitter={this.props.eventEmitter} instrument={Instrument.kick()} />
        <br />
        <BarLayer eventEmitter={this.props.eventEmitter} instrument={Instrument.snare()} />
        <br />
        <BarLayer eventEmitter={this.props.eventEmitter} instrument={Instrument.clap()} />
        <br />
        <div
          className="play-button"
          onClick={this._playDrumline.bind(this)}>
          <p className="play-button-text">PLAY</p>
        </div>
      </div>
    )
  }

}

export default DrumlineScreen
