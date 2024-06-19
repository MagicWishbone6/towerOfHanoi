import { reload } from "./scripts/utilities.js"
import { resetButton, level1Button, level2Button, level3Button } from "./scripts/elements.js";
import { Brick } from "./scripts/Brick.js";
import { Tower } from "./scripts/Tower.js";

resetButton.addEventListener("click", reload, false);

let selectedBrick = null
let towerDivs = []
let bricks = []
let level = 1

function createTowerWithStartingBrick(number) {
    const tower = new Tower(number)
    const brick = new Brick(number, `tower${number}`)
    const towerDiv = tower.createDiv()
    brick.createDiv(towerDiv)
    bricks.push(brick)
    towerDivs.push(tower.div)
}

function createStartingTowers(amount) {
    for (let k = 1; k <= amount; k++) {
        createTowerWithStartingBrick(k)
    }
}

function setupLevel(level) {
    switch(level) {
        case 1:
            createStartingTowers(3)
            break
        case 2:
            createStartingTowers(4)
            break
        case 3:
            createStartingTowers(5)
            break
    }
    bricks.forEach(brick => brick.div.addEventListener("click", selectBrick))
    towerDivs.forEach(div => div.addEventListener("click", moveBrick))
}

function unSelectBrick() {
    bricks.forEach(brick => brick.unSelect())
    selectedBrick = null
}

function selectBrick() {
    if (selectedBrick) {
        unSelectBrick()
    } else {
        selectedBrick = bricks.find(brick => brick.id === this.id)
        selectedBrick.select()
    }
}

async function moveBrick() {
    const destinationTowerBricks = this.children
    let topBrick = bricks.find(brick => destinationTowerBricks[0].id === brick.id)
    if (selectedBrick) {
        if (selectedBrick.number < topBrick.number || destinationTowerBricks.length === 0) {
            const allBricksInOriginTower = [...document.getElementById(`${selectedBrick.originTower}`).children]
            let brickAndBricksAboveIt = allBricksInOriginTower.slice(0, allBricksInOriginTower.indexOf(selectedBrick.div) + 1)
            brickAndBricksAboveIt.forEach(brickElement => {
                const brick = bricks.find(brick => brick.id === brickElement.id)
                if (brick.number <= topBrick.number) {
                    for (let i = brickAndBricksAboveIt.length - 1; i >= 0; i--) {
                        this.insertBefore(brickAndBricksAboveIt[i], topBrick.div)
                        topBrick = bricks.find(brick => this.children[0].id === brick.id)
                    }
                } else if (destinationTowerBricks.length === 0) {
                    for (let i = 0; i < brickAndBricksAboveIt.length; i++) {
                        this.appendChild(brickAndBricksAboveIt[i])
                    }
                }
            })
            const handleWin = new Promise(res => {
                res(checkWin([...this.children]))
            })
            handleWin.then(res => {
                unSelectBrick()
                if (res) {
                    setTimeout(() => alert('You win!'), 150)
                }
            })
        }
    }
}

function checkWin(towerContents) {
    if (towerContents.length === bricks.length) {
        for (let i = 0; i < towerContents.length; i++) {
            if (towerContents[i] !== bricks[i].div) {
                return false
            } else if (i === towerContents.length - 1 && towerContents[i] === bricks[i].div) {
                return true
            }
        }
    } else {
        return false
    }
}

function changeLevel(newLevel) {
    clearBricksAndTowers()
    setupLevel(newLevel)
}

function clearBricksAndTowers() {
    let towers = document.getElementsByClassName('tower')
    while (towers[0]) {
        towers[0].parentNode.removeChild(towers[0])
    }
    towerDivs = []
    bricks = []
}

setupLevel(level)

level1Button.addEventListener("click", () => changeLevel(1))
level2Button.addEventListener("click", () => changeLevel(2))
level3Button.addEventListener("click", () => changeLevel(3))

// \(*^_^*)/