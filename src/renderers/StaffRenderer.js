// import React from 'react'

class StaffRenderer {

  constructor(renderTarget) {
    this.renderTarget = renderTarget
    this.renderWidth = renderTarget.width.baseVal.value
  }

  setTimeSignature(beatsPerMeasure, timeSignatureNote) {
    this.beatsPerMeasure = 4
    this.timeSignatureNote = 4
  }

  renderEmptyStaff() {
    this.renderTarget.insertAdjacentHTML("beforeend", '<line x1="0" y1="10" x2="1000" y2="10" style="stroke:rgb(255,0,0);stroke-width:2" />')
    this.renderTarget.insertAdjacentHTML("beforeend", '<line x1="0" y1="20" x2="1000" y2="20" style="stroke:rgb(255,0,0);stroke-width:2" />')
    this.renderTarget.insertAdjacentHTML("beforeend", '<line x1="0" y1="30" x2="1000" y2="30" style="stroke:rgb(255,0,0);stroke-width:2" />')
    this.renderTarget.insertAdjacentHTML("beforeend", '<line x1="0" y1="40" x2="1000" y2="40" style="stroke:rgb(255,0,0);stroke-width:2" />')
    this.renderTarget.insertAdjacentHTML("beforeend", '<line x1="0" y1="50" x2="1000" y2="50" style="stroke:rgb(255,0,0);stroke-width:2" />')

    this.renderTarget.insertAdjacentHTML("beforeend", '<text x="0" y="80" font-family="Verdana" font-size="35">♩</text>')
  }

}

export default StaffRenderer
