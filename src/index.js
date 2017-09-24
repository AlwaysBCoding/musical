import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import StaffRenderer from './renderers/StaffRenderer'
import TabRenderer from './renderers/TabRenderer'
import FretboardRenderer from './renderers/FretboardRenderer'

import './styles/App.css';

class App extends Component {

  componentDidMount() {
    // this.SR = new StaffRenderer(document.querySelector('svg.renderTarget'))
    // this.SR.setTimeSignature(4, 4)
    this.FR = new FretboardRenderer(document.querySelector("div.tgt"), {tuning: ["E", "A", "G", "D", "B", "E"]})
    this.FR.renderGuitar({direction: "lefty"})
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="tgt"></div>
          {/*<button onClick={(event) => { this.buttonClick1(event) }}>BUTTON 1</button>*/}
          {/*<svg width="1000" height="500" style={{background: "#bbbbbb"}} className="renderTarget">
          </svg>*/}
        </div>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
