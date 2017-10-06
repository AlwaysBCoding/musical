import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { EventEmitter } from 'events'
import _ from 'lodash'

import ViewContainer from './components/ViewContainer'

import Guitar from './models/Guitar'
import MusicDecorator from './decorators/MusicDecorator'
import StaffRenderer from './renderers/StaffRenderer'
import TabRenderer from './renderers/TabRenderer'
import FretboardRenderer from './renderers/FretboardRenderer'
import Fretboard from './components/Fretboard'

import './styles/App.css';

class Analysis extends Component {
  render() {
    if(this.props.pressed.length === 0) {
      return (
        <div className="analysis">
        </div>
      )
    } else if (this.props.pressed.length === 1) {
      var Note, Major7Scale, Minor7Scale, Major5Scale, Minor5Scale
      var pressed = this.props.pressed[0]
      var scales = Guitar.scalesForNote(pressed.note)
      Note = <h2>{`${pressed.note} ${pressed.frequency}`}</h2>
      Major7Scale = <pre>{`MAJ7: ${MusicDecorator.displayScale(scales.major)}`}</pre>
      Minor7Scale = <pre>{`MIN7: ${MusicDecorator.displayScale(scales.minor)}`}</pre>
      Major5Scale = <pre>{`MAJ5: ${MusicDecorator.displayScale([scales.major[0], scales.major[1], scales.major[2], scales.major[4], scales.major[5]])}`}</pre>
      Minor5Scale = <pre>{`MIN5: ${MusicDecorator.displayScale([scales.minor[0], scales.minor[2], scales.minor[3], scales.minor[4], scales.minor[6]])}`}</pre>
      return (
        <div className="analysis">
          {Note}
          {Major7Scale}
          {Minor7Scale}
          {Major5Scale}
          {Minor5Scale}
        </div>
      )
    } else {
      var Chord
      var Scales = []

      var notes = _.map(this.props.pressed, (fret) => { return fret.note })
      var scales = Guitar.findScales(notes)

      _.each(scales, (scale) => {
        Scales.push(
          <pre key={`${scale.note}-${scale.scaleType}`}>{`${scale.note}${MusicDecorator.spaceAfter(scale.note)}${scale.scaleType}: ${MusicDecorator.displayScale(scale.scale)}`}</pre>
        )
      })

      return (
        <div className="analysis">
          {Scales}
        </div>
      )
    }
    // var chord, scale, relative, relativeScaleType, dominant, subdominant, cousins
    // if(this.props.analysis[0]) {
    //   chord = <h2>{`CHORD: ${this.props.analysis[0].note} ${this.props.analysis[0].scaleType}`}</h2>
    //   scale = <h2>{`SCALE: ${this.props.analysis[0].scale}`}</h2>
    //   if(this.props.analysis[0].scaleType === "major" ) { relativeScaleType = 'minor' } else { relativeScaleType = 'major' }
    //   relative = <h2>{`RELATIVE: ${this.props.analysis[0].scale[5]} ${relativeScaleType}`}</h2>
    //   dominant = <h2>{`DOMINANT: ${this.props.analysis[0].scale[4]}`}</h2>
    //   subdominant = <h2>{`SUBDOMINANT: ${this.props.analysis[0].scale[3]}`}</h2>
    // }
    // return (
    //   <div className="analysis">
    //     {chord}
    //     {scale}
    //     {relative}
    //     {dominant}
    //     {subdominant}
    //     {cousins}
    //   </div>
    // )
  }
}

class SearchBar extends Component {
  _handleKeyPress(event) {
    if(event.charCode === 13) {
      this.props.eventEmitter.emit("chordSearch", {chordName: event.target.value})
    }
  }

  render() {
    return (
      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Serch Here..."
          onKeyPress={(event) => { this._handleKeyPress(event) }} />
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

    this.eventEmitter.addListener("chordSearch", ({chordName}) => {
      var chord = Guitar.chordSearch(chordName)
      if(chord) {
        this.setState({
          pressed: chord.frets
        })
      }
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
          <SearchBar eventEmitter={this.eventEmitter} />
          <div className="main-content">
            <Analysis pressed={this.state.pressed} />
            <Fretboard
              eventEmitter={this.eventEmitter}
              pressed={this.state.pressed}
              ghosted={this.state.ghosted}
              analysis={this.state.analysis} />
          </div>
          <button onClick={(event) => { this._clearState(event) }}>CLEAR STATE</button>
          {/*<button onClick={(event) => { this._showKey(event) }}>SHOW KEY</button>*/}
        </div>
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
