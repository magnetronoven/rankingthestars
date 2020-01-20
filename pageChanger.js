const fs = require("fs")

module.exports = async (pageName, data = {}) => {
    const app = document.getElementById("app")
    const newPageContent = fs.readFileSync("./pages/" + pageName + "/index.html",'utf8')

    app.innerHTML = ""
    app.innerHTML = newPageContent
    
    return await require("./pages/" + pageName + "/index.js")(data)
}