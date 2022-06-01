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