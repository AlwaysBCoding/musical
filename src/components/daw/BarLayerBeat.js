import React, { Component } from 'react'

class BarLayerBeat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      trigger: false
    }
  }

  _triggerBeat() {
    this.setState({ trigger: true })
    this.props.eventEmitter.emit("trigger-beat", {layerIndex: this.props.layerIndex, beatIndex: this.props.beatIndex})
  }

  _untriggerBeat() {
    this.setState({ trigger: false })
    this.props.eventEmitter.emit("untrigger-beat", {layerIndex: this.props.layerIndex, beatIndex: this.props.beatIndex})
  }

  render() {
    var triggerClass, currentBeatClass, triggerFunction;
    if(this.state.trigger) {
      triggerClass = 'trigger';
      triggerFunction = this._untriggerBeat
    } else {
      triggerClass = 'no-trigger';
      triggerFunction = this._triggerBeat
    }

    if(this.props.currentAudioInterval && (this.props.currentBeat === this.props.beatIndex)) {
      currentBeatClass = 'current-beat'
    } else {
      currentBeatClass = ''
    }

    return (
      <div
        className={`daw-component bar-layer-beat ${triggerClass} ${currentBeatClass}`}
        onClick={triggerFunction.bind(this)}>
        <p className="beat-number">{this.props.beatIndex + 1}</p>
      </div>
    )
  }

}

export default BarLayerBeat
