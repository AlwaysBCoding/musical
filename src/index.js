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
import Analysis from './components/Analysis'
import SearchBar from './components/SearchBar'

import './styles/App.css';

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
