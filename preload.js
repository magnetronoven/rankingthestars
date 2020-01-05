// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const pageChanger = require("./pageChanger")
  pageChanger("home")

  document.getElementById("app").addEventListener("click", () => {pageChanger("test")})
})
