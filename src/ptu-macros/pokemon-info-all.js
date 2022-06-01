// _id:q1sjkviox8d21cew
// name:[GM] Pokémon Info for all Users

function hmtlActorLinkForPokemon(pokemon) {
    return `<a class="entity-link content-link" draggable="true" data-type="Actor" data-entity="Actor" data-id="${pokemon.data._id}"><i class="fas fa-user"></i> ${pokemon.name}</a>`
}


allCont = ``

game.users.map(u => game.users.get(u.id).character).filter(a => a).map(a => a.id).forEach(currentUser => {
  allCont += `
 <h2>${game.actors.get(currentUser).name}</h2><br/>
 Injuries:<br>
 ${game.actors.filter(actor => actor.data.data.owner === currentUser).filter(pkm => pkm.data.data.health.injuries).map(pkm => `${hmtlActorLinkForPokemon(pkm)}: ${pkm.data.data.health.injuries}`).join(", ")}<br/><br/>
 Level-Up Points:<br>
 ${game.actors.filter(actor => actor.data.data.owner === currentUser).filter(pkm => pkm.data.data.levelUpPoints).map(pkm => `${hmtlActorLinkForPokemon(pkm)}: ${pkm.data.data.levelUpPoints}`).join(", ")}<br/><br/>
 Missing HP:<br>
 ${game.actors.filter(actor => actor.data.data.owner === currentUser).filter(pkm => pkm.data.data.health.value !== pkm.data.data.health.max).map(pkm => `${hmtlActorLinkForPokemon(pkm)}: ${pkm.data.data.health.value - pkm.data.data.health.max}`).join(", ")}<br/><br/>
 Combat Stages:<br>
 ${game.actors.filter(actor => actor.data.data.owner === currentUser).filter(pkm => pkm.data.data.stats.atk.stage.value !== 0 || pkm.data.data.stats.def.stage.value !== 0 || pkm.data.data.stats.spatk.stage.value !== 0 || pkm.data.data.stats.spdef.stage.value !== 0 || pkm.data.data.stats.spd.stage.value !== 0).map(pkm => `${hmtlActorLinkForPokemon(pkm)}`).join(", ")}<br/><br/>
 Food Buffs:<br/>
 ${game.actors.filter(actor => actor.data.data.owner === currentUser).filter(pkm => pkm.data.data.digestionBuff).map(pkm => `${hmtlActorLinkForPokemon(pkm)}: ${pkm.data.data.digestionBuff}`).join(", ")}<br/><br/>
 Held Items:<br/>
 ${game.actors.filter(actor => actor.data.data.owner === currentUser).filter(pkm => pkm.data.data.heldItem && pkm.data.data.heldItem != "None").map(pkm => `${hmtlActorLinkForPokemon(pkm)}: ${pkm.data.data.heldItem}`).join(", ")}<br/><br/>
 Trained:<br/>
 ${game.actors.filter(actor => actor.data.data.owner === currentUser).filter(pkm => pkm.data.data.training.agility.trained || pkm.data.data.training.brutal.trained ||pkm.data.data.training.focused.trained ||pkm.data.data.training.inspired.trained).map(pkm => `${hmtlActorLinkForPokemon(pkm)}`).join(", ")}
 <br/><br/><br/>
 `
 })


let d = new Dialog({
    title: "Train Pokémon",
    content: allCont,
    buttons: {
      one: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () => console.log("Cancelled Info")
        }
    },
    close: html => console.log("Closed Info Dialog")
}, {width: 1200});
d.render(true);