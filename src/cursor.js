AREA_TO_MESSAGE = {
    "Map 1": "The grassland biome. Click to select it",
    "Map 2": "The Ice biome. Click to select it",
    "Map 3": "Sewers map. Click to select it",
    "Map 4": "The desert biome. Click to select it",
    "Difficulty 1": "Regular mode - Click to start the game",
    "Difficulty 2": "Rush mode - reach round 100 as fast as possible!",
    "Start Next Round Button": "Start the next round. Click to begin",
    "Start First Round Button": "Start the first round. Click to begin",
    "Rush Button": "Rush to the next round. Click to proceed",
    "Change Speed Button": "Adjust the game speed. Click to toggle speed",
    "Relocate Button": "Relocate the monkey to a new position. Click to proceed.",
    "Sell Button": "Sell this monkey for a portion of its cost. Click to sell.",
    "Upgrade Button": "Upgrade the monkey's abilities. Click to enhance.",

}
FRAMES_FOR_MESSAGE = 22

class Cursor {
    

    constructor() {
        this.message = ''
        this.x = 0
        this.y = 0
        this.framesOnState = 0 // how many frames has past since the last message changed
        this.show = false // to print the message
    }
    
    updateLoc({x, y}){
        this.x = x
        this.y = y
    }

    updateFrame() {
        this.framesOnState++
        this.updateMessage()
        if (this.framesOnState >= FRAMES_FOR_MESSAGE) {
            this.drawBubble()
        }
    }

    getHoveredMap() {
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
                this.x >= map.left &&
                this.x <= map.right &&
                this.y >= map.top &&
                this.y <= map.bottom
            ) {
                return map.index; // Return the index of the hovered map
            }
        }

        return -1; // Return -1 if no map is hovered
    }

    getHoveredMonkeyMenuSection(){
        monkey = monkeys[printMenuMonkeyVar-1]
        const monkeyData = monkey.getMonkeyData()
        const LENGTH = monkeyData.length - 1
        // Check Relocate Button hover
        if (isInsideRectangle(this.x, this.y, RELOCATE_BOX_INFO.x, RELOCATE_BOX_INFO.y, RELOCATE_BOX_INFO.w, RELOCATE_BOX_INFO.h)) {
            return "Relocate Button";
        }
        // Check Sell Button hover
        if (isInsideRectangle(this.x, this.y, SELL_BOX_INFO.x, SELL_BOX_INFO.y, SELL_BOX_INFO.w, SELL_BOX_INFO.h)) {
            return "Sell Button";
        }
        // Check Upgrade Buttons hover
        for (let i = 0; i <= LENGTH - 1; i++) {
            const x = IMP_BOX_INFO.x + i * (IMP_BOX_INFO.w + 20);
            const y = IMP_BOX_INFO.y + IMP_BOX_INFO.downOffset / 2;
            if (isInsideRectangle(this.x, this.y, x, y, IMP_BOX_INFO.w - 20, IMP_BOX_INFO.h - 10)) {
                return `Upgrade Button ${i + 1}`;
            }
        }
        return "No interactive element hovered";
    }

    getHoveredMenuSection() {
        if (printMenuMonkeyVar) {
            return this.getHoveredMonkeyMenuSection()
        }
        // Check if the mouse is over the speed button
        if (isInsideRectangle(this.x, this.y, MW + TABLE_WIDTH / 2, CH - 50, TABLE_WIDTH, 100)) {
            if (isBetweenRounds) {
                if (currentRound == 1) {
                    return 'Start First Round Button'
                }
                return 'Start Next Round Button';
            } else {
                return 'Change Speed Button';
            }
        }

        // Check if the mouse is over the rush button (if isRush is true)
        if (isRush && isInsideRectangle(this.x, this.y, MW + TABLE_WIDTH / 2, CH - 150, TABLE_WIDTH, 100)) {
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
                if (isInsideRectangle(this.x, this.y, boxX, boxY + DOWN_OFFSET / 2, BOX_SIZE, BOX_SIZE + DOWN_OFFSET)) {
                    // Return the monkey index (1-based)
                    return `Monkey ${counter + 1}`;
                }

                counter++;
            }
        }

        return "No interactive element hovered";
    }


    getHoveredSection() {
        if (startingUI) {
            if (frameUI === 0) {
                // Adjusted map selection logic
                let num = this.getHoveredMap()
                if (num == -1) {
                    return 'nothing'
                }
                return `Map ${num}`
            } else if (frameUI === 1) {
                // Hovering over difficulty selection
                for (let i = 0; i < CIRCLES.length; i++) {
                    const circle = CIRCLES[i];
                    const distance = calcMag(this.x,this.y,circle.x,circle.y)

                    if (distance <= RAD_DIFF_CIRCLE) {
                        return `Difficulty ${i + 1}`;
                    }
                }
            } 
        } else {
            return this.getHoveredMenuSection();
        }
        return "No interactive element hovered";
    }


    updateMessage() {
        const hoveredSection = this.getHoveredSection();
        let preMessage = this.message

        this.message = ""
        if (hoveredSection.startsWith("Monkey")) { // add more information here....
            // Extract the monkey index
            const monkeyIndex = parseInt(hoveredSection.split(" ")[1]);
            const price = MONKEY_DATA[monkeyIndex - 1][0].origin.price;
            const canBuy = price <= money;

            this.message = `Monkey ${monkeyIndex}: Costs $${price}.`;
            this.message += canBuy ? " Click to purchase." : " Not enough money.";
        } else if (hoveredSection.startsWith("Upgrade Button")) {

            // work on the diff messages for update monkey... ---------------------------------------------------------------------------------------------------------------

            const pathIndex = parseInt(hoveredSection.split(" ")[2]) - 1;
            const monkey = monkeys[printMenuMonkeyVar - 1];
            const levelIndex = monkey.levels[pathIndex]; //
            const upgrade = monkey.getMonkeyData()[pathIndex+1][levelIndex] // undefined when there is no more upgrades!
            const filtered = monkey.levels.filter(l => l == 0)
            const canBuy = monkey.canBuy(pathIndex);
            const isActivated = monkey.getActivated(); // either null if not yet, and the index of the other path that also reached the max for activation
            
            let countOverActivated = 0; // change to a list of indexes
            var maxPathIndex = 0
            for (let i = 0; i < monkey.levels.length; i++) {
                if (monkey.levels[i] > monkey.levels[maxPathIndex] | (i == pathIndex & monkey.levels[i] == monkey.levels[maxPathIndex])) {
                    maxPathIndex = i
                }
            }
            for (let i = 0; i < monkey.levels.length; i++) {
                if (monkey.levels[i] == LIMIT_ACTIVATED-1 & i != maxPathIndex) {
                    countOverActivated++;
                }
            }
            
            if (filtered.length == monkey.levels.length - MAX_PATHS && monkey.levels[pathIndex] == 0) {
                this.message = "Can't upgrade this path. Only " + MAX_PATHS + " paths are allowed.";    
            } else if (upgrade == undefined) {
                this.message = "No more upgrades for this path! Might have been the activated one!"
            } else if (maxPathIndex == pathIndex & levelIndex >= LIMIT_ACTIVATED & countOverActivated > 0) {
                this.message = "You can upgrade this path! if you upgrade the other path one more time you will activate this monkey!"
            } else if (maxPathIndex != pathIndex & monkey.levels[maxPathIndex] >= LIMIT_ACTIVATED & levelIndex == LIMIT_ACTIVATED - 1) {
                if (monkey.levels[maxPathIndex] == LIMIT_ACTIVATED) {
                    this.message = "By upgrading this path, you will have an option to activate this monkey, either this path or another path!"
                } else {
                    this.message = "By upgrading this, you are now activating this path."
                    this.message += "Activating this monkey will enable a special power but limit you to upgrading path "+maxPathIndex+" up to max. And the other path/s up to a limit.";
                }
            } else if (isActivated.includes(pathIndex)) {
                if (isActivated.length > 1) {
                    this.message = "Upgrading this path will activate one of the other possible paths that reached the activation limit, choose wisely!"
                } else {
                    this.message = "This path has reached the activation limit, if you upgrade another path to the same level you can activate this monkey!"
                }
            } else if (maxPathIndex != pathIndex & levelIndex == LIMIT_ACTIVATED) {
                this.message = "You can't upgrade this path anymore because it activated!"
            } else {
                this.message = `Upgrade ${levelIndex + 1}: $${upgrade.price} - ${upgrade.description}`;
                this.message += canBuy ? " Click to purchase." : " Can't upgrade this path, either out of money and or reached limit of amount of paths the can be bought another path is activated.";
            }


        } else if (AREA_TO_MESSAGE.hasOwnProperty(hoveredSection)) {
            this.message = AREA_TO_MESSAGE[hoveredSection]
        } else {
            // infoMessage = "Hover over an interactive element for more information."
            this.message = ""
        }
        
        if (preMessage != this.message) {
            this.framesOnState = 0
        }
    }


    // Draw a bubble with information
    drawBubble() {
        const content = this.message
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
        var bubbleX = this.x + bubbleWidth + 25 > CW ? this.x - bubbleWidth - 25 : this.x + 25
        var bubbleY = this.y + bubbleHeight + 5 > CH ? this.y - bubbleHeight - 5 : this.y + 5

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
            // for each line
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
}