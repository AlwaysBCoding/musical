import _ from 'lodash'

const SUPERSCRIPT_MAPPINGS = {
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹"
}

class MusicDecorator {

  static spaceAfter(note) {
    if(note.length === 1) {
      return `  `
    } else if (note.length === 2) {
      return ` `
    }
  }

  static displayScale(scale) {
    var displayString = ""
    displayString += "[ "
    _.each(scale, (note, index) => {
      displayString += `${note}${SUPERSCRIPT_MAPPINGS[index + 1]}${this.spaceAfter(note)}`
    })
    displayString += "]"
    return displayString
  }

  static displayNote(note, {context}) {
    switch(context) {
      case "standard":
        if(note.length === 1) {
          return note
        } else {
          return `${note.split('')[0]}#`
        }
      case "analyze":
        return note
      default:
        if(note.length === 1) {
          return note
        } else {
          return `${note.split('')[0]}#`
        }
    }
  }

}

export default MusicDecorator
