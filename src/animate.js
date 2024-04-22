	// Function to animate the game
function animate() {
	if (running) {
		// If game is running
		requestAnimationFrame(animate); // Request to animate the next frame
	}
	// update the state of the element
	updateBalloonsPosition()
	updateMonkeysPosition()
	updateArrowsPosition()
	updateAnimations()

	time++
	roundTime++
	
	var roundEnded = true
	if (roundTime >= 0) {
		for (let cluster of roundClusters) {
			const deploy = 
				cluster.count > 0 && roundTime >= cluster.start &&
				(roundTime - cluster.start) % cluster.rate == 0
			if (deploy) {
				cluster.count--
				addBalloon(cluster.type)
			}
			if (cluster.count > 0) {
				roundEnded = false
			}

		}
	} else {
		roundEnded = false
	}

	if (roundEnded && balloons.length == 0) {
		roundTime = -TIME_BETWEEN_ROUND
		currentRound++
		setupRound(currentRound)
	}

	printFrame()

}

setTimeout(() => {
	setupRound(currentRound)
}, 100)

function setupRound(round) {
	const roundData = ROUNDS_DATA[round-1]
	roundClusters = []
	for (let i in roundData) {
		const cluster = roundData[i]
		const start = cluster.start * FRAMES_IN_SECOND
		const end = cluster.end * FRAMES_IN_SECOND
		const rate = Math.floor((end - start) / cluster.count)
		const newCluster = {
			type: cluster.type,
			start,
			rate,
			count: cluster.count,
		}
		roundClusters.push(newCluster)
	}	
}

function printFrame() {
	clear() // Clear the canvas from the previous frame
	printBackground() // Print the background image
	// printTunnels()
	// print elements on screen
	printBalloons()
	printArrows()
	printMonkeys()
	printAnimations()
	printMenu()
	printCoins()
	if (printMenuMonkeyVar) { // if 0 then false
		printMenuMonkey()
	}


	// print upper layer stuff
	printMoneyHearts()
	gameOverCheck()
}

	// Function to clear the canvas
function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas from the previous frame
}