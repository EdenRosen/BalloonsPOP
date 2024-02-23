function PrintMenuMonkey() {
    monkey = monkeys[printMenuMonkeyVar-1]
    c.rect((CW-TABLE_WIDTH)/2, CH - TABLE_HEIGHT/2, CW - TABLE_WIDTH, TABLE_HEIGHT, "rgb(123, 62, 100)")
    c.rect((CW*0.1)/2 + 50, CH - TABLE_HEIGHT/2, CW*0.2, TABLE_HEIGHT*0.5, "rgb(123, 62, 200)")
    c.rect((CW*0.1)/2 + 150 + TABLE_HEIGHT*0.5, CH - TABLE_HEIGHT/2, CW*0.05, TABLE_HEIGHT*0.2, "rgb(183, 62, 100)")
    // print monkey

    table_image = monkeyImages[monkey.type-1].profile
    if (table_image == 0) {
        table_image = monkeyImages[monkey.type-1].skin[0]
    }
    c.img((CW*0.1)/2 + 50, CH - TABLE_HEIGHT/2, MONKEY_SIZE * 1.5, MONKEY_SIZE  * 1.5, table_image)
}