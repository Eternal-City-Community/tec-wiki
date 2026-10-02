---
title: "Praetor Scripts"
category: "Reference"
---

# Praetor Scripts


### What a mode is

A mode is a single Lua file that watches your game text as it scrolls by and sends commands on your behalf: auto-attacking, looting corpses, running a training loop, or walking a route. Only one mode runs at a time. Starting a new one stops whatever was running before it. To stop everything and return to manual play:


~~~
/mode disable
~~~


Not every file in a scripts folder is a mode. Files whose names start with **lib_** are shared helpers that modes load for common logic. They never appear in the mode list and there's no reason to start one.

### Install the shared scripts

The shared library lives on GitHub as **praetor-scripts** and is published as numbered releases.

**1.** Open the [latest praetor-scripts release](https://github.com/cyber-godzilla/praetor-scripts/releases/latest) and, under **Assets**, download the zip.

[SCREENSHOT: the latest praetor-scripts release page with the zip under Assets highlighted]

**2.** Unzip it somewhere that won't move. The folder will be named after the version, for example:


~~~
~/praetor-scripts-0.1.1             (macOS and Linux)
Documents\praetor-scripts-0.1.1     (Windows)
~~~


Check that the unzipped folder contains **macro.lua** directly, not another folder inside it.

**3.** In Praetor, press **Esc**, choose **Automation**, then **Script Directories**. Click **Browse…**, pick the folder, then **Save**. Closing without saving discards it.

**4.** Press **Esc** again, choose **Automation**, then **Reload Scripts**. The modes are now loaded.

#### Fallback: the latest unreleased copy

If you want changes that haven't made it into a release yet, open the [repository page](https://github.com/cyber-godzilla/praetor-scripts), click the green **Code** button, then **Download ZIP**. Unzip and add the folder exactly as above.

[SCREENSHOT: GitHub Code button menu with Download ZIP highlighted]

#### Updating

Download the newer release's zip, replace the folder's contents, then **Reload Scripts**. If you know git, clone the repository instead and pull to update:


~~~
git clone https://github.com/cyber-godzilla/praetor-scripts.git ~/praetor-scripts
~~~


Keep your own scripts in a separate folder so an update never overwrites them. The default folder is fine for that:


~~~
~/.config/praetor/scripts/
~~~


On Windows that is:


~~~
C:\Users\<you>\.config\praetor\scripts\
~~~


### Run a mode {#run}

Start a mode with **/mode** followed by its name and any arguments it takes. Names are matched regardless of case, and **/sm** is a shorter alias:


~~~
/mode loot bronze|alanti
/sm idle
~~~


As you type the mode's name, the hint line above the input shows that mode's arguments and a one-line description, so you never have to open the file to check. Type the name, a space, and read the hint before pressing Enter.

[SCREENSHOT: the hint line showing the usage and description for /mode loot]

**/list** opens a **Switch Mode** window that shows every loaded mode with its description. Use it to browse what you have. Clicking a mode there starts it with no arguments, so for anything that takes arguments, use **/mode** and the hint line instead.

To stop the running mode:


~~~
/mode disable
~~~


**Alt+M** steps through a short list of modes you choose, useful for the ones you switch between often. To pick them:

1. Press **Esc**
2. Choose **Automation**, then **Quick-Cycle Modes**
3. Toggle the modes you want in the cycle
4. **Save**

To watch what a running mode is doing, turn on the **Echo script commands** setting (Esc, **Display & Behavior**, **Settings**). Every command the mode sends then shows in the output in italics.

#### Chaining modes

Some modes hand off to another mode when they finish, instead of stopping, using an **after:** argument:


~~~
/mode loot bronze|alanti after:wagon      # loot corpses, then sell to a vendor
/mode wagon romulus after:idle            # sell, then rest until fatigue recovers
/mode idle after:macro                    # rest, then start fighting
~~~


Chains can go several modes deep. Each mode in the chain carries its own **after:**. Not every mode supports it. The hint line shows **[after:<mode>]** at the end of a mode's arguments when it does.

### Five modes to learn from

The shared library has a few dozen modes. These five cover the patterns the rest are built from, and each links to its source on GitHub so you can read the real thing.

#### idle

[idle.lua](https://github.com/cyber-godzilla/praetor-scripts/blob/main/idle.lua) is the simplest useful mode. It sends a status check, then waits until the game reports full fatigue and hands off to whatever you chained after it. Every 7 to 11 minutes it sends another status check so the game doesn't drop you for idling.


~~~
/mode idle
/mode idle after:macro
~~~


What it shows you: a single reaction that matches one phrase from the game (**Fatigue: 100%**), a timer set with **set_interval**, a desktop notification with **notify**, and the **lib_after** library that makes the **after:** argument work.

#### wagon

[wagon.lua](https://github.com/cyber-godzilla/praetor-scripts/blob/main/wagon.lua) sells the contents of a wagon (or another container) to a vendor. It takes an item from the container, offers it to the vendor, and repeats until the container has nothing left that matches.


~~~
/mode wagon romulus                 # alias from lib_wagon: the item list Romulus buys
/mode wagon bronze|boss jovinus     # sell bronze and boss items to Jovinus
/mode wagon tin telaria sack        # sell tin from a sack, not the wagon
~~~


What it shows you: reading arguments in **on_start** and storing them with **state.set**, three reactions that form a loop (**You take** leads to an offer, **You offer** leads to the next take, **You don't see** ends the run), and an alias table in [lib_wagon.lua](https://github.com/cyber-godzilla/praetor-scripts/blob/main/lib_wagon.lua) so a vendor's whole shopping list is one word.

#### macro

[macro.lua](https://github.com/cyber-godzilla/praetor-scripts/blob/main/macro.lua) is the main combat mode. It rotates through six attack macros against your current target, stands you up when knocked down, rewields a dropped weapon, advances on targets that are out of reach, approaches new arrivals, and finishes off targets that fall unconscious. It needs the in-game macros described in the next section.


~~~
/mode macro
/mode macro nokill        # rotate attacks but never send the kill command
~~~


What it shows you: a mode that leans on two libraries, [lib_strings.lua](https://github.com/cyber-godzilla/praetor-scripts/blob/main/lib_strings.lua) for the game phrases it reacts to and [lib_combat.lua](https://github.com/cyber-godzilla/praetor-scripts/blob/main/lib_combat.lua) for the rotation, approach, kill, and stall-watchdog logic that every combat mode shares. It also declares metrics with **metrics.track** so the Metrics tab counts kills, crits, and actions.

#### loot

[loot.lua](https://github.com/cyber-godzilla/praetor-scripts/blob/main/loot.lua) walks through every corpse in the room, taking the items you list. Items are separated by a pipe and can't contain spaces, so multi-word items go in the alias table in [lib_loot.lua](https://github.com/cyber-godzilla/praetor-scripts/blob/main/lib_loot.lua).


~~~
/mode loot bronze|alanti|retalq
/mode loot metals                   # alias from lib_loot: retalq|boison|alanti|sooty|iron
/mode loot hand drop:rawhide        # loot the "hand" list, but drop any rawhide taken
/mode loot bandit 3                 # start at the third corpse
~~~


What it shows you: an optional named argument (**drop:**) picked out of the argument list, a corpse counter kept in **state** and advanced when the game says **You don't see**, a reaction whose **match** is a list of several phrases, and the **action** function using the matched text itself to decide what to do.

#### empty_containers

[empty_containers.lua](https://github.com/cyber-godzilla/praetor-scripts/blob/main/empty_containers.lua) takes every container of one type out of a source, empties it into a destination, and drops the empty. With no arguments it empties sacks from the wagon into the wagon.


~~~
/mode empty_containers
/mode empty_containers pouch wagon wagon
/mode empty_containers sack wagon chest
~~~


What it shows you: default values for arguments (**args[1] or 'sack'**), and a four-step loop of reactions (**You take**, then **You empty**, then **You drop**, then back to the next take) that ends when the source runs out. It is the shortest complete example of the take-act-repeat shape most utility modes use.

### What the combat macros need {#macros}

The combat modes don't fight for you directly. They send short commands like **at1** and **k1**, and the game turns those into your real attacks through its own **@macro** system. Each character needs these macros defined once, before any combat mode will do anything useful.

| Macro | Used by | Should send |
| --- | --- | --- |
| at1 to at6 | all combat modes | your attack rotation, one move per slot (chain_macro also uses at7) |
| app1 | all combat modes | approach first target: {{app 1 <target>}} or your weapon's approach move |
| adv1 | all combat modes | advance on first target: {{advance 1 <target>}} |
| k1 | all combat modes | kill first target: {{kill 1 <target>}} ({{fslash 1 <target>}} for falx) |
| r | all combat modes | rewield: {{wield <weapon>}} |
| doStance | all combat modes | your weapon's stance move |
| st1 | falx_macro | stun: {{bash 1 <target> head}} |
| dr | falx_macro | drag: {{ankle <target>}} |
| ev | falx_macro | eviscerate: {{evisc <target>}} |
| nm | chain_macro | no-mind attack |

A worked example for a one-handed sword. Type each of these once per character. The game prompts you for the command string after each one:


~~~
@macro at1     ->  slash <target>
@macro at2     ->  thrust <target>
@macro at3     ->  chop <target>
@macro at4     ->  slash <target> high
@macro at5     ->  thrust <target> low
@macro at6     ->  chop <target> head
@macro app1    ->  app 1 <target>
@macro adv1    ->  advance 1 <target>
@macro k1      ->  kill 1 <target>
@macro r       ->  wield sword
@macro doStance -> stance <target>
~~~


Set your target first with the game's own **target** command. The combat modes act against your current target:


~~~
target rat|snake
~~~


For the game side of macros and targeting, see [Macros](/macros/) and [Macros and Targeting](/macros-and-targeting/).

### Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| mode not in the mode list | folder not added, or Reload Scripts not run | add the folder under **Script Directories** (Esc menu, **Automation**), then **Reload Scripts** |
| "unknown mode" | typo, or the file is a {{lib_*.lua}} helper (it never appears in the list and there's no reason to start one) | check the list with {{/list}} (names are matched regardless of case) |
| combat mode starts but nothing attacks | {{@macro}} entries missing on this character | see the [macro table](#macros) above, and watch for the game answering "I don't understand" to {{at1}} |
| mode stops on its own | fatigue ran out, a script error hit the 2-second limit, or the mode finished | check the app log |
| error when reloading | a {{lib_*.lua}} file it needs is missing, or the ZIP was unzipped one folder too deep | the folder must contain {{macro.lua}} directly |
| commands keep going after you stop it | the queue is still draining | {{/mode disable}}, then Alt+X |
| changes to a script do nothing | it wasn't reloaded | **Reload Scripts** (Esc menu, **Automation**). This also clears cached libraries |

The app log is at:


~~~
~/.local/state/praetor/tec.log                    (macOS and Linux)
C:\Users\<you>\.local\state\praetor\tec.log      (Windows)
~~~


If you need to ask for help, paste the last few lines mentioning your mode into #unofficial-clients along with the exact **/mode** command you ran.

### Modify an existing script

Copy the mode file from the shared folder into your own scripts folder under a new name. A mode's name is its filename, so a copy of **macro.lua** saved as **mymacro.lua** runs as its own mode without touching the shared original:


~~~
/mode mymacro
~~~


**Reload Scripts** after saving any change.

**Change the attack rotation.** In **macro.lua**, the rotation is a plain list near the top of the file:


~~~
local default_actions = {'at1', 'at2', 'at3', 'at4', 'at5', 'at6'}
~~~


Drop it to three slots, or reorder it to lead with your hardest hit:


~~~
local default_actions = {'at3', 'at1', 'at2'}
~~~


**React to a new phrase.** **lib_strings.lua** is a shared helper that several combat modes load for the lines they react to. Its **must_stand** list currently reads:


~~~
S.must_stand = {
    'Several trainers drag you back to the start.', 'You must be standing',
    "You do not meet that stance's requirements",
}
~~~


Add a phrase the game sends that isn't covered yet, say, a stance-break message:


~~~
S.must_stand = {
    'Several trainers drag you back to the start.', 'You must be standing',
    "You do not meet that stance's requirements", 'You are knocked off balance',
}
~~~


Editing a **lib_** file in the shared folder affects every mode that loads it. Copy the whole set (the mode plus the libraries it needs) into your own folder first if you want the change to stay isolated.

### Write a simple mode

A mode is a Lua file that returns a table. Here's a complete one, **greet.lua**, that waves back whenever someone waves at you:


~~~
local M = {}

M.desc = 'Say hello whenever someone waves at you'

function M.on_start(args)
    log('greet mode started')
end

function M.on_stop()
    log('greet mode stopped')
end

M.reactions = {
    {
        match = 'waves at you',
        action = function(text)
            send('wave')
        end,
    },
}

return M
~~~


Reading it top to bottom:

* **M.desc** is the one-line description the mode list and the hint line show next to the mode's name.
* **on_start** runs when the mode is activated, and gets the words you typed after the mode name as a list of arguments.
* **on_stop** runs when you switch away.
* **reactions** is a list of match and action pairs. A match is a plain substring of the game text, or a pattern using an asterisk as a wildcard. A list of strings matches if any of them does. When a line matches, the action runs with that line as its argument.
* **send** queues a command for the game.
* **return M** at the end hands the finished mode to Praetor.

A reaction can also take two optional fields. **condition** is a function returning true or false that gates whether the action fires, useful for checking your health or your own state before acting. **delay** is a number of milliseconds to wait before the action runs. Neither is needed above.

Save the file in your scripts folder, **Reload Scripts**, then:


~~~
/mode greet
~~~


A second example: count how many times you've waved, using a timer and per-mode state. Replace **on_start** with:


~~~
function M.on_start(args)
    state.set('waves', 0)
    set_interval(function()
        log('waved ' .. state.get('waves') .. ' times so far')
    end, 60000)
end
~~~


and add one line to the reaction's action, before the send:


~~~
state.set('waves', state.get('waves') + 1)
~~~


State is scoped to the current mode and clears when you switch modes, unless you mark a key with **state.persist**, which keeps it across switches and app restarts. Timers started with **set_interval** or **set_timeout** are canceled automatically when the mode stops, so there's nothing to clean up in **on_stop**.

### Rules that bite

* Only one mode runs at a time. Starting another stops the current one.
* Each piece of Lua (a reaction, a timer callback, on_start, on_stop) may run for at most 2 seconds. If it doesn't finish, Praetor aborts it and logs an error, then keeps going.
* **send** queues a command rather than sending it instantly. Commands go out with a delay (900ms by default, or your own via a second argument in milliseconds) and at least 400ms apart from each other.
* A command identical to one already waiting in the queue is dropped rather than queued twice.
* The queue holds 20 commands and drops anything past that, except high-priority commands (configured in the menu), which push their way in instead of being dropped.
* Matching is plain text, not a regular expression, and a reaction's Lua only runs when its match actually matches a line.
* Matching is case-sensitive.
* The first reaction that matches a line wins. Later reactions in the list are not checked.
* **Reload Scripts** clears cached libraries, so an edit to a **lib_** file only takes effect after a reload.

### Learn more

* [Lua API reference](https://github.com/cyber-godzilla/praetor/blob/main/docs/lua-api.md): every function, state, metrics, and timer Praetor exposes to scripts
* [praetor-scripts](https://github.com/cyber-godzilla/praetor-scripts): the whole shared library, with a README that lists every mode
* [Lua 5.1 reference manual](https://www.lua.org/manual/5.1/)
* Ask in #unofficial-clients if you get stuck

### See also
* [Praetor](/praetor/): install and first login
* [Praetor Guide](/praetor-guide/): using the client
* [TEC Discord](https://discord.gg/fevBA8j): #unofficial-clients
