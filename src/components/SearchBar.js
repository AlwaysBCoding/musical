import React, { Component } from 'react'

class SearchBar extends Component {
  _handleKeyPress(event) {
    if(event.charCode === 13) {
      this.props.eventEmitter.emit("chordSearch", {chordName: event.target.value})
    }
  }

  render() {
    return (
      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Serch Here..."
          onKeyPress={(event) => { this._handleKeyPress(event) }} />
      </div>
    )
  }
}

export default SearchBar
