---
title: "Praetor"
category: "Reference"
parent: unofficial-game-clients
---

# Praetor

Praetor is a free, open-source desktop client for The Eternal City. It runs on Windows, macOS, and Linux.

![Praetor connected to the Welcome Room, showing game output, map, compass, vitals, sidebar tools, command input, and Automation Bar](/assets/wikidot/praetor/praetor-action-screen.png)


[TOC]

### Features at a glance

* Minimap and compass, drawn live as you move
* Output tabs with your own include/exclude filters
* Loot and keyword highlighting, so rare drops don't scroll past you
* Color words shown in their color
* Desktop notifications for low health, low fatigue, custom text patterns, and optional alerts from Lua scripts
* Lua automation modes, with a shared script library you can pull from
* A session metrics dashboard your automation modes can write to
* Saved command variables that can be reused from the input, Actions, and Variables sidebar
* PraetorScript command chains: variables and fallbacks, configurable `;;` pacing, unbusy-aware `&&`, waits, text reactions, notifications, and bounded or counted repeats
* Live chain status and immediate cancellation from the Automation Bar or with Alt+X
* Multiple stored accounts, so you can switch accounts without retyping passwords
* Scrollback search (Ctrl+F) and command-history search (Ctrl+R)
* A freeform notepad for notes, backstory, or IOUs

### Install

Pick your system below. All downloads live on the [GitHub releases page](https://github.com/cyber-godzilla/praetor/releases/latest).

#### Windows

##### Download the installer

**1.** Open the [latest release](https://github.com/cyber-godzilla/praetor/releases/latest) and, under **Assets**, download the installer:


~~~
Praetor_<version>_windows_amd64_installer.exe
~~~


**2.** Run it. Windows may show a blue **Windows protected your PC** box because the installer isn't signed with a paid certificate. Click **More info**, then **Run anyway**.

**3.** Click through the installer. Praetor is added to the Start Menu. Launch it from there.

**4.** To update later, download the newer installer and run it over the top. Your settings and stored accounts are kept.

##### Or use Chocolatey

If you already use Chocolatey, you can install and update from there instead:


~~~
choco source add -n=praetor -s="https://packages.buildkite.com/cybergodzilla-2099/praetor-nuget/nuget/index.json"
choco install praetor
~~~


#### macOS

##### With Homebrew

If you already use Homebrew, this is the easiest route and it handles updates for you.

**1.** Open Terminal and run:


~~~
brew install --cask cyber-godzilla/tap/praetor
~~~


**2.** Open Praetor from Applications (or Spotlight).

**3.** The first time, macOS will say it cannot verify the developer, because Praetor isn't signed with an Apple developer account. Right-click the app in Applications, choose **Open**, and confirm once. After that it opens normally.

**4.** To update later, run:


~~~
brew upgrade
~~~


##### Without Homebrew

**1.** Open the [latest release](https://github.com/cyber-godzilla/praetor/releases/latest) and, under **Assets**, download the zip. It works on both Apple Silicon and Intel Macs:


~~~
Praetor_<version>_darwin_universal.zip
~~~


**2.** Double-click the zip to unpack it, then drag **Praetor** into your Applications folder.

**3.** The first time, macOS will say it cannot verify the developer. Right-click the app in Applications, choose **Open**, and confirm once. After that it opens normally.

**4.** To update later, download the newer zip and replace the app in Applications. Your settings and stored accounts are kept.

#### Linux

Each package adds Praetor to your desktop applications menu and installs a terminal version (**praetor-tui**) alongside it. Commands below go in a terminal.

##### Debian / Ubuntu

**1.** Add the signing key:


~~~
curl -fsSL "https://packages.buildkite.com/cybergodzilla-2099/praetor-debian/gpgkey" | sudo gpg --dearmor -o /etc/apt/keyrings/praetor-archive-keyring.gpg
~~~


**2.** Add the repository:


~~~
echo "deb [signed-by=/etc/apt/keyrings/praetor-archive-keyring.gpg] https://packages.buildkite.com/cybergodzilla-2099/praetor-debian/any/ any main" | sudo tee /etc/apt/sources.list.d/praetor.list
~~~


**3.** Install:


~~~
sudo apt update && sudo apt install praetor
~~~


**4.** Updates arrive with your normal upgrades:


~~~
sudo apt upgrade
~~~


##### Fedora / RHEL

**1.** Create the repository file as root:


~~~
sudo tee /etc/yum.repos.d/praetor.repo <<'EOF'
[praetor]
name=Praetor
baseurl=https://packages.buildkite.com/cybergodzilla-2099/praetor-rpm/rpm_any/rpm_any/$basearch
enabled=1
repo_gpgcheck=0
gpgcheck=0
priority=1
EOF
~~~


**2.** Install:


~~~
sudo yum install praetor
~~~


**3.** Updates arrive with your normal upgrades:


~~~
sudo yum update
~~~


##### Arch

x86_64 only. The 1.0.0 in the section name is the repository's layout version and never changes.

**1.** Add this to the pacman configuration file:


~~~
# /etc/pacman.conf
[praetor-1.0.0]
SigLevel = Never
Server = https://packages.buildkite.com/cybergodzilla-2099/praetor-arch/files
~~~


**2.** Install:


~~~
sudo pacman -Sy praetor
~~~


**3.** Updates arrive with your normal upgrades:


~~~
sudo pacman -Syu
~~~


##### Other distributions

**1.** Open the [latest release](https://github.com/cyber-godzilla/praetor/releases/latest) and download the archive for your machine:


~~~
praetor_<version>_linux_amd64.tar.gz
praetor_<version>_linux_arm64.tar.gz
~~~


**2.** Unpack it and run the **praetor** binary inside. This route adds no menu entry, so make a shortcut to the binary if you want one.

### First login

![Praetor splash screen](/assets/wikidot/praetor/praetor-splash-screen.png)

Praetor opens with a splash screen. Press any key to continue.

From there you'll see the **Sign in to The Eternal City** form:

![Praetor login screen with account name and password fields](/assets/wikidot/praetor/praetor-login-screen.png)

Enter your TEC username and password.

**Remember this account** is ticked by default, and it stores your credentials in your system's own secure store (Windows Credential Manager, macOS Keychain, or the desktop keyring on Linux). It is never stored in plaintext.

On later launches, a **Choose an account** screen lists any accounts you've stored, so you can pick one and skip typing your password again.

At startup Praetor also checks GitHub for a newer release and shows a small notice if one is available. To turn this off:

1. Press **Esc**
2. Choose **Display & Behavior**, then **Settings**
3. Untick **Check for updates on startup**
4. **Save**

### Using Praetor

The main window has three parts. Game text fills the main area, with tabs across the top. **All** is always there, plus any custom tabs you've set up and a **Metrics** tab.

The sidebar on the right shows the minimap, the compass, and your vitals bars (Health, Fatigue, Encumbrance, Satiation), along with three tabs of its own: **Actions** for quick command buttons, **Modes** for automation controls, and **Variables** for saved command substitutions.

The command input sits at the bottom. Press **Esc** to open the menu.

Saved variables can be inserted into typed commands with `${name}` or `${name:fallback}`. PraetorScript also supports configurable `;;` pacing, unbusy-aware `&&`, waits, text reactions, titled notifications, and bounded or exact-count repeats. The Automation Bar below the input shows the active step; while a chain is active, its play control becomes **Stop**. Click it or press **Alt+X** to discard the remaining work. See the [PraetorScript guide](/praetor-guide/#praetorscript) for the complete language.

Anything you type starting with a slash is a slash command, handled by Praetor itself and not sent to the game. A hint appears as you type showing what the command expects. To see them all in the app:


~~~
/help
~~~


Read more: [Praetor Guide](/praetor-guide/)

### Quick reference: keyboard shortcuts

Some shortcuts do different things depending on what's in front of you. Those get one row per context.

| Shortcut | Context | What it does |
| --- | --- | --- |
| Tab | Output tabs | Next tab ([Tabs](/praetor-guide/#tabs)) |
| Tab | A slash-command hint is showing | Complete the command ([Typing commands](/praetor-guide/#typing)) |
| Shift+Tab | Game view | Previous tab |
| Alt+1 to Alt+9, Alt+0 | Game view | Jump to that tab (0 is the tenth) |
| Alt+S | Game view | Show or hide the sidebar ([The layout](/praetor-guide/#layout)) |
| Alt+M | Game view | Switch to the next quick-cycle mode ([Run a mode](/praetor-scripts/#run)) |
| Alt+X | A file is being sent | Abort the rest of the send ([Sending a file](/praetor-guide/#send)) |
| Alt+X | A play script is running | Stop the performance ([Play scripts](/praetor-guide/#play)) |
| Alt+X | A mode is running | Switch to the disable mode ([Run a mode](/praetor-scripts/#run)) |
| Alt+X | A PraetorScript chain is active | Cancel its queued commands, waits, text reactions, and repeats |
| Alt+I | Game view | Reveal lines hidden by the ignore filters ([Filters](/praetor-guide/#filters)) |
| Esc | Game view | Open the menu ([The Esc menu](/praetor-guide/#menu)) |
| Esc | A menu screen, search bar, or history search is open | Close it without saving |
| Ctrl+F | Game view | Search the scrollback ([Search](/praetor-guide/#search)) |
| Ctrl+R | Command input | Search your command history ([Typing commands](/praetor-guide/#typing)) |
| Ctrl+R | History search is open | Step to an older match |
| Enter | Command input | Send the line |
| Enter | History search is open | Send the highlighted match |
| Enter | Scrollback search is open | Step to an older match |
| Shift+Enter, Ctrl+Enter, or Alt+Enter | Command input | New line without sending ([Typing commands](/praetor-guide/#typing)) |
| Shift+Enter | Scrollback search is open | Step to a newer match |
| Up, Down | Command input, on its first or last line | Recall earlier commands |
| PgUp, PgDn, mouse wheel | Output | Scroll |
| Home | Output | Scroll to the top, or move within a focused input |
| End | Output | Scroll to the bottom, or move within a focused input |
| Ctrl+C | Text selected in the output | Copy |
| Ctrl+V | Command input | Paste |
| Numpad | NumLock off | Walk ([Moving around](/praetor-guide/#moving)) |

### Quick reference: slash commands

Slash commands are handled by Praetor and never reach the game. The last column says how to get out if you sent one by mistake.

| Command | Arguments | What it does | To back out |
| --- | --- | --- | --- |
| /help |  | Open the Help window | Esc closes it |
| /guide |  | Open the getting-started window with links to the Praetor overview, guide, and scripting pages | Esc closes it |
| /list |  | Open the Switch Mode window to browse modes ([Run a mode](/praetor-scripts/#run)) | Esc closes it without starting anything |
| /mode, /sm | <name> [args…] | Start a mode ([Run a mode](/praetor-scripts/#run)) | `/mode disable` or Alt+X stops it |
| /toggle | <label> | Flip a true/false value in the running mode | Run it again to flip it back |
| /set | <label> <value> | Set a value in the running mode | Set it again to the old value |
| /calc, /rb |  | Open the rank-bonus calculator ([Calculator](/praetor-guide/#calculator)) | Esc closes it |
| /wiki | [name] | List the wiki bookmarks, or open one in your browser ([Wiki bookmarks](/praetor-guide/#lookups)) | Esc closes the list |
| /maps | [name] | List the map bookmarks, or open one in your browser ([Map bookmarks](/praetor-guide/#lookups)) | Esc closes the list |
| /kudos | [name] [message] | Open the kudos window, add a favorite, or queue a message ([Kudos](/praetor-guide/#kudos)) | Esc closes the window. Queued kudos aren't sent until you click Send |
| /notes | [add\|open\|delete\|list] [title] | The notepad ([Notes](/praetor-guide/#notes)) | Esc closes it |
| /send |  | Pick a text file and send it to the game ([Sending a file](/praetor-guide/#send)) | Cancel the file dialog, or close the preview without clicking Save. Alt+X aborts a send already in progress |
| /play |  | Pick a play script, preview it, and start it ([Play scripts](/praetor-guide/#play)) | Close the preview without clicking Save. `/stop` or Alt+X ends a running performance |
| /pause |  | Hold the running performance | `/resume` continues it |
| /resume |  | Continue a held performance | `/pause` holds it again |
| /stop |  | End the performance and drop its state | Nothing to undo. Start it again with `/play` |
| /next |  | Release a %wait-key hold in a performance | Nothing to undo |

### Scripts

A mode is a small Lua script that watches the game text as it scrolls by and sends commands for you: auto-attacking, looting, running a training loop, and so on. Only one mode runs at a time.

A shared library of ready-made modes is available for you to drop in. Start one by name, and the hint line shows what arguments it takes as you type:


~~~
/mode idle
~~~


Combat modes lean on in-game **@macro** entries, which you have to set up once per character before the mode can use them.

Read more: [Praetor Scripts](/praetor-scripts/)

### Getting help

Ask in the **#unofficial-clients** channel of the community Discord: [TEC Discord](https://discord.gg/fevBA8j).

The source is on GitHub, and issues and pull requests are welcome: [cyber-godzilla/praetor](https://github.com/cyber-godzilla/praetor).

When asking for help, include your Praetor version and the relevant lines from the app log.

| What | Where |
| --- | --- |
| App log (errors, script problems) | `~/.local/state/praetor/tec.log` |
| Session transcripts | `~/.config/praetor/logs/` |

On Windows, the tilde is your user folder, so the config folder is:


~~~
C:\Users\<you>\.config\praetor
~~~


Your Praetor version is shown on the splash screen when the app starts, and on the **Choose an account** screen.

### See also
* [Praetor Guide](/praetor-guide/): using the client
* [Praetor Scripts](/praetor-scripts/): installing, running, and writing modes
* [TEC Discord](https://discord.gg/fevBA8j): the #unofficial-clients channel

### Release history

Dates are the publication dates of the [GitHub releases](https://github.com/cyber-godzilla/praetor/releases), shown newest first.

<!-- praetor-release-history:start -->
| Release | Date | Major features and changes |
| --- | --- | --- |
| [v0.5.0](https://github.com/cyber-godzilla/praetor/releases/tag/v0.5.0) | 2026-10-06 | Introduce PraetorScript with configurable paced and unbusy chains, variables and fallbacks, waits, titled notifications, bounded reactions, and success- or count-based repeats; add Automation Bar status and cancellation; allow Lua modes to submit PraetorScript; refresh mode hints on script reload; and improve GUI responsiveness and sticky scrollback behavior. |
| [v0.4.15](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.15) | 2026-09-24 | Render variables in Action Set `/mode` commands and validate the resulting command before dispatch. |
| [v0.4.14](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.14) | 2026-09-24 | Make paced-chain and unbusy-chain delays configurable in General settings. |
| [v0.4.13](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.13) | 2026-09-24 | Expand saved variables in multiline submissions and `/send` file contents. |
| [v0.4.12](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.12) | 2026-09-23 | Add a setting to allow or suppress desktop notifications raised by Lua scripts. |
| [v0.4.11](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.11) | 2026-09-23 | Complete the GUI parity and stability pass, including command chaining, minimap scaling, variables in the menu, calculator layout, help text, spellcheck visibility, and disconnect fixes. |
| [v0.4.10](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.10) | 2026-09-22 | Add live input variables plus paced (`;;`) and unbusy-aware (`&&`) command chains. |
| [v0.4.9](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.9) | 2026-09-21 | Harden the GUI with a Playwright end-to-end smoke suite and improve release-job retry behavior. |
| [v0.4.8](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.8) | 2026-09-10 | Fix Arch package publication by accepting the package service's successful `201` response. |
| [v0.4.7](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.7) | 2026-09-10 | Release metadata-only follow-up; no user-facing application changes. |
| [v0.4.6](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.6) | 2026-09-10 | Fix the Arch release job by installing the archive tooling needed to build its repository database. |
| [v0.4.5](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.5) | 2026-09-10 | Add Arch Linux packages, a pacman repository, and Arch installation documentation. |
| [v0.4.4](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.4) | 2026-08-31 | Render game-supplied HTML tables with aligned, bordered columns. |
| [v0.4.3](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.3) | 2026-08-30 | Add the GUI's Retain Input After Send setting and prevent consecutive duplicate history entries. |
| [v0.4.2](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.2) | 2026-08-17 | Add Tab completion and clickable completion for command hints, including longest-common-prefix completion. |
| [v0.4.1](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.1) | 2026-08-16 | Add script-aware `/mode` argument hints and render attribute tables correctly. |
| [v0.4.0](https://github.com/cyber-godzilla/praetor/releases/tag/v0.4.0) | 2026-08-13 | Add multiline and file sending, the `/play` performance language, live command hints, and lossless handling of large server messages. |
| [v0.3.1](https://github.com/cyber-godzilla/praetor/releases/tag/v0.3.1) | 2026-07-22 | Fix eight regressions found in the v0.3.0 review, including Lua-call behavior. |
| [v0.3.0](https://github.com/cyber-godzilla/praetor/releases/tag/v0.3.0) | 2026-07-22 | Resolve the broad pre-release review backlog and correct command and build-check documentation. |
| [v0.2.11](https://github.com/cyber-godzilla/praetor/releases/tag/v0.2.11) | 2026-07-20 | Keep two-digit patch versions from being clipped on the splash screen. |
| [v0.2.10](https://github.com/cyber-godzilla/praetor/releases/tag/v0.2.10) | 2026-07-20 | Add the `/notes` notepad with create, edit, rename, delete, and recent-note browsing. |
| [v0.2.9](https://github.com/cyber-godzilla/praetor/releases/tag/v0.2.9) | 2026-07-20 | Fix persistent-state races, invalid mode-file panics, color-match offset panics, and near-black color crashes. |
| [v0.2.8](https://github.com/cyber-godzilla/praetor/releases/tag/v0.2.8) | 2026-07-20 | Add scrollback and command-history search, input spellcheck, and update notifications. |
| [v0.2.7](https://github.com/cyber-godzilla/praetor/releases/tag/v0.2.7) | 2026-07-17 | Add configurable numpad navigation and case-insensitive mode names. |
| [v0.2.6](https://github.com/cyber-godzilla/praetor/releases/tag/v0.2.6) | 2026-07-15 | Improve arm64 release reliability by forcing apt downloads over IPv4. |
| [v0.2.5](https://github.com/cyber-godzilla/praetor/releases/tag/v0.2.5) | 2026-07-15 | Add a live metrics-session timer, hide library-only modes, and render empty metrics sessions correctly. |
| [v0.2.4](https://github.com/cyber-godzilla/praetor/releases/tag/v0.2.4) | 2026-07-14 | Enable WebKit hardware acceleration on Linux. |
| [v0.2.3](https://github.com/cyber-godzilla/praetor/releases/tag/v0.2.3) | 2026-07-12 | Add collapsible sidebar sections and improve scroll controls, tail-following, and burst handling. |
| [v0.2.2](https://github.com/cyber-godzilla/praetor/releases/tag/v0.2.2) | 2026-07-10 | Add editable sidebar Action Sets, themed copy/paste controls, and the tabbed Actions/Modes sidebar. |
| [v0.2.1](https://github.com/cyber-godzilla/praetor/releases/tag/v0.2.1) | 2026-07-09 | Add explicit logout and robust dropped-connection detection, cleanup, and return-to-login behavior. |
| [v0.2.0](https://github.com/cyber-godzilla/praetor/releases/tag/v0.2.0) | 2026-07-08 | Make the Wails desktop GUI the primary client, restore TUI feature parity, and ship native Linux, macOS, and Windows builds. |
| [v0.1.5](https://github.com/cyber-godzilla/praetor/releases/tag/v0.1.5) | 2026-05-16 | Reduce stale Kitty-protocol maps while avoiding expensive image resets during long sessions. |
| [v0.1.4](https://github.com/cyber-godzilla/praetor/releases/tag/v0.1.4) | 2026-05-13 | Improve TUI rendering performance with view caching and add optional pprof diagnostics. |
| [v0.1.3](https://github.com/cyber-godzilla/praetor/releases/tag/v0.1.3) | 2026-05-05 | Add the `/kudos` workflow for favorites, queued messages, and login reminders. |
| [v0.1.2](https://github.com/cyber-godzilla/praetor/releases/tag/v0.1.2) | 2026-05-01 | Add the `/calc`/`/rb` rank-bonus and training-cost calculator. |
| [v0.1.1](https://github.com/cyber-godzilla/praetor/releases/tag/v0.1.1) | 2026-04-29 | Fix Kitty and Sixel minimap sizing, flicker, and stale-image behavior. |
| [v0.1.0](https://github.com/cyber-godzilla/praetor/releases/tag/v0.1.0) | 2026-04-28 | Add OOC/Think ignore filters, expandable suppressed lines, and the `/maps` bookmark browser. |
| [v0.0.16](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.16) | 2026-04-27 | Add the curated `/wiki` bookmark browser and fix a browser-launch loop. |
| [v0.0.15](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.15) | 2026-04-25 | Expand color recognition, improve Sixel scaling on Windows Terminal, and guard the empty mode picker. |
| [v0.0.14](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.14) | 2026-04-23 | Add Sixel graphics, terminal capability detection, graphics fallbacks, and Chocolatey distribution. |
| [v0.0.13](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.13) | 2026-04-19 | Add editable notification settings with live configuration reload. |
| [v0.0.12](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.12) | 2026-04-15 | Fix rendering performance and memory leaks during long sessions. |
| [v0.0.11](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.11) | 2026-04-15 | Expand color recognition and fix exclude-only custom-tab matching. |
| [v0.0.10](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.10) | 2026-04-11 | Expand recognized in-game color words and refine adjective parsing. |
| [v0.0.9](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.9) | 2026-04-11 | Expand color-word, suffix, and adjective recognition from game-log review. |
| [v0.0.8](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.8) | 2026-04-11 | Make script reload rescan every script directory for newly added modes. |
| [v0.0.7](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.7) | 2026-04-10 | Expand color recognition and fix unread-tab markers for blank lines. |
| [v0.0.6](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.6) | 2026-04-09 | Hide HTML-wrapped SKOOT protocol messages from game output. |
| [v0.0.5](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.5) | 2026-04-08 | Add mode validation, batched rendering, blank-line support, and safer command pacing. |
| [v0.0.4](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.4) | 2026-04-08 | Correct lighting-level ranges and labels to match the game. |
| [v0.0.3](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.3) | 2026-04-07 | Add the first how-to guide, improve scrolling and menu layout, and make script reload preserve the active mode. |
| [v0.0.2](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.2) | 2026-04-07 | Add Homebrew, Apt, and Yum installation instructions. |
| [v0.0.1](https://github.com/cyber-godzilla/praetor/releases/tag/v0.0.1) | 2026-04-07 | Initial public release with CI pipelines and package repositories. |
<!-- praetor-release-history:end -->
