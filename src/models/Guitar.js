import React from 'react'
import _ from 'lodash'
import ScalesData from '../data/scales.json'

const NOTES_MANIFEST = ["C", "CD", "D", "DE", "E", "F", "FG", "G", "GA", "A", "AB", "B"]
const ALL_SCALES = ScalesData

class Guitar {

  static generateFretboardForString({openString, numberOfFrets=21}) {
    var rootIndex = _.indexOf(NOTES_MANIFEST, openString)
    var frets = []
    _.times(numberOfFrets, (fretIndex) => {
      frets.push(NOTES_MANIFEST[(rootIndex + (fretIndex + 1)) % 12])
    })
    return {
      "openString": openString,
      "frets": frets
    }
  }

  static generateFretboard(openString) {
    var rootIndex = _.indexOf(NOTES_MANIFEST, openString)
    return {
      "openString": openString,
      "frets": [
        NOTES_MANIFEST[(rootIndex + 1) % 12],
        NOTES_MANIFEST[(rootIndex + 2) % 12],
        NOTES_MANIFEST[(rootIndex + 3) % 12],
        NOTES_MANIFEST[(rootIndex + 4) % 12],
        NOTES_MANIFEST[(rootIndex + 5) % 12],
        NOTES_MANIFEST[(rootIndex + 6) % 12],
        NOTES_MANIFEST[(rootIndex + 7) % 12],
        NOTES_MANIFEST[(rootIndex + 8) % 12],
        NOTES_MANIFEST[(rootIndex + 9) % 12],
        NOTES_MANIFEST[(rootIndex + 10) % 12],
        NOTES_MANIFEST[(rootIndex + 11) % 12],
        NOTES_MANIFEST[(rootIndex + 12) % 12],
        NOTES_MANIFEST[(rootIndex + 13) % 12],
        NOTES_MANIFEST[(rootIndex + 14) % 12],
        NOTES_MANIFEST[(rootIndex + 15) % 12],
        NOTES_MANIFEST[(rootIndex + 16) % 12],
        NOTES_MANIFEST[(rootIndex + 17) % 12],
        NOTES_MANIFEST[(rootIndex + 18) % 12],
        NOTES_MANIFEST[(rootIndex + 19) % 12],
        NOTES_MANIFEST[(rootIndex + 20) % 12],
        NOTES_MANIFEST[(rootIndex + 21) % 12]
      ]
    }
  }

  static generateScale(rootNote, {scaleType}) {
    var scale
    var rootIndex = _.indexOf(NOTES_MANIFEST, rootNote)

    switch(scaleType) {
      case "major":
        scale = [
          NOTES_MANIFEST[rootIndex],
          NOTES_MANIFEST[(rootIndex + 2) % 12],
          NOTES_MANIFEST[(rootIndex + 4) % 12],
          NOTES_MANIFEST[(rootIndex + 5) % 12],
          NOTES_MANIFEST[(rootIndex + 7) % 12],
          NOTES_MANIFEST[(rootIndex + 9) % 12],
          NOTES_MANIFEST[(rootIndex + 11) % 12],
          // NOTES_MANIFEST[(rootIndex + 12) % 12]
        ]
        break;

      case "minor": // minor_natural
        scale = [
          NOTES_MANIFEST[rootIndex],
          NOTES_MANIFEST[(rootIndex + 2) % 12],
          NOTES_MANIFEST[(rootIndex + 3) % 12],
          NOTES_MANIFEST[(rootIndex + 5) % 12],
          NOTES_MANIFEST[(rootIndex + 7) % 12],
          NOTES_MANIFEST[(rootIndex + 8) % 12],
          NOTES_MANIFEST[(rootIndex + 10) % 12],
          // NOTES_MANIFEST[(rootIndex + 12) % 12]
        ]
        break;

        // when :minor_harmonic
        //   return [
        //     @@notes[rootIndex],
        //     @@notes[(rootIndex + 2) % 12],
        //     @@notes[(rootIndex + 3) % 12],
        //     @@notes[(rootIndex + 5) % 12],
        //     @@notes[(rootIndex + 7) % 12],
        //     @@notes[(rootIndex + 8) % 12],
        //     @@notes[(rootIndex + 11) % 12],
        //     @@notes[(rootIndex + 12) % 12]
        //   ]
        //
        // when :mode_dorian
        //   return [
        //     @@notes[rootIndex],
        //     @@notes[(rootIndex + 2) % 12],
        //     @@notes[(rootIndex + 3) % 12],
        //     @@notes[(rootIndex + 5) % 12],
        //     @@notes[(rootIndex + 7) % 12],
        //     @@notes[(rootIndex + 9) % 12],
        //     @@notes[(rootIndex + 10) % 12],
        //     @@notes[(rootIndex + 12) % 12]
        //   ]
        //
        // when :mode_mixolydian
        //   return [
        //     @@notes[rootIndex],
        //     @@notes[(rootIndex + 2) % 12],
        //     @@notes[(rootIndex + 4) % 12],
        //     @@notes[(rootIndex + 5) % 12],
        //     @@notes[(rootIndex + 7) % 12],
        //     @@notes[(rootIndex + 9) % 12],
        //     @@notes[(rootIndex + 10) % 12],
        //     @@notes[(rootIndex + 12) % 12]
        //   ]

      default:
        scale = []
    }

    return {
      "rootNote": rootNote,
      "scale": scale
    }
  }

  static findScales(notes) {
    var uniqueNotes = _.uniq(notes)
    switch(uniqueNotes.length) {
      case 3:
        return _.filter(ALL_SCALES, (scale) => {
          return _.isEqual(_.sortBy(uniqueNotes), _.sortBy([scale.scale[0], scale.scale[2], scale.scale[4]]))
        })
        break;
      case 7:
        return _.filter(ALL_SCALES, (scale) => {
          return _.isEqual(_.sortBy(uniqueNotes), _.sortBy(scale.scale))
        })
        break;
      default:
        return []
        break;
    }
  }

}

export default Guitar
