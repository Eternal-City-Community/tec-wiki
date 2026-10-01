---
title: "Macros"
category: "Reference"
---

# Macros

The [help file](https://tec.skotos.net:1180/bin/help?$help_commands_macros) states:
> One of the biggest most helpful features in this game is the @macro and @mtarg commands. They can be used for many things, from combat, to emoting, to just shortening commands.
This holds very true. A macro is an alias of a longer command intended to make entry of repetitive input much easier. The game itself offers the most commonly used system for applying macros. The Zealotry based client provides its own means of setting macros. Both will be covered below.  
The macros provided by Zealotry are significantly more powerful than those provided by the game. They provide the following advantages over the in game system:
* Dynamic arguments. Not requiring a preset variable for string replacement in-macro.
* Full line pattern matching. The entire input line is parsed for macro strings rather than the start.
* Multiple pattern matches. More than a single macro can be matched in any input.
However, they are not easily switched on the fly, requiring a client restart to read in the new configuration. The game provided system does grant the ability to load customized sets while logged in to swap out macros in a more fluid manner. Additionally, the game based system is per character while the Zealotry system is for the client and character/account agnostic. Lastly, the game based macros are not case sensitive, both {{TEST}} and {{test}} will match a macro defined as {{test}}. The Zealotry client is case sensitive. This means that to avoid a Zealotry macro being used (for instance in navigating game menus) you can define macros in one case and access menu items in the opposite. To avoid game based macros you must rely on the macro being longer than the required portion of the command for the parser to understand. As an example, in the game based system, you could define {{whistle}} to a custom emote, and use {{whist}} to access the underlying command it overwrites.

### Useful Macros Guides:

- [Macros for Thieves](/useful-macros-for-thieves/)

### Game Based Macros
This is menu driven in game. To start use the {{@macro}} command, which will present this menu:
> [A] Add Macro
> [D] Delete Macro
> [L] List Macro [N defined]
> [S] Set Macro Set
> [C] Create Macro Set
> [R] Remove Macro Set
> [I] Import Macro Set

{{x}} will exit the menu and allow normal game input. This does not provide an acknowledgment.

#### Adding a Macro
Selecting option {{A}} from the menu will present two prompts.
> Enter the shorthand macro string:
The text you enter will be the pattern to match against. Spaces, numbers and punctuation are allowed. Note: Using a punctuation character such as {{:}}, {{"}} or others used as internal shorthand will override that usage.
> Enter the string you wish this macro to expand to:
This is the command you wish sent to the game. There is is one special case. Any instance of {{<target>}} will be replaced by the value of {{@mtarg}}, which will be addressed later in this article.
> New macro added.
This ends the macro addition and returns you to the menu.

#### Deleting a Macro
Selecting option {{D}} will present a list of all the macros defined in the currently active set. Entering the **full name** of the macro you wish to delete will do so.

#### Listing Macros
The {{L}} option simply lists all defined macros in the currently active set. These are listed in two columns. The first being the shorthand for the macro and the right being the complete expansion of the macro.

#### Setting the Active Macro Set
The poorly titled {{S}} option allows you to choose what macro set should be active. This will provide you with a list of the sets you have created and entering the **full name** of the desired set will make it active. Note: This is **not** how macros are defined, despite the title containing "set macro".
Entering a non-existent set name at this point will provide you with the option to create a set with the given name.

#### Creating New Sets
The {{C}} option allows for the creation of new macro sets. Entering the desired name of the set is all that is required. Note: This does **not** activate the newly created set. Use {{S}} at the menu to do so.

#### Removing a Set
The {{R}} option will provide a list of all currently defined macro sets. Entering the **full name** of the set will prompt for confirmation of removal. Removing a set removes all macros defined in that set.

#### Importing a Macro Set
The {{I}} option allows copying a macro set from from character to another. Thus allowing the transfer of macros. This begins a new menu subset. The first requiring you to select from which character the set should be copied using the numeric value provided in the list. The second allows you to enter the name of the set you wish to import.

### Zealotry Client
It is highly recommended that you use Zealotry for Firefox.

[Originally Posted Here by Rythgen and Roast](https://forum.skotos.net/forum/our-games/the-eternal-city/eternal-city-administrivia/94023-macro-s-for-zealotry)

Install/open Zealotry, in the top bar click Options > Preferences > Macros. In that text field is where you'll create your macros. It's done like this:


~~~
CONFIG WRITE
MACRO ADD r retreat
MACRO ADD g guard %1
MACRO ADD ug unguard %1
MACRO ADD o corpse
MACRO ADD f from
MACRO ADD dd discard
MACRO ADD ee empty
MACRO ADD tt @mtarg
MACRO STORE
CONFIG WRITE
~~~


- MACRO ADD is the actual client command to add the macro 
- the letter(s) afterwards is what you'll enter to get the desired command
- after the letters comes the command you're macroing
- if applicable, %1 is a variable

When finished, click Submit Changes then reload the client, you should see scroll at the top prior to your login stating the macros have loaded successfully. You cannot change MACROs on the fly like you can with @macros, the steps above must be followed and the client reloaded every time.


~~~
[MACRO <r> created as: retreat]
[MACRO <g> created as: guard %1]
[MACRO <ug> created as: unguard %1]
[MACRO <o> created as: corpse]
[MACRO <f> created as: from]
[MACRO <dd> created as: discard]
[MACRO <ee> created as: empty]
[MACRO <tt> created as: @mtarg]
[MACRO: Macro support can be found in the Preferences popup.]
[MACRO: Finished loading macros]
Zealotry version 0.7.12.4 loading...
~~~


===============================================================================

With my macros set up as above, I can simply type the following to guard Japes, loot a pouch from the second corpse, discard it and then unguard Japes:

g japes
get pou f 2 o
dd pou
ug japes

MACROs are useful for things that will be used often on many different targets or in many different contexts so you aren't forced to type out full commands or switch your @mtarg every time. They are not very useful for simply shortening static commands like attacks, switching languages, inventory, etc.

The only thing to be mindful of is not MACROing things that will be used by themselves such as directions (n, e, s, w) or that might overwrite something else that already has a command. MACROs take precedence over @macros and built-in system commands, always.

Navigating system menus can still be done with a letter MACROed, just use the capital character instead. If you had MACROed 'b' to something, going to the bank and checking your [B]alance could still be done by typing 'B' rather than 'b'.

One trick with MACROing 'r' to 'retreat' is you can combine it with @macros to have just 'r' do both your fall back and retreat direction with one command: @macro 'r' to 'retreat' and 'retreat' to 'fall back' - you will use fall back when typing just 'r' or retreat in a direction by typing 'r e'.
