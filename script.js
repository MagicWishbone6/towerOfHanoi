console.log("test")

/* TOWER OF HANOI GAME */

///// Towers
let tower1 = document.querySelector("#tower1")
let tower2 = document.querySelector("#tower2")
let tower3 = document.querySelector("#tower3")

///// Bricks
let brick1 = document.querySelector("#brick1")
let brick2 = document.querySelector("#brick2")
let brick3 = document.querySelector("#brick3")

// Highlight a brick on click
brick1.addEventListener("click", () => brick1.style.borderColor = "orange")
brick2.addEventListener("click", () => brick1.style.borderColor = "orange")
brick3.addEventListener("click", () => brick1.style.borderColor = "orange")
