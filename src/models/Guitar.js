import React from 'react'
import _ from 'lodash'
import ScalesData from '../data/scales.json'
import ChordsData from '../data/chords.json'
import MusicDecorator from '../decorators/MusicDecorator'

const NOTES_MANIFEST = ["C", "CD", "D", "DE", "E", "F", "FG", "G", "GA", "A", "AB", "B"]
const ALL_SCALES = ScalesData
const ALL_CHORDS = ChordsData

class Guitar {

  constructor({tuning}) {
    this.tuning = tuning
  }

  // CLASS METHODS
  // =====================
  static standardTuning() {
    // Calling Open String Fret 0
    return [
      {frets: [
        {fretIndex: 0, note: "E", frequency: 82},
        {fretIndex: 1, note: "F", frequency: 87},
        {fretIndex: 2, note: "FG", frequency: 92},
        {fretIndex: 3, note: "G", frequency: 98},
        {fretIndex: 4, note: "GA", frequency: 104},
        {fretIndex: 5, note: "A", frequency: 110},
        {fretIndex: 6, note: "AB", frequency: 117},
        {fretIndex: 7, note: "B", frequency: 123},
        {fretIndex: 8, note: "C", frequency: 131},
        {fretIndex: 9, note: "CD", frequency: 139},
        {fretIndex: 10, note: "D", frequency: 147},
        {fretIndex: 11, note: "DE", frequency: 156},
        {fretIndex: 12, note: "E", frequency: 165},
        {fretIndex: 13, note: "F", frequency: 175},
        {fretIndex: 14, note: "FG", frequency: 185},
        {fretIndex: 15, note: "G", frequency: 196},
        {fretIndex: 16, note: "GA", frequency: 208},
        {fretIndex: 17, note: "A", frequency: 220},
        {fretIndex: 18, note: "AB", frequency: 233},
        {fretIndex: 19, note: "B", frequency: 247},
        {fretIndex: 20, note: "C", frequency: 262}
      ]},
      {frets: [
        {fretIndex: 0, note: "A", frequency: 110},
        {fretIndex: 1, note: "AB", frequency: 117},
        {fretIndex: 2, note: "B", frequency: 123},
        {fretIndex: 3, note: "C", frequency: 131},
        {fretIndex: 4, note: "CD", frequency: 139},
        {fretIndex: 5, note: "D", frequency: 147},
        {fretIndex: 6, note: "DE", frequency: 156},
        {fretIndex: 7, note: "E", frequency: 165},
        {fretIndex: 8, note: "F", frequency: 175},
        {fretIndex: 9, note: "FG", frequency: 185},
        {fretIndex: 10, note: "G", frequency: 196},
        {fretIndex: 11, note: "GA", frequency: 208},
        {fretIndex: 12, note: "A", frequency: 220},
        {fretIndex: 13, note: "AB", frequency: 233},
        {fretIndex: 14, note: "B", frequency: 247},
        {fretIndex: 15, note: "C", frequency: 262},
        {fretIndex: 16, note: "CD", frequency: 277},
        {fretIndex: 17, note: "D", frequency: 294},
        {fretIndex: 18, note: "DE", frequency: 311},
        {fretIndex: 19, note: "E", frequency: 330},
        {fretIndex: 20, note: "F", frequency: 349}
      ]},
      {frets: [
        {fretIndex: 0, note: "D", frequency: 147},
        {fretIndex: 1, note: "DE", frequency: 156},
        {fretIndex: 2, note: "E", frequency: 165},
        {fretIndex: 3, note: "F", frequency: 175},
        {fretIndex: 4, note: "FG", frequency: 185},
        {fretIndex: 5, note: "G", frequency: 196},
        {fretIndex: 6, note: "GA", frequency: 208},
        {fretIndex: 7, note: "A", frequency: 220},
        {fretIndex: 8, note: "AB", frequency: 233},
        {fretIndex: 9, note: "B", frequency: 247},
        {fretIndex: 10, note: "C", frequency: 262},
        {fretIndex: 11, note: "CD", frequency: 277},
        {fretIndex: 12, note: "D", frequency: 294},
        {fretIndex: 13, note: "DE", frequency: 311},
        {fretIndex: 14, note: "E", frequency: 330},
        {fretIndex: 15, note: "F", frequency: 349},
        {fretIndex: 16, note: "FG", frequency: 370},
        {fretIndex: 17, note: "G", frequency: 392},
        {fretIndex: 18, note: "GA", frequency: 415},
        {fretIndex: 19, note: "A", frequency: 440},
        {fretIndex: 20, note: "AB", frequency: 466}
      ]},
      {frets: [
        {fretIndex: 0, note: "G", frequency: 196},
        {fretIndex: 1, note: "GA", frequency: 208},
        {fretIndex: 2, note: "A", frequency: 220},
        {fretIndex: 3, note: "AB", frequency: 233},
        {fretIndex: 4, note: "B", frequency: 247},
        {fretIndex: 5, note: "C", frequency: 262},
        {fretIndex: 6, note: "CD", frequency: 277},
        {fretIndex: 7, note: "D", frequency: 294},
        {fretIndex: 8, note: "DE", frequency: 311},
        {fretIndex: 9, note: "E", frequency: 330},
        {fretIndex: 10, note: "F", frequency: 349},
        {fretIndex: 11, note: "FG", frequency: 370},
        {fretIndex: 12, note: "G", frequency: 392},
        {fretIndex: 13, note: "GA", frequency: 415},
        {fretIndex: 14, note: "A", frequency: 440},
        {fretIndex: 15, note: "AB", frequency: 466},
        {fretIndex: 16, note: "B", frequency: 494},
        {fretIndex: 17, note: "C", frequency: 523},
        {fretIndex: 18, note: "CD", frequency: 554},
        {fretIndex: 19, note: "D", frequency: 587},
        {fretIndex: 20, note: "DE", frequency: 622}
      ]},
      {frets: [
        {fretIndex: 0, note: "B", frequency: 247},
        {fretIndex: 1, note: "C", frequency: 262},
        {fretIndex: 2, note: "CD", frequency: 277},
        {fretIndex: 3, note: "D", frequency: 294},
        {fretIndex: 4, note: "DE", frequency: 311},
        {fretIndex: 5, note: "E", frequency: 330},
        {fretIndex: 6, note: "F", frequency: 349},
        {fretIndex: 7, note: "FG", frequency: 370},
        {fretIndex: 8, note: "G", frequency: 392},
        {fretIndex: 9, note: "GA", frequency: 415},
        {fretIndex: 10, note: "A", frequency: 440},
        {fretIndex: 11, note: "AB", frequency: 466},
        {fretIndex: 12, note: "B", frequency: 494},
        {fretIndex: 13, note: "C", frequency: 523},
        {fretIndex: 14, note: "CD", frequency: 554},
        {fretIndex: 15, note: "D", frequency: 587},
        {fretIndex: 16, note: "DE", frequency: 622},
        {fretIndex: 17, note: "E", frequency: 659},
        {fretIndex: 18, note: "F", frequency: 698},
        {fretIndex: 19, note: "FG", frequency: 740},
        {fretIndex: 20, note: "G", frequency: 784}
      ]},
      {frets: [
        {fretIndex: 0, note: "E", frequency: 330},
        {fretIndex: 1, note: "F", frequency: 349},
        {fretIndex: 2, note: "FG", frequency: 370},
        {fretIndex: 3, note: "G", frequency: 392},
        {fretIndex: 4, note: "GA", frequency: 415},
        {fretIndex: 5, note: "A", frequency: 440},
        {fretIndex: 6, note: "AB", frequency: 466},
        {fretIndex: 7, note: "B", frequency: 494},
        {fretIndex: 8, note: "C", frequency: 523},
        {fretIndex: 9, note: "CD", frequency: 554},
        {fretIndex: 10, note: "D", frequency: 587},
        {fretIndex: 11, note: "DE", frequency: 622},
        {fretIndex: 12, note: "E", frequency: 659},
        {fretIndex: 13, note: "F", frequency: 698},
        {fretIndex: 14, note: "FG", frequency: 740},
        {fretIndex: 15, note: "G", frequency: 784},
        {fretIndex: 16, note: "GA", frequency: 831},
        {fretIndex: 17, note: "A", frequency: 880},
        {fretIndex: 18, note: "AB", frequency: 932},
        {fretIndex: 19, note: "B", frequency: 988},
        {fretIndex: 20, note: "C", frequency: 1047}
      ]}
    ]
  }

  static chordSearch(chordName) {
    return _.find(ALL_CHORDS, (chord) => {
      return (`${chord.root}${chord.chordType}` == chordName)
    })
  }

  // static generateFretboardForString({openString, numberOfFrets=21}) {
  //   var rootIndex = _.indexOf(NOTES_MANIFEST, openString)
  //   var frets = []
  //   _.times(numberOfFrets, (fretIndex) => {
  //     frets.push(NOTES_MANIFEST[(rootIndex + (fretIndex + 1)) % 12])
  //   })
  //   return {
  //     "openString": openString,
  //     "frets": frets
  //   }
  // }

  // static generateFretboard(openString) {
  //   var rootIndex = _.indexOf(NOTES_MANIFEST, openString)
  //   return {
  //     "openString": openString,
  //     "frets": [
        // NOTES_MANIFEST[(rootIndex + 1) % 12],
        // NOTES_MANIFEST[(rootIndex + 2) % 12],
        // NOTES_MANIFEST[(rootIndex + 3) % 12],
        // NOTES_MANIFEST[(rootIndex + 4) % 12],
        // NOTES_MANIFEST[(rootIndex + 5) % 12],
        // NOTES_MANIFEST[(rootIndex + 6) % 12],
        // NOTES_MANIFEST[(rootIndex + 7) % 12],
        // NOTES_MANIFEST[(rootIndex + 8) % 12],
        // NOTES_MANIFEST[(rootIndex + 9) % 12],
        // NOTES_MANIFEST[(rootIndex + 10) % 12],
        // NOTES_MANIFEST[(rootIndex + 11) % 12],
        // NOTES_MANIFEST[(rootIndex + 12) % 12],
        // NOTES_MANIFEST[(rootIndex + 13) % 12],
        // NOTES_MANIFEST[(rootIndex + 14) % 12],
        // NOTES_MANIFEST[(rootIndex + 15) % 12],
        // NOTES_MANIFEST[(rootIndex + 16) % 12],
        // NOTES_MANIFEST[(rootIndex + 17) % 12],
        // NOTES_MANIFEST[(rootIndex + 18) % 12],
        // NOTES_MANIFEST[(rootIndex + 19) % 12],
        // NOTES_MANIFEST[(rootIndex + 20) % 12],
        // NOTES_MANIFEST[(rootIndex + 21) % 12]
  //     ]
  //   }
  // }

  // static generateScale(rootNote, {scaleType}) {
  //   var scale
  //   var rootIndex = _.indexOf(NOTES_MANIFEST, rootNote)
  //
  //   switch(scaleType) {
  //     case "major":
  //       scale = [
  //         NOTES_MANIFEST[rootIndex],
  //         NOTES_MANIFEST[(rootIndex + 2) % 12],
  //         NOTES_MANIFEST[(rootIndex + 4) % 12],
  //         NOTES_MANIFEST[(rootIndex + 5) % 12],
  //         NOTES_MANIFEST[(rootIndex + 7) % 12],
  //         NOTES_MANIFEST[(rootIndex + 9) % 12],
  //         NOTES_MANIFEST[(rootIndex + 11) % 12],
  //         // NOTES_MANIFEST[(rootIndex + 12) % 12]
  //       ]
  //       break;
  //
  //     case "minor": // minor_natural
  //       scale = [
  //         NOTES_MANIFEST[rootIndex],
  //         NOTES_MANIFEST[(rootIndex + 2) % 12],
  //         NOTES_MANIFEST[(rootIndex + 3) % 12],
  //         NOTES_MANIFEST[(rootIndex + 5) % 12],
  //         NOTES_MANIFEST[(rootIndex + 7) % 12],
  //         NOTES_MANIFEST[(rootIndex + 8) % 12],
  //         NOTES_MANIFEST[(rootIndex + 10) % 12],
  //         // NOTES_MANIFEST[(rootIndex + 12) % 12]
  //       ]
  //       break;
  //
  //       // when :minor_harmonic
  //       //   return [
  //       //     @@notes[rootIndex],
  //       //     @@notes[(rootIndex + 2) % 12],
  //       //     @@notes[(rootIndex + 3) % 12],
  //       //     @@notes[(rootIndex + 5) % 12],
  //       //     @@notes[(rootIndex + 7) % 12],
  //       //     @@notes[(rootIndex + 8) % 12],
  //       //     @@notes[(rootIndex + 11) % 12],
  //       //     @@notes[(rootIndex + 12) % 12]
  //       //   ]
  //       //
  //       // when :mode_dorian
  //       //   return [
  //       //     @@notes[rootIndex],
  //       //     @@notes[(rootIndex + 2) % 12],
  //       //     @@notes[(rootIndex + 3) % 12],
  //       //     @@notes[(rootIndex + 5) % 12],
  //       //     @@notes[(rootIndex + 7) % 12],
  //       //     @@notes[(rootIndex + 9) % 12],
  //       //     @@notes[(rootIndex + 10) % 12],
  //       //     @@notes[(rootIndex + 12) % 12]
  //       //   ]
  //       //
  //       // when :mode_mixolydian
  //       //   return [
  //       //     @@notes[rootIndex],
  //       //     @@notes[(rootIndex + 2) % 12],
  //       //     @@notes[(rootIndex + 4) % 12],
  //       //     @@notes[(rootIndex + 5) % 12],
  //       //     @@notes[(rootIndex + 7) % 12],
  //       //     @@notes[(rootIndex + 9) % 12],
  //       //     @@notes[(rootIndex + 10) % 12],
  //       //     @@notes[(rootIndex + 12) % 12]
  //       //   ]
  //
  //     default:
  //       scale = []
  //   }
  //
  //   return {
  //     "rootNote": rootNote,
  //     "scale": scale
  //   }
  // }

  static scalesForNote(note) {
    return {
      "major": _.map(_.find(ALL_SCALES, {note, scaleType: "major"}).scale, (note) => { return MusicDecorator.displayNote(note, {context: "standard"})}),
      "minor": _.map(_.find(ALL_SCALES, {note, scaleType: "minor"}).scale, (note) => { return MusicDecorator.displayNote(note, {context: "standard"})})
    }
  }

  static findScales(notes) {
    var matches = []
    _.each(ALL_SCALES, (scale) => {
      if(_.difference(notes, scale.scale).length === 0) {
        matches.push(scale)
      }
    })
    return matches
  }

  // static findChords(notes) {
  //
  // }

  // INSTANCE METHODS
  // =====================
  findNotes(note) {
    var noteName = note.note
    var ALL_FRETS = _.map(_.reverse(this.tuning.slice()), (string) => { return string.frets })
    var PATCHED_FRETS = []
    _.each(ALL_FRETS, (string, stringIndex) => {
      _.each(string, (fret) => {
        PATCHED_FRETS.push(Object.assign(fret, {stringIndex: stringIndex}))
      })
    })
    return {
      startNote: note,
      matches: _.filter(PATCHED_FRETS, (fret) => { return fret.note === noteName })
    }
  }

  findKey(note, {keyName}) {
    var noteName = note.note
    var ALL_FRETS = _.map(_.reverse(this.tuning.slice()), (string) => { return string.frets })
    var PATCHED_FRETS = []
    _.each(ALL_FRETS, (string, stringIndex) => {
      _.each(string, (fret) => {
        PATCHED_FRETS.push(Object.assign(fret, {stringIndex: stringIndex}))
      })
    })

    var scale = []
    switch(keyName) {
      case "major":
        scale =  _.find(ALL_SCALES, {note: noteName, scaleType: "major"}).scale
        break;
      case "minor":
        scale = _.find(ALL_SCALES, {note: noteName, scaleType: "minor"}).scale
        break;
      case "majorPentatonic":
        scale =  _.reject(_.find(ALL_SCALES, {note: noteName, scaleType: "major"}).scale, (item, index) => { return index === 3 || index === 6 })
        break;
      case "minorPentatonic":
        scale =  _.reject(_.find(ALL_SCALES, {note: noteName, scaleType: "minor"}).scale, (item, index) => { return index === 1 || index === 5 })
        break;
      default:
        scale = [];
    }
    return {
      startNote: note,
      matches: _.filter(PATCHED_FRETS, (fret) => { return _.includes(scale, fret.note) })
    }
  }

}

export default Guitar
