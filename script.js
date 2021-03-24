console.log("test")

/* TOWER OF HANOI GAME */

///// Towers /////
let tower1 = document.querySelector("#tower1")
let tower2 = document.querySelector("#tower2")
let tower3 = document.querySelector("#tower3")

///// Bricks /////

// let brick1 = document.querySelector("#brick1")
// let brick2 = document.querySelector("#brick2")
// let brick3 = document.querySelector("#brick3")

class Brick {
    constructor(id, originTower) {
        this.isSelected = false,
        this.isOnTop = true,
        this.id = id
        this.div = document.querySelector(`#${id}`)
        this.originTower = originTower
    }
}

var brick1 = new Brick('brick1', 'tower1')
var brick2 = new Brick('brick2', 'tower2')
var brick3 = new Brick('brick3', 'tower3')

// Array of all Brick Divs
let brickDivs = [brick1.div, brick2.div, brick3.div]

// Array of all Bricks
let bricks = [brick1, brick2, brick3]


///// Highlighting Selected Brick /////

// Each click on any brick will toggle boolean selectionPresent

let selectionPresent = false
let selectedBrick = null

// Highlight 1 brick on click
// Turn highlight OFF by clicking ANY brick
function selectBrick() {
    if (selectionPresent === true) {
        // de-selects if one is already selected
        brickDivs.forEach(div => div.style.borderColor = "crimson")
        bricks.forEach(brick => {
            brick.isSelected = false
        })
        selectionPresent = false
        selectedBrick = null
    } else {
        // selects if none others are selected
        this.style.borderColor = "orange"
        selectionPresent = true
        selectedBrick = this
        bricks.forEach(brick => {
            if (brick.id === selectedBrick.id) {
                brick.isSelected = true
                brick.originTower = this.parentElement.id

                // TEST //
                // console.log(`${brick.originTower} is set as ${brick.id}'s origin tower`)
            }
        })
        // TEST //
        // console.log(`${selectedBrick.id} is selected`)
    }
    // TEST //
    // console.log(`selectionPresent is now ${selectionPresent}`)
}

// activate above with a click on a brick \(*^_^*)/
brick1.div.addEventListener("click", selectBrick)
brick2.div.addEventListener("click", selectBrick)
brick3.div.addEventListener("click", selectBrick)

///// Moving a Selected Brick /////

// TEST //
function testMe() {
    console.log(`I, ${this.id}, HAVE BEEN CLICKED`)
}

// TEST //
// click on a tower
// tower1.addEventListener("click", testMe)
// tower2.addEventListener("click", testMe)
// tower3.addEventListener("click", testMe)

// move a brick

function moveBrick() {
    let oldTop = this.children[0]
    if (selectionPresent === true) {
        if (brickDivs.indexOf(selectedBrick) < brickDivs.indexOf(this.children[0]) || this.children.length === 0) {
            // if selected br has a smaller brick on top of it, move that br also.
            // only move brick if there is not a larger brick on top of it.
            if (selectedBrick.isOnTop === true) {
                if (this.children.length > 0) {
                    this.insertBefore(selectedBrick, oldTop)
                    // set isOnTop = true and set isOnTop for next child = false
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
                // TEST //
                // console.log(brickAndBricksAboveIt)

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

tower1.addEventListener("click", moveBrick)
tower2.addEventListener("click", moveBrick)
tower3.addEventListener("click", moveBrick)

