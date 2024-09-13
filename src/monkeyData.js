const MONKEY_DATA = [
    [
        {
            origin: {
                name: "Monkey",
                arrow: {
                    type: 1,
                    strength: 1,
                    health: 1,
                    speed: 0.8,
                    offset: [[18, 0]],
                    range: 600,
                },
                range: 250,
                cooldown: 40,
                price: 100,
            }, 
            activate: {

            }
        },
        [
            {
                name: "Monkey Left level 1",
                arrow: {
                    strength: 1,
                    health: 2,
                },
                range: 260,
                price: 140,
            },
            {
                name: "Monkey Left level 2",
                range: 270,
                price: 420,
            },
            {
                name: "Monkey Left level 3",
                range: 280,
                price: 620,
            },
        ],
        [
            {
                name: "Monkey Right level 1",
                cooldown: 40,
                price: 220,
            },
            {
                name: "Monkey Right level 2",
                cooldown: 30,
                price: 420,
            },
            {
                name: "Monkey Right level 3",
                cooldown: 20,
                price: 620,
            },
        ],
    ],
    [
        {
            origin: {
                name: "Tack Shooter",
                arrow: {
                    type: 1,
                    strength: 1,
                    health: 1,
                    speed: 0.8,
                    range: 160,
                    angleError: 0,
                },
                size: 1.2,
                numShooters: 8,
                range: 160,
                cooldown: 40,
                price: 180,
                rotatable: false,
            }, 
            activate: [
                {
                    arrow: {
                        speed: 2,
                        range: 260,
                    },
                    range: 260, 
                },
                {
                    arrow: {
                        health: 3,
                        strength: 3,
                    },
                },
                {
                    cooldown: 35,
                    size: 1.4, 
                },
            ]
        },
        [ // health & range
            {
                name: "Fire Shooter level 1",
                arrow: {
                    range: 180,
                    strength: 2,
                },
                size: 1.3,
                range: 180,
                price: 220,
            },
            {
                name: "Fire Shooter Left level 2",
                arrow: {
                    type: 2,
                    range: 200,
                    speed: 0.5,
                    size: 1.2,
                    health: 3,
                },
                armoredBalloons: true,
                size: 1.4,
                cooldown: 60,
                range: 200,
                price: 420,
            },
            {
                name: "Fire Shooter Left level 3",
                arrow: {
                    range: 220,
                    health: 6,
                    size: 1.3,
                },
                size: 1.2,
                range: 220,
                armored_balloons: true,
                price: 620,
            },
            {
                name: "Fire Shooter Left level 4",
                arrow: {
                    strength: 3,
                    range: 240,
                    size: 2,
                    health: 15,
                },
                numShooters: 5,
                size: 1.5,
                range: 240,
                price: 720,
            },
        ],
        [ // power & health
            {
                name: "Tack Shooter Middle level 1",
                arrow: {
                    health: 2,
                    strength: 2,
                },
                size: 1.38,
                price: 330,
            },
            {
                name: "Tack Shooter Middle level 2",
                arrow: {
                    strength: 4,
                },
                size: 1.6,
                price: 670,
            },
            {
                name: "Tack Shooter Middle level 3",
                arrow: {
                    health: 4,
                    strength: 5,
                    size: 1.8,
                },
                size: 1.6,
                numShooters: 5,
                price: 1220,
            },
            {
                name: "Tack Shooter Middle level 4",
                arrow: {
                    health: 6,
                    strength: 6,
                    size: 2.3,
                },
                size: 1.6,
                armored_balloons: true,
                price: 1720,
            },
        ],
        [ // more numShooters & cooldown
            {
                name: "Tack Shooter Right level 1",
                cooldown: 35,
                numShooters: 10,
                size: 1.4,
                price: 330,
            },
            {
                name: "Tack Shooter Right level 2",
                cooldown: 25,
                numShooters: 16,
                arrow: {
                    strength: 2,
                },
                size: 1.5,
                price: 670,
            },
            {
                name: "Tack Shooter Right level 3",
                cooldown: 20,
                arrow: {
                    strength: 3,
                },
                size: 1.5,
                price: 1220,
            },
            {
                name: "Tack Shooter Right level 4",
                cooldown: 15,
                arrow: {
                    strength: 4,
                },
                size: 1.6,
                price: 2720,
            },
        ],
    ],
    [
        {
            origin: {
                name: "Pikachu",
                arrow: {
                    type: 6,
                    strength: 1,
                    health: 3,
                    size: 1.2,
                    offset: [[20, 0], [-20, 0],],
                },
                range: 230,
                cooldown: 25,
                price: 750,
                armoredBalloons: true,
            },
            activate: 
                [ // red, orange, yellow
                {
                    arrow: {
                        health: 6,
                    },
                    cooldown: 20,
                },
                {
                    arrow: {
                        strength: 3
                    },
                    range: 250,
                    cooldown: 20,
                },
            ],
        },
        [ // arrow health and strength
            {
                name: "Pikachu level 1",
                arrow: {
                    health: 5,
                },
                price: 660,
            },
            {
                name: "Pikachu level 2",
                arrow: {
                    health: 7,
                },
                cooldown: 22,
                price: 860,
            },
            {
                name: "Pikachu level 3",
                arrow: {
                    health: 9,
                },
                cooldown: 19,
                price: 1360,
            },
            {
                name: "Pikachu level 4",
                arrow: {
                    health: 12,
                    strength: 2,
                },
                cooldown: 17,
                price: 1860,
            },
        ],
        [ // cooldown and strength
            {
                name: "Pikachu2 level 1",
                arrow: {
                    strength: 2,
                },
                cooldown: 20,
                range: 250,
                price: 660,
            },
            {
                name: "Pikachu2 level 2",
                arrow: {
                    strength: 3,
                },
                cooldown: 16,
                range: 270,
                price: 860,
            },
            {
                name: "Pikachu2 level 3",
                arrow: {
                    strength: 4,
                },
                cooldown: 12,
                range: 290,
                price: 1660,
            },
            {
                name: "Pikachu2 level 4",
                arrow: {
                    strength: 5,
                },
                cooldown: 8,
                range: 320,
                price: 260,
            },
        ],
        [ // arrow health and strength
            {
                name: "Pikachu3 level 1",
                arrow: {
                    type: 6,
                    strength: 2,
                    health: 10,
                    size: 1.4,
                    offset: null
                },
                cooldown: 40,
                size: 1.2,
                price: 660,
            },
            {
                name: "Pikachu3 level 2",
                arrow: {
                    health: 20,
                    size: 1.5,
                },
                cooldown: 50,
                size: 1.3,
                price: 860,
            },
            {
                name: "Pikachu3 level 3",
                arrow: {
                    health: 30,
                    size: 1.6,
                },
                size: 1.4,
                price: 1360,
            },
            {
                name: "Pikachu3 level 4",
                arrow: {
                    health: 40,
                    strength: 2,
                    size: 1.7,
                },
                size: 1.5,
                price: 1860,
            },
        ],
    ],
    [
        { 
            origin: {
                name: "Mario",
                arrow: {
                    type: 2,
                    strength: 1,
                    health: 2,
                    size: 1.5,
                    speed: 0.6,
                    range: 170,
                },
                range: 170,
                cooldown: 7,
                price: 500,
                armoredBalloons: true,
            },
            activate: [
                {
                    arrow: {
                        health: 5,
                    },
                    range: 190,
                },
                {
                    arrow: {
                        strength: 4,
                    },
                    cooldown: 4,
                },
            ]
        },
        [ // range and health
            {
                name: "Mario level 2",
                arrow: {
                    health: 3,
                    size: 1.7,
                },
                range: 180,
                size: 1.1,
                price: 460,
            },
            {
                name: "Mario level 3",
                arrow: {
                    health: 5,
                },
                range: 190,
                size: 1.2,
                price: 960,
            },
            {
                name: "Mario level 4",
                arrow: {
                    health: 8,
                    size: 1.8,
                },
                size: 1.4,
                range: 210,
                price: 1460,
            },
        ],
        [ // strength and cooldown
            {
                name: "Mario2 level 2",
                arrow: {
                    strength: 2,
                    size: 1.7,
                },
                cooldown: 5,
                size: 1.1,
                price: 560,
            },
            {
                name: "Mario2 level 3",
                arrow: {
                    strength: 4,
                },
                size: 1.2,
                cooldown: 4,
                price: 1160,
            },
            {
                name: "Mario2 level 4",
                arrow: {
                    strength: 6,
                    size: 1.8,
                },
                size: 1.4,
                cooldown: 3,
                price: 1660,
            },
        ]
    ],
    [
        {
            origin: {
                name: "Red shooter",
                arrow: {
                    type: 1,
                    strength: 1,
                    health: 1,
                    range: 600,
                    angleError: 10,
                    offset: [[0, 30],],
                },
                range: 220,
                cooldown: 12,
                price: 240,
                size: 1.4
            },
            activate: [ // red, orange, yellow
                {
                    arrow: {
                        strength: 2,
                    },
                },
                {
                    arrow: {
                        angleError: 3
                    },
                    cooldown: 4,
                },
                {
                    range: 600,
                    arrow: {
                        speed: 1.2,
                    }
                },
            ],
        },
        [ // red shooter - strength
            {
                name: "Red shooter level 2",
                arrow: {
                    offset: [[9, 30], [-9, 30],],
                    alternating: true,
                    strength: 1.5,
                },
                range: 240,
                cooldown: 8,
                price: 560,
            },
            {
                name: "Red shooter level 3",
                arrow: {
                    strength: 3,
                    offset: null,
                    size: 1.1,
                    angleError: 10,
                    offset: [[0, 30]],
                },
                range: 250,
                cooldown: 5,
                price: 850,
            },
            {
                name: "Red shooter level 4",
                arrow: {
                    strength: 4,
                    size: 1.3,
                    range: 1600,
                },
                range: 260,
                baseSizeRatio: 0.65,
                size: 2,
                price: 1560,
            },
        ],
        [ // orange shooter - precision & cooldown
            {
                name: "Orange shooter level 2",
                arrow: {
                    offset: [[9, 30], [-9, 30],],
                    alternating: true,
                    angleError: 6,
                },
                range: 270,
                cooldown: 6,
                price: 560,
            },
            {
                name: "Orange shooter level 3",
                arrow: {
                    strength: 1.5,
                    offset: null,
                    size: 1.1,
                    angleError: 3,
                    offset: [[0, 30]],
                },
                range: 290,
                cooldown: 3,
                price: 850,
            },
            {
                name: "Orange shooter level 4",
                arrow: {
                    strength: 3,
                    size: 1.3,
                    offset: [[0, 30]],
                    range: 1600,
                    angleError: 0,
                },
                baseSizeRatio: 0.65,
                size: 2,
                price: 1560,
            },
        ],
        [ // yellow shooter - range & precision
            {
                name: "Yellow shooter level 2",
                arrow: {
                    offset: [[9, 30], [-9, 30],],
                    alternating: true,
                    angleError: 8,
                    speed: 1.1,
                },
                range: 290,
                cooldown: 6,
                price: 560,
            },
            {
                name: "Yellow shooter level 3",
                arrow: {
                    strength: 1.5,
                    offset: null,
                    size: 1.1,
                    angleError: 6,
                    speed: 1.2,
                    offset: [[0, 30]],
                },
                range: 400,
                price: 850,
            },
            {
                name: "Yellow shooter level 4",
                arrow: {
                    strength: 3,
                    size: 1.3,
                    offset: [[0, 30]],
                    range: 1600,
                    angleError: 5,
                    speed: 1.3,
                },
                range: 500,
                baseSizeRatio: 0.65,
                size: 2,
                price: 1560,
            },
        ],
    ],
    [
        {
            origin: {
                name: "Rocket Launcher",
                arrow: {
                    type: 7,
                    strength: 1,
                    speed: 0.7,
                    bomb: {
                        animation: 'explosion1',
                        radius: 150,
                        speed: 0.7,
                    },
                    range: 600,
                },
                range: 270,
                cooldown: 100,
                price: 520,
                size: 1.4,
                armoredBalloons: true,
            },
            activate: [ // faster, bigger
                {
                    
                    cooldown: 35,
                },
                {
                    range: 330,
                    bomb: {
                        animation: 'explosion1',
                        radius: 170,
                        speed: 0.7,
                    },
                },
            ],
        },
        [ // faster
            {
                name: "Rocket Launcher Super",
                arrow: {
                    strength: 2,
                    offset: [[10, 0], [-10, 0]],
                    alternating: true,
                },
                size: 1.8,
                baseSizeRatio: 0.7,
                cooldown: 80,
                price: 430,
            },
            {
                name: "Rocket Launcher Super Duper",
                arrow: {
                    strength: 3,
                    offset: [[13, 0], [0, 0], [-13, 0]],
                },
                size: 2,
                baseSizeRatio: 0.75,
                cooldown: 50,
                price: 850,
            },
            {
                name: "Rocket Launcher Super Duper Max",
                arrow: {
                    range: 600,
                    speed: 0.9,
                    size: 1.2,
                },
                cooldown: 25,
                price: 1530,
            },
        ],
        [ // bigger
            {
                name: "Rocket Launcher Super",
                arrow: {
                    strength: 4,
                    speed: 0.9,
                    bomb: {
                        animation: 'explosion1',
                        radius: 170,
                        speed: 0.7,
                    },
                },
                size: 1.8,
                baseSizeRatio: 0.7,
                cooldown: 45,
                range: 300,
                price: 430,
            },
            {
                name: "Rocket Launcher Super Duper",
                arrow: {
                    strength: 6,
                    speed: 1.1,
                    bomb: {
                        animation: 'explosion1',
                        radius: 220,
                        speed: 0.7,
                    },
                },
                size: 2,
                baseSizeRatio: 0.75,
                cooldown: 40,
                range: 340,
                price: 850,
            },
            {
                name: "Rocket Launcher Super Duper Max",
                arrow: {
                    strength: 8,
                    range: 600,
                    speed: 1.2,
                    size: 1.6,
                    bomb: {
                        animation: 'explosion1',
                        radius: 300,
                        speed: 0.7,
                    },
                },
                range: 400,
                price: 1530,
            },
        ]
    ],
    [
        {
            origin: {
                name: "Sunflower",
                range: 250,
                cooldown: 500,
                price: 1100,
                animation: 'sunflower',
                factory: {
                    money: 50,
                    lifeTime: 500,
                }, // make an object out of it
                size: 1.4,
                baseSizeRatio: 0.75,
            },
            base: {
                xOffset: -7,
                yOffset: 46,
                relocating: false,
            },
            activate: {

            }
        },
        [
            {
                name: "Sunflower level 1",
                price: 220,
            },
        ],
    ],
    [/// fix later that each element has a pointer to the file location of its monkey
        {
            origin: {
                name: "Winter Watermelon",
                range: 450,
                cooldown: 200,
                price: 1600,
                arrow: {
                    type: 8,
                    strength: 0,
                    freeze: {speedEffect: 0.1, cooldown: 100},
                    size: 1.6,
                    // offset: [[50, 50]],
                    range: 1650,
                    speed: 0.5,
                    constTarget: true, 
                    bomb: {
                        animation: 'freeze1',
                        radius: 130,
                        speed: 0.8,
                        size: 2.3,
                    },
                },
                armoredBalloons: true,
                rotatable: false,
                target: true,
                size: 1.4,
                baseSizeRatio: 0.75,
            },
            base: {
                xOffset: 0,
                yOffset: 0,
                relocating: false,
            },
            activate: {

            }
        },
        [
            {
                name: "Sniper 2",
                price: 820,
            },
        ],
    ],
    [
        {
            origin: {
                name: "Submarine",
                arrow: {
                    type: 3,
                    strength: 1,
                    health: 10,
                    speed: 0.7,
                    range: 2500,
                    size: 0.8,
                    offset: [[13, 0], [0, 0], [-13, 0]],
                    alternating: true,
                    guided: true,
                    constTarget: false,
                    hitControl: false,
                },
                water: true,
                target: true,
                armoredBalloons: true,
                range: 2500,
                cooldown: 60,
                price: 700,
                size: 1.6,
            }, 
            activate: {

            }
        },
        [
            {
                name: "Submarine Left level 1",
                arrow: {
                    strength: 1,
                    health: 2,
                },
                range: 260,
                price: 140,
            },
            {
                name: "Submarine Left level 2",
                range: 270,
                price: 420,
            },
            {
                name: "Submarine Left level 3",
                range: 280,
                price: 620,
            },
        ],
        [
            {
                name: "Submarine Right level 1",
                cooldown: 40,
                price: 220,
            },
            {
                name: "Submarine Right level 2",
                cooldown: 30,
                price: 420,
            },
            {
                name: "Submarine Right level 3",
                cooldown: 20,
                price: 620,
            },
        ],
    ],
]