import { createElement } from "./utilities.js"
export class Brick {
    constructor(id, originTower) {
        this.isSelected = false,
        this.id = `brick${id}`
        this.div = null
        this.originTower = originTower
        this.number = id
    }

    createDiv(towerDiv) {
        const brickDiv = createElement(this.number, 'brick')
        const label = createElement(this.number, 'label')
        brickDiv.appendChild(label)
        towerDiv.appendChild(brickDiv)
        this.div = document.querySelector(`#${this.id}`)
        return brickDiv
    }

    unSelect() {
        this.div.style.borderColor = "crimson"
        this.isSelected = false
    }

    select() {
        this.div.style.borderColor = "orange"
        this.isSelected = true
        this.originTower = this.div.parentElement.id
    }
}