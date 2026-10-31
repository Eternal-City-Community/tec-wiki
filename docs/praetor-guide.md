---
title: "Praetor Guide"
category: "Guides & Commands"
parent: praetor
---

# Praetor Guide


This page covers the desktop and web interfaces once Praetor is running. For installing the desktop app, and for a quick reference of every shortcut and slash command, see [Praetor](/praetor/).

[TOC]

### The layout {#layout}

![Praetor desktop interface with numbered layout callouts](/assets/wikidot/praetor-guide/praetor-layout-callouts.png)

The picture shows the default desktop arrangement. The numbered legend below matches its callouts, but most views can now be moved.

1. **Status bar**: your vitals, a lighting readout (click it to check the light level), and whether you're connected.
2. **Main tab bar**: **All** is fixed first. Any other built-in or filtered text view placed in **Main tabs** appears here.
3. **Output pane**: the selected text view scrolls here. The mouse wheel and PgUp/PgDn scroll it, and incoming text keeps following the bottom unless you've scrolled up.
4. **Map view**: rooms as colored squares. White lines are open passages, black lines are walls, and brighter squares are better-lit rooms.
5. **Compass view**: green arrows are exits you can take right now. The center dot carries up/down markers when a room has them.
6. **Vitals view**: Health, Fatigue, Encumbrance, and Satiation. Click one to check your exact condition.
7. **Action Sets, Modes, and Variables views**: Action Sets holds your command buttons, Modes controls Lua automation, and Variables edits reusable command values.
8. **Command input**: where you type to the game. A hint line appears above it while you type a slash command.
9. **Automation Bar**: PraetorScript status fills the left side. The character profile, play-script, and current-mode controls stay on the right. While a PraetorScript chain is active, **Play** becomes **Stop**.

Right-click the output for Copy and Paste. Ctrl+C copies a selection and Ctrl+V pastes into the input.

#### Arrange views and sidebars

Open **Esc → Layout & display → Arrange layout**. Every display item is a **view**. The built-in views are **All**, **Metrics**, **Map**, **Compass**, **Vitals**, **Action Sets**, **Modes**, and **Variables**. A **Debug** view is available only when the client itself is running in debug mode. Your filtered text views appear by name and are labeled **Type: Filtered text**. Internal IDs are never shown.

A view can occupy exactly one destination:

* **Main tabs** puts it in the tab row above the output. All cannot be moved away from here.
* A **sidebar** stacks it in that sidebar. You can add any number of named left or right sidebars and choose each one's order, width, view order, and view heights.
* The **Bench** holds views that are not currently displayed. It is a searchable, independently scrolling column on the right of the editor.

Drag a view to move it. A highlighted placement bar shows the exact insertion point, and every change saves immediately for the active character. Removing a view from a destination returns it to the Bench. Deleting a sidebar also returns all of that sidebar's views to the Bench in their existing order.

**Alt+S** turns all sidebars on or off for the active character. Each sidebar also has an explicit arrow button. A collapsed sidebar becomes a 30-pixel title rail and does not render its views; expand it with the same button. When the window is too narrow to preserve the main area, Praetor temporarily collapses outer sidebars and shows a toast explaining what happened. Manual collapse state is saved; responsive collapse is temporary.

At widths below 900 pixels, the interface moves map navigation and **Actions / Modes / Menu** into a bottom dock, allows the status bar to scroll, and stacks responsive settings screens. praetor-web also follows the mobile browser's visible viewport as the software keyboard opens and respects safe-area insets. You can preview most width-dependent choices by resizing the desktop window, although browser permission, software-keyboard, and safe-area behavior still require a phone or tablet. The broader mobile-first interface is planned for 0.7.0.

### Character profiles {#character-profiles}

Praetor starts each login or restart on the global **Default** profile. Default is both the safe state before a character is selected and the template for new character profiles.

Open **Esc → Character → Manage character profiles** to add, rename, or delete profiles. Give each character:

* a unique profile name;
* the TEC account used to reach that character picker; and
* the positive character number shown in that account's picker.

Character numbers only need to be unique within an account. Default cannot be renamed or deleted. Deleting another profile asks for confirmation and removes its layout, character overrides, and character-scoped Lua data.

With **Automatically follow play and sleep commands** enabled, Praetor changes profiles after these commands are successfully sent:

* `play 1` selects character number 1 for the logged-in account.
* `play`, followed by `1`, does the same. Another intervening command cancels the pending choice.
* `sleep` returns to Default.

This detection also works when those game commands come from a PraetorScript chain or from Lua's `praetor_script()` function. Turn the option off when you want `play` and `sleep` to leave the active profile alone.

The character button on the Automation Bar is a lightweight picker. A bare **/character** opens the full Character menu. **/character "Marcus Aurelius"** switches by profile name, and **/character global** returns to Default. Selecting the profile that is already active does nothing. A successful switch always opens that profile's **All** tab and may require stopping active Lua or play-script automation first.

Variables, filtered views, Action Sets, the selected Action Set, Quick-Cycle Modes, High-Priority Commands, Highlights, layout placement, and long-term Lua data follow the active profile. New characters copy Default's variables and receive its starting configuration, then character-specific edits stay separate. Action Sets, Quick-Cycle Modes, and High-Priority Commands continue to inherit Default until you customize them for that character.

### Views and tabs {#tabs}

The **All** view always receives everything. **Filtered text views** use your own include and exclude rules. A line appears if it matches any active include rule and no active exclude rule. Rules are case-insensitive substrings, with two wildcards:

| Wildcard | Stands for | Example rule | Matches | Doesn't match |
| --- | --- | --- | --- | --- |
| `*` | any run of characters, including none | `You hit the*rat` | You hit the rat, You hit the giant rat | You hit a rat |
| `?` | exactly one character | `?at` | rat, cat, hat | at |

To build a Think/OOC view:

**1.** Press **Esc**, choose **Layout & display**, then **View Library**.

**2.** Choose the character that owns the view, add a filtered text view, and name it:


~~~
Think/OOC
~~~


**3.** Add these three include patterns, one per rule:


~~~
?m OOC>
thinks aloud
You think aloud
~~~


**4.** Open **Arrange layout** and drag **Think/OOC** from that character's Bench into **Main tabs** or a sidebar. View and layout changes save immediately.

To build a Combat/Skills view:

**1.** In **View Library** again, add a filtered text view and name it:


~~~
Combat/Skills
~~~


**2.** Add these four include patterns, one per rule:


~~~
[Success:
You are no longer busy
is stunned!
is no longer stunned
~~~


**3.** Open **Arrange layout** and place it in Main tabs or a sidebar.

An exclude-only view (no active include rules) can opt in to showing the commands you send with **Route command echoes**. Otherwise it would catch every echoed command, since an exclude-only view matches everything not explicitly excluded.

The View Library is global: its left column lists every character's filtered views and shows whether each is in Main tabs, a named sidebar, the Bench, or unplaced. Editing still applies to the character selected in the editor. New views begin on that character's Bench.

The **Metrics** view is a session dashboard: kills, actions, session duration, and any metrics a running mode declares, plus a history of past sessions.

When Metrics or a filtered text view is placed in Main tabs, **Tab** and **Shift+Tab** cycle the main tabs. **Alt+1** through **Alt+9** and **Alt+0** jump straight to a tab (0 is the tenth).

### PraetorScript {#praetorscript}

Single-line command input and Action Set buttons support **PraetorScript**, a lightweight language for combining commands, saved values, live character vitals, timing, and reactions to game text.

PraetorScript is intended for short command sequences. It does not replace Lua modes or **/play** scripts.

#### Variables: `${}`

Insert a saved variable with `${name}`:


~~~
kill ${target}
get ${weapon}
~~~


Variables are managed through the **Variables** view or **Esc → Input & commands → Variables**. You can also create or replace one from the command input with `/set-variable name value` (or the shorter `/set-var`). Variables belong to the active character profile.

Add a fallback after a colon when a variable might be empty or missing:


~~~
count ${count:25}
get ${weapon:gladius}
~~~


In the case above, if `count` has a non-empty saved value, Praetor inserts that value. Otherwise it inserts `25`. A value such as `0` is populated and does not use the fallback.

Variable names are case-sensitive. Values and fallbacks are inserted once and are not processed recursively. They cannot inject extra separators or control steps.

An unknown variable without a fallback rejects the entire submission before anything is sent.

#### Live values: `my.*`

PraetorScript also exposes four read-only values from the game's live status updates:

| Value | Current percentage |
| --- | --- |
| `my.health` | Health |
| `my.fatigue` | Fatigue |
| `my.encumbrance` | Encumbrance |
| `my.satiation` | Satiation |

Use `${my.health}` anywhere ordinary PraetorScript interpolation is accepted. Unlike a saved variable, a `my.*` value is resolved when that step executes, so a later step sees the latest status:


~~~
$(notify "Vitals" "Health ${my.health}, fatigue ${my.fatigue}")
$(set-var last_health ${my.health})
~~~


Live interpolation also works in game commands, `wait` durations, `wait-for` timeouts, repeat commands and limits, and `add-var` amounts. A fallback such as `${my.health:unknown}` is used until Praetor has observed that value. Saved variables do not recursively turn into live references.

For `wait-for`, `until`, and `cancel-on`, use a bare `my.*` comparison with `==`, `!=`, `<`, `<=`, `>`, or `>=`:


~~~
$(wait-for my.health >= 75 timeout 30)
$(repeat "rest" until my.fatigue <= 20)
$(repeat "advance" until "You arrive" cancel-on my.health <= 25 max 10)
~~~


These conditions are rechecked whenever Praetor receives a new status update. The right side must be numeric, but it may come from a saved or live value, such as `my.health >= ${safe_health:75}`.

#### Fixed delays: `;;`

Separate commands with `;;` to send them in order using the configured chain delay:


~~~
stand;;look;;inventory
~~~


Praetor sends `stand`, waits for the configured delay, sends `look`, waits again, and then sends `inventory`.

The default delay is 900 milliseconds. Change it under **Esc → Input & commands → Input behavior → ;; chain delay**.

A single semicolon is ordinary text.

#### Waiting for roundtime: `&&`

Use `&&` when the next command should wait for the game to report that you are ready:


~~~
stand&&climb wall&&look
~~~


Praetor sends `stand` and waits for a recognized unbusy response. After the configured response delay, it sends `climb wall`. The next unbusy response advances the chain to `look`.

The default response delay is 100 milliseconds. Change it under **Esc → Input & commands → Input behavior → && response delay**.

Recognized responses include:

* You are no longer busy.
* You are no longer stunned.
* You wield…
* You grab onto…
* You are already wielding…
* You successfully train to rank…
* You stop walking…

**Please reach out to CyberGodzilla 2099 in #unofficial-clients in Discord if you find other "No Longer Busy" style responses that should be added here**

One unbusy response advances one waiting chain. When several chains are active, they consume these responses in submission order.

A single ampersand is ordinary text.

#### Control steps: `$()`

A `$()` control step can pause a chain, wait for game text, display a notification, change a saved variable, or repeat a command.

Each control must occupy a complete chain step.

##### Wait for a duration


~~~
look;;$(wait 2.5);;inventory
~~~


`$(wait 2.5)` pauses the chain for 2.5 seconds.

The surrounding `;;` separators retain their normal delays. In this example, Praetor waits the configured `;;` delay before reaching the control step, waits another 2.5 seconds, and then waits the next `;;` delay before sending `inventory`.

The number of seconds may come from a variable or fallback:


~~~
look;;$(wait ${pause:2.5});;inventory
~~~


##### Wait for game text


~~~
search here;;$(wait-for "You find a button");;push button
~~~


`wait-for` pauses until a future game line contains the quoted text. Matching is case-sensitive.

Add a positive timeout in seconds to keep a missing response from waiting forever:


~~~
search here;;$(wait-for "You find a button" timeout 30);;push button
~~~


If the timeout expires, Praetor cancels the entire chain instead of advancing it. The number may come from a variable or fallback.

Add `cancel-on` when a particular response should cancel the chain immediately:


~~~
$(wait-for "The gate opens" cancel-on "The gate is locked" timeout ${limit:30});;go gate
~~~


`cancel-on` and `timeout` are both optional and may appear in either order.

When `wait-for` immediately follows a command, Praetor activates the matcher before sending that command. This prevents a fast response from arriving before the matcher is ready.

Without a `timeout`, the wait remains active until it matches, a `cancel-on` response appears, the connection closes, or you use **Stop** or **Alt+X**.

##### Show a notification


~~~
look;;$(notify "Finished looking")
~~~


`notify` displays an in-app notice, requests the available desktop or browser notification, and uses the script Discord destination when it is enabled, then continues the chain. It is not gated by the Lua-script notification permission.

Pass two quoted strings to give the notification a custom title:


~~~
$(notify "Training" "Rank gained")
~~~


With one string, the title defaults to **Praetor**. Variables and fallbacks work in both the title and message.

For example:


~~~
$(notify "${item:sought item} acquired")
~~~


##### Set a variable


~~~
$(set-var target "scarred bandit")
~~~


`set-var` creates or replaces the same persisted variable used by `${name}`, the Variables editor, `/set-variable`, and Speech Color character patterns. The value can be quoted when it contains spaces, and `""` saves an empty value. Variable names must begin with a letter or underscore and contain only letters, numbers, and underscores.

The change happens when the chain reaches the control step. It is saved immediately, appears in every open Variables editor, and is available to later submissions.

##### Add to a numeric variable


~~~
$(add-var attempts 1)
~~~


`add-var` adds an amount to an existing saved variable. Both its current value and the amount must be finite numbers; the amount may be positive, negative, whole, or decimal. Praetor persists the sum in ordinary decimal notation and updates the Variables UI immediately.

Variable controls can be combined in one chain:


~~~
$(set-var attempts 0);;$(add-var attempts 1)
~~~


This leaves `attempts` set to `1`. If the variable is missing or its current value is not numeric, `add-var` cancels the chain with an error rather than inventing a starting value.

##### Repeat until successful


~~~
$(repeat "unlock chest with lockpick" until "You hear a click")
~~~


`repeat` sends the quoted game command immediately. Each recognized unbusy response causes Praetor to send it again after the configured `&&` response delay.

When a future game line contains the `until` text, the repeat ends and the surrounding chain advances.

Add `cancel-on` when a response should stop the entire chain instead:


~~~
$(repeat "unlock chest with lockpick" until "You hear a click" cancel-on "Your lockpick broke");;look
~~~


In this example:

* `unlock chest with lockpick` repeats after each unbusy response.
* `You hear a click` ends the repeat and advances to `look`.
* `Your lockpick broke` cancels the entire chain, so `look` is not sent.

Success and cancellation matching is case-sensitive. The repeated command must be a game command, not a local slash command.

By default, an `until` repeat has no attempt limit. Add `max` to set a positive maximum number of sends:


~~~
$(repeat "unlock chest with lockpick" until "You hear a click" max 10)
~~~


The initial send is attempt 1. If attempt 10 becomes unbusy without the success text, Praetor cancels the chain as a failed repeat rather than sending attempt 11. `max` and `cancel-on` may appear in either order, and the maximum may come from a variable or fallback.

##### Repeat a fixed number of times


~~~
$(repeat "search chest" count 5)
~~~


The `count` form sends the command exactly five times. The first send happens immediately. Each later send follows a recognized unbusy response and the configured `&&` response delay. After the fifth send, one final unbusy response and delay completes the repeat and advances the surrounding chain.

`count` requires a positive whole number and may use a variable or fallback:


~~~
$(repeat "search chest" count ${tries:5} cancel-on "You find nothing");;look
~~~


Reaching the exact count completes normally. This is different from `until ... max N`, which cancels the chain when it reaches the limit without seeing the success text. The optional `cancel-on` text still cancels the entire counted chain immediately.

#### Combining the features

PraetorScript features can be combined in the same submission.

This example uses variables, fallbacks, a bounded success-aware repeat, fixed pacing, and a titled notification:


~~~
$(repeat "search ${container:chest}" until "You find ${item:key}" cancel-on "You find nothing" max ${tries:10});;get ${item:key};;$(notify "Search complete" "${item:key} acquired")
~~~


Praetor:

1. Uses the saved `container` and `item` values, falling back to `chest` and `key`.
2. Repeats the search after each unbusy response.
3. Advances when the success text appears.
4. Cancels everything if `You find nothing` appears.
5. Cancels as a failed repeat if ten searches complete without either response.
6. Gets the item after the configured `;;` delay.
7. Displays a titled notification after the next configured delay.

This example combines unbusy-aware commands with an explicit pause:


~~~
stand&&get ${weapon:gladius};;$(wait ${pause:2});;wield ${weapon:gladius};;$(notify "Ready")
~~~


#### Automation Bar status

The row below the input is the **Automation Bar**. Its left side always stays in place: it reads **PraetorScript idle** when no chain is active, then expands to use the available space while a chain is running. The play and current-mode controls remain fixed on the right.

![Active Automation Bar waiting for game text, with chain progress and Stop control](/assets/wikidot/praetor-guide/praetor-automation.png)

For an active chain, the bar shows the current step and what Praetor is doing:

* `sending “command”` for a command being sent
* `pacing 0.9s` for a `;;` delay; the displayed value is the delay captured when the chain started, not a countdown
* `waiting for unbusy` for an `&&` continuation
* `waiting 3s` for `$(wait 3)`; true waits count down in whole seconds
* `waiting for “text” 30s` for a bounded `wait-for`; the timeout counts down in whole seconds
* `notifying “title”` for `notify`
* `setting “name”` for `set-var`
* `adding to “name”` for `add-var`
* `repeating “command” (2/5)` for a bounded or counted repeat, or `(2)` for an unlimited repeat

If more than one chain is active, the oldest chain is shown and a `+N` marker reports the others. Any active chain replaces **Play** with **Stop**.


#### Literal syntax and quoted text

Escape PraetorScript syntax when you want to send it literally:

| Write | Sends |
| --- | --- |
| `\${` | `${` |
| `\;;` | `;;` |
| `\&&` | `&&` |
| `\$()` | `$()` |

Inside quoted `$()` arguments, escape a quote as `\"` and a backslash as `\\`:


~~~
$(notify "The guard said \"halt\"")
~~~


Pipes, semicolons, `&&`, and other punctuation inside quoted arguments are ordinary text:


~~~
$(wait-for "Result | success ;; continue && ready")
~~~


#### Scope and safety

The full PraetorScript language applies to:

* Single-line command input
* Action Set buttons
* Text submitted deliberately by a Lua mode through `praetor_script(expression)`

Variable expansion, including `${name:fallback}`, also applies to:

* Multi-line submissions
* Files sent with **/send**

Multi-line submissions and **/send** files do not interpret `;;`, `&&`, or `$()` controls. Ordinary Lua `send()` calls, **/play** scripts, numpad movement, and other direct interface controls bypass PraetorScript. A Lua mode must call `praetor_script(expression)` explicitly when it wants the full parser, executor, cancellation, and Automation Bar lifecycle.

Praetor validates the entire submission before sending its first command. A single submission may contain up to 100 commands and control steps.

While any chain is active, the Play button becomes **Stop**. Stop cancels queued commands, timers, text matchers, and repeats. Commands already sent to the game cannot be recalled.

Pending chains are also discarded when the connection closes or is replaced.

### Typing commands {#typing}

Plain **Enter** sends the input line to the game. **Up** and **Down** recall earlier commands from your history, when the caret sits on the input's first or last line.

TEC's leading double quote remains ordinary game input for targeted speech. For example, this is sent to the game exactly as written rather than being consumed by Praetor:


~~~
"apula Good morning
~~~


Only a slash in the first non-whitespace position begins a Praetor slash command. An unknown slash command produces visible feedback instead of silently disappearing.

**Ctrl+R** opens reverse history search, readline-style: type to filter, **Ctrl+R** again steps to an older match, **Enter** sends the match, **Esc** cancels.

**Tab** completes a slash command when the hint line is showing a suggestion.

**Shift+Enter** (or Ctrl+Enter or Alt+Enter) inserts a newline instead of sending. Saved variables are expanded, then the multi-line block goes out as a single message, embedded newlines and all, and the server splits it. Slash commands and command-chain separators aren't interpreted inside a block. The **Retain Input After Send** setting keeps the sent text selected in the input instead of clearing it (see Settings below for how to change settings).

The **Input spellcheck** setting turns spellcheck on the command input on or off.

### Moving around {#moving}

| Key | Sends | Key | Sends | Key | Sends |
| --- | --- | --- | --- | --- | --- |
| 7 | nw | 8 | n | 9 | ne |
| 4 | w | 5 | look | 6 | e |
| 1 | sw | 2 | s | 3 | se |
| 0 | ss | . | stand |  |  |
| − | d | + | u |  |  |

With **NumLock off**, the numpad walks. With it on, the numpad types digits as usual. Holding a movement key repeats the command, so you can hold a direction to keep walking. The **Numpad navigation** setting offers three choices: **Only when NumLock is off** (the default), **Always** (required on macOS, which has no NumLock, so the numpad then never types digits), and **Never**. The plus and minus keys always send `u` and `d`, regardless of NumLock.

You can also move with the mouse. Clicking a direction on the compass walks that way, and clicking the minimap sends:


~~~
sizeup here
~~~


### Slash commands {#slash}

Anything you type starting with a slash is handled by Praetor itself and never reaches the game. A hint appears above the input as you type, showing what the command expects.

| Command | Arguments | Description |
| --- | --- | --- |
| /help |  | Open **Tools & help → Help** for game search, syntax, keys, and commands |
| /guide |  | Open **Application → Getting started** and Praetor wiki links |
| /list |  | Open **Automation → Switch mode** to browse loaded modes |
| /character | [name\|global] | Open the Character menu, select a profile by name, or return to Default |
| /mode (/sm) | <name> [args…] | Start a mode |
| /toggle | &lt;label&gt; | Toggle a mode state value |
| /set | &lt;label&gt; <value> | Set a mode state value |
| /set-variable (/set-var) | &lt;name&gt; <value> | Create or replace a saved command variable |
| /calc (/rb) |  | Open **Tools & help → Rank-bonus calculator** |
| /wiki | [name] | Open **Tools & help → Wiki bookmarks**, or open one by name |
| /maps (/map) | [name] | Open **Tools & help → Map bookmarks**, or open one by name |
| /kudos | [name] [message] | Open **Tools & help → Kudos**, add a favorite, or queue one |
| /notes | [add\|open\|delete\|list] [title] | Open **Tools & help → Notes** or act on a note |
| /send |  | Pick a text file, expand saved variables, and send it to the game |
| /play |  | Pick a script and perform it |
| /pause |  | Hold the running performance |
| /resume |  | Continue a held performance |
| /stop |  | End the performance and drop its state |
| /next |  | Release a %wait-key hold |

Slash commands are not interpreted inside a multi-line block.

`/set` and `/set-variable` affect different things. `/set` changes a value exposed by the currently running Lua mode. `/set-variable` saves a general command-input variable and works even when no mode is running. Its value is the rest of the command, so spaces are allowed; use `""` to save an empty value. The change is persisted, available to later commands and Speech Color patterns, and appears immediately in every open Variables editor.

### The Esc menu {#menu}

The Esc menu is Praetor's main navigation. Its top row provides quick actions for **Character**, **Mode**, **Play a script**, **Send a file**, and **Reload scripts**. **Find a setting** searches every menu entry's name and explanation.

The remaining entries are grouped by purpose and display their scope:

| Section | Entries |
| --- | --- |
| **Character** | Switch character; Manage character profiles |
| **Layout & display** | Arrange layout; View Library; Text & display settings; Highlights; Speech colors; Ignored OOC accounts; Ignored Think characters |
| **Input & commands** | Input behavior; Variables; Action sets; High-priority commands |
| **Automation** | Switch mode; Quick-cycle modes; Script Manager; Reload scripts; Long-term script data |
| **Notifications & logs** | Notifications; Logging |
| **Themes** | Retro CRT effects |
| **Tools & help** | Notes; Kudos; Rank-bonus calculator; Wiki bookmarks; Map bookmarks; Help |
| **Application** | Application settings; Getting started |

**Current character** entries follow the active character profile. **All characters** entries are shared globally. **This device** entries affect the current desktop or browser device, and **Praetor server** entries affect the running backend.

Logout and **Quit Praetor** are at the bottom of the desktop menu. The web client instead offers **Disconnect shared game** and **Sign out of web UI**. The full Theme Manager is planned for Praetor 0.7.0; 0.6.0 puts Retro CRT effects in its eventual home.

#### Settings {#settings}

The old single Settings screen is now divided by purpose:

* **Input & commands → Input behavior**: typed and script command echo, input spellcheck, Retain Input After Send, `;;` and `&&` delays, and numpad navigation.
* **Layout & display → Text & display settings**: Colorwords, wound highlighting, map and compass scale, desktop output text size, and the mobile-web display controls.
* **Notifications & logs → Logging**: session transcript logging, application-log retention, and log path.
* **Application → Application settings**: Hide IP addresses and Check for updates on startup.

**Colorwords** finds recognized color names in game text and renders each word in an approximation of that color. It does not recolor the whole line; use Speech colors for that.

On the web client, the display screen also controls whether the mobile Actions/Modes/Menu row and tab selector are shown, whether map and compass hide while the command input is active, whether the first command letter is lowercased, and the mobile output text size.

#### Variables, action sets, and command priority

**Variables** stores reusable name/value pairs. Open it under **Input & commands**, or place the Variables view in a tab or sidebar. Names must begin with a letter or underscore and can contain only letters, numbers, and underscores. Use them with `${name}` in typed input, Action Set buttons, and **/send** files. Variables belong to the active character profile.

`/set-variable` (or `/set-var`) and PraetorScript's `set-var` and `add-var` controls update the same list. Lua modes can use `variables.get` and `variables.set`. Every change is persisted and appears in an already-open editor immediately.

![Variables editor with count, target, and weapon values](/assets/wikidot/praetor-guide/praetor-variables.png)

**Action sets** are character-aware collections of command buttons. New character profiles inherit Default's sets until customized. A shared set keeps the same underlying identity so edits can apply everywhere it is used; copying a set creates an independent one. Buttons add or remove columns as the containing sidebar changes width.

![Action Sets editor with command buttons](/assets/wikidot/praetor-guide/praetor-action-sets.png)

**Quick-cycle modes** lets **Alt+M** step through a chosen list. Open **Automation → Quick-cycle modes**, toggle the modes, and save. A new profile inherits Default's list until you customize it.

**High-priority commands** jump ahead of normal queued commands while preserving their order relative to other priority commands. Duplicate commands already waiting are dropped. If the queue is full, an incoming priority command replaces the newest normal command; if every queued command is already high priority, the incoming command is dropped.

Open **Input & commands → High-priority commands**, add the exact command text, one per entry, and save:


~~~
stand
retreat
~~~


![High-Priority Commands editor](/assets/wikidot/praetor-guide/praetor-priority-commands.png)

#### Wound highlighting

Open **Layout & display → Text & display settings** and enable **Highlight wounds**. Choose a color family for cuts, bruises/fractures, punctures/wounds, and burns. Severity selects the shade automatically, with the highest levels bolded.

Praetor 0.6.0 recognizes the verified combat catalogue and an observed subset of character-inspection descriptions, including `His right arm is badly scratched` and `Her face is completely black and blue`. The inspection mapping is provisional. Unknown, plural, treated, bleeding, and incomplete healer strings are deliberately left unchanged rather than guessed.

TEC uses different wound wording in three contexts: the combat result when damage is dealt, the description seen when casually looking at a character, and the more detailed examination shown to a healer.

The combat-result catalogue is:

| Severity | Cuts | Bruises / fractures | Punctures / wounds | Burns |
| --- | --- | --- | --- | --- |
| 1 | `shallow cut` | `small bruise` | `faint wound` | `minor burn` |
| 2 | `cut` | `bruise` | `puncture` | `burn` |
| 3 | `deep cut` | `ugly bruise` | `deep puncture` | `moderate burn` |
| 4 | `severe cut` | `major bruise` | `severe puncture` | `severe burn` |
| 5 | `devastating cut` | `fracture` | `gaping wound` | **Not yet verified** |

Retained game logs verify this provisional character-inspection catalogue:

| Severity | Cuts | Bruises | Punctures | Burns |
| --- | --- | --- | --- | --- |
| 1 | `is scratched` | `is bruised` | `is punctured` | **Not yet verified** |
| 2 | `is badly scratched` | `has a large bruise` | `is badly punctured` | **Not yet verified** |
| 3 | `is slashed` | `has a large black bruise` | `is pierced` | **Not yet verified** |
| 4 | `is slashed open` | `is badly bruised` | **Not yet verified** | **Not yet verified** |
| 5 | **Not yet verified** | `is completely black and blue` | **Not yet verified** | **Not yet verified** |

Those inspection severity numbers preserve the observed least-to-most-serious order but still need controlled confirmation. One retained healer log confirms this combined form without establishing a complete treatment catalogue:


~~~
His right shoulder has a large black bruise. It is not bleeding. There are some broken bones. His right shoulder is absolutely filthy. This part needs new bandages. There are no stitches on this part.
~~~


Additional game logs or primary wiki references are still needed for every unverified slot, fracture inspection text, and the full healer vocabulary for bleeding, cleanliness, bandages, splints, stitches, cuts, bruises, punctures, and burns.

#### Ignore filters {#filters}

![Ignore OOC Accounts editor](/assets/wikidot/praetor-guide/praetor-ignore-ooc.png)


Both filters match on the **name** shown in the line, and nothing else. Someone who switches between their in-character and out-of-character names on the OOC channel shows up as two different names, so you'd have to add both to stop seeing them.

A filtered line isn't deleted. It shows in the output as a short gray placeholder, so you can tell something was hidden. If you had ignored an account called Lucilla, her OOC lines would appear as:


~~~
[suppressed: Lucilla OOC]
~~~


Click the placeholder to reveal that one line, or press **Alt+I** to reveal every hidden line at once. Neither turns the filter off.

To ignore someone:

1. Press **Esc**
2. Choose **Layout & display**, then **Ignored OOC accounts** (or **Ignored Think characters**)
3. Add the name
4. **Save**

The ignore lists are shared across all character profiles.

### Speech colors {#speech-colors}

**Speech Colors** tint an eligible character's entire line, making speakers easy to identify while you scan a fast-moving conversation. They are intended for quick visual identification; the game's own directed-speech display still handles speech aimed at you.

Praetor recognizes ordinary speech in the form `<person> <speech verb>, "<text>"`. It supports the game's various speech verbs rather than requiring the literal word “says.” Think and OOC lines are excluded by default, but each character rule can opt into either or both.

To create a rule:

1. Press **Esc**, choose **Layout & display**, then **Speech colors**
2. Choose **+ Add character** and enter the character name or pattern
3. Open the color picker, search for a Colorword style, and select it
4. Optionally turn on **Think** and/or **OOC** for that character
5. **Save**

Character matching is case-insensitive and covers the speaker's whole name. `*` matches any run of characters and `?` matches one character, so `A * cloak` and `Apul?` are valid. You can also use current saved variables such as `${speaker}` or `${speaker:Apula}`. Variables are resolved whenever a line arrives, so changing one updates the match without editing the rule. A missing variable without a fallback leaves that rule unmatched until the variable is defined.

The scrollable color picker uses the same catalog as Colorwords. Search by part of a name (`crim` finds **Crimson**), or type an exact family name (`red`) to see every color in the Reds family. The list also includes alternating plural styles such as **oranges** and special entries such as **rainbow**. A Colorword appearing inside an already colored speech line keeps its own color.

For a shortcut, right-click any line Praetor recognizes as colorable speech and choose **Set a speech color**. The Speech Colors editor opens with the matched speaker's full name already filled in. Lines that do not match a supported speech form do not show the option.

### Highlights and notifications {#highlights}

**Highlights** make text stand out with a colored background, useful for rare drops and other things you don't want to miss scrolling past. To add one:

**1.** Press **Esc**, choose **Layout & display**, then **Highlights**. The screen states which character profile you are editing.

**2.** Add a new highlight and type the text to match. Matching is case-insensitive; `*` matches any run of characters, `?` matches one character, and saved variables such as `${loot}` are expanded live:


~~~
retalq
~~~


**3.** It starts in the **gold** style. Use the same searchable Colorword picker as Speech colors to choose another style.

**4.** Reorder rules to set their precedence, then click **Save**. You can toggle a highlight off or delete it at any time. Highlights belong to the active character profile.

**Notifications** can raise local desktop or browser alerts and can send selected alerts to a Discord channel through a webhook. Open **Esc → Notifications & logs → Notifications**.

Health, Fatigue, and every String match have their own controls:

* **Enable** or disable that rule.
* For Health and Fatigue, choose the percentage threshold.
* Choose **Focused or unfocused** or **Only while unfocused**.
* Turn the operating system's default **Sound** on or off.
* Send to **Desktop**, **Discord**, **Both**, or **Neither**.

Health starts enabled below 25%. Fatigue starts disabled with a 10% threshold. Both initially use local desktop or browser delivery without sound.

String rules also have their own match, title, and message. Matching is case-insensitive; `*` matches any run of characters and `?` matches one character. Saved variables work in all three fields. If a title resolves empty, Praetor uses **Alert**. If a message resolves empty, Praetor uses the matching game text. An unresolved variable suppresses that notification and produces a rate-limited warning.

Lua `notify()` calls are controlled separately by **Enable script notifications**, **Sound**, and **Also send to Discord**. This permission starts off. PraetorScript `$(notify ...)` is independent of the Lua permission and always creates an in-app notice plus the available local notification; it also uses the script Discord destination when configured.

For Discord delivery, create a webhook for the destination Discord channel, turn on **Enable Discord delivery**, paste its official `https://discord.com/api/webhooks/...` or `https://discordapp.com/api/webhooks/...` URL, and choose **Save and send test**. The field is password-masked, webhook tokens are never written to logs or returned errors, and Discord mentions are suppressed. Discord webhooks post to channels, not directly to an individual user's private messages.

In praetor-web, choose **Enable on this browser** on every device that should receive browser notifications. Browser permission and the focused/unfocused check are evaluated separately on each device.

Save after making changes.

### Search {#search}

**Ctrl+F** opens the scrollback search bar. Matches are tinted in the output, and the current match is outlined. **Enter** steps to an older match, **Shift+Enter** to a newer one, and **Esc** closes the bar.

**Alt+I** reveals lines the ignore filters (Ignore OOC Accounts, Ignore Think Characters) have hidden, without disabling the filters themselves.

### Notes {#notes}

![Praetor Notes list](/assets/wikidot/praetor-guide/praetor-notes.png)

The notepad keeps freeform notes: plans, backstory, who owes you what. Open it with **/notes**, or from **Tools & help → Notes**.

| Command | What it does |
| --- | --- |
| `/notes` | Open the notepad |
| `/notes add <title>` | Start a new note with that title |
| `/notes open <title>` | Open an existing note by title (case doesn't matter) |
| `/notes delete <title>` | Delete a note |
| `/notes list` | Print your notes into the output, title and preview, most recently edited first |

Notes are plain text files, one file per note, so you can edit or back them up outside Praetor. Each is titled by its first line, with the rest of the file as the body. They're shared across every account you log in with, not per character. They live in:


~~~
~/.config/praetor/notes/
~~~


### Sending a file {#send}

**/send** expands saved variables in a text file, then sends its contents to the game line by line. Command-chain separators in the file are sent as ordinary text rather than interpreted by Praetor. Use it for a prepared block of emotes, a list of commands, or anything else you'd rather not type live.

1. Type **/send** and press **Enter**
2. Pick the text file in the file dialog
3. A **Send File** window shows the file's name, its line count, and how many batches it will go out in
4. Click **Save** to start sending

How the file is sent:

* Files of 50 lines or fewer go out as one message
* Longer files go out 20 lines at a time, with a 250ms pause between batches
* A completely empty line always ends a batch, whatever the length
* Slash commands inside the file are not interpreted, so every line goes to the game as written
* **Alt+X** aborts whatever is left to send

Two example files. A short one, sent as a single message:


~~~
emote straightens his tunic and steps up to the rostrum.
say Citizens! The games begin at dusk.
emote raises a hand for quiet.
say Bring your coin and your courage.
~~~


A longer one with an empty line in the middle. The empty line ends the first batch, so the second group goes out after the 250ms pause:


~~~
get pack
open pack
look in pack

wear cloak
wield sword
~~~


Praetor keeps its long-running command producers from interleaving. **/send** is refused while a play script or typed PraetorScript chain is active. **/play** is refused while a send, typed PraetorScript chain, or Lua mode other than `disable` is active. Stop or finish the active work before starting the other operation.

### Play scripts {#play}

**/play** performs a prepared scene into the game: timed lines, waiting for another player's cue, and manual holds, for a staged announcement, a scripted duel, or any RP scene whose beats need to land at the right moment.

In the script file, a line starting with a hash mark is a comment and is dropped entirely. A line starting with a percent sign is an instruction (see below). Everything else, including blank lines, is sent to the game exactly as written.

| Instruction | Effect |
| --- | --- |
| `%wait:<duration>` | Pause, e.g. `%wait:5s` |
| `%wait-random:<min>-<max>` | Pause a random time in the range, e.g. `%wait-random:2s-6s` |
| `%wait-for:<pattern>[:<timeout>]` | Wait for matching game text, or the timeout (default 60s) |
| `%wait-key` | Hold until you type `/next` |
| `%note:<text>` | Show a reminder to yourself, without sending anything |

Controls while a performance is running:

| Command | What it does |
| --- | --- |
| `/play` | Pick a script file and preview it before starting |
| `/pause` | Hold the performance |
| `/resume` | Continue, re-running the interrupted instruction from the start |
| `/stop` | End the performance and discard its state |
| `/next` | Release a `%wait-key` hold |
| Alt+X | Stop immediately, the same as `/stop` |

Only those commands are accepted while a performance runs. Everything else is turned away, so nothing else can write to the game mid-scene.

A short example, opening on the performer's own cue:


~~~
%wait-key
emote unrolls a heavy vellum scroll, clearing his throat.
%wait:3s
say Hear me, citizens of the Eternal City!
%wait-random:4s-7s
say By decree of the Council, the north gate shall close at moonrise.
~~~


A second example that waits on another player. The note line is shown to you only, and the wait-for line holds until Gaius laughs or 30 seconds pass:


~~~
# Tavern toast. Stand at the bar before starting.
%note:Wait for Gaius to finish his story before the first line.
%wait-key
emote raises her cup.
say To Gaius, who never lets the truth spoil a good tale!
%wait-for:Gaius laughs:30s
emote drinks deeply.
%wait-random:3s-6s
say Another round, on me.
~~~


For the complete script-language reference: [full play-script reference](https://github.com/cyber-godzilla/praetor/blob/main/docs/play-scripts.md).

### Wiki, maps, calculator, kudos, and help

#### Wiki bookmarks {#lookups}

![Wiki Bookmarks browser](/assets/wikidot/praetor-guide/praetor-wiki.png)

**/wiki** on its own lists the built-in bookmarks, grouped by topic:

* **Character**: traits, stats, skills, veteran characters, reputation, national lores, national advantages
* **Combat**: combat overview, hunting grounds, armor
* **Skill Guides**: healing, locksmithing, herbalism, tailoring
* **Maps**: the maps index
* **Calculators**: rank bonus, training cost

Give it a bookmark's name to open that page in your browser:


~~~
/wiki traits
~~~


The same list is under **Tools & help → Wiki bookmarks**.

#### Map bookmarks

![Map Bookmarks browser grouped by region](/assets/wikidot/praetor-guide/praetor-maps.png)

**/maps** (or **/map**) on its own lists this wiki's maps by region: Iridine, The Steps, Invex River Delta, Salinae Swamp, Eastern Grasslands, Rock Valley, Franlius, Monlon, Seld, and Cullaiden Island. Each region expands to its individual maps. Give it a map's name to open that map in your browser, for example the Sewers and Sea Caves map:


~~~
/maps sewers
~~~


The same list is under **Tools & help → Map bookmarks**.

#### Calculator {#calculator}

![Rank-Bonus Calculator comparing current and target ranks with training costs](/assets/wikidot/praetor-guide/praetor-rbcalc.png)

**/calc** (or **/rb**) opens the rank-bonus and training-cost calculator, which uses the same math as this wiki's [Rank Bonus Calculator](/rank-bonus-calculator/) and [Training Cost Calculator](/training-cost-calculator/). Choose **Defensive**, **Offensive**, or **Noncombat**, then enter current and target Basics and Subskill ranks. Praetor shows side-by-side current and target rank bonuses for each posture and difficulty, including the Basics and Subskill rank bonuses.

The training-cost section shows the Basics and Subskill rank changes and the cost for slots 1 through 20; use the page button to switch between slots 1–10 and 11–20. **Self-trained**, **Self-taught**, and **Healing** adjust the calculation. Ranks above 1150 display a reminder that training to 1151 or higher requires `/selftrain`.

#### Kudos {#kudos}

![Kudos window with favorites and queued messages](/assets/wikidot/praetor-guide/praetor-kudos.png)

**/kudos** opens the kudos window. It has a **Favorites** list of names you kudos often, and a **Queue** of name-and-message pairs waiting to be sent. When the queue has entries, the window offers **Send** to send them all. From the input, a name alone adds a favorite, and a name with a message queues a kudos:


~~~
/kudos Lucilla
/kudos Lucilla Thanks for the escort through the swamp.
~~~


#### Help

**/help** opens **Tools & help → Help**. At the top, enter a game-help topic and choose **Search** to send `?topic` to the game, or choose **Open TEC Wiki** to open the wiki in your browser. The screen also documents input syntax, key bindings, and every slash command.

**/guide** opens **Application → Getting started**, with a short Praetor overview and links to this guide and the scripting documentation.

### Logs and data {#logs}

Session transcripts are turned on or off under **Notifications & logs → Logging** with **Session transcript logging** and moved with **Log path**. **Retain application logs** controls whether old app logs survive the next launch. Session transcripts are written to:


~~~
~/.config/praetor/logs/
~~~


The app log (startup, connection, and error detail, not a copy of the game text) is at:


~~~
~/.local/state/praetor/tec.log
~~~


![Long-term Script Data browser with export and clear controls](/assets/wikidot/praetor-guide/praetor-persistent-data.png)

**Long-term script data** is for accumulated records such as maps, observations, and lifetime statistics. Player-visible preferences and resumable workflow inputs belong in Variables instead; ordinary private mode state clears when the mode changes.

To see what modes have accumulated for the active character:

1. Press **Esc**
2. Choose **Automation**, then **Long-term script data**
3. Export selected keys, or clear them

This data follows the active character profile. Default uses the authenticated account's namespace.

Exports land in:


~~~
~/.config/praetor/exports/
~~~


On Windows, the tilde is your user folder, so the config folder is:


~~~
C:\Users\<you>\.config\praetor
~~~


### See also
* [Praetor](/praetor/): install and first login
* [Praetor Scripts](/praetor-scripts/): installing, running, and writing modes
* [TEC Discord](https://discord.gg/fevBA8j): #unofficial-clients
