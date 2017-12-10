import React, { Component } from 'react'
import BarLayer from '../components/daw/BarLayer'
import Instrument from '../components/daw/Instrument'
import BufferLoader from '../lib/audio/buffer-loader'

class DrumlineScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      beatsPerMinute: 120
    }
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
    this.currentAudioInterval = undefined
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
    var intervalDelay = (1000.0 / (4 * (this.state.beatsPerMinute / 60.0)))
    var interval = setInterval(() => {
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
    }, intervalDelay)
    this.currentAudioInterval = interval
  }

  _stopDrumline(event) {
    clearInterval(this.currentAudioInterval)
  }

  handleChange(event) {
    this.setState({beatsPerMinute: event.target.value})
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
        <br />
        <div
          className="stop-button"
          onClick={this._stopDrumline.bind(this)}>
          <p className="stop-button-text">STOP</p>
        </div>
        <br />
        <div className="beats-per-minute">
          <input
            type="number"
            className="beats-per-minute-input"
            value={this.state.beatsPerMinute}
            onChange={(event) => { this.handleChange(event) }} />
        </div>
      </div>
    )
  }

}

export default DrumlineScreen
