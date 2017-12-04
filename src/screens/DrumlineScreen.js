import React, { Component } from 'react'
import BarLayer from '../components/daw/BarLayer'
import Instrument from '../components/daw/Instrument'

class DrumlineScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="screen drumline-screen">
        <BarLayer instrument={Instrument.bassDrum()} />
        <br />
        <BarLayer instrument={Instrument.snareDrum()} />
      </div>
    )
  }

}

export default DrumlineScreen
