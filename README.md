# PTU Mixed Resources

Macros, Items, and alike.

There are Macros for Players and GMs. The GM macros could be run by players and give out info they should not get. E.g. listing a folder like "PKM When friendly NPC turns evil". This is why there are two different packs for GM and non-GM macros.

If you just want to browse Macros and not install the Add-On Module, check out the files in `src/[some-pack]/[macro_name].js` - like `src/gm-macros/cap-rate-base100.js` or `src/player-macros/daily-exp.js`. You can easily ignore the `.json` files

# Packs

## Muhsigbokz PTU Player Macros

In `src/player-macros`

Hello, this is also some pack### Daily Exp (Player Trainer)

In `src/player-macros/daily-exp.js`

### Daily Exp (Command)

adfgg

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

TODO make lighting a boolean not via commenting code

### Metronome

In `src/player-macros/metronome.js`

Pull a random Metronome legal Move and display it in chat, draggable to be quickly added
to any actor for usage. Simple as that.

## Muhsigbokz PTU GM Macros

In `src/gm-macros`

Hello, this is some pack### [GM] CapRate of Token (w/o Shiny)

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


### [GM] Set LinkActorData for whole directories, no sub directories

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

### Glitch3

In `src/gm-macros/glitch-3.js`

Wanna run MissingNo., but you are afraid of Metronome? Fear no more!

This Macro sends a Message to chat that lists three random moves. These moves can be dragged 
from chat into a char sheet to then be run from an actor to properly include all their stats.
I have no idea how to do this with less pain, so take it for what it is. 

It also offers functionality to add custom Moves that are in a designated Compedium Pack.

Assume you have a Compendium called "Glitch Moves" with custom moves like "Glitch Tackle". And you would like to have 
a lot of these moves pulled compared to the about normal 810 moves Metronome can legally draw.

In the macro is an out commented block starting with `const moveSourcesArray`. There are two objects, one of which 
has paths like `world.glitchmoves`. Check this out or ask here for help. this need more input...

TODO finish this explanation properly.

