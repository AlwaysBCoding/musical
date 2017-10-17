import React, { Component } from 'react';
import _ from 'lodash'
import Guitar from '../models/Guitar'
import MusicDecorator from '../decorators/MusicDecorator'

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
      Note = <h2>{`${MusicDecorator.displayNote(pressed.note, {context: "standard"})} ${pressed.frequency}`}</h2>
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

export default Analysis
