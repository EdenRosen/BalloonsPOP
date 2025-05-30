const TABLE_WIDTH = 220
const TABLE_LINES = 2
const DOWN_OFFSET = 40

function printMenu() {
    const monkeysNumber = monkeyImages.length
    const spacing = 5
    const BOX_SIZE = (TABLE_WIDTH-spacing*(TABLE_LINES+1))/TABLE_LINES
    const TABLE_X = MW + BOX_SIZE/2 + spacing
    const TABLE_Y = BOX_SIZE/2 + spacing



    c.rect(MW + TABLE_WIDTH/2, CH/2, TABLE_WIDTH, CH, "rgb(7, 65, 115)")
    var counter = 0;
    for (let i = 0; i < monkeysNumber/TABLE_LINES; i++) { // got over y direction // always have 2 boxes in each line
        for (let j = 0; j < TABLE_LINES; j++) {
            if (i*TABLE_LINES+j == monkeysNumber) {
                continue
            }
            var tableImage = monkeyImages[counter].profile
            if (!tableImage) {
                tableImage = monkeyImages[counter].skin[0]
            }

            const price = MONKEY_DATA[counter][0].origin.price
            const boxX = TABLE_X + (spacing + BOX_SIZE)*j
            const boxY = TABLE_Y + (spacing + BOX_SIZE + DOWN_OFFSET)*i
            c.rect(boxX, boxY+DOWN_OFFSET/2, BOX_SIZE, BOX_SIZE+DOWN_OFFSET, "rgb(111, 97, 192)")
            c.img(boxX, boxY, BOX_SIZE, BOX_SIZE, tableImage)
            let textSize = 36
            let xOffset = 0
            if (price >= 1000)  {
                textSize = 30
                xOffset = 3
            }
            // c.text(`$${price}`, boxX-TABLE_WIDTH/4 + 1.7*spacing - xOffset, boxY+TABLE_WIDTH/4 - 2*spacing + DOWN_OFFSET, textSize, "white", true, "Cursive", false, 'black')
            c.text(`$${price}`, boxX-TABLE_WIDTH/4 + 1.7*spacing - xOffset + 15, boxY+TABLE_WIDTH/4 - 2*spacing + DOWN_OFFSET, 32, "White", true, 'Edu NSW ACT Foundation') 

            const canBuy = price < money
            if (!canBuy) {
                c.rect(boxX, boxY+DOWN_OFFSET/2, BOX_SIZE, BOX_SIZE+DOWN_OFFSET, "rgba(0,0,0,0.4)")
            }

            

            counter++
            if (counter >= monkeysNumber) {
                counter = 0;
            }
        }
    }
    var roundTextHeight = CH*0.9
    if (isRush) {
        roundTextHeight = CH*0.8
        c.rect(MW + TABLE_WIDTH/2, CH-150, TABLE_WIDTH, 100, "rgb(122, 121, 171)")
        c.text("RUSH", MW + TABLE_WIDTH/2, CH-130, 50, "rgb(155, 1, 115)", true, "Cursive", isMeasureText=true)
    }
    
    // speed button
    c.rect(MW + TABLE_WIDTH/2, CH-50, TABLE_WIDTH, 100, "rgb(22, 121, 171)")

    let speedString = ""
    if (isBetweenRounds) {
        speedString = "Start"
    } else {
        const index = (GAME_SPEEDS.indexOf(speedFactor))%2
        if (index == 0) speedString = '>'
        if (index == 1) speedString = '>>'
    }
    c.text("Round: "+currentRound, MW + TABLE_WIDTH/2, roundTextHeight, 30, "White", true, "Cursive", isMeasureText=true)

    c.text(speedString, MW + TABLE_WIDTH/2, CH-30, 55, "rgb(7, 65, 115)", true, "Cursive", isMeasureText=true)
    
}

function menu_click() { // x and y coordinates
    if (!running || isGameOver()) { // can buy only when game is running
        return
    }
    if (isInsideRectangle(mouse.x, mouse.y, MW + TABLE_WIDTH/2, CH-50, TABLE_WIDTH, 100)) {
        if (isBetweenRounds) {
            // new round starts
            isBetweenRounds = false
			times.push([new Date(), 0, speedFactor])
        } else {
            const index = (GAME_SPEEDS.indexOf(speedFactor)+1)%2
            speedFactor = GAME_SPEEDS[index]

            const date = new Date()
            times[times.length-1][1]=date
            times.push([date, 0, speedFactor])
        }
        return -1
    } else if (isRush && isInsideRectangle(mouse.x, mouse.y, MW + TABLE_WIDTH/2, CH-150, TABLE_WIDTH, 100)) { // rush
        const date = new Date()
        if (isBetweenRounds) {
            isBetweenRounds = false
			times.push([new Date(), 0, speedFactor])
        } else {
            nextRound()
            times[times.length-1][1]=date
            times.push([date, 0, speedFactor])
        }
    }


    const monkeysNumber = monkeyImages.length
    let sizeX = TABLE_WIDTH / TABLE_LINES
    let sizeY = sizeX + DOWN_OFFSET
    let xPos, yPos
    for (let x = 1; x <= TABLE_LINES; x++) {
        if (mouse.x < MW + sizeX*x) {
            xPos = x;
            break;
        }
    }
    for (let y = 1; y <= monkeysNumber/TABLE_LINES+1; y++) {
        if (mouse.y < sizeY*y) {
            yPos = y;
            break;
        }
    }
    
    let index = (yPos-1)*TABLE_LINES + xPos
    if (!index | index > monkeyImages.length) {
        return 0
    }
    return index
}