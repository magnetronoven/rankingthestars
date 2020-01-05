const fs = require("fs")

module.exports = (pageName) => {
    const app = document.getElementById("app")
    const newPageContent = fs.readFileSync("./pages/" + pageName + "/index.html",'utf8')

    app.innerHTML = ""
    app.innerHTML = newPageContent
    
    require("./pages/" + pageName + "/index.js")()
}