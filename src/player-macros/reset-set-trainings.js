// _id:z44znzdqjwsodbhy
// name:Reset and Set Trainings
// Authors: Muhsigbokz

/**
 * This macro
 * 1. shows you all your Pokemon with all trainings your char has learned
 * 2. let you select trainings per pokemon
 * 3. on confirm, removes ALL TRAININGS AND ORDERS from all your pokemon and makes it only your selected trainings are present.
 *
 * Why would you like to use it: After each day, all trainings reset. To make sure no Pokemon has their
 * trainings false kept, it resets all by default.
 */

/**
 * For each run of the script, a unique ID is generated and used in HTML IDs to avoid confusion between multiple instances of the macro running in parallel.
 */
const currentDialogId = randomID()

/**
 * Returns a HTML table for a specific pokemon given its id. Only displays the trainings a trainer has.
 * @param pokemonId
 * @param hasAgility
 * @param hasBrutal
 * @param hasInspired
 * @param hasFocused
 * @returns {string}
 */
function htmlCheckboxSnippetForPokemonId(pokemonId, hasAgility, hasBrutal, hasInspired, hasFocused) {
    let result = `<table>`
    if (hasAgility)
        result += `<tr><td>Agility</td> <td><input type="checkbox" class="${currentDialogId}" value="agility" name="${pokemonId}"></td></tr>`
    if (hasBrutal)
        result += `<tr><td>Brutal</td>  <td><input type="checkbox" class="${currentDialogId}" value="brutal" name="${pokemonId}"></td></tr>`
    if (hasInspired)
        result += `<tr><td>Inspired</td><td><input type="checkbox" class="${currentDialogId}" value="inspired" name="${pokemonId}"></td></tr>`
    if (hasFocused)
        result += `<tr><td>Focused</td> <td><input type="checkbox" class="${currentDialogId}" value="focused" name="${pokemonId}"></td></tr>`
    result += `</table>`
    return result
}

/**
 * Check if an actor as a FoundryVTT Item. That Item can be an Edge, Feature or inventory Item.
 * @param actor The actor that is checked for an Item
 * @param nameIncluded A string that must be included in the searched items title. Not an exact match.
 * @param descIncluded A string that must be included in the searched items description. Not an exact match.
 * @returns {boolean}
 */
function hasItemWithNameIncludingAndDescriptionIncluding(actor, nameIncluded, descIncluded) {
    return actor.data.items.filter(i => i.data.name.includes(nameIncluded) && i.data.data.effect.includes(descIncluded)).length > 0
}

const allPaths = [
    "data.training.agility.trained",
    "data.training.agility.ordered",
    "data.training.brutal.trained",
    "data.training.brutal.ordered",
    "data.training.inspired.trained",
    "data.training.inspired.ordered",
    "data.training.focused.trained",
    "data.training.focused.ordered"
]

const myPlayerCharacterActorID = game.user.data.character
const myPlayerCharacterActor = game.actors.get(myPlayerCharacterActorID)
const hasAgilityTraining = hasItemWithNameIncludingAndDescriptionIncluding(myPlayerCharacterActor, "Agility Training", "becomes Agile")
const hasBrutalTraining = hasItemWithNameIncludingAndDescriptionIncluding(myPlayerCharacterActor, "Brutal Training", "becomes Brutal")
const hasFocusedTraining = hasItemWithNameIncludingAndDescriptionIncluding(myPlayerCharacterActor, "Focused Training", "becomes Focused")
const hasInspiredTraining = hasItemWithNameIncludingAndDescriptionIncluding(myPlayerCharacterActor, "Inspired Training", "becomes Inspired")
const allPokemonsOwnedByMyActor = game.actors.filter(actor => actor.data.data.owner === myPlayerCharacterActorID)


const tableWidth = 4
let tableSortCounter = 0
let htmlload = `<p><table>`

for (let pokemon of allPokemonsOwnedByMyActor) {
    const imagePath = pokemon.data.img
    const name = pokemon.data.name
    const id = pokemon.data._id

    if (tableSortCounter === 0) {
        htmlload += "<tr>"
    }

    const htmlCheckboxSnippet = htmlCheckboxSnippetForPokemonId(id, hasAgilityTraining, hasBrutalTraining, hasInspiredTraining, hasFocusedTraining)
    htmlload += `<td>${htmlCheckboxSnippet}</td><td><img src="${imagePath}" width=60/></td>`
    if (tableSortCounter === (tableWidth - 1)) {
        htmlload += "</tr>"
    }


    tableSortCounter = (tableSortCounter + 1) % tableWidth
}

htmlload += `</table></p>`

let d = new Dialog({
    title: "Train Pokémon",
    content: htmlload,
    buttons: {


        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Train Pokémon",
            callback: () => {

                const trainedPokemonIds = [...new Set([...document.getElementsByClassName(currentDialogId)].filter(cb => cb.checked).map(cb => cb.name))]
                for (const pokemon of allPokemonsOwnedByMyActor) {
                    const id = pokemon.data._id
                    const effects = [];
                    console.log(pokemon)
                    pokemon.data.effects.forEach(effect => {
                        if (effect.data.changes.some(change => change.key.startsWith("data.training"))) {
                            effects.push(effect.id);
                            console.log(`pushing ${effect.id}`)
                        } else {
                            console.log(effect)
                        }
                    });

                    for (let id of effects) {
                        pokemon.effects.get(id).delete();
                    }

                    pokemon.update({[allPaths]: false});

                    console.log(`Cleared ${pokemon.name}`)
                    console.log(id)
                    console.log(trainedPokemonIds)
                    if (trainedPokemonIds.includes(id)) {
                        let effectDatas = []
                        const isOrder = false
                        for (let training of [...document.getElementsByClassName(currentDialogId)].filter(cb => cb.checked && cb.name === id).map(cb => cb.value)) {
                            const path = `data.training.${training}.trained`
                            effectDatas.push({
                                changes: [{
                                    "key": path,
                                    "mode": 5,
                                    "value": true,
                                    "priority": 50
                                }].concat(game.ptu.getTrainingChanges(training, isOrder).changes),
                                label: `${training.capitalize()} ${training == 'critical' ? "Moment" : isOrder ? "Order" : "Training"}`,
                                icon: "",
                                transfer: false,
                                "flags.ptu.editLocked": true,
                                _id: randomID()
                            })
                            console.log(`Added ${training}`)
                        }
                        pokemon.createEmbeddedDocuments("ActiveEffect", effectDatas);
                        console.log("Pushed Trainings")
                    }

                }
            }
        },
        two: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () => console.log("Cancelled Training")
        }
    },

    default: "two",
    render: html => console.log(""),
    close: html => console.log("Closed Training Selection Dialog")
}, {width: 1200});
d.render(true);