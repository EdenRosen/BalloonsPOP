const RELOCATE_BOX_INFO = {
    x: (CW*0.1)/2 + 150 + TABLE_HEIGHT*0.5,
    y: CH - TABLE_HEIGHT/2 + TABLE_HEIGHT/16,
    w: CW*0.13,
    h: TABLE_HEIGHT*0.25,
    txt: - TABLE_HEIGHT/8 - 5,
}

const SELL_BOX_INFO = {
    x: RELOCATE_BOX_INFO.x + RELOCATE_BOX_INFO.w + 50 ,
    y: CH - TABLE_HEIGHT/2 + TABLE_HEIGHT/16,
    w: CW*0.13,
    h: TABLE_HEIGHT*0.25,
    txt: - TABLE_HEIGHT/8 - 5,
}

const IMP_BOX_INFO = {
    x: SELL_BOX_INFO.x + SELL_BOX_INFO.w + 20,
    y: CH - TABLE_HEIGHT/2 + TABLE_HEIGHT/16 - 5,
    w: TABLE_HEIGHT*0.6,
    h: TABLE_HEIGHT*0.6,
    txt: - TABLE_HEIGHT/3 - 5,
    downOffset: 20,
}

function printMenuMonkey() {
    monkey = monkeys[printMenuMonkeyVar-1]
    // the menu background itself
    c.img2((CW-TABLE_WIDTH)/2, CH - TABLE_HEIGHT/2, TABLE_HEIGHT, CW - TABLE_WIDTH, generalImages['wooden_floor'], 90)
    // the box for the monkey profile

    c.rect((CW*0.1)/2 + 50, CH - TABLE_HEIGHT/2, MONKEY_SIZE * 3, MONKEY_SIZE  * 3, "rgb(111, 97, 192)")
    // the box for the relocation
    c.rect(RELOCATE_BOX_INFO.x ,RELOCATE_BOX_INFO.y, RELOCATE_BOX_INFO.w, RELOCATE_BOX_INFO.h, "rgb(151, 97, 192)")
    c.text("Relocate", RELOCATE_BOX_INFO.x ,RELOCATE_BOX_INFO.y + RELOCATE_BOX_INFO.txt, size = 50, color = "rgb(255, 225, 205)", bold = true, font = "Courier New", isMeasureText = true, isStroke = "black")
    c.text("Pops: "+monkey.balloonsPopped, RELOCATE_BOX_INFO.x ,RELOCATE_BOX_INFO.y + RELOCATE_BOX_INFO.h, size = 40, color = "rgb(183, 255, 228)", bold = true, font = "Courier New", isMeasureText = true, isStroke = "black")
    // the box for selling
    c.rect(SELL_BOX_INFO.x ,SELL_BOX_INFO.y, SELL_BOX_INFO.w, SELL_BOX_INFO.h, "rgb(151, 97, 192)")
    c.text("Sell", SELL_BOX_INFO.x ,SELL_BOX_INFO.y + SELL_BOX_INFO.txt, size = 50, color = "rgb(255, 225, 205)", bold = true, font = "Courier New", isMeasureText = true, isStroke = "black")
    
    // print upgrade options
    const monkeyData = monkey.getMonkeyData()
    const LENGTH = monkeyData.length - 1
    for (let index = 0; index < LENGTH; index++) {
        const level = monkey.levels[index]
        
        c.rect(IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20),IMP_BOX_INFO.y+IMP_BOX_INFO.downOffset/2, IMP_BOX_INFO.w-20, IMP_BOX_INFO.h-10+IMP_BOX_INFO.downOffset, "rgb(101, 127, 202)")
        let text = `Lvl. ${level}`
        c.text(text, IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20),IMP_BOX_INFO.y + IMP_BOX_INFO.txt, size = 45, color = "rgb(255, 225, 205)", bold = true, font = "Courier New", isMeasureText = true, isStroke = 'black')

        const skinImage = monkey.getSkinImage()
        if (level == monkeyData[index+1].length) {
            text = "Max"
            c.img(IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20),IMP_BOX_INFO.y, IMP_BOX_INFO.w-20, IMP_BOX_INFO.h-10, skinImage)
        } else {
            const activatedSkin = monkeyImages[monkey.type-1].levels[index][level].activated
            let image = monkeyImages[monkey.type-1].levels[index][level].normal
            if (monkey.getActivated() != null && activatedSkin && index == monkey.mainPath) {
                image = activatedSkin
            }
            c.img(IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20),IMP_BOX_INFO.y, IMP_BOX_INFO.w-20, IMP_BOX_INFO.h-10, image)
        
        }
        
        const canBuyM = monkey.canBuy(index)
        const possibleToBuy = monkey.canBuy(index, false)
        var coverFactor = 1
        if (possibleToBuy) {
            const upgradePrice = monkeyData[index+1][level].price
            c.text(`$${upgradePrice}`, IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20), IMP_BOX_INFO.y + IMP_BOX_INFO.txt + 190, size = 45, color = "rgb(255, 225, 205)", bold = true, font = "Courier New", isMeasureText = true, isStroke = 'black')
    
        }
        if (possibleToBuy && !canBuyM) {
            coverFactor = 1 - money / monkey.getPrice(index)
        }
        if (!canBuyM) {
            const height = (IMP_BOX_INFO.h-10+IMP_BOX_INFO.downOffset) * coverFactor
            const yPos = (IMP_BOX_INFO.y+IMP_BOX_INFO.downOffset/2) + height/2 - height/2/coverFactor
            c.rect(IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20), yPos, IMP_BOX_INFO.w-20, height, "rgb(0,0,0,0.4)")
        }
    }

    // print monkey
    table_image = monkeyImages[monkey.type-1].profile
    if (table_image == 0) {
        table_image = monkeyImages[monkey.type-1].origin
    }
    c.img((CW*0.1)/2 + 50, CH - TABLE_HEIGHT/2, MONKEY_SIZE * 2.5, MONKEY_SIZE  * 2.5, table_image)
}

function handleMonkeyMenu() {
    if (isInsideRectangle(mouse.x, mouse.y, RELOCATE_BOX_INFO.x ,RELOCATE_BOX_INFO.y, RELOCATE_BOX_INFO.w, RELOCATE_BOX_INFO.h,)) {
        console.log("gonna start relocation soon, or never relocate")
        if (NEVER_RELOCATE) {
            return false
        }
        bestIndex = printMenuMonkeyVar
        relocateMonkey = bestIndex // we start counting from zero but it doesn't count because 0 means false
        monkeys[bestIndex-1].relocating = true
        // reset the menu so that the player see all map
        printMenuMonkeyVar = 0
    } else if (isInsideRectangle(mouse.x, mouse.y, SELL_BOX_INFO.x ,SELL_BOX_INFO.y, SELL_BOX_INFO.w, SELL_BOX_INFO.h,)) {
        bestIndex = printMenuMonkeyVar
        price = monkeys[bestIndex-1].price
        monkeys.splice(bestIndex - 1, 1);
        printMenuMonkeyVar = 0
        money += Math.floor(price * 0.65)
    } else {
        bestIndex = printMenuMonkeyVar
        let monk = monkeys[bestIndex-1]
        let monType = monk.type
        const LENGTH = MONKEY_DATA[monType-1].length
        for (let index = 0; index < LENGTH-1; index++) {
            if (isInsideRectangle(mouse.x, mouse.y, IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20),IMP_BOX_INFO.y, IMP_BOX_INFO.w-20, IMP_BOX_INFO.h-10)) {
                monk.upgrade(index)
                continue
            }
        }
    }
}