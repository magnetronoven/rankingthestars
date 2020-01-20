module.exports = (standings) => {
    return new Promise((resolve) => {
        console.log(standings)

        const playerContainer = document.querySelector(".player-container")

        for(let i = 0; i < standings.length; i++){
            playerContainer.insertAdjacentHTML("beforeend", `<div class="player flex"><div class="flex-item transparant"><i class="fas fa-star"></i><span class="number">${i+1}.</span><span class="player-name">${standings[i].player}</span></div><div class="flex-item transparant"><span class="player-points">${standings[i].value}</span></div></div>`)
        }

        function timeout(i) {
            setTimeout(() => {
                console.log(i)

                let elements = playerContainer.children[i].querySelectorAll(".transparant")

                elements.forEach(e => {
                    e.classList.remove("transparant")
                })

                if(i > 0){
                    timeout(i - 1)
                }

            }, 500)
        }

        timeout(playerContainer.childElementCount - 1)

        const clickFunction = () => {
            window.removeEventListener("click", clickFunction)
            resolve()
        }
    
        window.addEventListener("click", clickFunction)

    })
}