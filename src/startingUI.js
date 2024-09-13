

setTimeout(mainBoard, 150)
function mainBoard() {
    // x,y,w,h
    const ASP_RATIO = MH/MW
    c.rect(CW/2,CH/2,CW,CH, "turquoise")
    c.img(CW/2, CH/2, CW, CH, generalImages['maps_bg'])
    c.text("Choose a map", CW/2, 150, 100, "white", false, 'Arial', true)


    const GRID_WIDTH = 1070
    const GRID_HEIGHT = 800
    const MAP_WIDTH = 500
    // showing 4 maps per page
    let n = 0 // screen number this will be the multiplier if there are more than 4 maps
    for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 2; x++) {
            const jump_x = GRID_WIDTH - MAP_WIDTH
            const jump_y = GRID_HEIGHT - MAP_WIDTH*ASP_RATIO
            c.img(CW/2-GRID_WIDTH/2+MAP_WIDTH/2 + x * jump_x, 400 + y * jump_y, MAP_WIDTH, MAP_WIDTH*ASP_RATIO, mapImages[y*2+x]) //mapImages[0] == n*4 + y*2 + x
            
        }
    }


    // when ready
    // setTimeout(updateOnce, 50)
}