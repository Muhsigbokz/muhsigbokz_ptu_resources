// _id:t5w36dka5p5ztqte
// name:[GM] CapRate of Token (w/o Shiny)
// img:https://pngimg.com/uploads/pokeball/pokeball_PNG19.png

//

const ten = ["Burned", "Frozen", "Paralysis", "Poisoned", "Badly Poisoned", "Slowed"]
const fifteen = ["Stuck"]
const round_turn_regex = /^R[0-9]* - T[0-9]*:/
const order_training_regex = /^[A-Z][a-z]* (Order|Training)/

canvas.tokens.controlled.filter(token => token.actor.data.data.species).forEach((token, index) => {
  const actor = token.actor
  let cr = 100
  let mods_html = ""


  //Evo
  const speciesName = actor.data.data.species
  console.log(speciesName)
  const species = game.ptu.GetSpeciesData(speciesName)
  console.log(species)
  const currentStage = species.Evolution.filter(evo => evo[1].toUpperCase() == speciesName.toUpperCase())[0][0]
  console.log(currentStage)
  let arr = species.Evolution.map(a => a[0]).sort((a,b)=> a-b)
  console.log(arr)
  const maxStageOfLine = arr[arr.length-1]
  // -10 if max, 0 if one under, 10 if two under...
  const evoMod = (maxStageOfLine - currentStage ) * 10 - 10
  mods_html += `<tr><td>${maxStageOfLine - currentStage} Evos left</td><td>${evoMod}</td></tr>\n`
  cr+=evoMod

  //Level
  const level = actor.data.data.level.current
  mods_html += `<tr><td>Level ${level}</td><td>-${level*2}</td></tr>\n`
  cr -= level*2

  //HP
  const ratio = actor.data.data.health.value / actor.data.data.health.max
  if (ratio >0.75 ) {
    mods_html += `<tr><td>HP over 75%</td><td>-30</td></tr>\n`
    cr -= 30
  } else if (ratio >0.5 ) {
    mods_html += `<tr><td>HP over 50%</td><td>-15</td></tr>\n`
    cr -= 15
  } else if (ratio >0.25 ) {
    mods_html += `<tr><td>HP over 25%</td><td>+-0</td></tr>\n`
    cr -= 0
  } else if (actor.data.data.health.value > 1) {
    mods_html += `<tr><td>HP over 1</td><td>+15</td></tr>\n`
    cr += 15
  } else {
    mods_html += `<tr><td>HP at 1</td><td>+30</td></tr>\n`
    cr += 30
  }

  // Injuries
  const injuries = actor.data.data.health.injuries
  cr += injuries * 5
    mods_html += `<tr><td>${injuries} Injuries</td><td>${injuries * 5}</td></tr>\n`


  //Effects
  actor.effects.forEach((effect, nothing) => {
    const label = effect.data.label
    if(fifteen.includes(label)){
      mods_html += `<tr><td>${label}</td><td>+15</td></tr>\n`
      cr += 15
    } else if (ten.includes(label)) {
      mods_html += `<tr><td>${label}</td><td>+10</td></tr>\n`
      cr += 10
    } else if (round_turn_regex.test(label)) {
      mods_html += `<tr><td>${label}</td><td>/Move/</td></tr>\n`
      cr += 0
    } else if (order_training_regex.test(label)) {
      mods_html += `<tr><td>${label}</td><td>/OrTr/</td></tr>\n`
      cr += 0
    } else {
      mods_html += `<tr><td>${label}</td><td>+5</td></tr>\n`
      cr += 5
    }
  });

  const msg = `<table>
  <tr><td>Pokemon</td><td>${actor.data.name}</td></tr>
  <tr><td>Base</td><td>100</td></tr>
  ${mods_html}
  <tr><td>---</td><td>---</td></tr>
  <tr><td>Total w/o Shiny</td><td>${cr}</td></tr>
  </table>`

  ChatMessage.create({
    whisper: ChatMessage.getWhisperRecipients('GM'),
    content: msg});
});