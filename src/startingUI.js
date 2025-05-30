
var startingUI = true
var frameUI = 0
var map = 0
const GRID_WIDTH = 1070
const GRID_HEIGHT = 800
const MAP_WIDTH = 500
const ASP_RATIO = MH/MW

const RAD_DIFF_CIRCLE = 140
const CIRCLES = [
    {x: CW/2-180, y: 530},
    {x: CW/2+180, y: 530},
]

animateStartingUI()
function animateStartingUI() {
    if (startingUI) {
        requestAnimationFrame(animateStartingUI)
    }
    mainBoard()
    
	cursor.updateFrame()
}

function mainBoard() {
    // x,y,w,h
    c.rect(CW/2,CH/2,CW,CH, "turquoise")
    c.img(CW/2, CH/2, CW, CH, generalImages['maps_bg'])


    if (frameUI == 0) {
        c.text("Choose a map", CW/2, 150, 100, "white", false, 'Arial', true)


        // showing 4 maps per page
        let n = 0 // screen number this will be the multiplier if there are more than 4 maps
        for (let y = 0; y < 2; y++) {
            for (let x = 0; x < 2; x++) {
                const jump_x = GRID_WIDTH - MAP_WIDTH
                const jump_y = GRID_HEIGHT - MAP_WIDTH*ASP_RATIO
                c.img(CW/2-GRID_WIDTH/2+MAP_WIDTH/2 + x * jump_x, 400 + y * jump_y, MAP_WIDTH, MAP_WIDTH*ASP_RATIO, mapImages[y*2+x]) //mapImages[0] == n*4 + y*2 + x
            }
        }    
    } else if (frameUI == 1) {
        c.text("Choose difficulty", CW/2, 150, 100, "white", false, 'Arial', true)
        const width = 700
        c.img(CW/2, CH/2, width, width*0.48, generalImages['difficulties'])
    }
}

function startSecondUI(map_index) {
    map = MAPS_DATA[map_index]
    frameUI += 1
    //start()
}

function startGame(lvl) {
    frameUI += 1
    if (lvl == 2) {
        isRush = true
    }
    startingUI = false
    start()
}

addEventListener('click', (event) => {
    const click = getMousePos(event)
    if (frameUI == 0) {
        for (let y = 0; y < 2; y++) {
            for (let x = 0; x < 2; x++) {
                const jump_x = GRID_WIDTH - MAP_WIDTH
                const jump_y = GRID_HEIGHT - MAP_WIDTH*ASP_RATIO
                const x_length = CW/2-GRID_WIDTH/2 + x * jump_x
                const y_length = 400 + y * jump_y
                const x_check = click.x >= x_length & click.x <= x_length + MAP_WIDTH
                const y_check = click.y >= y_length - MAP_WIDTH*ASP_RATIO/2 & click.y <= y_length + MAP_WIDTH*ASP_RATIO/2
                if (x_check & y_check) {
                    // map x,y was clicked
                    startSecondUI(x+2*y)
                }
            }
        }
    } else if (frameUI == 1) { // we stopped hereeeeeeeeeeeeeeeeeeeee
        let i = 1
        
        for (obj of CIRCLES) {
            if (checkCollision(click, obj, RAD_DIFF_CIRCLE)){
                startGame(i)
            }
            i++
        }
    }
})

points = []
addEventListener('click', (event) => {
    if (frameUI > 1) return
    const click = getMousePos(event)
    click.x = Math.floor(click.x)
    click.y = Math.floor(click.y)
})
