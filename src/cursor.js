// this is the cursor file when you hover over an element on the screen it tells you what it does in the game.
var infoSession = false
var bubbleLoc = {}
function activateCursorInfo() {
    // begin cursor ingo
    infoSession = !infoSession
} 
// // Add event listener to the entire document
// document.addEventListener('mousemove', (event) => {
//     if (infoSession) {
//         // Get the cursor's current position
//         const cursorX = event.clientX;
//         const cursorY = event.clientY;

//         c.drawBubble(cursorX, cursorY)
//     }
// });

function getHoveredMap(mouseX, mouseY) {
    const maps = [];
    const jump_x = GRID_WIDTH - MAP_WIDTH;
    const jump_y = GRID_HEIGHT - MAP_WIDTH * ASP_RATIO;

    for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 2; x++) {
            const posX = CW / 2 - GRID_WIDTH / 2 + MAP_WIDTH / 2 + x * jump_x;
            const posY = 400 + y * jump_y;
            const width = MAP_WIDTH/2;
            const height = MAP_WIDTH * ASP_RATIO/2;
            const mapIndex = y * 2 + x;

            // Define the boundaries of the map
            const mapRect = {
                left: posX - width,
                right: posX + width,
                top: posY - height,
                bottom: posY + height,
                index: mapIndex + 1
            };

            maps.push(mapRect);
        }
    }

    // Check which map contains the mouse coordinates
    for (const map of maps) {
        if (
            mouseX >= map.left &&
            mouseX <= map.right &&
            mouseY >= map.top &&
            mouseY <= map.bottom
        ) {
            return map.index; // Return the index of the hovered map
        }
    }

    return -1; // Return -1 if no map is hovered
}

function getHoveredMenuSection(bubbleLoc) {
    const { x, y } = bubbleLoc;
    // Check if the mouse is over the speed button
    if (isInsideRectangle(x, y, MW + TABLE_WIDTH / 2, CH - 50, TABLE_WIDTH, 100)) {
        if (isBetweenRounds) {
            return 'Start Next Round Button';
        } else {
            return 'Change Speed Button';
        }
    }

    // Check if the mouse is over the rush button (if isRush is true)
    if (isRush && isInsideRectangle(x, y, MW + TABLE_WIDTH / 2, CH - 150, TABLE_WIDTH, 100)) {
        return 'Rush Button';
    }

    // Check if the mouse is over any of the monkey purchase boxes
    const monkeysNumber = monkeyImages.length;
    const spacing = 5;
    const BOX_SIZE = (TABLE_WIDTH - spacing * (TABLE_LINES + 1)) / TABLE_LINES;
    const TABLE_X = MW + BOX_SIZE / 2 + spacing;
    const TABLE_Y = BOX_SIZE / 2 + spacing;

    let counter = 0;
    for (let i = 0; i < monkeysNumber / TABLE_LINES; i++) { // y-direction
        for (let j = 0; j < TABLE_LINES; j++) { // x-direction
            if (i * TABLE_LINES + j >= monkeysNumber) {
                continue;
            }

            const boxX = TABLE_X + (spacing + BOX_SIZE) * j;
            const boxY = TABLE_Y + (spacing + BOX_SIZE + DOWN_OFFSET) * i;

            // Check if the mouse is over this box
            if (isInsideRectangle(x, y, boxX, boxY + DOWN_OFFSET / 2, BOX_SIZE, BOX_SIZE + DOWN_OFFSET)) {
                // Return the monkey index (1-based)
                return `Monkey ${counter + 1}`;
            }

            counter++;
        }
    }

    return "No interactive element hovered";
}


function getHoveredSection(bubbleLoc) {
    const { x, y } = bubbleLoc;
    if (startingUI) {
        if (frameUI === 0) {
            // Adjusted map selection logic
            let num = getHoveredMap(bubbleLoc.x, bubbleLoc.y)
            console.log(num)
            if (num == -1) {
                return 'nothing'
            }
            return `Map ${num}`
        } else if (frameUI === 1) {
            // Hovering over difficulty selection
            for (let i = 0; i < CIRCLES.length; i++) {
                const circle = CIRCLES[i];
                const distance = Math.sqrt(
                    Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2)
                );

                if (distance <= RAD_DIFF_CIRCLE) {
                    return `Difficulty ${i + 1}`;
                }
            }
        } 
    } else {
        return getHoveredMenuSection(bubbleLoc);
    }
    return "No interactive element hovered";
}

function startDrawBubble() {
    const hoveredSection = getHoveredSection(bubbleLoc);

    let infoMessage = "";
    switch (hoveredSection) {
        case "Map 1":
            infoMessage = "This is the first map. Click to select it.";
            break;
        case "Map 2":
            infoMessage = "This is the second map. Click to select it.";
            break;
        case "Map 3":
            infoMessage = "This is the third map. Click to select it.";
            break;
        case "Map 4":
            infoMessage = "This is the fourth map. Click to select it.";
            break;
        case "Difficulty 1":
            infoMessage = "Easy mode. Click to start the game.";
            break;
        case "Difficulty 2":
            infoMessage = "Rush mode. Game is normal Click to start the game.";
            break;
        case "Speed Button":
            infoMessage = "Adjust the game speed. Click to toggle speed.";
            break;
        case "Start Button":
            infoMessage = "Start the next round. Click to begin.";
            break;
        case "Rush Button":
            infoMessage = "Rush to the next round. Click to proceed.";
            break;
        default:
            if (hoveredSection.startsWith("Monkey")) { // add more information here....
                // Extract the monkey index
                const monkeyIndex = parseInt(hoveredSection.split(" ")[1]);
                const price = MONKEY_DATA[monkeyIndex - 1][0].origin.price;
                const canBuy = price <= money;

                infoMessage = `Monkey ${monkeyIndex}: Costs $${price}.`;
                infoMessage += canBuy ? " Click to purchase." : " Not enough money.";
            } else {
                infoMessage = "Hover over an interactive element for more information.";
            }
    }

    drawBubble(bubbleLoc.x, bubbleLoc.y, infoMessage);
}


// Draw a bubble with information
function drawBubble(x, y, content = "Hello World") {
    if (content == '') return
    const maxLineWidth = 30
    const words = content.split(' ')
    var lines = [words[0]]
    for (let i = 1; i < words.length; i++) {
        const state = lines[lines.length-1]
        if (state.length + 1 + words[i].length > maxLineWidth) {
            lines.push(words[i])
        } else {
            lines[lines.length-1] += ' ' + words[i]
        }
    }

    // Adjust bubble position to not go off-canvas
    const bubbleWidth = maxLineWidth*12 + 35
    const bubbleHeight = lines.length * 40 + 5
    var bubbleX = x + bubbleWidth + 25 > CW ? x - bubbleWidth - 25 : x + 25
    var bubbleY = y + bubbleHeight + 5 > CH ? y - bubbleHeight - 5 : y + 5
    // Draw bubble background (using `rect` method)
    c.rect(
        bubbleX + bubbleWidth / 2,
        bubbleY + bubbleHeight / 2,
        bubbleWidth,
        bubbleHeight,
        "rgba(255, 255, 255)"
    );


    // Add text inside the bubble (using `text` method)
    for (let i = 0; i < lines.length; i++) {
        const text = lines[i]
        c.text(
            text,
            bubbleX + 10,
            bubbleY + 30 + i * 40,
            26, // Font size
            "black", // Text color
            false, // Not bold
            "Arial"
        );    
    }
    
}