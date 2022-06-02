// _id:4xi6lrywxa5rdq1u
// name:Daily Exp (Player Trainer)
// img:https://archives.bulbagarden.net/media/upload/f/f3/Dream_Exp._Share_Sprite.png
// Authors: Muhsigbokz


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

const currentDialogId = randomID()
const myActorId = game.user.data.character ? game.user.data.character : "0"
const myActor = game.actors.get(myActorId)
const expCandidatePokemons = game.actors.filter(actor => actor.data.data.owner === myActorId)


const commandRank = myActor.data.data.skills.command.value.value
const intimidateRank = myActor.data.data.skills.intimidate.value.value
const pokeEdRank = myActor.data.data.skills.pokemoned.value.value
const genEdRank = myActor.data.data.skills.generaled.value.value
const hasTrainerOfChampions = true
const hasTrainTheReserves = true
const hasGroomer = true
const hasBeastmaster = true


// Importance of Features
// Beastmaster > Groomer > CommandTraining
let allowedPokemon
let expGainedForLevel
if (hasBeastmaster) {
    allowedPokemon = intimidateRank
    expGainedForLevel = (pokemonLevel) => {
        return (Math.ceil(intimidateRank / 2) - 1) * 5 + Math.ceil(pokemonLevel / 2) + hasTrainerOfChampions ? 5 : 0
    }
} else if (hasGroomer){
    allowedPokemon = 6
    const higherSkillRank = Math.max(pokeEdRank, genEdRank)
    expGainedForLevel = (pokemonLevel) => {
        return (Math.ceil(higherSkillRank / 2) - 1) * 5 + Math.ceil(pokemonLevel / 2) + hasTrainerOfChampions ? 5 : 0
    }
} else if (hasTrainTheReserves){
    allowedPokemon = commandRank * 2
    expGainedForLevel = (pokemonLevel) => {
        return (Math.ceil(commandRank / 2) - 1) * 5 + Math.ceil(pokemonLevel / 2) + hasTrainerOfChampions ? 5 : 0
    }
} else {
    allowedPokemon = commandRank
    expGainedForLevel = (pokemonLevel) => {
        return (Math.ceil(commandRank / 2) - 1) * 5 + Math.ceil(pokemonLevel / 2) + hasTrainerOfChampions ? 5 : 0
    }
}

// Custom Exp
//---------------
// if you want something else, uncomment th four line below with proper values and adjust the values

// allowedPokemon = 42
// expGainedForLevel = (pokemonLevel) => {
//     return 25 + Math.ceil(pokemonLevel / 2)
// }


//---------------


let tablePokemonWidth = 4

var tableSortCounter = 0
var htmlload = "<p><table>"

expCandidatePokemons.forEach(currentPokemon => {
    const imagePath = currentPokemon.data.img
    const name = currentPokemon.data.name
    const id = currentPokemon.data._id
    const oldExp = currentPokemon.data.data.level.exp
    const oldLevel = currentPokemon.data.data.level.current
    const newExp = oldExp + expGainedForLevel(oldLevel)
    let htmlLevel = "" + oldLevel
    if (newExp >= currentPokemon.data.data.level.expTillNextLevel) {
        htmlLevel = "" + oldLevel + " => " + (oldLevel + 1)
    }


    htmlCheckbox = `<input type="checkbox" class="${currentDialogId}" value="${id}" name="${name}">`

    if (tableSortCounter === 0) {
        htmlload += "<tr>"
    }
    htmlload += `<td><img src="${imagePath}" width=60/></td><td>${htmlCheckbox} ${htmlLevel} ${name}<br/> ${oldExp} => ${newExp} </td>`
    if (tableSortCounter === (tablePokemonWidth - 1)) {
        htmlload += "</tr>"
    }
    tableSortCounter = (tableSortCounter + 1) % tablePokemonWidth
})

htmlload += "</table></p>"

let d = new Dialog({
    title: "Train Pokémon",
    content: htmlload,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Train Pokémon",
            callback: () => {


                pokemonIds = [...document.getElementsByClassName(currentDialogId)].filter(cb => cb.checked).map(cb => cb.value)
                if (pokemonIds.length <= allowedPokemon) {
                    let innerHtmlLoad = `<p>Training ${pokemonIds.length} of ${allowedPokemon} Pokémon</p>
                                         <p><table>`;

                    pokemonIds.forEach(_id => {
                        const currentPokemon = game.actors.get(_id)
                        const imagePath = currentPokemon.data.img
                        const name = currentPokemon.data.name
                        const oldExp = currentPokemon.data.data.level.exp
                        const oldLevel = currentPokemon.data.data.level.current
                        const newExp = oldExp + expGainedForLevel(oldLevel)
                        let htmlLevel = "" + oldLevel
                        if (newExp >= currentPokemon.data.data.level.expTillNextLevel) {
                            htmlLevel = "" + oldLevel + " => " + (oldLevel + 1)
                        }

                        innerHtmlLoad += `<tr>
                                        <td>
                                            <img src="${imagePath}" width=60/>
                                        </td>
                                        <td>
                                            ${htmlLevel} ${name}<br/>
                                            ${oldExp} => ${newExp}
                                        </td>
                                      </tr>`

                    })

                    innerHtmlLoad += "</table></p>"

                    let okayD = new Dialog({
                        title: "Confirm Training",
                        content: innerHtmlLoad,
                        buttons: {
                            one: {
                                icon: '<i class="fas fa-check"></i>',
                                label: "Confirm Training",
                                callback: () => {
                                    console.log("Training pokemon...")
                                    let message = ``
                                    let totalGainedExp = 0
                                    pokemonIds.forEach(_id => {
                                        const currentPokemon = game.actors.get(_id)
                                        const name = currentPokemon.data.name
                                        const oldExp = currentPokemon.data.data.level.exp
                                        const oldLevel = currentPokemon.data.data.level.current
                                        const newExp = oldExp + expGainedForLevel(oldLevel)
                                        let htmlLevel = "" + oldLevel
                                        if (newExp >= currentPokemon.data.data.level.expTillNextLevel) {
                                            htmlLevel = "" + oldLevel + " => " + (oldLevel + 1)
                                        }
                                        totalGainedExp += newExp - oldExp
                                        let currentMessage = `${name}: ${oldExp} => ${newExp} (Level ${htmlLevel})`
                                        console.log(currentMessage)
                                        message += currentMessage + "<br/>"
                                        currentPokemon.update({"data.level.exp": newExp})
                                    })
                                    message += `<br/>Total gained: ${totalGainedExp}`
                                    ChatMessage.create({
                                        whisper: ChatMessage.getWhisperRecipients('GM'),
                                        content: `
<div class="content flexrow pt-1" style="font-variant:normal">
    <div class="swsh-box">
        <div class="swsh-header" style="border-bottom:1px solid #00000020;text-align:center">
            <div class="d-flex w-100 mt-1 mb-1 justify-content-center">
                <span style="padding:5px">Auto Training</span>
            </div>
        </div>
        <div class="d-flex w-100 fs-10 justify-content-center" style="flex-wrap:wrap;word-break:break-word">
                
                <div class="swsh-header col-sm-12">
                    <div class="d-flex w-100 mt-1 mb-1 fs-11" style="align-items:center;text-align:center">
                        <div class="col">Effect</div>
                    </div>
                </div>
                <div class="swsh-body col-sm-12">
                    <div class="d-flex w-100 mt-1 mb-1 fs-11" style="align-items:center;text-align:center">
                        <div class="p-1 readable pokemon p8 tight" style="word-break:break-word;text-align:start;line-height:16px">${message}</div>
                    </div>
                </div>
        </div>
    </div>
</div>
                                    `
                                    });
                                }
                            },
                            two: {
                                icon: '<i class="fas fa-times"></i>',
                                label: "Stop",
                                callback: () => console.log("Did not train pokemon.")
                            }
                        },
                        default: "two",
                        render: html => console.log(""),
                        close: html => console.log("closed training confirm Dialog")
                    }, {width: 500, height: 400});
                    okayD.render(true);

                } else {

                    let tooManyD = new Dialog({
                        title: "Failed Training",
                        content: `Tried to too many (${pokemonIds.length}) Pokémon, only ${allowedPokemon} allowed.`,
                        buttons: {
                            one: {
                                icon: '<i class="fas fa-check"></i>',
                                label: "Sad",
                                callback: () => {
                                }
                            }
                        },
                        default: "one",
                        render: html => console.log("Register interactivity in the rendered dialog"),
                        close: html => console.log("This always is logged no matter which option is chosen")
                    });
                    tooManyD.render(true);

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
}, {width: 1200, height: 500});
d.render(true);