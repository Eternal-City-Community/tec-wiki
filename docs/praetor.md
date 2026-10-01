# Praetor

## Praetor

Praetor is a free, open-source desktop client for The Eternal City. It runs on Windows, macOS, and Linux.

![](https://eternal-city.wdfiles.com/assets/wikidot/praetor/praetor-action-screen.png)


### Features at a glance

* Minimap and compass, drawn live as you move
* Output tabs with your own include/exclude filters
* Loot and keyword highlighting, so rare drops don't scroll past you
* Color words shown in their color
* Desktop notifications for low health, low fatigue, custom text patterns, and optional alerts from Lua scripts
* Lua automation modes, with a shared script library you can pull from
* A session metrics dashboard your automation modes can write to
* Saved command variables that can be reused from the input, Actions, and Variables sidebar
* Typed command chains: {{;;}} runs the next command after 900 ms, while {{&&}} waits until the game reports that you are no longer busy
* Immediate cancellation of queued command chains from the input's Stop button or with Alt+X
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

![](https://eternal-city.wdfiles.com/assets/wikidot/praetor/praetor-splash-screen.png)

Praetor opens with a splash screen. Press any key to continue.

From there you'll see the **Sign in to The Eternal City** form:

![](https://eternal-city.wdfiles.com/assets/wikidot/praetor/praetor-login-screen.png)

Enter your TEC username and password.

**Remember this account** is ticked by default, and it stores your credentials in your system's own secure store (Windows Credential Manager, macOS Keychain, or the desktop keyring on Linux). It is never stored in plaintext.

On later launches, a **Choose an account** screen lists any accounts you've stored, so you can pick one and skip typing your password again.

At startup Praetor also checks GitHub for a newer release and shows a small notice if one is available. To turn this off:

# Press **Esc**
# Choose **Display & Behavior**, then **Settings**
# Untick **Check for updates on startup**
# **Save**

### Using Praetor

The main window has three parts. Game text fills the main area, with tabs across the top. **All** is always there, plus any custom tabs you've set up and a **Metrics** tab.

The sidebar on the right shows the minimap, the compass, and your vitals bars (Health, Fatigue, Encumbrance, Satiation), along with three tabs of its own: **Actions** for quick command buttons, **Modes** for automation controls, and **Variables** for saved command substitutions.

The command input sits at the bottom. Press **Esc** to open the menu.

Saved variables can be inserted into typed commands with {{${name}}}. Separate commands with {{;;}} to run the next command after 900 milliseconds, or use {{&&}} to wait for an unbusy response from the game. While a command chain still has items queued, the input's play indicator becomes a **Stop** button. Click it or press **Alt+X** to discard the remaining commands.

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
| Shift+Tab | Anywhere | Previous tab |
| Alt+1 to Alt+9, Alt+0 | Anywhere | Jump to that tab (0 is the tenth) |
| Alt+S | Anywhere | Show or hide the sidebar ([The layout](/praetor-guide/#layout)) |
| Alt+M | Anywhere | Switch to the next quick-cycle mode ([Run a mode](/praetor-scripts/#run)) |
| Alt+X | A file is being sent | Abort the rest of the send ([Sending a file](/praetor-guide/#send)) |
| Alt+X | A play script is running | Stop the performance ([Play scripts](/praetor-guide/#play)) |
| Alt+X | A mode is running | Switch to the disable mode ([Run a mode](/praetor-scripts/#run)) |
| Alt+X | A {{;;}} or {{&&}} command chain has commands waiting | Discard the rest of the queued chain |
| Alt+I | Anywhere | Reveal lines hidden by the ignore filters ([Filters](/praetor-guide/#filters)) |
| Esc | Game view | Open the menu ([The Esc menu](/praetor-guide/#menu)) |
| Esc | A menu screen, search bar, or history search is open | Close it without saving |
| Ctrl+F | Anywhere | Search the scrollback ([Search](/praetor-guide/#search)) |
| Ctrl+R | Command input | Search your command history ([Typing commands](/praetor-guide/#typing)) |
| Ctrl+R | History search is open | Step to an older match |
| Enter | Command input | Send the line |
| Enter | History search is open | Send the highlighted match |
| Enter | Scrollback search is open | Step to an older match |
| Shift+Enter | Command input | New line without sending ([Typing commands](/praetor-guide/#typing)) |
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
| /mode, /sm | <name> [args…] | Start a mode ([Run a mode](/praetor-scripts/#run)) | {{/mode disable}} or Alt+X stops it |
| /toggle | <label> | Flip a true/false value in the running mode | Run it again to flip it back |
| /set | <label> <value> | Set a value in the running mode | Set it again to the old value |
| /calc, /rb |  | Open the rank-bonus calculator ([Calculator](/praetor-guide/#lookups)) | Esc closes it |
| /wiki | [name] | List the wiki bookmarks, or open one in your browser ([Wiki bookmarks](/praetor-guide/#lookups)) | Esc closes the list |
| /maps | [name] | List the map bookmarks, or open one in your browser ([Map bookmarks](/praetor-guide/#lookups)) | Esc closes the list |
| /kudos | [name] [message] | Open the kudos window, add a favorite, or queue a message ([Kudos](/praetor-guide/#lookups)) | Esc closes the window. Queued kudos aren't sent until you click Send |
| /notes | [add\|open\|delete\|list] [title] | The notepad ([Notes](/praetor-guide/#notes)) | Esc closes it |
| /send |  | Pick a text file and send it to the game ([Sending a file](/praetor-guide/#send)) | Cancel the file dialog, or close the preview without clicking Save. Alt+X aborts a send already in progress |
| /play |  | Pick a play script, preview it, and start it ([Play scripts](/praetor-guide/#play)) | Close the preview without clicking Save. {{/stop}} or Alt+X ends a running performance |
| /pause |  | Hold the running performance | {{/resume}} continues it |
| /resume |  | Continue a held performance | {{/pause}} holds it again |
| /stop |  | End the performance and drop its state | Nothing to undo. Start it again with {{/play}} |
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
| App log (errors, script problems) | {{~/.local/state/praetor/tec.log}} |
| Session transcripts | {{~/.config/praetor/logs/}} |

On Windows, the tilde is your user folder, so the config folder is:


~~~
C:\Users\<you>\.config\praetor
~~~


Your Praetor version is shown on the splash screen when the app starts, and on the **Choose an account** screen.

### See also
* [Praetor Guide](/praetor-guide/): using the client
* [Praetor Scripts](/praetor-scripts/): installing, running, and writing modes
* [TEC Discord](https://discord.gg/fevBA8j): the #unofficial-clients channel
