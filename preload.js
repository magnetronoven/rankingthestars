// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const fs = require("fs")

window.addEventListener('DOMContentLoaded', async () => {
  	const pageChanger = require("./pageChanger")
  	const contents = fs.readFileSync("./data/data.json")
	const gameData = JSON.parse(contents)

	let game = 0
	let gameName = Object.keys(gameData[game])[0]
	
	for(let i = 0; i < Object.keys(gameData[game][gameName].questions).length; i++) {
		let questionName = Object.keys(gameData[game][gameName].questions)[i]
		let question = gameData[game][gameName].questions[questionName]
	
		question.calculatedRanking = calcRanking(question)
		question.question = questionName
		
		let standings = calcStanding(gameData[game][gameName])
		
		await pageChanger("ranking", question)
		await pageChanger("standing", standings)
	}
  
})

function sortResult( a, b ) {
	if ( a.value < b.value ){
		return -1;
	}
	if ( a.value > b.value ){
		return 1;
	}
	return 0;
}

function sortStanding( a, b ) {
	if ( a.value > b.value ){
		return -1;
	}
	if ( a.value < b.value ){
		return 1;
	}
	return 0;
}

const calcStanding = (game) => {

	let calculatedStandings = {}
	
	for(let i = 0; i < game.players.length; i++) {
		calculatedStandings[game.players[i]] = 0
	}

	
	Object.keys(game.questions).forEach(q => {
		for(let i = 0; i < Object.keys(game.questions[q].answers).length; i++) {
			for(let j = 0; j < game.questions[q].calculatedRanking.length; j++) {
				if(game.questions[q].calculatedRanking[j] === game.questions[q].answers[Object.keys(game.questions[q].answers)[i]][j]) {

					calculatedStandings[Object.keys(game.questions[q].answers)[i]] += 1
				}
			}
		}
	})

	return Object.entries(calculatedStandings).map(([key, value]) => ({"player": key,"value": value})).sort(sortStanding)
}


const calcRanking = (question) => {
  	let winningList = {}
  	const players = Object.keys(question["answers"])
	let isInList = false
	  
  	for(let i = 0; i < players.length; i++) {

    	for(let j = 0; j < question["answers"][players[i]].length; j++) {
      
      		if(isInList) {
        		winningList[question["answers"][players[i]][j]] += (j + 1)
      		} else{
        		winningList[question["answers"][players[i]][j]] = (j + 1)
			}
		}

		isInList = true
	}

	console.log(winningList)
	console.log(Object.entries(winningList).map(([key, value]) => ({"player": key,"value": value})).sort(sortResult).map(w => w.player))
	return Object.entries(winningList).map(([key, value]) => ({"player": key,"value": value})).sort(sortResult).map(w => w.player)
}