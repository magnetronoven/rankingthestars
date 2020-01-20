module.exports = (data) => {
    return new Promise((resolve) => {

        let audio = new Audio(__dirname + "/../../assets/music/ping-sound.mp3");
        let timesClicked = 0

        const playerList = document.getElementsByClassName("player-list")[0]
        const answerList = document.getElementsByClassName("answer-list")[0]

        document.querySelector(".heading").innerHTML = data.question
        document.querySelector(".headtext .playing").innerHTML = data.playing
    
        for(let i = 0; i < Object.keys(data["answers"]).length; i++) {
            playerList.insertAdjacentHTML("beforeend", `<div class="player"><i class="fas fa-star"></i><span class="number">${i+1}.</span><span class="transparant player-name">${data["answers"][data["playing"]][i]}</span></div>`)
        }

        for(let i = 0; i < data.calculatedRanking.length; i++) {
            answerList.insertAdjacentHTML("beforeend", `<div class="player"><i class="fas fa-star"></i><span class="number">${i+1}.</span><span class="transparant player-name">${data.calculatedRanking[i]}</span></div>`)
        }
        
        const checkIfCorrectAnswer = (index) => {
            return playerList.children[index].getElementsByClassName("player-name")[0].innerHTML === answerList.children[index].getElementsByClassName("player-name")[0].innerHTML
        }

        const clickFunction = () => {
            timesClicked++

            if(timesClicked < (playerList.children.length + 1)) {

                // audio.play()
                playerList.children[playerList.children.length - timesClicked].children[2].style.opacity = "1"
                
            } else if (timesClicked < (playerList.children.length + answerList.children.length + 1)) {
                
                if(checkIfCorrectAnswer((answerList.children.length + playerList.children.length) - timesClicked)) {
                    answerList.children[(answerList.children.length + playerList.children.length) - timesClicked].classList.add("good")
                }
                
                // audio.play()
                answerList.children[(answerList.children.length + playerList.children.length) - timesClicked].children[2].style.opacity = "1"
            } else {
                window.removeEventListener("click", clickFunction)
                resolve()
            }

        }
    
        window.addEventListener("click", clickFunction)
    })
}