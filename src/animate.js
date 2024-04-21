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

  time++; // Increment the time by 1
  
  if (time % 25 == 0) { // && counter <= 150
    addBalloon(9)
    counter++
  }



  printFrame()


}

function printFrame() {
  clear() // Clear the canvas from the previous frame
  printBackground() // Print the background image
  // printTunnels()
  // print elements on screen
  printBalloons()
  printArrows()
  printMonkeys()
  if (printMenuMonkeyVar) { // if 0 then false
    PrintMenuMonkey()
  }
  printAnimations()

  // print upper layer stuff
  printMoneyHearts()
  gameOverCheck()
}

// Function to clear the canvas
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas from the previous frame
}