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

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeFrets: [],
      activeStrings: [],
      activeNotes: [],
      analysis: {},
    }
  }

  componentWillMount() {
    this.eventEmitter = new EventEmitter()

    // FRETCLICK
    this.eventEmitter.addListener("fretClick", ({fretIndex, stringIndex, note}) => {
      var newFrets = this.state.activeFrets
      var newNotes = this.state.activeNotes
      newFrets.push({fretIndex, stringIndex, note})
      newNotes.push(note)
      this.setState({
        activeFrets: newFrets,
        activeNotes: _.uniq(newNotes),
        analysis: Guitar.findScales(_.uniq(newNotes))
      })
    })

    // OPENSTRINGCLICK
    this.eventEmitter.addListener("openStringClick", ({stringIndex, note}) => {
      var newStrings = this.state.activeStrings
      var newNotes = this.state.activeNotes
      newStrings.push({stringIndex, note})
      newNotes.push(note)
      this.setState({
        activeStrings: newStrings,
        activeNotes: _.uniq(newNotes),
        analysis: Guitar.findScales(_.uniq(newNotes))
      })
    })
  }

  componentDidMount() {
    // this.SR = new StaffRenderer(document.querySelector('svg.renderTarget'))
    // this.SR.setTimeSignature(4, 4)
    // this.FR = new FretboardRenderer(document.querySelector("div.tgt"), {tuning: ["E", "A", "D", "G", "B", "E"]})
    // this.FR.renderGuitar({direction: "lefty"})
    window.Guitar = Guitar

    // window.addEventListener("click", (event) => {
    //   var newNotes = this.state.notes
    //   if(event.target.dataset.note) {
    //     newNotes.push(event.target.dataset.note)
    //     this.setState({
    //       notes: newNotes,
    //       analysis: Guitar.findScales(newNotes)
    //     })
    //   }
    // })

  }

  _clearState() {
    this.setState({
      activeFrets: [],
      activeStrings: [],
      activeNotes: [],
      analysis: {}
    })
  }

  render() {
    return (
      <div className="App">
        <div className="view-container">
          <div className="tgt">
            <Fretboard
              eventEmitter={this.eventEmitter}
              activeFrets={this.state.activeFrets}
              activeStrings={this.state.activeStrings}
              analysis={this.state.analysis} />
          </div>
          <div className="frets">
            {JSON.stringify(this.state.activeFrets)}
          </div>
          <div className="strings">
            {JSON.stringify(this.state.activeStrings)}
          </div>
          <div className="analysis">
            {JSON.stringify(this.state.analysis)}
          </div>
          <button onClick={(event) => { this._clearState(event) }}>CLEAR STATE</button>
        </div>
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
