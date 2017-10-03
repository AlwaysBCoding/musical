import React from 'react'
import Guitar from '../models/Guitar'
import _ from 'lodash'

class FretboardRenderer {

  constructor(renderTarget, {tuning}) {
    this.renderTarget = renderTarget
    this.tuning = tuning
  }

  renderGuitar({direction}) {
    this.renderTarget.insertAdjacentHTML("beforeend", `<div class="fretboard ${direction}"></div>`)
    var fretboardTarget = document.querySelector(".fretboard")
    _.each(_.reverse(this.tuning), (string, index) => {
      this.renderString(fretboardTarget, {openString: string, stringIndex: index})
    })
    this.annotateFrets(fretboardTarget, {direction})
  }

  annotateFrets(renderTarget, {direction}) {
    renderTarget.insertAdjacentHTML("beforeend", `<div class='annotations'>
    <p>01</p>
    <p>02</p>
    <p>03</p>
    <p>04</p>
    <p>05</p>
    <p>06</p>
    <p>07</p>
    <p>08</p>
    <p>09</p>
    <p>10</p>
    <p>11</p>
    <p>12</p>
    <p>13</p>
    <p>14</p>
    <p>15</p>
    <p>16</p>
    <p>17</p>
    <p>18</p>
    <p>19</p>
    <p>20</p>
    <p>21</p>
    </div>`)
  }

  renderString(renderTarget, {openString, stringIndex}) {
    var fretboard = Guitar.generateFretboard(openString)

    renderTarget.insertAdjacentHTML("beforeend", `<div class='string string-${stringIndex}'></div>`)
    var stringTarget = document.querySelector(`.string-${stringIndex}`)

    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-1' data-note='${fretboard.frets[0]}'><p class='note' data-note='${fretboard.frets[0]}'>${fretboard.frets[0]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-2' data-note='${fretboard.frets[1]}'><p class='note' data-note='${fretboard.frets[1]}'>${fretboard.frets[1]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-3' data-note='${fretboard.frets[2]}'><p class='note' data-note='${fretboard.frets[2]}'>${fretboard.frets[2]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-4' data-note='${fretboard.frets[3]}'><p class='note' data-note='${fretboard.frets[3]}'>${fretboard.frets[3]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-5' data-note='${fretboard.frets[4]}'><p class='note' data-note='${fretboard.frets[4]}'>${fretboard.frets[4]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-6' data-note='${fretboard.frets[5]}'><p class='note' data-note='${fretboard.frets[5]}'>${fretboard.frets[5]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-7' data-note='${fretboard.frets[6]}'><p class='note' data-note='${fretboard.frets[6]}'>${fretboard.frets[6]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-8' data-note='${fretboard.frets[7]}'><p class='note' data-note='${fretboard.frets[7]}'>${fretboard.frets[7]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-9' data-note='${fretboard.frets[8]}'><p class='note' data-note='${fretboard.frets[8]}'>${fretboard.frets[8]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-10' data-note='${fretboard.frets[9]}'><p class='note' data-note='${fretboard.frets[9]}'>${fretboard.frets[9]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-11' data-note='${fretboard.frets[10]}'><p class='note' data-note='${fretboard.frets[10]}'>${fretboard.frets[10]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-12' data-note='${fretboard.frets[11]}'><p class='note' data-note='${fretboard.frets[11]}'>${fretboard.frets[11]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-13' data-note='${fretboard.frets[12]}'><p class='note' data-note='${fretboard.frets[12]}'>${fretboard.frets[12]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-14' data-note='${fretboard.frets[13]}'><p class='note' data-note='${fretboard.frets[13]}'>${fretboard.frets[13]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-15' data-note='${fretboard.frets[14]}'><p class='note' data-note='${fretboard.frets[14]}'>${fretboard.frets[14]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-16' data-note='${fretboard.frets[15]}'><p class='note' data-note='${fretboard.frets[15]}'>${fretboard.frets[15]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-17' data-note='${fretboard.frets[16]}'><p class='note' data-note='${fretboard.frets[16]}'>${fretboard.frets[16]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-18' data-note='${fretboard.frets[17]}'><p class='note' data-note='${fretboard.frets[17]}'>${fretboard.frets[17]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-19' data-note='${fretboard.frets[18]}'><p class='note' data-note='${fretboard.frets[18]}'>${fretboard.frets[18]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-20' data-note='${fretboard.frets[19]}'><p class='note' data-note='${fretboard.frets[19]}'>${fretboard.frets[19]}</p></div>`)
    stringTarget.insertAdjacentHTML("beforeend", `<div class='fret fret-21' data-note='${fretboard.frets[20]}'><p class='note' data-note='${fretboard.frets[20]}'>${fretboard.frets[20]}</p></div>`)
  }

}

export default FretboardRenderer
