const GENERAL_IMAGES_NAMES = ['maps_bg', 'pop', 'heart', 'coins', 'wooden_floor', 'sun1', 'difficulties', 'sandwatch']

const MONKEY_IMAGES_INFO = [
    { profile: true, base: false, options: [0,0] }, // Monkey
    { profile: true, base: false, options: [4,4,4] }, // Tack shooter
    { profile: true, base: false, options: [0] }, // Pikachu
    { profile: true, base: false, options: [1,3] }, // Mario
    { profile: true, base: true, options: [3,3,3], activated: [true, true, true], }, // Red shooter
    { profile: true, base: true, options: [3,3] }, // Rocket launcher
    { profile: true, base: true, options: [0] }, // Sunflower
    { profile: true, base: false, options: [0] }, // Winter Watermelon
    { profile: true, base: false, options: [0] }, // Submarine
    { profile: true, base: false, options: [3] }, // Inferno Tower
]

// Image resources
var mapImages = []
var balloonImages = []
var frozenBalloonImages = []
var monkeyImages = []
var arrowImages = []
var generalImages = {}
var animationsData = {}

// load images from a given folder function
function loadImages(length, folderName, nameType, names=[], type='png') {
    var namesGiven = names.length > 0
    var images = []
    var objectImages = {}
    for (let i = 0; i < length; i++) {
        var image = new Image()
        var name = namesGiven ? nameType + names[i] : nameType + (i+1)
        image.src = `images/${folderName}/${name}.${type}`
        if (namesGiven) {
            objectImages[name] = image
        } else {
            images.push(image)
        }
    }
    return namesGiven ? objectImages : images
}

mapImages = loadImages(4, 'maps', 'map')
generalImages = loadImages(GENERAL_IMAGES_NAMES.length, 'general', '', GENERAL_IMAGES_NAMES)
arrowImages = loadImages(8, 'arrows', 'a')
balloonImages = loadImages(12, 'balloons/origin', 'b')
frozenBalloonImages = loadImages(11, 'balloons/frozen', 'b')
animationsData.explosion1 = loadImages(8, 'bombAnimation', 'frame')
animationsData.freeze1 = loadImages(10, 'freezeAnimation', 'frame')
animationsData.sunflower = loadImages(59, 'monkeys/monkey7/gif', '', [], 'gif')

// load monkey images
for (let i = 0; i < MONKEY_IMAGES_INFO.length; i++) {
    const folderName = `monkey${i+1}`
    
    var base = new Image()
    var profile = new Image()
    var origin = new Image()

    origin.src = `images/monkeys/${folderName}/origin.png`
    base.src = `images/monkeys/${folderName}/base.png`
    profile.src = `images/monkeys/${folderName}/profile.png`
    
    const imagesInfo = MONKEY_IMAGES_INFO[i]
    const monkeyInfo = MONKEY_DATA[i]
    var levelsImages = []
    for (let n = 0; n < monkeyInfo.length - 1; n++) {
        levelsImages[n] = []
        for (let j = 0; j < monkeyInfo[n+1].length; j++) {
            var imageObject = {
                normal: origin,
                activated: null,
            }
            if (imagesInfo.options[n] >= j+1) {
                imageObject.normal = new Image()
                imageObject.normal.src = `images/monkeys/${folderName}/option${n+1}/level${j+1}.png`

                if (imagesInfo.activated != undefined && imagesInfo.activated[n]) {
                    let image2 = new Image()
                    image2.src = `images/monkeys/${folderName}/option${n+1}_a/level${j+1}.png`
                    imageObject.activated = image2
                }
            }
            levelsImages[n].push(imageObject)
        }
    }

    if (!imagesInfo.profile) {
        profile = origin
    }

    var skins = {
        origin,
        profile,
        levels: levelsImages
    }

    if (MONKEY_IMAGES_INFO[i].base) {
        skins.base = base
    }
    

    monkeyImages.push(skins)
}