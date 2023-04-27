import { reload } from "./utilities.js"
import { resetButton, tower1, tower2, tower3 } from "./elements.js"
import { Brick } from "./Brick.js";

resetButton.addEventListener("click", reload, false);

var brick1 = new Brick('brick1', 'tower1')
var brick2 = new Brick('brick2', 'tower2')
var brick3 = new Brick('brick3', 'tower3')

let brickDivs = [brick1.div, brick2.div, brick3.div]
let bricks = [brick1, brick2, brick3]

let selectedBrick = null

function selectBrick() {
    if (selectedBrick) {
        brickDivs.forEach(div => div.style.borderColor = "crimson")
        bricks.forEach(brick => {
            brick.isSelected = false
        })
        selectedBrick = null
    } else {
        this.style.borderColor = "orange"
        selectedBrick = this
        bricks.forEach(brick => {
            if (brick.id === selectedBrick.id) {
                brick.isSelected = true
                brick.originTower = this.parentElement.id
            }
        })
    }
}

function moveBrick() {
    let oldTop = this.children[0]
    if (selectedBrick) {
        if (brickDivs.indexOf(selectedBrick) < brickDivs.indexOf(oldTop) || this.children.length === 0) {
            if (selectedBrick.isOnTop === true) {
                if (this.children.length > 0) {
                    this.insertBefore(selectedBrick, oldTop)
                    bricks.forEach(brick => {
                        if (brick.id === oldTop.id) {
                            brick.isOnTop = false
                        }
                    })
                } else {
                    this.appendChild(selectedBrick)
                }
            } else {
                var allBricksInTower = []
                bricks.forEach(brick => {
                    if (brick.id === selectedBrick.id) {
                        allBricksInTower = document.getElementById(`${brick.originTower}`).children
                        allBricksInTower = [...allBricksInTower]
                    }
                })
                let brickAndBricksAboveIt = allBricksInTower.slice(0, allBricksInTower.indexOf(selectedBrick) + 1)

                brickAndBricksAboveIt.forEach(brick => {
                    if (brickDivs.indexOf(brick) <= brickDivs.indexOf(this.children[0])) {
                        for (let i = brickAndBricksAboveIt.length - 1; i >= 0; i--) {
                            this.insertBefore(brickAndBricksAboveIt[i], this.children[0])
                        }
                        bricks.forEach(brick => {
                            if (brick.id === oldTop.id) {
                                brick.isOnTop = false
                            }
                        })
                    } else if (this.children.length === 0) {
                        for (let i = 0; i < brickAndBricksAboveIt.length; i++) {
                            this.appendChild(brickAndBricksAboveIt[i])
                        }
                    }
                })
            }
        }
    }
}

brick1.div.addEventListener("click", selectBrick)
brick2.div.addEventListener("click", selectBrick)
brick3.div.addEventListener("click", selectBrick)

tower1.addEventListener("click", moveBrick)
tower2.addEventListener("click", moveBrick)
tower3.addEventListener("click", moveBrick)

// \(*^_^*)/