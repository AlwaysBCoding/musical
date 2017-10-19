import React, { Component } from 'react'
import Guitar from '../models/Guitar'
import MusicDecorator from '../decorators/MusicDecorator'
import _ from 'lodash'

class Fretboard extends Component {

  constructor(props) {
    super(props)
    this.tuning = props.tuning || Guitar.standardTuning()
    this.orientation = props.orientation || "lefty"
  }

  _fretPress({event, fret, stringIndex}) {
    this.props.eventEmitter.emit("fretPress", {
      fretIndex: fret.fretIndex,
      stringIndex: stringIndex,
      note: fret.note,
      frequency: fret.frequency
    })
  }

  _fretUnpress({event, fret, stringIndex}) {
    this.props.eventEmitter.emit("fretUnpress", {
      fretIndex: fret.fretIndex,
      stringIndex: stringIndex,
      note: fret.note,
      frequency: fret.frequency
    })
  }

  _renderFret({fret, fretIndex, stringIndex}) {
    var fretState, clickFunction
    if(_.some(this.props.pressed, {fretIndex, stringIndex})) {
      fretState = 'pressed'
      clickFunction = this._fretUnpress
    } else if (_.some(this.props.ghosted, {fretIndex, stringIndex})) {
      fretState = 'ghosted'
      clickFunction= this._fretPress
    } else {
      fretState = ''
      clickFunction = this._fretPress
    }

    if(fret.index === 0) {
      // RENDER OPEN STRING
      return (
        <div onClick={(event) => { clickFunction.apply(this, [{event, fret, stringIndex}]) }} key={`fret-${fretIndex}`} className={`fret fret-${fretIndex} ${fretState}`} data-note={fret.note} data-fret-index={fretIndex} data-string-index={stringIndex}>
          <p className={`note`} data-note={fret.note} data-fret-index={fretIndex} data-string-index={stringIndex}>{fret.note}</p>
        </div>
      )
    } else {
      // RENDER FRET
      return (
        <div onClick={(event) => { clickFunction.apply(this, [{event, fret, stringIndex}]) }} key={`fret-${fretIndex}`} className={`fret fret-${fretIndex} ${fretState}`} data-note={fret.note} data-fret-index={fretIndex} data-string-index={stringIndex}>
          <p className={`note`} data-note={fret.note} data-fret-index={fretIndex} data-string-index={stringIndex}>{MusicDecorator.displayNote(fret.note, {context: "standard"})}</p>
        </div>
      )
    }
  }

  _renderString({frets, stringIndex}) {
    var Frets = []
    _.each(frets, (fret, fretIndex) => {
      Frets.push(this._renderFret({fret, fretIndex, stringIndex}))
    })
    return (
      <div key={`string-${stringIndex}`} className={`string string-${stringIndex}`}>
        {Frets}
      </div>
    )
  }

  render() {
    var Strings = []
    _.each(_.reverse(this.tuning.slice()), (string, stringIndex) => {
      Strings.push(this._renderString({frets: string.frets, stringIndex}))
    })
    return (
      <div className={`fretboard ${this.orientation}`}>
        {Strings}
      </div>
    )
  }

}

export default Fretboard
