const TABLE_WIDTH = 200
const TABLE_LINES = 2

function print_menu() {
    const monkeysNumber = monkeyImages.length
    const spacing = 5
    const BOX_SIZE = (TABLE_WIDTH-spacing*(TABLE_LINES+1))/TABLE_LINES
    const TABLE_X = MW + BOX_SIZE/2 + spacing
    const TABLE_Y = BOX_SIZE/2 + spacing

    c.rect(MW + TABLE_WIDTH/2, CH/2, TABLE_WIDTH, CH, "rgb(163, 142, 1)")
    var counter = 0;
    for (let i = 0; i < monkeysNumber/TABLE_LINES; i++) { // got over y direction // always have 2 boxes in each line
        for (let j = 0; j < TABLE_LINES; j++) {
            if (i*TABLE_LINES+j == monkeysNumber) {
                continue
            }
            tableImages = monkeyImages[counter].profile
            if (tableImages == 0) {
                tableImages = monkeyImages[counter].skin[0]
            }


            const boxX = TABLE_X + (spacing + BOX_SIZE)*j;
            const boxY = TABLE_Y + (spacing + BOX_SIZE)*i;
            c.rect(boxX, boxY, BOX_SIZE, BOX_SIZE, "pink")
            c.img(boxX, boxY, BOX_SIZE, BOX_SIZE, tableImages)
            c.text(MONKEY_DATA[counter][0].price+"$", boxX-TABLE_WIDTH/4 + 1.7*spacing, boxY+TABLE_WIDTH/4 - 2*spacing, 36, "Black", true, "Cursive")

            counter++
            if (counter >= monkeysNumber) {
                counter = 0;
            }
        }
    }
}

function menu_click(mouse) { // x and y coordinates
    if (!running) { // can buy only when game is running
        return
    }
    const monkeysNumber = monkeyImages.length
    let size = TABLE_WIDTH / TABLE_LINES
    let xPos, yPos
    for (let x = 1; x <= TABLE_LINES; x++) {
        if (mouse.x < MW + size*x) {
            xPos = x;
            break;
        }
    }
    for (let y = 1; y <= monkeysNumber/TABLE_LINES+1; y++) {
        if (mouse.y < size*y) {
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