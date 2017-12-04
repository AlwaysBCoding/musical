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
        {Beats}
      </div>
    )
  }

}

export default BarLayer
