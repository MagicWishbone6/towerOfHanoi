export class Brick {
    constructor(id, originTower) {
        this.isSelected = false,
        this.id = id
        this.div = document.querySelector(`#${id}`)
        this.originTower = originTower
    }
}