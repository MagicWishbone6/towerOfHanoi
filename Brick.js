export class Brick {
    constructor(id, originTower) {
        this.isSelected = false,
        this.isOnTop = true,
        this.id = id
        this.div = document.querySelector(`#${id}`)
        this.originTower = originTower
    }
}