// _id:mx6zxbi3zqb4vay1
// name:Metronome
// img:https://archives.bulbagarden.net/media/upload/9/92/Misty_Togepi_Metronome.png
// Authors: Muhsigbokz


const forbiddenMoveNames = [
    "After You",
    "Assist",
    "Bestow",
    "Copycat",
    "Counter",
    "Covet",
    "Crafty Shield",
    "Destiny Bond",
    "Detect",
    "Endure",
    "Feint",
    "Focus Punch",
    "Follow Me",
    "Helping Hand",
    "King’s Shield",
    "Metronome",
    "Me First",
    "Mimic",
    "Mirror Coat",
    "Mirror Move",
    "Protect",
    "Quash",
    "Quick Guard",
    "Rage Powder",
    "Sketch",
    "Sleep Talk",
    "Snatch",
    "Snore",
    "Spiky Shield",
    "Switcheroo",
    "Thief",
    "Transform",
    "Trick",
    "Wide Guard"
]
const moveSourcesArray = [
    {
        name: "Base Moves",
        weight: 1,
        map: game.packs.get("ptu.moves"),
        keys: Array.from(game.packs.get("ptu.moves").index.keys())
    }
]
//
// const moveSourcesArray = [
//     {
//         name: "Base Moves",
//         weight: 1,
//         map: game.packs.get("ptu.moves"),
//         keys: Array.from(game.packs.get("ptu.moves").index.keys())
//     },
//     {
//         name: "Other cool moves",
//         weight: 1,
//         map: game.packs.get("world.mymoves"),
//         keys: Array.from(game.packs.get("world.mymoves").index.keys())
//     }
// ]

const numWeightedIndexes = moveSourcesArray.map(x => x.keys.length * x.weight).reduce((acc, i) => acc + i)

let pulledMoves = []

for (let i = 0; i < 1; i++) {

    let pulledMove
    console.log(`Move n: ${i}`)
    do {
        let randIndex = Math.floor(Math.random() * numWeightedIndexes)
        console.log(`Randed: ${randIndex}/${numWeightedIndexes} `)

        pulledMove = null

        let currentSource = 0
        console.log(`SourcI: ${currentSource}`)
        while (pulledMove == null && currentSource < moveSourcesArray.length) {
            let source = moveSourcesArray[currentSource]
            console.log(`Source: ${source}`)
            if (randIndex < source.keys.length * source.weight) {
                console.log(`Pull:   ${Math.floor(randIndex / source.weight)}`)
                pulledMove = (await source.map.getDocument(source.keys[Math.floor(randIndex / source.weight)]))
                console.log(`Pulled: ${pulledMove}`)
            } else {
                randIndex -= source.weight * source.keys.length
                console.log(`New In: ${randIndex}`)
                currentSource += 1
            }
        }

    } while (pulledMove == null || forbiddenMoveNames.includes(pulledMove.data.data.name))
    console.log(pulledMove)

    pulledMoves.push(pulledMove)

}
console.log(pulledMoves)

ChatMessage.create({
    content: pulledMoves.map(m => `<a class="entity-link content-link" draggable="true" data-pack="${m.pack}" data-id="${m.data._id}"><i class="fas fa-suitcase"></i>${m.data.name}</a>`).join("<br/>")
})