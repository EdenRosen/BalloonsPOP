function PrintMenuMonkey() {
    monkey = monkeys[printMenuMonkeyVar-1]
    // the menu background itself
    c.img2((CW-TABLE_WIDTH)/2, CH - TABLE_HEIGHT/2, TABLE_HEIGHT, CW - TABLE_WIDTH, generalImages[3], 90)
    // the box for the monkey
    c.rect((CW*0.1)/2 + 50, CH - TABLE_HEIGHT/2, MONKEY_SIZE * 3, MONKEY_SIZE  * 3, "rgb(123, 62, 200)")
    // the box for the relocation
    c.rect(RELOCATE_BOX_INFO.x ,RELOCATE_BOX_INFO.y, RELOCATE_BOX_INFO.w, RELOCATE_BOX_INFO.h, "rgb(243, 92, 20)")
    c.text("Relocate", RELOCATE_BOX_INFO.x ,RELOCATE_BOX_INFO.y + RELOCATE_BOX_INFO.txt, size = 50, color = "rgb(255, 225, 205)", bold = true, font = "Courier New", isMeasureText = true, isStroke = "black")
    // the box for selling
    c.rect(SELL_BOX_INFO.x ,SELL_BOX_INFO.y, SELL_BOX_INFO.w, SELL_BOX_INFO.h, "rgb(183, 62, 100)")
    c.text("Sell", SELL_BOX_INFO.x ,SELL_BOX_INFO.y + SELL_BOX_INFO.txt, size = 50, color = "rgb(255, 225, 205)", bold = true, font = "Courier New", isMeasureText = true, isStroke = "black")
    
    const LENGTH = MONKEY_DATA[monkey.type-1].length - 1
    for (let index = 0; index < LENGTH; index++) {
        const monLevel = monkey.levels[index]
        const monkeyData = MONKEY_DATA[monkey.type-1][index+1][monLevel]
        
        c.rect(IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20),IMP_BOX_INFO.y, IMP_BOX_INFO.w-20, IMP_BOX_INFO.h-10, "rgb(83, 162, 200)")
        let text = `Lvl. ${monLevel+1}`
        let monkeyImage = monkey.findMonkeyPrintImageSkinOrBase()
        if (monLevel == MONKEY_DATA[monkey.type-1][index+1].length) {
            text = "Max"
            c.img(IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20),IMP_BOX_INFO.y, IMP_BOX_INFO.w-20, IMP_BOX_INFO.h-10, monkeyImage[1])
        } else {
            const activatedSkin = monkeyImages[monkey.type-1].levels[index][monLevel].activated
            let image = monkeyImages[monkey.type-1].levels[index][monLevel].normal
            if (monkey.getActivated() != null && activatedSkin) {
                image = activatedSkin
            }
            c.img(IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20),IMP_BOX_INFO.y, IMP_BOX_INFO.w-20, IMP_BOX_INFO.h-10, image)
        }
        c.text(text, IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20),IMP_BOX_INFO.y + IMP_BOX_INFO.txt, size = 45, color = "rgb(255, 225, 205)", bold = true, font = "Courier New", isMeasureText = true)
        
        if (!monkeyData) {
            c.rect(IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20),IMP_BOX_INFO.y, IMP_BOX_INFO.w-20, IMP_BOX_INFO.h-10, "rgb(0,0,0,0.4)")
        } else {
            const canBuyM = monkey.canBuy(index)
            if (!canBuyM) {
                c.rect(IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20),IMP_BOX_INFO.y, IMP_BOX_INFO.w-20, IMP_BOX_INFO.h-10, "rgb(0,0,0,0.4)")
            } 
        }
    }

    // print monkey
    table_image = monkeyImages[monkey.type-1].profile
    if (table_image == 0) {
        table_image = monkeyImages[monkey.type-1].origin
    }
    c.img((CW*0.1)/2 + 50, CH - TABLE_HEIGHT/2, MONKEY_SIZE * 2.5, MONKEY_SIZE  * 2.5, table_image)
}

function handleMonkeyMenu(mouse) {
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
        bestIndex = printMenuMonkeyVar
        let monk = monkeys[bestIndex-1]
        let monType = monk.type
        const LENGTH = MONKEY_DATA[monType-1].length
        for (let index = 0; index < LENGTH-1; index++) {
            if (isInsideRectangle(mouse.x, mouse.y, IMP_BOX_INFO.x + (index)*(IMP_BOX_INFO.w+20),IMP_BOX_INFO.y, IMP_BOX_INFO.w-20, IMP_BOX_INFO.h-10)) {
                let monLevel = monk.levels[index] // 0,1,2 pressed level
                if (monLevel < MONKEY_DATA[monType-1][index+1].length) { // if has another level to activate
                    const monkeyData = MONKEY_DATA[monType-1][index+1][monLevel]
                    
                    const canBuyM = monk.canBuy(index)
                    if (canBuyM) {
                        monk.levels[index] += 1
                        money -= monkeyData.price
                        const activated = monk.getActivated() // list of all activations

                        if (activated != null) {
                            monk.setOrigin()
                            let MainPath = 0
                            for (let i = 0; i < monk.levels.length; i++) {
                                if (monk.levels[i] > monk.levels[MainPath]) {
                                    MainPath = i
                                }
                            }
                            for (let level = 0; level < monk.levels[MainPath]; level++) {
                                upgradeByData(monk, MONKEY_DATA[monType-1][MainPath+1][level])
                            }
                            for (let numAct = 0; numAct < activated.length; numAct++) {
                                currentPathToActivate = activated[numAct]
                                upgradeByData(monk, MONKEY_DATA[monType-1][0]["activate"][currentPathToActivate])
                            }
                        } else {
                            let check = true
                            for (let i = 0; i < monk.levels.length; i++) {
                                if (monk.levels[i] >= LIMIT_ACTIVATED & i != index) {
                                    check = false
                                }
                            }
                            if (check) {
                                upgradeByData(monk, monkeyData)
                            }
                        }
                    }
                }
                continue;
            }
        }
    }
}

function upgradeByData(monk, monkeyData) {
    for (const key in monkeyData) {
        const improvement = monkeyData[key];
        if (key == "arrow") {
            for (const subKey in improvement) {
                monk.arrow[subKey] = improvement[subKey]
            }

        } else {
            if (key == "activate") {

            } else if (key == "price") {
                monk.price += monkeyData.price
            } else {
                monk[key] = improvement                         
            }
        }
    }
}