// red balloon 1
// blue balloon 2
// green balloon 3
// yellow balloon 4
// pink balloon 5
// black balloon 6
// white balloon 7
// lead balloon 8
// zebra balloon 9
// rainbow balloon 10
// ceramic balloon 11
// blue MOAB 12

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
    // Level 31
    [
        {
            type: 10,
            start: 0,
            end: 5,
            count: 15,
        },
        {
            type: 10,
            start: 6,
            end: 10,
            count: 20,
        },
    ],
    // Level 32
    [
        {
            type: 11, // Ceramic balloons introduced
            start: 0,
            end: 10,
            count: 5,
        },
        {
            type: 10,
            start: 5,
            end: 15,
            count: 25,
        },
    ],
    // Level 33
    [
        {
            type: 11,
            start: 0,
            end: 10,
            count: 10,
        },
        {
            type: 10,
            start: 5,
            end: 15,
            count: 30,
        },
    ],
    // Level 34
    [
        {
            type: 11,
            start: 0,
            end: 12,
            count: 15,
        },
        {
            type: 10,
            start: 6,
            end: 18,
            count: 35,
        },
    ],
    // Level 35
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 20,
        },
        {
            type: 10,
            start: 8,
            end: 20,
            count: 40,
        },
    ],
    // Level 36
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 25,
        },
        {
            type: 10,
            start: 10,
            end: 25,
            count: 45,
        },
    ],
    // Level 37
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 30,
        },
        {
            type: 10,
            start: 12,
            end: 27,
            count: 50,
        },
    ],
    // Level 38
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 35,
        },
        {
            type: 10,
            start: 14,
            end: 29,
            count: 55,
        },
    ],
    // Level 39
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 40,
        },
        {
            type: 10,
            start: 16,
            end: 31,
            count: 60,
        },
    ],
    // Level 40
    [
        {
            type: 12, // Blue MOAB introduced
            start: 0,
            end: 1,
            count: 1,
        },
    ],
    // Level 41
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 25,
        },
        {
            type: 12,
            start: 18,
            end: 18,
            count: 1,
        },
    ],
    // Level 42
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 30,
        },
        {
            type: 12,
            start: 20,
            end: 20,
            count: 1,
        },
    ],
    // Level 43
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 35,
        },
        {
            type: 12,
            start: 22,
            end: 22,
            count: 2,
        },
    ],
    // Level 44
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 40,
        },
        {
            type: 12,
            start: 24,
            end: 24,
            count: 2,
        },
    ],
    // Level 45
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 45,
        },
        {
            type: 12,
            start: 26,
            end: 26,
            count: 3,
        },
    ],
    // Level 46
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 50,
        },
        {
            type: 12,
            start: 28,
            end: 28,
            count: 3,
        },
    ],
    // Level 47
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 55,
        },
        {
            type: 12,
            start: 30,
            end: 30,
            count: 4,
        },
    ],
    // Level 48
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 60,
        },
        {
            type: 12,
            start: 32,
            end: 32,
            count: 4,
        },
    ],
    // Level 49
    [
        {
            type: 11,
            start: 0,
            end: 15,
            count: 65,
        },
        {
            type: 12,
            start: 34,
            end: 34,
            count: 5,
        },
    ],
    // Level 50
    [
        {
            type: 12,
            start: 0,
            end: 30,
            count: 10,
        },
    ],
    // Level 51
    [
        {
            type: 11,
            start: 0,
            end: 20,
            count: 70,
        },
        {
            type: 12,
            start: 22,
            end: 22,
            count: 5,
        },
    ],
    // Level 52
    [
        {
            type: 12,
            start: 0,
            end: 15,
            count: 6,
        },
        {
            type: 12,
            start: 16,
            end: 30,
            count: 6,
        },
    ],
    // Level 53
    [
        {
            type: 12,
            start: 0,
            end: 20,
            count: 12,
        },
    ],
    // Level 54
    [
        {
            type: 11,
            start: 0,
            end: 25,
            count: 80,
        },
        {
            type: 12,
            start: 27,
            end: 27,
            count: 6,
        },
    ],
    // Level 55
    [
        {
            type: 12,
            start: 0,
            end: 20,
            count: 15,
        },
    ],
    // Level 56
    [
        {
            type: 12,
            start: 0,
            end: 20,
            count: 18,
        },
    ],
    // Level 57
    [
        {
            type: 12,
            start: 0,
            end: 20,
            count: 21,
        },
    ],
    // Level 58
    [
        {
            type: 12,
            start: 0,
            end: 20,
            count: 24,
        },
    ],
    // Level 59
    [
        {
            type: 12,
            start: 0,
            end: 25,
            count: 27,
        },
    ],
    // Level 60
    [
        {
            type: 12,
            start: 0,
            end: 25,
            count: 30,
        },
    ],
    // Level 61
    [
        {
            type: 12,
            start: 0,
            end: 20,
            count: 35,
        },
    ],
    // Level 62
    [
        {
            type: 12,
            start: 0,
            end: 20,
            count: 40,
        },
    ],
    // Level 63
    [
        {
            type: 12,
            start: 0,
            end: 20,
            count: 45,
        },
    ],
    // Level 64
    [
        {
            type: 12,
            start: 0,
            end: 20,
            count: 50,
        },
    ],
    // Level 65
    [
        {
            type: 12,
            start: 0,
            end: 25,
            count: 55,
        },
    ],
    // Level 66
    [
        {
            type: 12,
            start: 0,
            end: 25,
            count: 60,
        },
    ],
    // Level 67
    [
        {
            type: 12,
            start: 0,
            end: 25,
            count: 65,
        },
    ],
    // Level 68
    [
        {
            type: 12,
            start: 0,
            end: 25,
            count: 70,
        },
    ],
    // Level 69
    [
        {
            type: 12,
            start: 0,
            end: 25,
            count: 75,
        },
    ],
    // Level 70
    [
        {
            type: 12,
            start: 0,
            end: 30,
            count: 80,
        },
    ],
    // Level 71
    [
        {
            type: 11,
            start: 0,
            end: 20,
            count: 100,
        },
        {
            type: 12,
            start: 22,
            end: 35,
            count: 40,
        },
    ],
    // Level 72
    [
        {
            type: 10,
            start: 0,
            end: 15,
            count: 150,
        },
        {
            type: 11,
            start: 5,
            end: 25,
            count: 100,
        },
        {
            type: 12,
            start: 27,
            end: 40,
            count: 50,
        },
    ],
    // Level 73
    [
        {
            type: 11,
            start: 0,
            end: 20,
            count: 120,
        },
        {
            type: 12,
            start: 22,
            end: 35,
            count: 60,
        },
    ],
    // Level 74
    [
        {
            type: 11,
            start: 0,
            end: 25,
            count: 140,
        },
        {
            type: 12,
            start: 27,
            end: 40,
            count: 70,
        },
    ],
    // Level 75
    [
        {
            type: 12,
            start: 0,
            end: 30,
            count: 90,
        },
    ],
]