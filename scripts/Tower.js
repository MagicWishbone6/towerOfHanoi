import { createElement } from "./utilities.js"
import { game } from './elements.js'

export class Tower {
    constructor(number) {
        this.div = null
        this.id = `tower${number}`
        this.number = number
    }

    createDiv() {
        const towerDiv = createElement(this.number, 'tower')
        game.appendChild(towerDiv)
        this.div = document.querySelector(`#${this.id}`)
        return towerDiv
    }
}