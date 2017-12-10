import React, { Component } from 'react'
import _ from 'lodash'
import BarLayer from '../components/daw/BarLayer'

class MainCanvas extends Component {

  render() {
    var BarLayers = []
    _.each(this.props.barLayers, (barLayer, index) => {
      BarLayers.push(
        <BarLayer
          key={`bar-layer-${index}`}
          layerIndex={index}
          eventEmitter={this.props.eventEmitter}
          sound={barLayer.sound} />
      )
    })

    return (
      <div className="main-canvas">
        {BarLayers}
      </div>
    )
  }

}

export default MainCanvas
