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
    this.props.eventEmitter.emit("triggerBeat", {sound: this.props.sound, beatIndex: this.props.beatIndex})
  }

  _untriggerBeat() {
    this.setState({ trigger: false })
    this.props.eventEmitter.emit("untriggerBeat", {sound: this.props.sound, beatIndex: this.props.beatIndex})
  }

  render() {
    var triggerClass, triggerFunction;
    if(this.state.trigger) {
      triggerClass = 'trigger';
      triggerFunction = this._untriggerBeat
    } else {
      triggerClass = 'no-trigger';
      triggerFunction = this._triggerBeat
    }

    return (
      <div
        className={`daw-component bar-layer-beat ${triggerClass}`}
        onClick={triggerFunction.bind(this)}>
        <p className="beat-number">{this.props.beatIndex + 1}</p>
      </div>
    )
  }

}

export default BarLayerBeat
