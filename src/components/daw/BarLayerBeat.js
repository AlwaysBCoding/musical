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
  }

  _untriggerBeat() {
    this.setState({ trigger: false })
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
