// _id:0v8r4tasvn7c4fu5
// name:Pokémon Info
// img:https://upload.wikimedia.org/wikipedia/commons/2/29/Octicons-info.svg

personalNotes = ```
Here is some Space for personal notes <3
```

function hmtlActorLinkForPokemon(pokemon) {
    return `<a class="entity-link content-link" draggable="true" data-type="Actor" data-entity="Actor" data-id="${pokemon.data._id}"><i class="fas fa-user"></i> ${pokemon.name}</a>`
}

let d = new Dialog({
    title: "Pokémon Info",
    content: `
Personal Notes:<br/>
that you might wanna keep Track of<br/><br/>
Injuries:<br>
${game.actors.filter(actor => actor.data.data.owner === game.user.data.character).filter(pkm => pkm.data.data.health.injuries).map(pkm => `${hmtlActorLinkForPokemon(pkm)}: ${pkm.data.data.health.injuries}`).join(", ")}<br/><br/>
Level-Up Points:<br>
${game.actors.filter(actor => actor.data.data.owner === game.user.data.character).filter(pkm => pkm.data.data.levelUpPoints).map(pkm => `${hmtlActorLinkForPokemon(pkm)}: ${pkm.data.data.levelUpPoints}`).join(", ")}<br/><br/>
Missing HP:<br>
${game.actors.filter(actor => actor.data.data.owner === game.user.data.character).filter(pkm => pkm.data.data.health.value !== pkm.data.data.health.max).map(pkm => `${hmtlActorLinkForPokemon(pkm)}: ${pkm.data.data.health.value - pkm.data.data.health.max}`).join(", ")}<br/><br/>
Combat Stages:<br>
${game.actors.filter(actor => actor.data.data.owner === game.user.data.character).filter(pkm => pkm.data.data.stats.atk.stage.value !== 0 || pkm.data.data.stats.def.stage.value !== 0 || pkm.data.data.stats.spatk.stage.value !== 0 || pkm.data.data.stats.spdef.stage.value !== 0 || pkm.data.data.stats.spd.stage.value !== 0).map(pkm => `${hmtlActorLinkForPokemon(pkm)}`).join(", ")}<br/><br/>
Food Buffs:<br/>
${game.actors.filter(actor => actor.data.data.owner === game.user.data.character).filter(pkm => pkm.data.data.digestionBuff).map(pkm => `${hmtlActorLinkForPokemon(pkm)}: ${pkm.data.data.digestionBuff}`).join(", ")}<br/><br/>
Held Items:<br/>
${game.actors.filter(actor => actor.data.data.owner === game.user.data.character).filter(pkm => pkm.data.data.heldItem && pkm.data.data.heldItem != "None").map(pkm => `${hmtlActorLinkForPokemon(pkm)}: ${pkm.data.data.heldItem}`).join(", ")}<br/><br/>
Trained:<br/>
${game.actors.filter(actor => actor.data.data.owner === game.user.data.character).filter(pkm => pkm.data.data.training.agility.trained || pkm.data.data.training.brutal.trained ||pkm.data.data.training.focused.trained ||pkm.data.data.training.inspired.trained).map(pkm => `${hmtlActorLinkForPokemon(pkm)}`).join(", ")}
<br/> 
`,
    buttons: {
      one: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () => console.log("Cancelled Info")
        }
    },
    close: html => console.log("Closed Info Dialog")
});
d.render(true);