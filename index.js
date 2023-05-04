import { reload } from "./utilities.js"
import { resetButton } from "./elements.js";
import { Brick } from "./Brick.js";
import { Tower } from "./Tower.js";

resetButton.addEventListener("click", reload, false);

const brick1 = new Brick('brick1', 'tower1')
const brick2 = new Brick('brick2', 'tower2')
const brick3 = new Brick('brick3', 'tower3')

const brickDivs = [brick1.div, brick2.div, brick3.div]
const bricks = [brick1, brick2, brick3]

let selectedBrick = null
let selectedBrickDiv = null

const tower1 = new Tower('tower1')
const tower2 = new Tower('tower2')
const tower3 = new Tower('tower3')

const towerDivs = [tower1.div, tower2.div, tower3.div]

function selectBrick() {
    if (selectedBrickDiv) {
        brickDivs.forEach(div => div.style.borderColor = "crimson")
        bricks.forEach(brick => {
            brick.isSelected = false
        })
        selectedBrickDiv = null
        selectedBrick = null
    } else {
        this.style.borderColor = "orange"
        selectedBrickDiv = this
        bricks.forEach(brick => {
            if (brick.id === selectedBrickDiv.id) {
                brick.isSelected = true
                brick.originTower = selectedBrickDiv.parentElement.id
                selectedBrick = brick
            }
        })
    }
}

function moveBrick() {
    let destinationTowerBricks = this.children
    let oldTop = destinationTowerBricks[0]
    if (selectedBrickDiv) {
        if (brickDivs.indexOf(selectedBrickDiv) < brickDivs.indexOf(oldTop) || destinationTowerBricks.length === 0) {
            const allBricksInTower = [...document.getElementById(`${selectedBrick.originTower}`).children]
            let brickAndBricksAboveIt = allBricksInTower.slice(0, allBricksInTower.indexOf(selectedBrickDiv) + 1)

            brickAndBricksAboveIt.forEach(brick => {
                if (brickDivs.indexOf(brick) <= brickDivs.indexOf(oldTop)) {
                    for (let i = brickAndBricksAboveIt.length - 1; i >= 0; i--) {
                        oldTop = this.children[0]
                        this.insertBefore(brickAndBricksAboveIt[i], oldTop)
                    }
                } else if (destinationTowerBricks.length === 0) {
                    for (let i = 0; i < brickAndBricksAboveIt.length; i++) {
                        this.appendChild(brickAndBricksAboveIt[i])
                    }
                }
            })
            checkWin([...this.children])
        }
    }
}

function checkWin(towerContents) {
    let win = false
    if (towerContents.length === brickDivs.length) {
        for (let i = 0; i < towerContents.length; i++) {
            if (towerContents[i] !== brickDivs[i]) {
                break
            } else if (i === towerContents.length - 1 && towerContents[i] === brickDivs[i]) {
                win = true
            }
        }
    }
    if (win === true) {
        setTimeout(() => alert('You win!'), 150)
        console.log('win')
    }
}

brickDivs.forEach(div => div.addEventListener("click", selectBrick))
towerDivs.forEach(div => div.addEventListener("click", moveBrick))

// \(*^_^*)/