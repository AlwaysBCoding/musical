import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import StaffRenderer from './renderers/StaffRenderer'
import TabRenderer from './renderers/TabRenderer'

import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to ReactJS</h2>
          <StaffRenderer />
          <TabRenderer />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
