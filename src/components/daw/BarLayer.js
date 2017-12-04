import React, { Component } from 'react'
import _ from 'lodash'
import BarLayerBeat from './BarLayerBeat'

class BarLayer extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.numberOfBeats = 16
  }

  render() {
    var Beats = []
    _.times(this.numberOfBeats, (index) => {
      Beats.push(<BarLayerBeat key={index} beatIndex={index} />)
    })

    return (
      <div className="daw-component bar-layer">
        <div className="instrument">
          <p className="instrument-display">{this.props.instrument.display}</p>
        </div>
        <div className="beats">
          {Beats}
        </div>
      </div>
    )
  }

}

export default BarLayer
