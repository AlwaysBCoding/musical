import React, { Component } from 'react'
import _ from 'lodash'
import SoundsList from '../data/sounds.json'

class ToolsMenu extends Component {

  _addLayer(event, sound) {
    this.props.eventEmitter.emit('add-layer', {sound})
  }

  _updateAudioSettings(event) {
    this.props.eventEmitter.emit('update-audio-settings', {setting: "beatsPerMinute", value: event.target.value})
  }

  _play(event) {
    this.props.eventEmitter.emit('play', {})
  }

  _stop(event) {
    this.props.eventEmitter.emit('stop', {})
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
        <div className="settings">
          <div className="beats-per-minute">
            <input
              type="number"
              className="beats-per-minute-input"
              value={this.props.audioSettings.beatsPerMinute}
              onChange={(event) => {
                this._updateAudioSettings(event)
              }} />
          </div>
        </div>
        <div className="actions">
          <div
            className="button"
            onClick={(event) => { this._play(event) }}>
            <p>PLAY</p>
          </div>
          <div
            className="button"
            onClick={(event) => { this._stop(event) }}>
            <p>STOP</p>
          </div>
        </div>
        <div className="sounds">
          {Sounds}
        </div>
      </div>
    )
  }

}

export default ToolsMenu
