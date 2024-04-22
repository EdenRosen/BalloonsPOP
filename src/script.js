const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const c = new Canvas(canvas)

// Canvas dimensions
// const CANVAS_CSS_WIDTH = 800 // in pixels
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

let pop = new Audio('../sounds/pop.mp3');
// Gameplay settings
const START_MONEY = 5800 // 800 is good
const START_LIVES = 500
const TABLE_HEIGHT = 300
const NEVER_RELOCATE = false
const FRAMES_IN_SECOND = 30
const GAME_SPEEDS = [1.8,3.6,5.4]
const TIME_BETWEEN_ROUND = 100

//------------------------------------VARIABLES----------------------------------------\\

// Other constant

// Gameplay state
var printMenuMonkeyVar = false
var lives = START_LIVES
var running = false
var balloons = []
var monkeys = []
var arrows = []
var animations = []
var time = 0
var speedFactor = 1.8 // 1.8

// Counter and money
var relocateMonkey = 0
var createMonkey = 0 // the kind of monkey from the menu, 1,2,3...
var money = START_MONEY
var coins = []

// Rounds
var currentRound = 1
var roundTime = -50
var roundClusters = []




//---------------------------------------SETUP----------------------------------------------\\

// canvas.style.width = `${CANVAS_CSS_WIDTH}px` // setting canvas width in the website



// monkeyImages = loadImages(6, 'arrows', 'a') ----------- fix

setTimeout(updateOnce, 50)
function updateOnce() {
    printFrame()
    printMenu()
    start()
}

function start() {
    if (running) {
        running = false
    } else {
        restart()
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
    animations = []
    time = 0

    // Counter and money
    relocateMonkey = 0
    createMonkey = 0
    money = START_MONEY
    printMenuMonkeyVar = false

    // Rounds
    
    currentRound = 25
    roundTime = -50
    roundClusters = []

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
    if (running) {
        $('#startButton').text("PAUSE")
    } else {
        $('#startButton').text("PLAY")
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

//------------------------------------UPDATE ANIMATIONS---------------------------------------\\

function updateAnimations() { // called every frame
    for (const animation of animations) {
        animation.updateFrame()
    }
}

//------------------------------------UPDATE POSITION---------------------------------------\\

function updateArrowsPosition() { // called every frame
    for (const arrow of arrows) {
        arrow.moveArrow()
    }
}

function updateBalloonsPosition() { // called every frame
    for (const balloon of balloons) {
        balloon.moveBalloon()
    }
}

function updateMonkeysPosition() { // called every frame
    for (const monkey of monkeys) {
        monkey.moveMonkey()
    }
}

//-------------------------------------PRINTING FUNCTIONS-------------------------------------------\\

function printBackground() {
    c.img(MW/2,MH/2,MW,MH, mapImages[0])
    if (SHOW_WAY_LINES) {
        c.line(WAYPOINTS, "gray", WAY_LINE_WIDTH)
    }
    
}


function printTunnels() {
    for (const t of TUNNELS) {
        c.rect(t.x, t.y, t.w, t.h)
    }
}

function printBalloons() {
    for (const balloon of balloons) {
        balloon.print()
    }
}

function printMonkeys() {
    var printOrder = []
    var relocatingMonkeys = []
    var factories = []
    for (const index in monkeys) {
        const monkey = monkeys[index]
        if (monkey.relocating) {
            relocatingMonkeys.push(index)
            continue
        }
        if (true) {
        // if (monkey.factory) {
            // putting factories in order by their y value - end goal is sorted factories by y to print them correctly
            let i = 0
            while (i < factories.length && monkeys[factories[i]].y < monkey.y) {
                i++
            }
            factories.splice(i, 0, index)
            continue
        }
        var layer = monkey.levels[monkey.getMainPath()]+1
        while (printOrder.length <= layer) {
            printOrder.push([])
        }
        printOrder[layer].push(index)
    }
    for (const layer of printOrder) {
        for (const index of layer) {
            monkeys[index].print()
        }
    }
    for (const index of factories) {
        monkeys[index].print()
    }
    for (const index of relocatingMonkeys) {
        monkeys[index].print()
    }
}

function printArrows() {
    for (const arrow of arrows) {
        arrow.print()
    }
}

function printCoins() {
    for (let coin = 0; coin < coins.length; coin++) {
        coin.print()
    }
}

function printAnimations() {
    for (const animation of animations) {
        animation.print()
    }
}

function printMoneyHearts() {
    var xStart = 70
    var offset = 200
    // lives
    var livesP = lives < 0 ? 0 : lives
    c.img(xStart, 50, 60, 60, generalImages[1])
    c.text(livesP, 100, 65, 45, "white", true, "Sans-serif", false, isStroke='black')

    // money
    c.img(xStart + offset, 50, 60, 60, generalImages[2])
    c.text("$" + money, 110 + offset, 65, 45, "white", true, "Sans-serif", false, isStroke='black')
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
            
            printMenuMonkeyVar = bestIndex+1 // can be zero
            monkeys[bestIndex].menuOpen = true
            // stop before relocation so menu opens
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
    if (click != 'outside_canvas') { // canvas is clicked
        if (click == 'side_menu') { // menu is clicked
            let index = menu_click(mouse)
            if (index < 0) {
                // nothing, changed the speed
            } else if (index != 0) {
                createMonkey = index
            } else {
                relocateMonkey = 0
            } 
        } else if (click == 'monkey_menu') { // when player decided to click a monkey, opens menu
            handleMonkeyMenu(mouse)
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
            new_monkey = new Monkey({ x: mouse.x, y: mouse.y, type: index })
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
    let canvas_ratio = CW / $('canvas').width()
    return {
        x: (evt.clientX - rect.left)*canvas_ratio,
        y: (evt.clientY - rect.top)*canvas_ratio
    }
}


//--------------------------------------ESSENTIAL FUNCTIONS-----------------------------------------------\\

function addBalloon(type) { // add balloon to the game
    nextIndex = 0
    next = WAYPOINTS[nextIndex]
    balloons.push(new Balloon({ x: next.x, y: next.y, type, next: nextIndex }))
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