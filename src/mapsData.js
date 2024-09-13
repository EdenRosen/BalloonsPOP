const MAPS_DATA = [
    {
        name: 'map',
        id: 1,
        waypoints: [
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
        ],
        tunnels: [
            {x: 900, y: 758, w: 200, h: 330, under: [6]},
            {x: 547, y: 760, w: 340, h: 200, under: [15]},
        ],
    },
    {
        name: 'map with pond',
        id: 2,
        waypoints: [
            {x: -15, y: 600},
            {x: 300, y: 600},
            {x: 300, y: 420},
            {x: 540, y: 420},
            {x: 540, y: 1000},
            {x: 895, y: 1000},
            {x: 895, y: 255},
            {x: 300, y: 235},
            {x: 300, y: 75},
            {x: 1085, y: 75},
            {x: 1085, y: 240},
            {x: 1300, y: 245},
            {x: 1300, y: 430},
            {x: 1085, y: 435},
            {x: 1085, y: 760},
            {x: 290, y: 780},
            {x: 290, y: 1100},
        ],
        tunnels: [
            {x: 900, y: 758, w: 200, h: 330, under: [6]},
            {x: 547, y: 760, w: 340, h: 200, under: [15]},
        ],
        ponds: [
            [
                {x: 1247, y: 932, radius: 115},
                {x: 1150, y: 932, radius: 65},
                
            ],
        ],
    },
]