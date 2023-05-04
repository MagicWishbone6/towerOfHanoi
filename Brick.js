export class Brick {
    constructor(id, originTower) {
        this.isSelected = false,
        this.id = id
        this.div = document.querySelector(`#${id}`)
        this.originTower = originTower
    }

    isOnTop() {
        if (this.div.parentElement.children[0] === this.div) {
            return true
        } else {
            return false
        }
    }
}