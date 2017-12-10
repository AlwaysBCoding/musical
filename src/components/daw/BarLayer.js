import React, { Component } from 'react'
import _ from 'lodash'
import BarLayerBeat from './BarLayerBeat'

class BarLayer extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.numberOfBeats = 16
  }

  _removeLayer(event) {
    this.props.eventEmitter.emit("remove-layer", {layerIndex: this.props.layerIndex})
  }

  render() {
    var Beats = []
    _.times(this.numberOfBeats, (index) => {
      Beats.push(
        <BarLayerBeat
          key={index}
          eventEmitter={this.props.eventEmitter}
          sound={this.props.sound}
          layerIndex={this.props.layerIndex}
          beatIndex={index}
          currentAudioInterval={this.props.currentAudioInterval}
          currentBeat={this.props.currentBeat} />
      )
    })

    return (
      <div className="daw-component bar-layer">
        <div className="sound">
          <p
            className="remove-layer"
            onClick={(event) => { this._removeLayer(event) }}>
          X
          </p>
          <p className="sound-display">{this.props.sound.display}</p>
        </div>
        <div className="beats">
          {Beats}
        </div>
      </div>
    )
  }

}

export default BarLayer
