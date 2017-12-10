import React, { Component } from 'react'
import _ from 'lodash'
import SoundsList from '../data/sounds.json'

class ToolsMenu extends Component {

  _addLayer(event, sound) {
    this.props.eventEmitter.emit('add-layer', {sound})
  }

  render() {
    var Sounds = []
    _.each(SoundsList, (sound) => {
      Sounds.push(
        <div
          key={`sound-${sound.hash}`}
          className="sound button"
          onClick={(event) => { this._addLayer(event, sound) }}>
          <p>{sound.display}</p>
        </div>
      )
    })

    return (
      <div className="tools-menu">
        <div className="sounds">
          {Sounds}
        </div>
      </div>
    )
  }

}

export default ToolsMenu
