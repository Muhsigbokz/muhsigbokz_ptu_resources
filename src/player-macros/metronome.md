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


