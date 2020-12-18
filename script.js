console.log("test")

/* TOWER OF HANOI GAME */

///// Towers /////
let tower1 = document.querySelector("#tower1")
let tower2 = document.querySelector("#tower2")
let tower3 = document.querySelector("#tower3")

///// Bricks /////
let brick1 = document.querySelector("#brick1")
let brick2 = document.querySelector("#brick2")
let brick3 = document.querySelector("#brick3")

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
        bricks.forEach((element) => element.style.borderColor = "crimson")
        selectionPresent = false
        selectedBrick = null
    } else {
        this.style.borderColor = "orange"
        selectionPresent = true
        selectedBrick = this
        console.log(`${selectedBrick.id} is selected`)
    }
    console.log(`selectionPresent is now ${selectionPresent}`)
}

// activate above with a click on a brick \(*^_^*)/
brick1.addEventListener("click", selectBrick)
brick2.addEventListener("click", selectBrick)
brick3.addEventListener("click", selectBrick)

///// Moving a Selected Brick /////

function testMe() {
    console.log(`I, ${this.id}, HAVE BEEN CLICKED`)
}

// click on a tower
tower1.addEventListener("click", testMe)
tower2.addEventListener("click", testMe)
tower3.addEventListener("click", testMe)


function moveBrick3() {
    this.appendChild(brick3)
    this.appendChild(brick1)
}

tower1.addEventListener("click", moveBrick3)