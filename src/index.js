import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { EventEmitter } from 'events'
import _ from 'lodash'

import ViewContainer from './components/ViewContainer'

import Guitar from './models/Guitar'
import StaffRenderer from './renderers/StaffRenderer'
import TabRenderer from './renderers/TabRenderer'
import FretboardRenderer from './renderers/FretboardRenderer'
import Fretboard from './components/Fretboard'

import './styles/App.css';

class Analysis extends Component {
  render() {
    var chord, scale, relative, relativeScaleType, dominant, subdominant, cousins
    if(this.props.analysis[0]) {
      chord = <h2>{`CHORD: ${this.props.analysis[0].note} ${this.props.analysis[0].scaleType}`}</h2>
      scale = <h2>{`SCALE: ${this.props.analysis[0].scale}`}</h2>
      if(this.props.analysis[0].scaleType === "major" ) { relativeScaleType = 'minor' } else { relativeScaleType = 'major' }
      relative = <h2>{`RELATIVE: ${this.props.analysis[0].scale[5]} ${relativeScaleType}`}</h2>
      dominant = <h2>{`DOMINANT: ${this.props.analysis[0].scale[4]}`}</h2>
      subdominant = <h2>{`SUBDOMINANT: ${this.props.analysis[0].scale[3]}`}</h2>
    }
    return (
      <div className="analysis">
        {chord}
        {scale}
        {relative}
        {dominant}
        {subdominant}
        {cousins}
      </div>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pressed: [],
      ghosted: [],
      analysis: {},
    }
  }

  componentWillMount() {
    this.eventEmitter = new EventEmitter()

    // FRETCLICK
    this.eventEmitter.addListener("fretPress", ({fretIndex, stringIndex, note, frequency}) => {
      var pressedFrets = this.state.pressed
      pressedFrets.push({fretIndex, stringIndex, note, frequency})
      this.setState({
        pressed: pressedFrets
      })
    })

    this.eventEmitter.addListener("fretUnpress", ({fretIndex, stringIndex, note, frequency}) => {
      var pressedFrets = this.state.pressed
      _.remove(pressedFrets, (item) => { return (item.fretIndex === fretIndex && item.stringIndex === stringIndex)})
      this.setState({
        pressed: pressedFrets
      })
    })

  }

  componentDidMount() {
    // this.SR = new StaffRenderer(document.querySelector('svg.renderTarget'))
    // this.SR.setTimeSignature(4, 4)
    // this.FR = new FretboardRenderer(document.querySelector("div.tgt"), {tuning: ["E", "A", "D", "G", "B", "E"]})
    // this.FR.renderGuitar({direction: "lefty"})
    window.Guitar = Guitar
  }

  _clearState() {
    this.setState({
      pressed: [],
      ghosted: [],
      analysis: {}
    })
  }

  _showKey() {
    // this.setState({
    //   activeNotes: this.state.analysis[0].scale
    // })
  }

  render() {
    return (
      <div className="App">
        <div className="view-container">
          <Analysis analysis={this.state.analysis} />
          <p>{JSON.stringify(this.state.pressed)}</p>
          <div className="tgt">
            <Fretboard
              eventEmitter={this.eventEmitter}
              pressed={this.state.pressed}
              ghosted={this.state.ghosted}
              analysis={this.state.analysis} />
          </div>
          <button onClick={(event) => { this._clearState(event) }}>CLEAR STATE</button>
          <button onClick={(event) => { this._showKey(event) }}>SHOW KEY</button>
        </div>
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
