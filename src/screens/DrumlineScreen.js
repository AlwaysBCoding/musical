import React, { Component } from 'react'
import BarLayer from '../components/daw/BarLayer'
import Instrument from '../components/daw/Instrument'
import BufferLoader from '../lib/audio/buffer-loader'

var audioContext, bufferLoader;

function finishedLoading(bufferList) {
  var kick = audioContext.createBufferSource();
  var snare = audioContext.createBufferSource();
  var clap = audioContext.createBufferSource();
  kick.buffer = bufferList[0];
  snare.buffer = bufferList[1];
  clap.buffer = bufferList[2];

  kick.connect(audioContext.destination);
  snare.connect(audioContext.destination);
  clap.connect(audioContext.destination);
  kick.start();
  snare.start(2);
  clap.start(4);
}

function loadAndPlay() {
  audioContext = new AudioContext();
  bufferLoader = new BufferLoader(
    audioContext,
    [
      "./sounds/kick.wav",
      "./sounds/snare.wav",
      "./sounds/clap.wav"
    ],
    finishedLoading
  )

  bufferLoader.load()
}



class DrumlineScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  _playDrumline(event) {
    loadAndPlay();
  }

  render() {
    return (
      <div className="screen drumline-screen">
        <BarLayer instrument={Instrument.kick()} />
        <br />
        <BarLayer instrument={Instrument.snare()} />
        <br />
        <BarLayer instrument={Instrument.clap()} />
        <br />
        <div
          className="play-button"
          onClick={this._playDrumline}>
          <p className="play-button-text">PLAY</p>
        </div>
      </div>
    )
  }

}

export default DrumlineScreen
