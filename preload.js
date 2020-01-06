// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const fs = require("fs")

window.addEventListener('DOMContentLoaded', () => {
  const pageChanger = require("./pageChanger")
  const contents = fs.readFileSync("./data/data.json")
  const gameData = JSON.parse(contents)
  console.log(gameData)

  const game = 0

  var gameName = Object.keys(gameData[game])[0]
  const question = gameData[game][gameName].questions[0]

  pageChanger("ranking", {})

  // document.getElementById("app").addEventListener("click", () => {pageChanger("test")})
})
