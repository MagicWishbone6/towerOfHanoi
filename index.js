import { createElement, reload } from "./scripts/utilities.js"
import { resetButton, level1Button, level2Button, level3Button } from "./scripts/elements.js";
import { Brick } from "./scripts/Brick.js";
import { Tower } from "./scripts/Tower.js";

resetButton.addEventListener("click", reload, false);

let selectedBrick = null
let selectedBrickDiv = null

let brickDivs = []
let towerDivs = []
let bricks = []

let level = 1

function createTowerWithStartingBrick(key) {
    const game = document.querySelector('#game')
    const towerDiv = createElement(key, 'tower')
    const brickDiv = createElement(key, 'brick')
    const label = createElement(key, 'label')
    brickDiv.appendChild(label)
    towerDiv.appendChild(brickDiv)
    game.appendChild(towerDiv)
    const towerId = `tower${key}`
    const brickId = `brick${key}`
    const brick = new Brick(brickId, towerId)
    const tower = new Tower(towerId)
    bricks.push(brick)
    brickDivs.push(brick.div)
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
    brickDivs.forEach(div => div.addEventListener("click", selectBrick))
    towerDivs.forEach(div => div.addEventListener("click", moveBrick))
}

function unSelectBrick() {
    bricks.forEach(brick => brick.removeSelection())
    selectedBrickDiv = null
    selectedBrick = null
}

function selectBrick() {
    if (selectedBrickDiv) {
        unSelectBrick()
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

async function moveBrick() {
    const destinationTowerBricks = this.children
    let oldTop = destinationTowerBricks[0]
    if (selectedBrickDiv) {
        if (brickDivs.indexOf(selectedBrickDiv) < brickDivs.indexOf(oldTop) || destinationTowerBricks.length === 0) {
            const allBricksInOriginTower = [...document.getElementById(`${selectedBrick.originTower}`).children]
            let brickAndBricksAboveIt = allBricksInOriginTower.slice(0, allBricksInOriginTower.indexOf(selectedBrickDiv) + 1)

            brickAndBricksAboveIt.forEach(brick => {
                if (brickDivs.indexOf(brick) <= brickDivs.indexOf(oldTop)) {
                    for (let i = brickAndBricksAboveIt.length - 1; i >= 0; i--) {
                        this.insertBefore(brickAndBricksAboveIt[i], oldTop)
                        oldTop = this.children[0]
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
    if (towerContents.length === brickDivs.length) {
        for (let i = 0; i < towerContents.length; i++) {
            if (towerContents[i] !== brickDivs[i]) {
                return false
            } else if (i === towerContents.length - 1 && towerContents[i] === brickDivs[i]) {
                return true
            }
        }
    } else {
        return false
    }
}

function changeLevel(newLevel) {
    clearBricksAndTowers()
    level = newLevel
    setupLevel(level)
}

function changeToLevel2() {
    changeLevel(2)
}

function changeToLevel3() {
    changeLevel(3)
}

function changeToLevel1() {
    changeLevel(1)
}

function clearBricksAndTowers() {
    let towers = document.getElementsByClassName('tower')
    while (towers[0]) {
        towers[0].parentNode.removeChild(towers[0])
    }
    brickDivs = []
    towerDivs = []
    bricks = []
}

setupLevel(level)

level1Button.addEventListener("click", changeToLevel1)
level2Button.addEventListener("click", changeToLevel2)
level3Button.addEventListener("click", changeToLevel3)

// \(*^_^*)/