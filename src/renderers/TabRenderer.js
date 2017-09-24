// import React from 'react'

class TabRenderer {

  constructor(renderTarget) {
    this.renderTarget = renderTarget
  }

  renderEmptyFrets() {
    this.renderTarget.insertAdjacentHTML("beforeend", '<line x1="0" y1="110" x2="1000" y2="110" style="stroke:rgb(0,0,255);stroke-width:2" />')
    this.renderTarget.insertAdjacentHTML("beforeend", '<line x1="0" y1="120" x2="1000" y2="120" style="stroke:rgb(0,0,255);stroke-width:2" />')
    this.renderTarget.insertAdjacentHTML("beforeend", '<line x1="0" y1="130" x2="1000" y2="130" style="stroke:rgb(0,0,255);stroke-width:2" />')
    this.renderTarget.insertAdjacentHTML("beforeend", '<line x1="0" y1="140" x2="1000" y2="140" style="stroke:rgb(0,0,255);stroke-width:2" />')
    this.renderTarget.insertAdjacentHTML("beforeend", '<line x1="0" y1="150" x2="1000" y2="150" style="stroke:rgb(0,0,255);stroke-width:2" />')
    this.renderTarget.insertAdjacentHTML("beforeend", '<line x1="0" y1="160" x2="1000" y2="160" style="stroke:rgb(0,0,255);stroke-width:2" />')
  }

}

export default TabRenderer
