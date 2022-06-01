// _id:754plak2oihprtx0
// name:Glitch3
// img:https://wiki.p-insurgence.com/File:722.png


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
const numWeightedIndexes = moveSourcesArray.map(x => x.keys.length * x.weight).reduce((acc, i) => acc + i)

let pulledMoves = []

for (let i = 0; i < 3; i++) {

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
    whisper: ChatMessage.getWhisperRecipients('GM'),
    content: pulledMoves.map(m => `<a class="entity-link content-link" draggable="true" data-pack="${m.pack}" data-id="${m.data._id}"><i class="fas fa-suitcase"></i>${m.data.name}</a>`).join("<br/>")
})