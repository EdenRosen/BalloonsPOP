const MONKEY_DATA = [
    [
        {
            origin: {
                name: "Monkey Left level 0",
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
                price: 180,
            }, 
            activate: {

            }
        },
        [
            {
                name: "Monkey Left level 1",
                range: 260,
                price: 220,
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
            {
                name: "Monkey Left level 4",
                range: 290,
                price: 720,
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
            {
                name: "Monkey Right level 4",
                cooldown: 15,
                price: 720,
            },
        ],
    ],
    [
        {
            origin: {
                name: "Pikachu",
                arrow: {
                    type: 6,
                    strength: 2,
                    health: 8,
                    size: 1.2,
                    offset: [[20, 0], [-20, 0],],
                },
                range: 230,
                cooldown: 4,
                price: 750,
                armored_balloons: true,
            },
            activate: {

            }
        },
        [
            {
                name: "Pikachu level 1",
                arrow: {
                    health: 10,
                    strength: 3,
                },
                price: 860,
            },
            {
                name: "Pikachu level 2",
                arrow: {
                    health: 12,
                    strength: 5,
                },
                price: 860,
            },
            {
                name: "Pikachu level 3",
                arrow: {
                    health: 15,
                },
                price: 1860,
            },
            {
                name: "Pikachu level 4",
                arrow: {
                    health: 18,
                },
                price: 2860,
            },
        ]
    ],
    [
        { 
            origin: {
                name: "Mario",
                arrow: {
                    type: 2,
                    strength: 1.5,
                    health: 2,
                    size: 1.7,
                    speed: 0.6,
                    range: 170,
                },
                range: 170,
                cooldown: 4,
                price: 400,
                armored_balloons: true,
            },
            activate: {

            }
        },
        [
            {
                name: "Mario level 2",
                arrow: {
                    health: 3,
                    strength: 2,
                    speed: 0.7,
                },
                price: 560,
            },
            {
                name: "Mario level 3",
                arrow: {
                    health: 6,
                    strength: 3,
                },
                price: 1060,
            },
            {
                name: "Mario level 4",
                arrow: {
                    health: 8,
                    speed: 1,
                },
                price: 1560,
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
                    angleError: 15,
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
                },
            ],
        },
        [ // red shooter - strength
            {
                name: "Red shooter level 2",
                arrow: {
                    offset: [[9, 0], [-9, 0],],
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
                    offset: [[0, 30]],
                    range: 1600,
                },
                range: 260,
                base_size_ratio: 0.65,
                size: 2,
                price: 1560,
            },
        ],
        [ // orange shooter - precision & cooldown
            {
                name: "Orange shooter level 2",
                arrow: {
                    offset: [[7, 0], [-7, 0],],
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
                base_size_ratio: 0.65,
                size: 2,
                price: 1560,
            },
        ],
        [ // yellow shooter - range & precision
            {
                name: "Yellow shooter level 2",
                arrow: {
                    offset: [[7, 0], [-7, 0],],
                    alternating: true,
                    angleError: 8,
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
                },
                range: 500,
                base_size_ratio: 0.65,
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
                    strength: 2,
                    speed: 0.7,
                    bomb: {
                        animation: 'explosion1',
                        radius: 150,
                        speed: 0.7,
                    },
                    range: 600,
                },
                range: 270,
                cooldown: 60,
                price: 350,
                size: 1.4,
                armored_balloons: true,
            },
            activate: [ // faster, bigger
                {
                    
                    cooldown: 35,
                },
                {
                    arrow: {
                        angleError: 3
                    },
                    cooldown: 4,
                },
                {
                    range: 600,
                },
            ],
        },
        [ // faster
            {
                name: "Rocket Launcher Super",
                arrow: {
                    strength: 3,
                    offset: [[10, 0], [-10, 0]],
                    alternating: true,
                },
                size: 1.8,
                base_size_ratio: 0.7,
                cooldown: 45,
                price: 430,
            },
            {
                name: "Rocket Launcher Super Duper",
                arrow: {
                    strength: 4,
                    offset: [[13, 0], [0, 0], [-13, 0]],
                },
                size: 2,
                base_size_ratio: 0.75,
                cooldown: 30,
                price: 850,
            },
            {
                name: "Rocket Launcher Super Duper Max",
                arrow: {
                    range: 600,
                    speed: 0.9,
                    size: 1.2,
                },
                cooldown: 15,
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
                base_size_ratio: 0.7,
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
                base_size_ratio: 0.75,
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
]