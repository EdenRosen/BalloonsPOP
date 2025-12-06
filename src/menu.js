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
    // layout bottom controls (stacked): Speed, Auto-Start, Rush (if enabled)
    const SPEED_H = 100
    const AUTO_H = 60
    const RUSH_H = 100
    const SPACING = 0

    const ySpeed = CH - 50
    const yAuto = ySpeed - SPEED_H/2 - SPACING - AUTO_H/2
    const yRush = yAuto - AUTO_H/2 - SPACING - RUSH_H/2

    // round text should be above top control (rush if present, otherwise auto)
    let roundTextHeight
    if (isRush) {
        roundTextHeight = yRush - RUSH_H/2 - 20
        c.rect(MW + TABLE_WIDTH/2, yRush, TABLE_WIDTH, RUSH_H, "rgb(122, 121, 171)")
        c.text("RUSH", MW + TABLE_WIDTH/2, yRush + 20, 50, "rgb(155, 1, 115)", true, "Cursive", isMeasureText=true)
    } else {
        roundTextHeight = yAuto - AUTO_H/2 - 20
    }

    // auto-start toggle button (stacked above speed)
    c.rect(MW + TABLE_WIDTH/2, yAuto, TABLE_WIDTH, AUTO_H, auto_start ? "rgb(60,200,100)" : "rgb(200,60,60)")
    // slightly smaller font and vertically centered within the AUTO_H
    c.text("Auto-Start: " + (auto_start ? "ON" : "OFF"), MW + TABLE_WIDTH/2, yAuto + 6, 20, "White", true, "Sans-serif", isMeasureText=true)

    // speed button (bottom)
    c.rect(MW + TABLE_WIDTH/2, ySpeed, TABLE_WIDTH, SPEED_H, "rgb(22, 121, 171)")

    let speedString = ""
    if (isBetweenRounds) {
        speedString = "Start"
    } else {
        const index = (GAME_SPEEDS.indexOf(speedFactor))%2
        if (index == 0) speedString = '>'
        if (index == 1) speedString = '>>'
    }
    c.text("Round: "+currentRound, MW + TABLE_WIDTH/2, roundTextHeight, 30, "White", true, "Cursive", isMeasureText=true)

    // align speed icon/text to the center of the speed button
    c.text(speedString, MW + TABLE_WIDTH/2, ySpeed + 20, 55, "rgb(7, 65, 115)", true, "Cursive", isMeasureText=true)
    
}

function menu_click() { // x and y coordinates
    if (!running || isGameOver()) { // can buy only when game is running
        return
    }
    if (isInsideRectangle(mouse.x, mouse.y, MW + TABLE_WIDTH/2, CH-50, TABLE_WIDTH, 100)) {
        if (isBetweenRounds) {
            // new round starts
			times.push([new Date(), 0, speedFactor])
            nextRound()
        } else {
            const index = (GAME_SPEEDS.indexOf(speedFactor)+1)%2
            speedFactor = GAME_SPEEDS[index]

            const date = new Date()
            times[times.length-1][1]=date
            times.push([date, 0, speedFactor])
        }
        return -1
    }
    // Recompute button positions (same logic as in printMenu) so clicks align with visuals
    const SPEED_H = 100
    const AUTO_H = 60
    const RUSH_H = 100
    const SPACING = 0

    const ySpeed = CH - 50
    const yAuto = ySpeed - SPEED_H/2 - SPACING - AUTO_H/2
    const yRush = yAuto - AUTO_H/2 - SPACING - RUSH_H/2

    // Auto-start toggle button area
    if (isInsideRectangle(mouse.x, mouse.y, MW + TABLE_WIDTH/2, yAuto, TABLE_WIDTH, AUTO_H)) {
        auto_start = !auto_start
        return -1
    } else if (isRush && isInsideRectangle(mouse.x, mouse.y, MW + TABLE_WIDTH/2, yRush, TABLE_WIDTH, RUSH_H)) { // rush button clilcked
        const date = new Date()
        times.push([date, 0, speedFactor])
        nextRound()
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