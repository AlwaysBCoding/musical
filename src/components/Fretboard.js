import React, { Component } from 'react'
import Guitar from '../models/Guitar'
import _ from 'lodash'

class Fretboard extends Component {

  constructor(props) {
    super(props)
    this.tuning = props.tuning || ["E", "A", "D", "G", "B", "E"]
    this.direction = props.direction || "lefty"
    this.numberOfFrets = props.numberOfFrets || 21
  }

  _fretClick(e) {
    this.props.eventEmitter.emit("fretClick", {
      fretIndex: parseInt(e.target.dataset.fretIndex),
      stringIndex: parseInt(e.target.dataset.stringIndex),
      note: e.target.dataset.note
    })
  }

  _openStringClick(e) {
    this.props.eventEmitter.emit("openStringClick", {
      stringIndex: parseInt(e.target.dataset.stringIndex),
      note: e.target.dataset.note
    })
  }

  _renderFret({fret, fretIndex, stringIndex}) {
    var fretState
    if(_.some(this.props.activeFrets, {fretIndex, stringIndex})) {
      fretState = 'pressed'
    } else if (_.includes(this.props.activeNotes, fret)) {
      fretState = 'ghosted'
    } else {
      fretState = ''
    }

    return (
      <div onClick={(e) => { this._fretClick(e) }} key={`fret-${fretIndex}`} className={`fret fret-${fretIndex} ${fretState}`} data-note={fret} data-fret-index={fretIndex} data-string-index={stringIndex}>
        <p className={`note`} data-note={fret} data-fret-index={fretIndex} data-string-index={stringIndex}>{fret}</p>
      </div>
    )
  }

  _renderOpenString({openString, stringIndex}) {
    var stringState
    if(_.some(this.props.activeStrings, {stringIndex, note: openString})) {
      stringState = 'pressed'
    } else if (_.includes(this.props.activeNotes, openString)) {
      stringState = 'ghosted'
    } else {
      stringState = ''
    }

    return (
      <div
        key={`open-string-${stringIndex}`}
        className={`open-string open-string-${stringIndex} ${stringState}`}
        onClick={(e) => { this._openStringClick(e) }}
        data-note={openString}
        data-string-index={stringIndex}>
        <p className={`open-string-note`} data-note={openString} data-string-index={stringIndex}>{openString}</p>
      </div>
    )
  }

  _renderString({openString, numberOfFrets, stringIndex}) {
    var string = Guitar.generateFretboardForString({openString, numberOfFrets})
    var OpenString = this._renderOpenString({openString, stringIndex})
    var Frets = []
    _.each(string.frets, (fret, fretIndex) => {
      Frets.push(this._renderFret({fret, fretIndex, stringIndex}))
    })
    return (
      <div key={`string-${stringIndex}`} className={`string string-${stringIndex}`}>
        {OpenString}
        {Frets}
      </div>
    )
  }

  render() {
    var Strings = []
    _.each(_.reverse(this.tuning.slice()), (string, index) => {
      Strings.push(this._renderString({openString: string, numberOfFrets: this.numberOfFrets, stringIndex: index}))
    })
    return (
      <div className={`fretboard ${this.direction}`}>
        {Strings}
      </div>
    )
  }

}

export default Fretboard
