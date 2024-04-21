const GENERAL_IMAGES_NAMES = ['pop', 'heart', 'coins', 'wooden_floor',]

const MONKEY_IMAGES_INFO = [
    { profile: true, base: false, options: [0,0] },
    { profile: true, base: false, options: [0] },
    { profile: true, base: false, options: [0] },
    { profile: true, base: true, options: [3,3,3], activated: [true, true, true], },
    { profile: true, base: true, options: [3,3] },
]

// Image resources
var mapImages = []
var balloonImages = []
var monkeyImages = []
var arrowImages = []
var generalImages = []
var animationsData = {
    explosion1: [],
}

// load images from a given folder function
function loadImages(length, folderName, nameType, names=[]) {
    var namesGiven = names.length > 0
    var images = []
    for (let i = 0; i < length; i++) {
        var image = new Image()
        var name = namesGiven ? nameType + names[i] : nameType + (i+1)
        image.src = `../images/${folderName}/${name}.png`
        images.push(image)
    }
    return images
}

generalImages = loadImages(GENERAL_IMAGES_NAMES.length, 'general', '', GENERAL_IMAGES_NAMES)
arrowImages = loadImages(7, 'arrows', 'a')
balloonImages = loadImages(12, 'balloons', 'b')
mapImages = loadImages(1, 'maps', 'map')
animationsData.explosion1 = loadImages(8, 'bombAnimation', 'frame')

// load monkey images
for (let i = 0; i < MONKEY_IMAGES_INFO.length; i++) {
    const folderName = `monkey${i+1}`
    
    var base = new Image()
    var profile = new Image()
    var origin = new Image()

    origin.src = `../images/monkeys/${folderName}/origin.png`
    base.src = `../images/monkeys/${folderName}/base.png`
    profile.src = `../images/monkeys/${folderName}/profile.png`
    
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
                imageObject.normal.src = `../images/monkeys/${folderName}/option${n+1}/level${j+1}.png`

                if (imagesInfo.activated != undefined && imagesInfo.activated[n]) {
                    let image2 = new Image()
                    image2.src = `../images/monkeys/${folderName}/option${n+1}_a/level${j+1}.png`
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