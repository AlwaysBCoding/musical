import React, { Component } from 'react'
import BarLayer from '../components/daw/BarLayer'

class DrumlineScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="screen drumline-screen">
        <BarLayer />
      </div>
    )
  }

}

export default DrumlineScreen
