const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const c = new Canvas(canvas)

// Canvas dimensions
const CANVAS_CSS_WIDTH = 800 // in pixels
const CW = 1700 // canvas width
const CH = 1080 // canvas height
canvas.width = CW
canvas.height = CH
const MW = CW-TABLE_WIDTH // map width
const MH = 1080 // map height

// Mathematical constants                    
const RADIAN = Math.PI/180

// Waypoint and tunnel data
const SHOW_WAY_LINES = false
const WAY_LINE_WIDTH = 50
const WAYPOINTS = [ // waypoints of the trail
    {x: 0, y: 600},
    {x: 300, y: 600},
    {x: 300, y: 420},
    {x: 540, y: 420},
    {x: 540, y: 1000},
    {x: 900, y: 1000},
    {x: 900, y: 255},
    {x: 300, y: 235},
    {x: 300, y: 75},
    {x: 1100, y: 75},
    {x: 1100, y: 250},
    {x: 1320, y: 250},
    {x: 1320, y: 430},
    {x: 1100, y: 430},
    {x: 1090, y: 760},
    {x: 300, y: 780},
    {x: 300, y: 1100},
]
const TUNNELS = [
    {x: 900, y: 758, w: 200, h: 330, under: [6]},
    {x: 547, y: 760, w: 340, h: 200, under: [15]},
]

// Gameplay settings
const SPEED_FACTOR = 2.8 // 0.8
const START_MONEY = 8100 // 800 is good
const START_LIVES = 500

//------------------------------------VARIABLES----------------------------------------\\

// Monkey menu variables
const TABLE_HEIGHT = 300
printMenuMonkeyVar = 0

// Gameplay state
const NEVER_RELOCATE = false
var lives = START_LIVES
var running = false
var balloons = []
var monkeys = []
var arrows = []
var time = 0

const GENERAL_IMAGES_NAMES = ['pop', 'heart', 'coins',]
const MONKEY_IMAGES_NAMES = [
    'monkey1', 'monkey1_P',
    'monkey2', 'monkey2_P',
    'monkey3', 'monkey3_P',
    'monkey4', 'monkey4_P', 'monkey4_B',
]

// Image resources
var mapImages = []
var balloonImages = []
var monkeyImages = []
var arrowImages = []
var generalImages = []

// Counter and money
var counter = 0
var relocateMonkey = 0
var createMonkey = 0 // the kind of monkey from the menu, 1,2,3...
var money = START_MONEY

//---------------------------------------SETUP----------------------------------------------\\

canvas.style.width = `${CANVAS_CSS_WIDTH}px` // setting canvas width in the website

function loadImages(length, folderName, nameType, names=[]) {
    var namesGiven = names.length > 0
    var images = []
    for (let i = 0; i < length; i++) {
        var image = new Image()
        var name = namesGiven ? nameType + names[i] : nameType + (i+1)
        image.src = `../images/${folderName}/${name}.png`
        images.push(image)
    }
    return images
}

generalImages = loadImages(GENERAL_IMAGES_NAMES.length, 'general', '', GENERAL_IMAGES_NAMES)
arrowImages = loadImages(6, 'arrows', 'a')
balloonImages = loadImages(12, 'balloons', 'b')
mapImages = loadImages(1, 'maps', 'map')

// load monkey images
for (let i = 0; i < MONKEY_IMAGES_NAMES.length; i++) {
    var image = new Image()
    var name = MONKEY_IMAGES_NAMES[i]
    image.src = `../images/monkeys/${name}.png`
    if (name.includes('_')) {
        index1 = name.indexOf('y')
        index2 = name.indexOf('_')
        id = name.substring(index1+1, index2)
        id = parseInt(id)-1
        if (name[index2+1] == 'P') {
            monkeyImages[id].profile = image
        } else if (name[index2+1] == 'B') {
            monkeyImages[id].base = image
        }
    } else {
        monkeyImages.push({skin: [image], profile: 0, base: 0})
    }
}

// monkeyImages = loadImages(6, 'arrows', 'a') ----------- fix

setTimeout(updateOnce, 50)
function updateOnce() {
    printFrame()
    print_menu()
    start()
}

function start() {
    if (running) {
        running = false
    } else {
        running = true
        animate()
    }
    updateStartButton()
}

function restart() {
    // Gameplay state
    lives = START_LIVES
    running = false
    balloons = []
    monkeys = []
    arrows = []
    time = 0

    // Counter and money
    counter = 0
    relocateMonkey = 0
    createMonkey = 0
    money = START_MONEY

    updateStartButton()
    printFrame()
}

function gameOver() {
    lives = 0
    c.text('Game Over', 180, 560, 230, 'red', true, "Sans-serif")
}

function gameOverCheck() {
    if (lives <= 0) {
        lives = 0
        gameOver()
    }
}

function updateStartButton() {

    var startButton = document.getElementById("startButton")
    if (running) {
        startButton.innerText = "PAUSE"
    } else {
        startButton.innerText = "PLAY"
    }
    
}

//-------------------------------TUNNELS----------------------------------------\\

function insideTunnel(p, index) {
    tunnel = TUNNELS[index]
    t = {x: tunnel.x-tunnel.w/2, y: tunnel.y-tunnel.h/2, w: tunnel.w, h: tunnel.h}
    if (p.x > t.x & p.y > t.y & p.x < t.x+t.w & p.y < t.y+t.h) {
        return true
    }
    return false
}



//------------------------------------UPDATE POSITION---------------------------------------\\

function updateArrowsPosition() { // called every frame
    for (let index = 0; index < arrows.length; index++) {
        var arrow = arrows[index]
        arrow.moveArrow()
    }
}

function updateBalloonsPosition() { // called every frame
    for (let index = 0; index < balloons.length; index++) {
        balloon = balloons[index]
        balloon.moveBalloon()
    }
}

function updateMonkeysPosition() { // called every frame
    for (let i = 0; i < monkeys.length; i++) {
        monkey = monkeys[i]
        monkey.moveMonkey()
    }
}

//-------------------------------------PRINTING FUNCTIONS-------------------------------------------\\

function printBackground() {
    c.img(MW/2,MH/2,MW,MH, mapImages[0])
    if (SHOW_WAY_LINES) {
        c.line(WAYPOINTS, "gray", WAY_LINE_WIDTH)
    }
    print_menu();
}

function printTunnels() {
    for (let i = 0; i < TUNNELS.length; i++) {
        t = TUNNELS[i]
        c.rect(t.x, t.y, t.w, t.h)
    }
}

function printBalloons() { // This function handles all balloons graphics
    for (let index = 0; index < balloons.length; index++) {
        const balloon = balloons[index];
        balloon.print()
    }
}

function printMonkeys() { // handles all monkeys graphics
    for (let index = 0; index < monkeys.length; index++) {
        const monkey = monkeys[index];
        monkey.print()
    }
}

function printArrows() {
    for (let index = 0; index < arrows.length; index++) { // Loop through each arrow in the arrows array
        const arrow = arrows[index]
        arrow.print()
    }
}

function printMoneyHearts() {
    var xStart = 70
    var offset = 200
    // lives
    var livesP = lives < 0 ? 0 : lives
    c.img(xStart, 50, 60, 60, generalImages[1])
    c.text(livesP, 100, 65, 45, "black", true, "Sans-serif")

    // money
    c.img(xStart + offset, 50, 60, 60, generalImages[2])
    c.text("$" + money, 110 + offset, 65, 45, "black", true, "Sans-serif")
}

//-----------------------------MONKEY'S RELOCATION AND PURCHASE--------------------------------\\

// return true when does something like buy a monkey 
// returns false when fails and doesn't change anything
function handleMonkeyRelocation(event, mouse) {
    if (!relocateMonkey) { // if was clicked and not bought
        let arr = []
        for (let i = 0; i < monkeys.length; i++) {
            let m = monkeys[i]
            let check = checkCollision(mouse, m, MONKEY_SIZE) // check if the click event collides with the monkey using the 'checkCollision' function and store the result in the 'check' variable
            if (check) { // less than MONKEY_SIZE, used in next code block
                arr.push( [ i, calcMag( mouse.x, mouse.y, m.x, m.y ) ] )
                // relocateMonkey = i+1 // we start counting from zero but it doesn't count because 0 means false
                // m.relocating = true
                // return false
            }
        }

        // find the closest monkey to the mouse pos
        let bestDistance = MONKEY_SIZE+1;
        let bestIndex = undefined;
        for (let index = 0; index < arr.length; index++) {
            if ( arr[index][1] < bestDistance ) {
                bestIndex = arr[index][0]
                bestDistance = arr[index][1]
            }
        }

        // once has the closest monkey then enable it's relocation
        if (bestIndex != undefined) {
            if (printMenuMonkeyVar != 0) {
                mr = monkeys[printMenuMonkeyVar-1]
                mr.relocating = false
                mr.menuOpen = false
            }
            console.log(monkeys[bestIndex])
            printMenuMonkeyVar = bestIndex+1 // can be zero
            monkeys[bestIndex].menuOpen = true
            // stoping before relocation so menu opens
            return true
        }
        if (printMenuMonkeyVar != 0) {
            mr = monkeys[printMenuMonkeyVar-1]
            mr.relocating = false
            mr.menuOpen = false
            printMenuMonkeyVar = 0
        }
        return false
    }
    
    // if pressed on the map and either bought or not but was already moved to a location
    
    // if there is not enough money to buy this monkey then leave him if he was not bought yet from menu
    if ( monkeys[relocateMonkey-1].bought == false & money < monkeys[relocateMonkey-1].price) {
        monkeys.splice(relocateMonkey-1, 1);
        relocateMonkey = 0
        return false
    }

    // check if there are no monkeys there and then place it and stop relocation of that monkey
    let m = monkeys[relocateMonkey-1]
    if (!m.legalLocation()) {
        console.log("unable to place monkey in this position, illegal")
        return false 
    }
    m.relocating = false
    m.menuOpen = false
    relocateMonkey = 0
    printMenuMonkeyVar = 0
    // set new normal location
    m.originalX = m.x
    m.originalY = m.y

    if ( m.bought == false ) {
        money -= m.price
        m.bought = true;
    }
    return true
}

//-----------------------------CANVAS EVENTS--------------------------------\\

addEventListener('click', (event) => { // add an event listener to the click event
    var click = canvasClick(event)
    let mouse = getMousePos(event)
    console.log("click")
    if (click != 'outside_canvas') { // canvas is clicked
        if (click == 'side_menu') { // menu is clicked
            let index = menu_click(mouse)
            if (index != 0) {
                createMonkey = index
            } else {
                relocateMonkey = 0
            } 
        } else if (click == 'monkey_menu') { // when player decided to click a monkey, opens menu
            console.log("checking here")
            if (isInsideRectangle(mouse.x, mouse.y, (CW*0.1)/2 + 150 + TABLE_HEIGHT*0.5, CH - TABLE_HEIGHT/2, CW*0.05, TABLE_HEIGHT*0.2)) {
                console.log("gonna start relocation soon, or never relocate")
                if (NEVER_RELOCATE) {
                    return false
                }
                bestIndex = printMenuMonkeyVar
                relocateMonkey = bestIndex // we start counting from zero but it doesn't count because 0 means false
                monkeys[bestIndex-1].relocating = true
                // reset the menu so that the player see all map
                printMenuMonkeyVar = 0
            }
        } else if (click == 'map') { // map is clicked
            relocation = handleMonkeyRelocation(event, mouse)
        }
    }
})

addEventListener('mousemove', (event) => {
    var click = canvasClick(event)
    let mouse = getMousePos(event)
    if (click != 'outside_canvas') {        
        if (click == 'map' & createMonkey != 0) { // create a new instance
            if (printMenuMonkeyVar != 0) {
                m = monkeys[printMenuMonkeyVar-1]
                m.relocating = false
                m.menuOpen = false
                printMenuMonkeyVar = 0
            }
            index = createMonkey
            new_monkey = new Monkey(mouse.x, mouse.y, index)
            monkeys.push(new_monkey)
            createMonkey = 0
            relocateMonkey = monkeys.length
            new_monkey.relocating = true
        } else if (click == 'side_menu' & !createMonkey & relocateMonkey != 0) { // when player decided  not to buy the monkey
            if (!monkeys[relocateMonkey-1].bought) { // if it was not bought yet
                monkeys.pop()
                relocateMonkey = 0 
            } else if (monkeys[relocateMonkey-1].bought) {
                console.log("Returning to last relocated location")
                m = monkeys[relocateMonkey-1]
                m.x = m.originalX
                m.y = m.originalY
                m.relocating = false
                m.menuOpen = false
                relocateMonkey = 0
                printMenuMonkeyVar = 0
                return
            }
        }
        if (relocateMonkey) { // move monkey position
            monkeys[relocateMonkey-1].updateLocation(mouse.x, mouse.y)
        }
    }
})

function canvasClick(event) { // return what area of the page was clicked
    let mouse = getMousePos(event)
    if (mouse.x > 0 & mouse.x < CW & mouse.y > 0 & mouse.y < CH) {
        if (mouse.x < MW) {
            if (mouse.y > CH - TABLE_HEIGHT & printMenuMonkeyVar != 0) {
                return 'monkey_menu'
            }
            return 'map'
        }
        return 'side_menu'
    }
    return 'outside_canvas'
}

function getMousePos(evt) { // gives the position of the  mouse on the canvas
    let rect = canvas.getBoundingClientRect()
    let canvas_ratio = CW / CANVAS_CSS_WIDTH
    return {
        x: (evt.clientX - rect.left)*canvas_ratio,
        y: (evt.clientY - rect.top)*canvas_ratio
    }
}


//--------------------------------------ESSENTIAL FUNCTIONS-----------------------------------------------\\

function addBalloon(type) { // add balloon to the game
    nextIndex = 0
    next = WAYPOINTS[nextIndex]
    balloons.push(new Balloon(next.x, next.y, type, nextIndex))
}

function checkCollision(object1, object2, minDistance) {
    return calcMag(object1.x, object1.y, object2.x, object2.y) < minDistance
}

function calcMag(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2))
}

function disFromLine(x1,y1,x2,y2,x3,y3) { // dis from point 1 to the line formed by 2 and 3
    let a = y1-y2
    let b = x2-x1
    let c = y1*(x1-x2)+x1*(y2-y1)
    return Math.abs(a*x3+b*y3+c) / Math.sqrt(a*a+b*b)
}

function isInsideRectangle(mouseX, mouseY, x, y, width, height) {
    return mouseX >= x - width/2 && mouseX <= x + width/2 && mouseY >= y - height/2 && mouseY <= y + height/2;
}