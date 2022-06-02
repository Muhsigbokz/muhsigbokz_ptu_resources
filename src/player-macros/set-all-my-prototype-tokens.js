// _id:p2qr3l1pcbbwgdog
// name:Set Trainer and Pokemon Prototype token
// img:https://freepngimg.com/thumb/tool/1-2-tool-free-png-image.png
// Authors: Muhsigbokz

// For some reasons, they store them as int
const RESOURCE_NEVER_DISPLAYED = 0
const RESOURCE_WHEN_CONTROLLER = 10
const RESOURCE_HOVERED_BY_OWNER = 20
const RESOURCE_HOVERED_BY_ANYONE = 30
const RESOURCE_ALWAYS_FOR_OWNER = 40
const RESOURCE_ALWAYS_FOR_ANYONE = 50

const DISPOSITION_FRIENDLY = 1
const DISPOSITION_NEUTRAL = 0
const DISPOSITION_HOSTILE = -1

// Feel free to set Bar and Name visibilities here
const MY_AND_MY_POKEMONS_DISPOSITION_SHOULD_BE_DISPLAYED_AS = DISPOSITION_FRIENDLY
const MY_AND_MY_POKEMONS_RESOURCE_BARS_SHOULD_BE_DISPLAYED = RESOURCE_HOVERED_BY_ANYONE
const MY_AND_MY_POKEMONS_NAMES_SHOULD_BE_DISPLAYED = RESOURCE_HOVERED_BY_ANYONE

//Per default, the trainer is the loggin in users marked player character
//const trainerActorId = game.user.data.character
//Could also be set manually
//const trainerActorId = "jsawr86u757382si"
const trainerActorId = game.user.data.character


// First your Trainer Token, then all pokemon owned by that trainer
game.actors.get(trainerActorId).update({
  "token.disposition" : MY_AND_MY_POKEMONS_DISPOSITION_SHOULD_BE_DISPLAYED_AS,
  "token.displayBars" : MY_AND_MY_POKEMONS_RESOURCE_BARS_SHOULD_BE_DISPLAYED,
  "token.displayName" : MY_AND_MY_POKEMONS_NAMES_SHOULD_BE_DISPLAYED})
game.actors.filter(actor => actor.data.data.owner === trainerActorId).forEach(pkm => pkm.update({
  "token.disposition" :  MY_AND_MY_POKEMONS_DISPOSITION_SHOULD_BE_DISPLAYED_AS,
  "token.displayBars" : MY_AND_MY_POKEMONS_RESOURCE_BARS_SHOULD_BE_DISPLAYED,
  "token.displayName" : MY_AND_MY_POKEMONS_NAMES_SHOULD_BE_DISPLAYED}))