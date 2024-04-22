// red balloon 1
// blue balloon 2
// green balloon 3
// yellow balloon 4
// pink balloon 5
// black balloon 6
// white balloon 7
// lead balloon 8
// zebra balloon
// rainbow balloon
// ceramic balloon
// blue MOAB

const ROUNDS_DATA = [
    [ // lvl 1
        {
            type: 1,
            start: 0,
            end: 10,
            count: 10,
        },
        {
            type: 1,
            start: 4,
            end: 7,
            count: 10,
        },
    ],
    [ // lvl 2
        {
            type: 1,
            start: 0,
            end: 15,
            count: 25,
        },
        {
            type: 1,
            start: 7,
            end: 12,
            count: 10,
        },
    ],
    [ // lvl 3
        {
            type: 1,
            start: 0,
            end: 15,
            count: 25,
        },
        {
            type: 2,
            start: 0,
            end: 15,
            count: 5,
        },
    ],
    [ // lvl 4
        {
            type: 1,
            start: 0,
            end: 15,
            count: 25,
        },
        {
            type: 2,
            start: 10,
            end: 17,
            count: 10,
        },
        {
            type: 1,
            start: 17,
            end: 20,
            count: 10,
        },
        {
            type: 2,
            start: 20,
            end: 24,
            count: 8,
        },
    ],
    [ // lvl 5
        {
            type: 1,
            start: 0,
            end: 5,
            count: 5,
        },
        {
            type: 2,
            start: 5,
            end: 20,
            count: 27,
        },
    ],
    [ // lvl 6
        {
            type: 1,
            start: 0,
            end: 5,
            count: 15,
        },
        {
            type: 2,
            start: 4,
            end: 10,
            count: 15,
        },
        {
            type: 3,
            start: 8,
            end: 12,
            count: 4,
        },
    ],
    [ // lvl 7
        {
            type: 1,
            start: 0,
            end: 10,
            count: 20,
        },
        {
            type: 2,
            start: 0,
            end: 12,
            count: 20,
        },
        {
            type: 3,
            start: 9,
            end: 12,
            count: 5,
        },
    ],
    [ // lvl 8
        {
            type: 1,
            start: 8,
            end: 10,
            count: 10,
        },
        {
            type: 2,
            start: 4,
            end: 12,
            count: 20,
        },
        {
            type: 3,
            start: 0,
            end: 7,
            count: 14,
        },
    ],
    [ // lvl 9
        {
            type: 3,
            start: 0,
            end: 7,
            count: 10,
        },
        {
            type: 3,
            start: 7,
            end: 10,
            count: 10,
        },
        {
            type: 3,
            start: 10,
            end: 20,
            count: 10,
        },
    ],
    [ // lvl 10
        {
            type: 2,
            start: 0,
            end: 10,
            count: 20,
        },
        {
            type: 2,
            start: 8,
            end: 14,
            count: 20,
        },
        {
            type: 2,
            start: 14,
            end: 15,
            count: 10,
        },
        {
            type: 2,
            start: 15,
            end: 30,
            count: 50,
        },
        {
            type: 2,
            start: 15,
            end: 17,
            count: 2,
        },
    ],
    [ // lvl 11
        {
            type: 1,
            start: 0,
            end: 5,
            count: 10,
        },
        {
            type: 2,
            start: 0,
            end: 5,
            count: 10,
        },
        {
            type: 3,
            start: 0,
            end: 12,
            count: 12,
        },
        {
            type: 4,
            start: 0,
            end: 12,
            count: 3,
        },
    ],
    [ // lvl 12
        {
            type: 2,
            start: 0,
            end: 5,
            count: 15,
        },
        {
            type: 3,
            start: 0,
            end: 5,
            count: 10,
        },
        {
            type: 4,
            start: 0,
            end: 10,
            count: 5,
        },
    ],
    [ // lvl 13
        {
            type: 2,
            start: 0,
            end: 10,
            count: 50,
        },
        {
            type: 3,
            start: 0,
            end: 15,
            count: 23,
        },
    ],
    [ // lvl 14
        {
            type: 1,
            start: 0,
            end: 5,
            count: 48,
        },
        {
            type: 2,
            start: 0,
            end: 5,
            count: 15,
        },
        {
            type: 3,
            start: 5,
            end: 10,
            count: 10,
        },
        {
            type: 4,
            start: 10,
            end: 15,
            count: 9,
        },
    ],
    [ // lvl 15
        {
            type: 1,
            start: 15,
            end: 18,
            count: 20,
        },
        {
            type: 2,
            start: 0,
            end: 5,
            count: 15,
        },
        {
            type: 3,
            start: 0,
            end: 10,
            count: 12,
        },
        {
            type: 4,
            start: 8,
            end: 15,
            count: 10,
        },
        {
            type: 5,
            start: 10,
            end: 15,
            count: 5,
        },
    ],
    [ // lvl 16
        {
            type: 3,
            start: 0,
            end: 15,
            count: 40,
        },
        {
            type: 4,
            start: 13,
            end: 15,
            count: 8,
        },
    ],
    [ // lvl 17
        {
            type: 4,
            start: 0,
            end: 4,
            count: 12,
        },
    ],
    [ // lvl 18
        {
            type: 3,
            start: 0,
            end: 15,
            count: 50,
        },
        {
            type: 3,
            start: 0,
            end: 5,
            count: 10,
        },
        {
            type: 3,
            start: 5,
            end: 10,
            count: 20,
        },
    ],
    [ // lvl 19
        {
            type: 3,
            start: 0,
            end: 5,
            count: 10,
        },
        {
            type: 4,
            start: 0,
            end: 5,
            count: 9,
        },
        {
            type: 5,
            start: 0,
            end: 10,
            count: 15,
        },
    ],
    [ // lvl 20
        {
            type: 6,
            start: 0,
            end: 5,
            count: 6,
        },
    ],
    [ // lvl 21
        {
            type: 4,
            start: 0,
            end: 15,
            count: 40,
        },
        {
            type: 5,
            start: 0,
            end: 10,
            count: 14,
        },
    ],
    [ // lvl 22
        {
            type: 7,
            start: 0,
            end: 10,
            count: 18,
        },
    ],
    [ // lvl 23
        {
            type: 6,
            start: 1,
            end: 11,
            count: 7,
        },
        {
            type: 7,
            start: 0,
            end: 10,
            count: 7,
        },
    ],
    [ // lvl 24
        {
            type: 7, // camo balloons
            start: 0,
            end: 10,
            count: 30,
        },
    ],
    [ // lvl 25
        {
            type: 3,
            start: 0,
            end: 10,
            count: 25,
        },
        {
            type: 8, 
            start: 10,
            end: 15,
            count: 10,
        },
    ],
    [ // lvl 26
        {
            type: 5,
            start: 0,
            end: 10,
            count: 23,
        },
        {
            type: 9,
            start: 0,
            end: 10,
            count: 4,
        },
    ],
    [ // lvl 27
        {
            type: 1,
            start: 0,
            end: 10,
            count: 100,
        },
        {
            type: 2,
            start: 2,
            end: 12,
            count: 60,
        },
        {
            type: 3,
            start: 4,
            end: 14,
            count: 45,
        },
        {
            type: 4,
            start: 5,
            end: 15,
            count: 45,
        },
    ],
    [ // lvl 28
        {
            type: 10,
            start: 0,
            end: 6,
            count: 6,
        },
    ],
    [ // lvl 29
        {
            type: 4,
            start: 0,
            end: 6,
            count: 60,
        },
        {
            type: 4,
            start: 7,
            end: 8,
            count: 20,
        },
    ],
    [ // lvl 30
        {
            type: 10,
            start: 0,
            end: 5,
            count: 9,
        },
    ],
]