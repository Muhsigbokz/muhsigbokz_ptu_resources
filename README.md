# PTU Mixed Resources

Macros, Items, and alike.

## You want just some macros but not all the hassle

Check the lower parts of this README for the Macros in here and pick the ones you like. Copy paste the
content of the Javascript files into a Macro and mark it as `script`.

## You want the whole goodness and mediocre community content

Open the admin console of your Foundry VTT instance and download the whole Add-On module via the
link `https://raw.githubusercontent.com/Muhsigbokz/muhsigbokz_ptu_resources/master/module.json`.

## You want to learn something about writing macros

Great! I also want this to be a resource for best practices and common hacks on how to 
bend the game to your will. Please ask around, even as an issue in the issue tracker if you want.

# Packs

## Muhsigbokz PTU Player Macros

In `src/player-macros`

A bag of what ever macros could be helpful for anyone. If you are a GM 
and want to test them: many use the current logged ins users marked player character.
If logged in as GM, some will not function properly.

No third Add-On Modules required.### Daily Exp (Player Trainer)

In `src/player-macros/daily-exp.js`

This macro takes care of your Daily Exp Training. 

All Pokémon owned by you Player Character are listed. It shows both their current
Exp, the Exp after Training and possible Level Ups. After selecting which Pokémon to train
there is a confirmation screen. Then, a GM whisper is sent with what you have trained
to help you bookkeeping and the Exp are added.

*Regarding the ways of Exp Training.* I covered four cases:

1. Beast Master with Intimidate
2. Groomer with highest of General Education and Pokémon Education
3. Command Training with Train the Reserves
4. Command Training without Train the Reserves

I check for the appropriate features by both title and description, but allow for some modifications.
E.g. `[Level 13] Beast Master intim Training` and `Beast Master` would be found, but `beast master` not.
If all of this behaviour does not fit you, you can check out the Macro and look
for a section marked with `// Custom Exp`.

Uncomment the section below and adjust the Math to your liking. I expect
many table sto rule and home brew the ever living Distortion World out of this topic.

### Reset and Set Trainings

In `src/player-macros/reset-set-trainings.js`

A combo macro to run after training Pokémon.
When run, **ALL OTHER ORDERS AND TRAININGS ARE UNSET!** 

Opens a window showing all Pokémon your Player Character owns. Also,
you get a checkbox for each [Agility, ...] Training you have to quickly
select which Pokémon to train.

Can also be easily used to reset all trainings and orders by running it
without selecting anything in the popup window and just confirming.

### Pokémon Info

In `src/player-macros/pokemon-info.js`

Little helper to check if you forgot something between combats, sessions or rests.

For all Pokémon your marked Player Character owns, check and show:


1. Injuries - whether and how many
2. Level-Up Points - whether not zero any how many
3. Missing HP - if any missing how much (or over max HP...)
4. Combat Stages - whether any is not zero
5. Food Buffs - whether and which one
6. Held Items - where and which one
7. Trained - whether any training

Also, on top of the Macro is a little spot for personal notes.
I like to keep track of where I attacked my Rune Master Glyphs there <3

### Set Trainer and Pokemon Prototype token

In `src/player-macros/set-all-my-prototype-tokens.js`

You want to set all your prototype tokens to have their resources always shown to you and
the names to be shown to everyone on hover as well showing a friendly disposition?

Run this, then its done.

Easily customizable. For Resource Bars, Name and Disposition there are all necessary
values in the script. In the middle of it, select your desired configuration.

### Metronome

In `src/player-macros/metronome.js`

Pull a random Metronome legal Move and display it in chat, draggable to be quickly added
to any actor for usage. Simple as that.


#### How to add custom moves

I assume you have a specific Item Compendium created with moves you want to be able to draw. you can add multiple 
such Item Compendiums by repeating the steps layed out.

1. Find the package and name of the Compendium. Likely something around `world.myawesomemoves`.
   1. Open the development console of your browser. (Likely F12)
   2. Open the console.
   3. Copy the following command and substitute `<My Custom Moves>` with your Compendiums label as seen in the list of your Compendiums.
   4. ```game.packs.filter(pack => pack.metadata.label == "<My Custom Moves>").map(pack => `${pack.metadata.package}.${pack.metadata.name}`)```
   5. You should get a string like `world.mymoves` or `someaddon.coolmoves`. If you get multiple, try them out.
2. Look in the macro for the line starting `const moveSourcesArray = [`
3. Comment out the block and uncomment the one below. It should have to entries in an array:
   the default PTU moves and an example that won't work for you.
4. Change the four values as follow:
   1. `name`:  Some name you can recognize yourself
   2. `weight`: How much more probable you want this move pool drawn compared to others. E.g., if you set it to `10` it is as if
      each move in this Compendium is ten times in the big bucket you draw from.
   3. `map`: only substitute `world.mymoves` with the string you got before.
   4. `keys`: only substitute `world.mymoves` with the string you got before.
5. Done




### TEMPLATE Sage Shield Macro for Specific Player

In `src/player-macros/sage-shield.js`

Macro **needs to be personalized for each Sage using it.**
Macro **must be run by GM or each player that is buffed, not only the Sage.**

*Toggles* a Sage Shield buff (Damage Reduction based on Sages Occult Ed and targets max HP) for all
selected tokens. Properly calculates Damage Reduction and gives the higher of Occult Ed or tenth of Max HP.
Also toggles light effect for sage shielded tokens. Interaction with light 
can be easily commented out. the parts are marked.

When you want to use this, import the Macro and edit it. **Either** set the Player Name (not char name) on top to 
the Sage Player (not Char) **or** set the Sage Characters Actor ID in the macro.

To turn of lighting changes, set the appropriate variable on thop of the macro to `false`.

## Muhsigbokz PTU GM Macros

In `src/gm-macros`

A pack with some Macros GMs might like. This pack is hidden to players
when imported, because they can spoil preparations and would likely not function for players.

No third Add-On Modules required.### [GM] Set LinkActorData for whole directories, no sub directories

In `src/gm-macros/folder-wise-link-actor-data.js`

A small but mighty macro to quickly mass edit prototype tokens linkage to their actor.

When run, a window opens listing all Folders in your Actor Directory. You select any (multiple) of
the folders. On the bottom are two button: Link and Unlink. All actors in the **direct folder not including 
sub directories** have they prototype token linked or unlinked to the actor data.

Assume you have an actor directory like this:

```
- DIR Encounters
  - DIR City
    - Meowth
    - Pidgey
  - Pikachu
- Mew
- Evil Trainer of Doom
```

Selecting the folders `Root` and `Root > DIR Encounters > DIR City` causes all Pokémons and Trainers Prototype Tokens
to be modified except Pikachu, as it is in `Root > DIR Encounters`.

### [GM] Pokémon Info for all Users

In `src/gm-macros/pokemon-info-all.js`

A little helper to remind players of things they might forget between sessions or fights.

Open a big window that shows to following stats: for each user, 
take their linked player character actor. For each of them, check all
Pokémon that this trainer own. Of all those Pokémon, grouped per Trainer:

1. Injuries - whether and how many
2. Level-Up Points - whether not zero any how many
3. Missing HP - if any missing how much (or over max HP...)
4. Combat Stages - whether any is not zero
5. Food Buffs - whether and which one
6. Held Items - where and which one
7. Trained - whether any training

### [GM] CapRate of Token (w/o Shiny)

In `src/gm-macros/cap-rate-base100.js`

This macro calculates a Pokémons capture rate for a d100 roll. It sends the calculation
and result to chat as a whisper to GM. It takes into account:

1. The Evolution Line of the Pokémon Species (care for custom Pokémon)
2. The Pokémons Level
3. HP
4. Injuries
5. Effects

Care about the Effects. Any effect that does not look like a Round/Turn Move info or a Training/Order 
is assumed to be a 'bad status' that improves the catch rate. Always double-check the calc does not
take something into account it should not.


### Glitch3

In `src/gm-macros/glitch-3.js`

Wanna run MissingNo., but you are afraid of Metronome? Fear no more!

This Macro sends a Message to chat that lists three random moves. These moves can be dragged 
from chat into a char sheet to then be run from an actor to properly include all their stats.
I have no idea how to do this with less pain, so take it for what it is. 

#### How to add custom moves

I assume you have a specific Item Compendium created with moves you want to be able to draw. you can add multiple 
such Item Compendiums by repeating the steps layed out.

1. Find the package and name of the Compendium. Likely something around `world.myawesomemoves`.
   1. Open the development console of your browser. (Likely F12)
   2. Open the console.
   3. Copy the following command and substitute `<My Custom Moves>` with your Compendiums label as seen in the list of your Compendiums.
   4. ```game.packs.filter(pack => pack.metadata.label == "<My Custom Moves>").map(pack => `${pack.metadata.package}.${pack.metadata.name}`)```
   5. You should get a string like `world.mymoves` or `someaddon.coolmoves`. If you get multiple, try them out.
2. Look in the macro for the line starting `const moveSourcesArray = [`
3. Comment out the block and uncomment the one below. It should have to entries in an array:
   the default PTU moves and an example that won't work for you.
4. Change the four values as follow:
   1. `name`:  Some name you can recognize yourself
   2. `weight`: How much more probable you want this move pool drawn compared to others. E.g., if you set it to `10` it is as if
      each move in this Compendium is ten times in the big bucket you draw from.
   3. `map`: only substitute `world.mymoves` with the string you got before.
   4. `keys`: only substitute `world.mymoves` with the string you got before.
5. Done




