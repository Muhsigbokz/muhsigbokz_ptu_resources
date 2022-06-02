// _id:3aj6fpfms8nqq0uj
// name:TEMPLATE Sage Shield Macro for Specific Player
// img:https://game-icons.net/icons/000000/transparent/1x1/lorc/bell-shield.png
// Authors: Muhsigbokz
//
// edit the line with
// const playerName

// EDIT SECTION

// Do you want this Macro to also change token lights?
const CHANGE_LIGHTING = true

// Manually set the name of the Sage PLAYERS name, not the Actor/Char
const PLAYER_NAME = "SomePlayerName"
const SAGE_ACTOR = game.actors.get(game.users.filter(u => u.name === PLAYER_NAME)[0].data.character)

// Or comment both lines above and uncomment the single line below with the correct Actor ID
// const sageActor = game.get(someId)

// END EDIT SECTION

const off = {
    light: {
        alpha: 1,
        angle: 0,
        bright: 0,
        color: "#ffffff",
        coloration: 1,
        dim: 0,
        gradual: true,
        luminosity: 0.5,
        saturation: 0,
        contrast: 0,
        shadows: 0,
        animation: {
            speed: 5,
            intensity: 5,
            reverse: false,
            type: "none"
        },
        darkness: {
            min: 0,
            max: 1
        }
    }
}


const sage = {
    light: {
        alpha: 0.35,
        angle: 0,
        bright: 0,
        color: "#454545",
        coloration: 0.5,
        dim: 0.35,
        gradual: true,
        luminosity: 0.5,
        saturation: 0,
        contrast: 0,
        shadows: 0,
        animation: {
            speed: 3,
            intensity: 6,
            reverse: false,
            type: "fairy"
        },
        darkness: {
            min: 0,
            max: 1
        }
    }
}

/**
 * For what ever ungodly reason, a small wait function in the forEach allows
 * for mass light animation changes, that would otherwise not work
 * @param ms
 * @returns {Promise<unknown>}
 */
const waitFor = (ms) => new Promise(r => setTimeout(r, ms));


const sageName = SAGE_ACTOR.data.name
const effectName = sageName + " Sage Damage Reduction"
const sageOccRank = SAGE_ACTOR.data.data.skills.occultEd.value.total


game.canvas.tokens.controlled.forEach(async token => {
    await waitFor(11)
    console.log("Current token")
    console.log(token)
    const actor = token.actor
    console.log("Current actor")
    console.log(actor)
    let removedExisting = false
    let removeIds = []
    actor.data.effects.filter(e => e.data.label === effectName).forEach(e => {
        removeIds.push(e.id)
    })
    removeIds.forEach((id, i) => {
        actor.effects.get(id).delete()
        if (CHANGE_LIGHTING)
            token.document.update(off)
        removedExisting = true
        console.log(`Removed ${id}`)
    });


    if (!removedExisting) {
        const tick = actor.data.data.health.tick
        let reduction = tick > sageOccRank * 2 ? tick : sageOccRank * 2
        const effectData = {
            changes: [
                {"key": "data.modifiers.damageReduction.physical.mod", "mode": 2, "value": reduction, "priority": 40},
                {"key": "data.modifiers.damageReduction.special.mod", "mode": 2, "value": reduction, "priority": 40}],
            label: effectName,
            icon: "",
            transfer: false,
            "flags.ptu.editLocked": false,
            _id: randomID()
        }
        actor.createEmbeddedDocuments("ActiveEffect", [effectData])
        console.log()
        if (CHANGE_LIGHTING)
            token.document.update(sage)

    }
})