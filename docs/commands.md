# Commands

You can also view the [Advanced Commands](/advanced-commands/) page for more specific information regarding Emotes, Macros and Speech commands.

### Review Commands In-Game

* To review all the available commands while in-game, type: **@commands**
* To see commands only for the skills that your character has learned, type: **skills ?**
 * You can also type **skills ? <skillset>** to see commands for the skills you've learned in a specific skillset, such as Locksmithing or Archery.
* To search for commands, type: **@command-search <search string>**
 * Example:

```
> @command-search stat
Commands containing "stat"
---
@stat-adjust              sstats                    stats
---
```


### Understanding Commands
It's important to know TEC's command syntax. Below is an example of skills your character may have learned and how to activate them.

Typing skills ?

```
Basic Attack             :  attack <target>
Clean Wound              :  clean <body part> [with] <wound-cleaning liquid>
Create Clay Mold         :  create mold [of] <imprinted wax> [with] <clay>
Basic Dodge              :  N/A
Footwork                 :  <automatic>
```


#### <...>
The **<...>** typically indicates this field is **mandatory** and to use this command it should be replaced by the described noun.

Examples:
* attack *Gilven*
* attack *constable*
* clean *left arm* with *antiseptic*

#### [...]
The **[...]** indicates this field is **optional** and to use this command you may include that word or not.

Valid Examples:
* clean left arm **with** antiseptic
* clean left arm antiseptic


Typing learn

```
Usage: LEARN <skill name> FROM <trainer> [WITH <skill name>] [# <number>]
```


### Command List

The following is a list of all available commands, with some commentary on how each command works.


Text formatted as **{{<text>}}** is required and **{{[text]}}** is optional.


<style>
#command-table {
	color:#5B5B52;
	text-align:left;
	border-collapse:collapse;
}

#command-table tr {
	border: 1px solid silver;
}

#command-table th {
	max-width:300px;
	background-color: #DDDDAA;
    border: 1px solid #888888;
    padding: 10px;
}

#command-table td {
    background-color: #EDEDED;
    border: 1px solid #888888;
    padding: 4px;
}

</style>


<table id="command-table">
<tr>
  <th>
    . 
  </th>
  <td>
    Repeats last entered command.
  </td>
</tr>
<tr>
  <th>
    '&lt;message&gt; 
  </th>
  <td>
    Say command shortcut.<br>
Example: <code>'Hello</code> <br>
You see: <code>You say, "Hello"</code><br>
Others see: <code>A man in a hooded cloak says, "Hello"</code> 
  </td>
</tr>
<tr>
  <th>
    "&lt;target&gt; &lt;message&gt; 
  </th>
  <td>
    Say to command shortcut. <br>
Example: <code>"uzak Hello</code><br>
You see: <code>You say to Uzak, "Hello"</code><br>
Target sees: <code>A man in a hooded cloak says to you, "Hello"</code><br>
Others see: <code>A man in a hooded cloak says to Uzak, "Hello"</code>
  </td>
</tr>
<tr>
  <th>
    % 
  </th>
  <td>
    Think command shortcut. <br>
Example: <code>%Hello</code><br>
You see: <code><You think aloud: Hello></code><br>
Others see: <code><A man in a hooded cloak  thinks aloud: Hello></code>
  </td>
</tr>
<tr>
  <th>
    1 (numpad)
  </th>
  <td>
    go sw command shortcut
  </td>
</tr>
<tr>
  <th>
    2 (numpad)
  </th>
  <td>
    go s command shortcut
  </td>
</tr>
<tr>
  <th>
    3 (numpad)
  </th>
  <td>
    go se command shortcut
  </td>
</tr>
<tr>
  <th>
    4 (numpad)
  </th>
  <td>
    go w command shortcut
  </td>
</tr>
<tr>
  <th>
    5 (numpad)
  </th>
  <td>
    look command shortcut
  </td>
</tr>
<tr>
  <th>
    6 (numpad)
  </th>
  <td>
    go e command shortcut
  </td>
</tr>
<tr>
  <th>
    7 (numpad)
  </th>
  <td>
    go nw command shortcut
  </td>
</tr>
<tr>
  <th>
    8 (numpad)
  </th>
  <td>
    go n command shortcut
  </td>
</tr>
<tr>
  <th>
    9 (numpad)
  </th>
  <td>
    go ne command shortcut
  </td>
</tr>
<tr>
  <th>
    :&lt;message&gt; 
  </th>
  <td>
    emote command shortcut. <br>
Example: <code>:yawns very loudly.</code><br>
You see: <code>A man in a hooded cloak yawns very loudly.</code><br>
Others See: <code>A man in a hooded cloak yawns very loudly.</code>
  </td>
</tr>
<tr>
  <th>
    ?[topic] 
  </th>
  <td>
    Help files command shortcut.<br>
Opens in new window. If a topic is supplied, will search for matches in file headings.
  </td>
</tr>
<tr>
  <th>
    @account 
  </th>
  <td>
    Shows various information about your account.
  </td>
</tr>
<tr>
  <th>
    @age &lt;number&gt; 
  </th>
  <td>
    Sets your character's age. <b>Can be used once per character</b>
  </td>
</tr>
<tr>
  <th>
    @allow [check] &lt;character&gt; 
  </th>
  <td>
    Adds character to your allowed affectionate list.<br>
If check option supplied will not change status only display the state of given character
  </td>
</tr>
<tr>
  <th>
    @aux-duty 
  </th>
  <td>
    Characters who are part of the Divortium Auxilii can toggle showing themselves on the who list and record duty times.
  </td>
</tr>
<tr>
  <th>
    @aux-mute &lt;character&gt; 
  </th>
  <td>
    Characters who are part of the Divortium Auxilii can toggle someone from having access to the Aux-chat channel.
  </td>
</tr>
<tr>
  <th>
    @availability [exclude|exclude &lt;name&gt;|edit|view &lt;name&gt;|view]
  </th>
  <td>
    Used to set your availability times to meet with other players.<br>
One of the options must be selected.<br>
<code>exclude</code> will list your current exclusion settings.<br>
<code>exclude <name></code> will exclude <name> from viewing your availability.<br>
<code>view</code> will show your current availability.<br>
<code>view <name></code> will show the availability of <name>.<br>
<code>edit</code> allows editing your availability.
  </td>
</tr>
<tr>
  <th>
    @award-rps 
  </th>
  <td>
    <b>DISABLED</b> Used to award Role-Points to other players.
  </td>
</tr>
<tr>
  <th>
    @bad-name &lt;name&gt; 
  </th>
  <td>
    Divortium Auxilii members and Trustee players can use this command to bring a bad name to the GMs' attention.
  </td>
</tr>
<tr>
  <th>
    @beta-coin 
  </th>
  <td>
    <b>DISABLED</b> Steps Beta characters could use this command to earn money while testing the Steps.
  </td>
</tr>
<tr>
  <th>
    @beta-gsp 
  </th>
  <td>
    Beta characters can use this command to earn some extra GSPs.
  </td>
</tr>
<tr>
  <th>
    @beta-report 
  </th>
  <td>
    <b>DISABLED</b>
  </td>
</tr>
<tr>
  <th>
    @birthday 
  </th>
  <td>
    <b>WA Only</b> Used to set your RL birthday.
  </td>
</tr>
<tr>
  <th>
    @boot 
  </th>
  <td>
    <b>Only available to trustees.</b> Used to ban accounts.
  </td>
</tr>
<tr>
  <th>
    @buy-gsp 
  </th>
  <td>
    Used to purchase General Skill Points.
  </td>
</tr>
<tr>
  <th>
    @cancel-pk 
  </th>
  <td>
    <b>DISABLED</b> Used to cancel a purchased PK.
  </td>
</tr>
<tr>
  <th>
    @check
  </th>
  <td>
    Used to respond to a Script-Check. Usage:<br>
    @check <keyword>
  </td>
</tr>
<tr>
  <th>
    @color-menu 
  </th>
  <td>
    Used to change your color preferences.
  </td>
</tr>
<tr>
  <th>
    @coma-time 
  </th>
  <td>
    While in a coma, use @coma-time to check how much time you have left in a coma.
  </td>
</tr>
<tr>
  <th>
    @commands 
  </th>
  <td>
    Used to get a listing of all available commands.
  </td>
</tr>
<tr>
  <th>
    @custom-item 
  </th>
  <td>
    Use this ONLY on custom items so they will never be destroyed forever by the game.
  </td>
</tr>
<tr>
  <th>
    @donate 
  </th>
  <td>
    <b>DISABLED</b> Used to donate role-points to an organization for Guild Credits.
  </td>
</tr>
<tr>
  <th>
    @dumb 
  </th>
  <td>
    <b>Only available to trustees.</b> Removes a character's think command.
  </td>
</tr>
<tr>
  <th>
    @event[s] 
  </th>
  <td>
    Used to check upcoming events.
  </td>
</tr>
<tr>
  <th>
    @feedback 
  </th>
  <td>
    Used to send feedback to GMs.
  </td>
</tr>
<tr>
  <th>
    @form-organization 
  </th>
  <td>
    <b>DISABLED</b> Used to create an organization. 
  </td>
</tr>
<tr>
  <th>
    @forum 
  </th>
  <td>
    <b>WA Only</b> Used to access the various OOC game forums.
  </td>
</tr>
<tr>
  <th>
    @gsp 
  </th>
  <td>
    Used to convert 1 GSP into 1 SP in the skill of your choice.
  </td>
</tr>
<tr>
  <th>
    @help 
  </th>
  <td>
    Used to access the help files.
  </td>
</tr>
<tr>
  <th>
    @hps 
  </th>
  <td>
    Toggles HP output after attacks.
  </td>
</tr>
<tr>
  <th>
    @idle-time 
  </th>
  <td>
    Sets the time required for your connection to be terminated after being idle for x amount of time.
  </td>
</tr>
<tr>
  <th>
    @influence 
  </th>
  <td>
    Used by Patrician characters to view their influence.
  </td>
</tr>
<tr>
  <th>
    @job-menu 
  </th>
  <td>
    Used by Patrician characters to show interest in a particular job that is available.
  </td>
</tr>
<tr>
  <th>
    @join-organization 
  </th>
  <td>
    <b>DISABLED</b> Used to join an organization.
  </td>
</tr>
<tr>
  <th>
    @kill-roster
  </th>
  <td>
    Usage: @kill-roster <who> Used to see what one of your characters has killed. 
  </td>
</tr>
<tr>
  <th>
    @kudos
  </th>
  <td>
    Usage: @kudos <name> <reason> Used to let the staff know your thoughts about a certain character.
  </td>
</tr>
<tr>
  <th>
    @macro 
  </th>
  <td>
    Used to set a wide array of macros (shorthand commands)
  </td>
</tr>
<tr>
  <th>
    @mail-search 
  </th>
  <td>
    <b>WA Only</b>
  </td>
</tr>
<tr>
  <th>
    @menu 
  </th>
  <td>
    Displays a general preferences menu.
  </td>
</tr>
<tr>
  <th>
    @messages 
  </th>
  <td>
    Displays a non-functional message management menu.
  </td>
</tr>
<tr>
  <th>
    @mset &lt;macro set&gt; 
  </th>
  <td>
    Selects an existing macro set to load.
  </td>
</tr>
<tr>
  <th>
    @mtarg [target] 
  </th>
  <td>
    Displays your current macro target. If a target is given, sets your macro target to that. 
  </td>
</tr>
<tr>
  <th>
    @namecheck &lt;name&gt; 
  </th>
  <td>
    Checks availability of given name.
  </td>
</tr>
<tr>
  <th>
    @new-traits 
  </th>
  <td>
    Used to add traits to character who did not pick at creation.
  </td>
</tr>
<tr>
  <th>
    @newbie 
  </th>
  <td>
    Toggles your newbie status off.
  </td>
</tr>
<tr>
  <th>
    @ooc 
  </th>
  <td>
    <b>WA Only</b>
  </td>
</tr>
<tr>
  <th>
    @org-menu 
  </th>
  <td>
    Accessible to org leaders for org related settings.
  </td>
</tr>
<tr>
  <th>
    @outfits 
  </th>
  <td>
    Allows outfit management.
  </td>
</tr>
<tr>
  <th>
    @page
  </th>
  <td>
    <b>WA Only</b><br>Usage: @page <full WA name> <message>
  </td>
</tr>
<tr>
  <th>
    @password 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    @paste 
  </th>
  <td>
    <b>WA Only</b> Pastes your clipboard content for all to see.
  </td>
</tr>
<tr>
  <th>
    @patron-repo 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    @play [number]
  </th>
  <td>
    Begins character management and allows character selection.<br>
If a number is provided, will start play immediately with that character. 
  </td>
</tr>
<tr>
  <th>
    @poll 
  </th>
  <td>
    <b>WA Only</b>
  </td>
</tr>
<tr>
  <th>
    @prayer 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    @qstock 
  </th>
  <td>
    Non-player command
  </td>
</tr>
<tr>
  <th>
    @quick-report 
  </th>
  <td>
    Submit a quick bug report.
  </td>
</tr>
<tr>
  <th>
    @quit 
  </th>
  <td>
    Exit the game world to the Welcome Area.
  </td>
</tr>
<tr>
  <th>
    @random-name 
  </th>
  <td>
    Generates a random name.
  </td>
</tr>
<tr>
  <th>
    @rank-manage 
  </th>
  <td>
     Used by org leaders to manage org ranks.
  </td>
</tr>
<tr>
  <th>
    @recommend 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    @refund 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    @report 
  </th>
  <td>
    Submit a bug report. This can include problems with your account, a game balance issue, mechanics bugs, abuse, typos, incorrect facts, and descriptive errors.
  </td>
</tr>
<tr>
  <th>
    @request 
  </th>
  <td>
    Submit a request. This is the appropriate command for asking questions, offering a suggestion, or requesting a custom item, alteration, makeover, patrician character, PK ticket, contest, or something for an organization.
  </td>
</tr>
<tr>
  <th>
    @request-man 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    @reset-ranks 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    @rps 
  </th>
  <td>
    <b>WA Only</b> Shows you your Role Points, accumulation rate and related information.
  </td>
</tr>
<tr>
  <th>
    @rps-spent
  </th>
  <td>
    Shows a breakdown of the role points spent on a given character in your account. 
  </td>
</tr>
<tr>
  <th>
    @set-speech 
  </th>
  <td>
    To set the color for colorized speech. More options available with the @color command.
  </td>
</tr>
<tr>
  <th>
    @set-substan 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    @set-timezon 
  </th>
  <td>
    Set your preferred time zone. This is currently only set up for US time zones.
  </td>
</tr>
<tr>
  <th>
    @sgfeedback 
  </th>
  <td>
    To leave a message for StoryGuides.
  </td>
</tr>
<tr>
  <th>
    @sp-count 
  </th>
  <td>
    Shows the total amount of skill points gained by your character in each skill set.
  </td>
</tr>
<tr>
  <th>
    @sp-reset
  </th>
  <td>
    Resets all SP in one skill to 0. Does <b>not</b> reset your skill point gain for the cycle. Usage: @sp-reset <skill>
  </td>
</tr>
<tr>
  <th>
    @sp-to-gsp 
  </th>
  <td>
    Allows conversion of SP to GSP at 25:1.
  </td>
</tr>
<tr>
  <th>
    @staff-appli 
  </th>
  <td>
    Apply to be part of the game staff.
  </td>
</tr>
<tr>
  <th>
    @stat-adjust 
  </th>
  <td>
    Non-player command.
  </td>
</tr>
<tr>
  <th>
    @store-menu 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    @storypoints 
  </th>
  <td>
    Tells you how many Story Points you currently have.
  </td>
</tr>
<tr>
  <th>
    @strike-wa 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    @swap-bodies 
  </th>
  <td>
    Non-player command.
  </td>
</tr>
<tr>
  <th>
    @time 
  </th>
  <td>
    Displays the current time and the time you logged in this session.
  </td>
</tr>
<tr>
  <th>
    @timeout-wa 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    @tip 
  </th>
  <td>
    Random TEC Trivia.
  </td>
</tr>
<tr>
  <th>
    @toggle-aux 
  </th>
  <td>
     Available to members of the Divortium Auxilii. Toggle Aux-Chat on and off.
  </td>
</tr>
<tr>
  <th>
    @toggle-coma 
  </th>
  <td>
     Toggle off the role-point cost to coma your character. This means anyone will be able to put this character in a coma free of charge at any time. Once you toggle this off, you will never be able to toggle it back on for this character. *Does have a confirmation menu.*
  </td>
</tr>
<tr>
  <th>
    @top-ten 
  </th>
  <td>
    View the month's top-ten role-players. Only available in the Welcome Area.
  </td>
</tr>
<tr>
  <th>
    @tutorial 
  </th>
  <td>
    Enter the game's tutorial.
  </td>
</tr>
<tr>
  <th>
    @verify 
  </th>
  <td>
    <b>DISABLED</b>
  </td>
</tr>
<tr>
  <th>
    @version 
  </th>
  <td>
    View current version notes.
  </td>
</tr>
<tr>
  <th>
    @vote 
  </th>
  <td>
    <b>SUSPENDED</b> Vote for Role-Player of the Month.
  </td>
</tr>
<tr>
  <th>
    abandon &lt;pet&gt; 
  </th>
  <td>
    Used to relinquish ownership of a pet. 
  </td>
</tr>
<tr>
  <th>
    absolve &lt;character&gt; 
  </th>
  <td>
    <b>Law Enforcement Only</b> Used to absolve a character of crimes.
  </td>
</tr>
<tr>
  <th>
    accept &lt;character&gt; 
  </th>
  <td>
    Accepts an offered item or payment.
  </td>
</tr>
<tr>
  <th>
    acheck &lt;character&gt; 
  </th>
  <td>
    Checks the approach status of the given character.
  </td>
</tr>
<tr>
  <th>
    act &lt;action&gt; 
  </th>
  <td>
    Synonymous with emote. 
  </td>
</tr>
<tr>
  <th>
    add 
  </th>
  <td>
    Non-player command
  </td>
</tr>
<tr>
  <th>
    address &lt;character&gt; 
  </th>
  <td>
    Social command.<br>
You see: <code>You turn to address Uzak.</code><br>
They see: <code>A man in a hooded cloak turns to address you.</code><br>
Others see: <code></code>
  </td>
</tr>
<tr>
  <th>
    adopt &lt;pet&gt; 
  </th>
  <td>
    If well-liked by an abandoned pet, will allow you take ownership of given pet.
  </td>
</tr>
<tr>
  <th>
    advance 
  </th>
  <td>
    Approach a person, object, or part of a room.
  </td>
</tr>
<tr>
  <th>
    aggressive 
  </th>
  <td>
    Sets your combat posture to aggressive.
  </td>
</tr>
<tr>
  <th>
    allow 
  </th>
  <td>
    Lists who may work on doors you control.
  </td>
</tr>
<tr>
  <th>
    ammo &lt;bow|slingshot&gt; &lt;ammo type|none&gt; 
  </th>
  <td>
    Sets preferred ammunition type for a ranged weapon. 
  </td>
</tr>
<tr>
  <th>
    applaud [character] 
  </th>
  <td>
    Social command. Can be directed at a character.<br>
You see: <code>You applaud.</code><br>
They see: <code>A man in a hooded cloak applauds.</code> 
  </td>
</tr>
<tr>
  <th>
    appoint 
  </th>
  <td>
    Non-player command.
  </td>
</tr>
<tr>
  <th>
    approach &lt;character&gt; 
  </th>
  <td>
    Used to close the distance to a character for close-quarter commands like combat. 
  </td>
</tr>
<tr>
  <th>
    armfold 
  </th>
  <td>
    Social command.<br>
You see: <code>You fold your arms.</code><br>
They see: <code>A man in a hooded cloak folds his arms.</code>
  </td>
</tr>
<tr>
  <th>
    armwave 
  </th>
  <td>
    Social command.<br>
You see: <code>You wave your arms.</code><br>
They see: <code>A man in a hooded cloak waves his arms.</code>
  </td>
</tr>
<tr>
  <th>
    arrange &lt;pile&gt; into &lt;square|circle&gt; 
  </th>
  <td>
    Arranges a group into a particular shape. 
  </td>
</tr>
<tr>
  <th>
    arrest &lt;character&gt; 
  </th>
  <td>
     <b>Law Enforcement Only</b> Used to arrest a character.
  </td>
</tr>
<tr>
  <th>
    assist &lt;message&gt; 
  </th>
  <td>
    Will leave a message for Auxilii to receive when logging in. 
  </td>
</tr>
<tr>
  <th>
    asskick &lt;character&gt; 
  </th>
  <td>
    Give a person a swift kick in the ass.<br>
You see: <code>You give Uzak a swift kick in the ass!</code><br>
They see: <code>A man in a hooded cloak gives you a swift kick in the ass!</code>
  </td>
</tr>
<tr>
  <th>
    auction 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    aux-chat &lt;message&gt; 
  </th>
  <td>
    Sends your message to the Auxilii.
  </td>
</tr>
<tr>
  <th>
    babble [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You babble.</code><br>
They see: <code>A man in a hooded cloak babbles.</code> 
  </td>
</tr>
<tr>
  <th>
    backslap &lt;character&gt; 
  </th>
  <td>
    Social command.<br>
You see: <code>You give Uzak a resounding slap on the back.</code><br>
They see: <code>A man in a hooded cloak gives you a resounding slap on the back.</code>
  </td>
</tr>
<tr>
  <th>
    bait &lt;fishing pole&gt; with &lt;bait&gt; 
  </th>
  <td>
    Used to put bait on a fishing implement.
  </td>
</tr>
<tr>
  <th>
    bank 
  </th>
  <td>
    Displays the banking menu. Can be used only in a bank room.
  </td>
</tr>
<tr>
  <th>
    basics [topic] 
  </th>
  <td>
    Displays a menu for explaining game basics. See displayed text for list of topics.
  </td>
</tr>
<tr>
  <th>
    bat [character] 
  </th>
  <td>
    Social command that may be directed at a character.<br>
You see: <code>You bat your eyelashes.</code> <br>
They see: <code>A man in a hooded cloak bats his eyelashes.</code>
  </td>
</tr>
<tr>
  <th>
    bbreak &lt;character&gt; 
  </th>
  <td>
    Used to break the bones of a character. They must be bound.
  </td>
</tr>
<tr>
  <th>
    beam [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You beam happily.</code><br>
They see: <code>A man in a hooded cloak beams happily.</code>
  </td>
</tr>
<tr>
  <th>
    beckon [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You beckon.</code><br>
They see: <code>A man in a hooded cloak beckons.</code>
  </td>
</tr>
<tr>
  <th>
    behead &lt;corpse&gt; 
  </th>
  <td>
    Removes the head of a corpse. Must have a large bladed weapon wielded.
  </td>
</tr>
<tr>
  <th>
    belch [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You let loose a resounding belch.</code><br>
They see: <code>A man in a hooded cloak lets loose a powerful belch.</code> 
  </td>
</tr>
<tr>
  <th>
    berserk 
  </th>
  <td>
    Switches your combat stance to berserk.
  </td>
</tr>
<tr>
  <th>
    bet &lt;amount&gt; &lt;currency&gt; on &lt;contestant|option&gt; 
  </th>
  <td>
    Only available at betting tables. Used to bet a given amount of currency on an option.
  </td>
</tr>
<tr>
  <th>
    bid 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    bind &lt;character&gt; &lt;feet|hands&gt; with &lt;item&gt; 
  </th>
  <td>
    Used to bind a person with rope or restraints. 
  </td>
</tr>
<tr>
  <th>
    birdcall 
  </th>
  <td>
    Has a roundtime.
  </td>
</tr>
<tr>
  <th>
    blink [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You blink.</code><br>
They see: <code>A man in a hooded cloak blinks.</code>
  </td>
</tr>
<tr>
  <th>
    blow &lt;character|item&gt; 
  </th>
  <td>
    Social command.<br>
You see: <code>You blow softly in Uzak's ear.</code> or <code>You blow on a large sack.</code><br>
They see: <code>A man in a hooded cloak blows softly in your ear.</code> or <code>A man in a hooded cloak blows on a large sack.</code> 
  </td>
</tr>
<tr>
  <th>
    blowkiss &lt;character&gt; 
  </th>
  <td>
    Social command.<br>
You see: <code>You blow a kiss at Uzak.</code><br>
They see: <code>A man in a hooded cloak blows a kiss at you.</code>
  </td>
</tr>
<tr>
  <th>
    blush 
  </th>
  <td>
    Social command.<br>
You see: <code>You blush.</code><br>
They see: <code>A man in a hooded cloak blushes.</code>
  </td>
</tr>
<tr>
  <th>
    bonebreak &lt;character&gt; 
  </th>
  <td>
    Same as bbreak. 
  </td>
</tr>
<tr>
  <th>
    bonk &lt;character&gt; 
  </th>
  <td>
    Social command.<br>
You see: <code>You bonk Uzak on the head!</code><br>
They see: <code>A man in a hooded cloak bonks you on the head!</code>
  </td>
</tr>
<tr>
  <th>
    bop &lt;character&gt; 
  </th>
  <td>
    Social command.<br>
You see: <code>You bop Uzak on the head.</code><br>
They see: <code>A man in a hooded cloak bops you on the head.</code> 
  </td>
</tr>
<tr>
  <th>
    bounce 
  </th>
  <td>
    Social command.<br>
You see: <code>You bounce around!</code><br>
They see: <code>A man in a hooded cloak bounces around!</code>
  </td>
</tr>
<tr>
  <th>
    bow [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You bow.</code><br>
They see: <code>A man in a hooded cloak bows.</code>
  </td>
</tr>
<tr>
  <th>
    brief &lt;on|off&gt; 
  </th>
  <td>
    Toggles brief mode.
  </td>
</tr>
<tr>
  <th>
    brush &lt;character&gt; 
  </th>
  <td>
    Social command.<br>
You see: <code>You brush up against Uzak.</code><br>
They see: <code>A man in a hooded cloak brushes up against you.</code>
  </td>
</tr>
<tr>
  <th>
    burp 
  </th>
  <td>
    Social command.<br>
You see: <code>You burp.</code><br>
They see: <code>A man in a hooded cloak burps.</code>
  </td>
</tr>
<tr>
  <th>
    bury &lt;hole&gt; 
  </th>
  <td>
    Fills a hole in, along with whatever is in it.
  </td>
</tr>
<tr>
  <th>
    buy [amount] &lt;item&gt; 
  </th>
  <td>
    Buys one or more of the item from a shopkeeper.
  </td>
</tr>
<tr>
  <th>
    bye 
  </th>
  <td>
    Shortcut for sleep.
  </td>
</tr>
<tr>
  <th>
    cackle [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You cackle.</code><br>
They see: <code>A man in a hooded cloak cackles.</code>
  </td>
</tr>
<tr>
  <th>
    cartwheel [character] 
  </th>
  <td>
    Social command. Can lead to stun time and prone.<br>
You see: <code>You do a snappy cartwheel around the area!</code> or <code>You do a miserable cartwheel around the area, and end up falling on your butt!</code>
  </td>
</tr>
<tr>
  <th>
    chortle [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You chortle.</code><br>
They see: <code>A man in a hooded cloak chortles.</code>
  </td>
</tr>
<tr>
  <th>
    clabel &lt;crate&gt; &lt;message&gt; 
  </th>
  <td>
    Used to label crates 
  </td>
</tr>
<tr>
  <th>
    clap [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You clap.</code><br>
They see: <code>A man in a hooded cloak claps.</code>
  </td>
</tr>
<tr>
  <th>
    clearthroat [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You clear your throat.</code><br>
They see: <code>A man in a hooded cloak clears his throat.</code>
  </td>
</tr>
<tr>
  <th>
    clients 
  </th>
  <td>
    Displays your clients and patron.
  </td>
</tr>
<tr>
  <th>
    cling &lt;character&gt; 
  </th>
  <td>
    Social command.<br>
You see: <code>You cling to Uzak tightly.</code><br>
They see: <code>A man in a hooded cloak clings to you tightly.</code>
  </td>
</tr>
<tr>
  <th>
    close &lt;portal&gt; 
  </th>
  <td>
    Closes a door or entry.
  </td>
</tr>
<tr>
  <th>
    cock [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You cock your head.</code><br>
They see: <code>A man in a hooded cloak cocks his head.</code>
  </td>
</tr>
<tr>
  <th>
    collect 
  </th>
  <td>
    Collect is a macro-like command that runs behind the scenes. Once started, you will need to type 'stop' to end it prematurely. Here are some variations of it:  <br/><br/>
    <b>Command:</b> collect <1-5> pelt from sack  <br/>
    Gets the first 5 'pelt' found in 'sack'  <br/><br/>

    <b>Command:</b> collect dag from <1-10> thug  <br/>
    Gets 'dag' from the first 10 'thug' found.  <br/><br/>

    <b>Command:</b> collect contents <1-10> pouch into sack <br/>
    Effectively empties the contents of the first 10 pouches found into 'sack'.  <br/><br/>

    <b>Command:</b> collect loot from <1-10> corpse <br/>
    Collects all items with a monetary value or container from each corpse, in order. In the example, it would loot all items of value from corpse 1, then move onto the next through the last. It's useful to use the 'stow' command to set a container to put these looted items in automatically. <br/><br/>

    You can also use the keyword 'skinned' with collect; requires a knife/blade in hand: <br/>
    <b>Command:</b> collect skinned from <1-10> corpse <br/>
    Skins the first thing on the first 10 'corpse' found. Similar to just typing 'skin corpse' and having it go through each available body part one by one. You can run this multiple times to skin everything from all corpses. <br/><br/>

    <b>Command:</b> collect skinned pelt from <1-10> corpse <br/>
    Skins 'pelt' from the first 10 'corpse' found. <br/>
  </td>
</tr>
<tr>
  <th>
    combine &lt;item&gt; 
  </th>
  <td>
    Combines all items matching the given type into a group.
  </td>
</tr>
<tr>
  <th>
    comfort &lt;character&gt; 
  </th>
  <td>
    Social command.<br>
You see: <code>You comfort Uzak.</code><br>
They see: <code>A man in a hooded cloak comforts you.</code>
  </td>
</tr>
<tr>
  <th>
    command 
  </th>
  <td>
    Issues a command to an NPC you are in charge of.
  </td>
</tr>
<tr>
  <th>
    concentrate [&lt;character&gt;|tile] 
  </th>
  <td>
    Social command also used to initiate cadae usage.<br>
You see: <code>You concentrate.</code><br>
They see: <code>A man in a hooded cloak concentrates.</code>
  </td>
</tr>
<tr>
  <th>
    condition 
  </th>
  <td>
    Displays various information about your character's health and status.
  </td>
</tr>
<tr>
  <th>
    conjure 
  </th>
  <td>
    <b>WA Only</b>
  </td>
</tr>
<tr>
  <th>
    consider [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You consider.</code><br>
They see: <code>A man in a hooded cloak considers.</code>
  </td>
</tr>
<tr>
  <th>
    convert &lt;amount&gt; &lt;currency&gt; to &lt;currency&gt; 
  </th>
  <td>
     Does currency conversions for the given amount and types.
  </td>
</tr>
<tr>
  <th>
    cough 
  </th>
  <td>
    Social command.<br>
You see: <code>You cough.</code><br>
They see: <code>A man in a hooded cloak coughs.</code>
  </td>
</tr>
<tr>
  <th>
    count &lt;group&gt; 
  </th>
  <td>
    Counts the items in a group.
  </td>
</tr>
<tr>
  <th>
    crack &lt;item&gt; 
  </th>
  <td>
    Used to crack an item. Destroys the item when done.
  </td>
</tr>
<tr>
  <th>
    crawl &lt;direction&gt; 
  </th>
  <td>
    Used to move while prone or unable to walk.
  </td>
</tr>
<tr>
  <th>
    credits 
  </th>
  <td>
    Displays your housing credits.
  </td>
</tr>
<tr>
  <th>
    cringe [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You cringe.</code><br>
They see: <code>A man in a hooded cloak cringes.</code>
  </td>
</tr>
<tr>
  <th>
    cry [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You cry.</code><br>
They see: <code>A man in a hooded cloak cries.</code>
  </td>
</tr>
<tr>
  <th>
    cuddle &lt;character&gt; 
  </th>
  <td>
    <b>Requires allowed affections.</b> Social command.<br>
You see: <code>You cuddle up to Uzak.</code><br>
They see: <code>A man in a hooded cloak cuddles up to you.</code>
  </td>
</tr>
<tr>
  <th>
    cup &lt;character&gt; 
  </th>
  <td>
    Social command.<br>
You see: <code>You cup your hands around Uzak's chin.</code><br>
They see: <code>A man in a hooded cloak cups his hands around your chin.</code>
  </td>
</tr>
<tr>
  <th>
    curse [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You curse.</code><br>
They see: <code>A man in a hooded cloak curses.</code>
  </td>
</tr>
<tr>
  <th>
    curtsy [character] 
  </th>
  <td>
    Social command.<br>
You see: <code>You curtsy.</code><br>
They see: <code>A man in a hooded cloak curtsies.</code>
  </td>
</tr>
<tr>
  <th>
    cuttongue &lt;character&gt; 
  </th>
  <td>
    Cut a character's tongue out. They must be bound.
  </td>
</tr>
<tr>
  <th>
    dance 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    date 
  </th>
  <td>
    Displays the current game date.
  </td>
</tr>
<tr>
  <th>
    deal 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    decline &lt;person&gt; 
  </th>
  <td>
    Declines something who is offering you something. 
  </td>
</tr>
<tr>
  <th>
    defenses 
  </th>
  <td>
    Displays menu to customize defense priorities.
  </td>
</tr>
<tr>
  <th>
    defensive 
  </th>
  <td>
    Changes your combat stance to defensive.
  </td>
</tr>
<tr>
  <th>
    despair 
  </th>
  <td>
    Social command<br>
 <code>You toss your hands up in despair.</code>
  </td>
</tr>
<tr>
  <th>
    detain 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    dig 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    dip 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    direct 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    disband 
  </th>
  <td>
    Disbands someone who is following you
  </td>
</tr>
<tr>
  <th>
    discard &lt;item&gt; 
  </th>
  <td>
    Discards an item.
  </td>
</tr>
<tr>
  <th>
    discharge 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    dismount 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    disrobe 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    dogwhistle 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    down 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    drag 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    draw 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    dress 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    drink 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    drive 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    drool 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    drop 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    duck 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    duplicate 
  </th>
  <td>
       
  </td>
</tr>
<tr>
  <th>
    east 
  </th>
  <td>
    Shortcut for "go East". Move your character through the East exit if available.
  </td>
</tr>
<tr>
  <th>
    eat 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    echo &lt;character&gt; 
  </th>
  <td>
     Used in learning languages. Echoes the tutor when asked.
  </td>
</tr>
<tr>
  <th>
    effore 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    emote 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    employees 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    empty 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    encumbrance 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    end 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    engage 
  </th>
  <td>
     
  </td>
</tr>
<tr>
  <th>
    envisage 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    equipment 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    erase 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    erect 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    escort 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    examine  
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    exercise 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    exhale 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    exit 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    exits 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    extinguish 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    eye 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    eyeclose 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    eyeopen 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    eyeshift 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    face 
  </th>
  <td>
     
  </td>
</tr>
<tr>
  <th>
    facepalm 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fade 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    faint 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fall 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    falldown 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fasten 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fbl 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fbr 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    feint 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    ferry 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    ffl 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    ffr 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fiddle 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fidget 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fight 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fill 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    find 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fine 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fire 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fire-lawkeep 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fish 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fistshake 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fl 
  </th>
  <td>
       
  </td>
</tr>
<tr>
  <th>
    flail 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    flex 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    flick 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    flip 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    flog 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    focus &lt;item&gt; 
  </th>
  <td>
    Can be used to initiate cadae communication.
  </td>
</tr>
<tr>
  <th>
    follow 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    footnote 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    forums 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    forward 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    fr 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    free 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    frown 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    furrow 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    gag 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    gape 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    gasp 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    gaze 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    gere 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    gesture 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    get 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    giggle 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    give 
  </th>
  <td>
       
  </td>
</tr>
<tr>
  <th>
    glare 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    go 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    grant 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    grimace 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    grin 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    grip 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    grit 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    groan 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    ground 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    group 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    growl 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    grumble [item/character]
  </th>
  <td>
    Social command.<br>
You see: <code>You grumble under your breath.<br>
You grumble something under your breath about a bandage</code><br>
They see: <code>A man in a hooded cloak grumbles under his breath.</code>
  </td>
</tr>
<tr>
  <th>
    grunt 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    guard 
  </th>
  <td>
     
  </td>
</tr>
<tr>
  <th>
    gulp 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    guzzle 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    hack 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    hairtwirl 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    handoff 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    handraise 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    handshake 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    hang 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    headclutch 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    headshake 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    headslap 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    heal 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    heat 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    help 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    helpup 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    hew 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    hiccup 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    hire 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    hire-lawkeep 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    hiss 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    history 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    hoe 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    hold-breath 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    holdings 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    hone 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    howl 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    hug 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    ignore 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    impale 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    influence 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    inhale 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    inhand 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    initiate 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    insert 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    inspect 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    inventory 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    invite 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    iw 
  </th>
  <td>
    Checks the weight of items in your possession
  </td>
</tr>
<tr>
  <th>
    jailtime 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    jawdrop 
  </th>
  <td>
         
  </td>
</tr>
<tr>
  <th>
    join 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    jump 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    kick 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    kill 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    kiss 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    knee 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    kneel 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    knock 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    knot 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    label 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    language 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    lash 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    lash-timber 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    lasso 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    lay 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    lead 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    lean 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    learn 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    leave 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    leer 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    lick 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    light 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    lighting 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    limp 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    list-article 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    listen 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    logout 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    lol 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    look 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    lore 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    luck! 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    mark 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    match 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    menu 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    mimic 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    mine 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    moan 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    mop 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    mount 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    mumble 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    mutter 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    name 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    narrow 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    ne 
  </th>
  <td>
    Shortcut for "go northeast"
  </td>
</tr>
<tr>
  <th>
    nibble 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    nod 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    normal 
  </th>
  <td>
    Changes your combat posture to normal.
  </td>
</tr>
<tr>
  <th>
    north 
  </th>
  <td>
    Shortcut for "go north"
  </td>
</tr>
<tr>
  <th>
    nowheretime 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    nudge 
  </th>
  <td>
     
  </td>
</tr>
<tr>
  <th>
    nuzzle 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    nw 
  </th>
  <td>
     Shortcut for "go northwest"
  </td>
</tr>
<tr>
  <th>
    odds 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    offer 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    officials 
  </th>
  <td>
    Lists current officials in Iridine.
  </td>
</tr>
<tr>
  <th>
    open 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pace 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pack 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    paddle 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pant 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    passive 
  </th>
  <td>
     Toggle whether your character will automatically submit to arrest attempts. Also allows your character to be bound or picked up by another character.
  </td>
</tr>
<tr>
  <th>
    passivecover 
  </th>
  <td>
    Toggles whether your character will automatically reveal themselves when requested by law enforcement.
  </td>
</tr>
<tr>
  <th>
    passivewield 
  </th>
  <td>
    Toggles whether your character will automatically stop wielding a weapon when requested by law enforcement.
  </td>
</tr>
<tr>
  <th>
    pat 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pay 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    peer 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pelt 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    permit 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pet 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pick-job 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pinch 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    place 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    play 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pluck 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    point 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    poke 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    ponder 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    posture 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pour 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pout 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    practice 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pref-inhand 
  </th>
  <td>
    <b>Disabled</b> Sets preferred item in hand.
  </td>
</tr>
<tr>
  <th>
    preferences 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    prefs 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    prepare 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    proclaim 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    promote 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    publish 
  </th>
  <td>
    <b>Non-player command</b>
  </td>
</tr>
<tr>
  <th>
    pull 
  </th>
  <td>
    You can pull things like wagons. There are two variations of support for this: <br/>
    <b>Command:</b> pull wagon e 4 sw 5 w 1 sw 70 w 1 <br/>
    <b>Command:</b> pull wagon to toga <br/>  
  </td>
</tr>
<tr>
  <th>
    punch 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    push 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    put 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    pwield 
  </th>
  <td>
    Shortcut for "passivewield"
  </td>
</tr>
<tr>
  <th>
    quit 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    raise 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    read-article 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    recall 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    recipes 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    recite 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    recover 
  </th>
  <td>
    Used to recover discarded items at the cost of Role Points.
  </td>
</tr>
<tr>
  <th>
    refit 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    release 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    remove 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    renumber-article 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    repair 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    restore 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    retire 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    retreat 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    retrieve 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    revoke 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    ring 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    rip 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    roar 
  </th>
  <td>
    Social command. Can be heard over a distance.
  </td>
</tr>
<tr>
  <th>
    roll 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    rotate 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    round 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    row 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    read 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    rub 
  </th>
  <td>
    Can be used to clean yourself when you buy some soap at the baths.<br>
    <code>rub soap</code>
    
  </td>
</tr>
<tr>
  <th>
    ruffle 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    run 
  </th>
  <td>
    Stop walking and being to run
  </td>
</tr>
<tr>
  <th>
    salute 
  </th>
  <td>
                Social command<br>
 <code>You salute.</code><br>
<code>You salute a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    satiation 
  </th>
  <td>
    Displays your hunger level.
  </td>
</tr>
<tr>
  <th>
    say &lt;message&gt; 
  </th>
  <td>
    Used to speak.
  </td>
</tr>
<tr>
  <th>
    scan [direction] 
  </th>
  <td>
    Looks for targets in a direction. If no direction is given, will scan in the direction your character is currently facing.
  </td>
</tr>
<tr>
  <th>
    scowl 
  </th>
  <td>
                Social command<br>
 <code>You scowl.</code><br>
<code>You scowl at a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    scrape 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    scratch 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    scream 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    scrub 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    se 
  </th>
  <td>
    Shortcut for "go southeast"
  </td>
</tr>
<tr>
  <th>
    seal 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    search 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    seed 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    selftrain
  </th>
  <td>
    Train yourself one rank in a specified sub-skill. Usage: selftrain <sub-skill name>
  </td>
</tr>
<tr>
  <th>
    sell 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    sendthought 
  </th>
  <td>
    Communicate via cadae
  </td>
</tr>
<tr>
  <th>
    sentence 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    servantshout 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    set-trap 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    sgproclaim 
  </th>
  <td>
    Send a message to the storyguides
  </td>
</tr>
<tr>
  <th>
    shake [object|character]
  </th>
  <td>
                Social command<br>
<code>You shake a man in a hooded cloak vigorously.</code>
  </td>
</tr>
<tr>
  <th>
    share 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    sheet 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    shiver 
  </th>
  <td>
                Social command<br>
 <code>You shiver.</code><br>

  </td>
</tr>
<tr>
  <th>
    shout 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    shove 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    show 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    shred 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    shriek 
  </th>
  <td>
                Social command<br>
 <code>You shriek.</code><br>

  </td>
</tr>
<tr>
  <th>
    shrug 
  </th>
  <td>
                Social command<br>
 <code>You shrug.</code><br>

  </td>
</tr>
<tr>
  <th>
    shudder 
  </th>
  <td>
                Social command<br>
 <code>You shudder.</code><br>

  </td>
</tr>
<tr>
  <th>
    shuffle 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    sideglance [object|character]
  </th>
  <td>
                Social command<br>
<code>You give a man in a hooded cloak a sideways glance.</code>
  </td>
</tr>
<tr>
  <th>
    sigh 
  </th>
  <td>
                Social command<br>
 <code>You sigh.</code><br>
<code>You sigh at a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    sign 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    sing 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    sip 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    sit [object]
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    sizeup 
  </th>
  <td>
    See basic details about a character's appearance. Invisible to the other person.
  </td>
</tr>
<tr>
  <th>
    skills 
  </th>
  <td>
    View all of your character's skills.
  </td>
</tr>
<tr>
  <th>
    skin 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    sksoc 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    slap 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    slash 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    sleep 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    slide 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    slip 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    slug 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    smack 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    smell 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    smile 
  </th>
  <td>
                Social command<br>
 <code>You smile.</code><br>
<code>You smile at a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    smirk 
  </th>
  <td>
                Social command<br>
 <code>You smirk.</code><br>
<code>You smirk a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    smoke 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    snap 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    snarl 
  </th>
  <td>
                Social command<br>
 <code>You snarl.</code><br>
<code>You snarl at a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    sneak 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    sneer 
  </th>
  <td>
                Social command<br>
 <code>You sneer.</code><br>
<code>You sneer at a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    sneeze 
  </th>
  <td>
            Social command<br>
 <code>You sneeze.</code><br>
 
  </td>
</tr>
<tr>
  <th>
    snicker 
  </th>
  <td>
        Social command<br>
 <code>You snicker.</code>
  </td>
</tr>
<tr>
  <th>
    sniff 
  </th>
  <td>
            Social command<br>
 <code>You sniff.</code><br>
<code>You sniff a man in a hooded cloak.</code><br>
<code>He smells lightly of wildflowers</code>
  </td>
</tr>
<tr>
  <th>
    sniffle 
  </th>
  <td>
        Social command<br>
 <code>You sniffle.</code>
  </td>
</tr>
<tr>
  <th>
    snort 
  </th>
  <td>
    Social command<br>
 <code>You snort.</code>
  </td>
</tr>
<tr>
  <th>
    snuggle [character]
  </th>
  <td>
   <b>Requires allowed affections.</b> Social command<br>
 <code>You snuggle up against a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    south 
  </th>
  <td>
    Move your character through the South exit if available.
  </td>
</tr>
<tr>
  <th>
    speak 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    spells 
  </th>
  <td>
    Displays what spells your character knows.
  </td>
</tr>
<tr>
  <th>
    spit 
  </th>
  <td>
    Social command<br>
 <code>You spit.</code>
  </td>
</tr>
<tr>
  <th>
    split 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    sprinkle 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    squat 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    squeak 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    squint 
  </th>
  <td>
    Social command<br>
 <code>You squint.</code>
<code>You squint at a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    squirm 
  </th>
  <td>
    Social command<br>
 <code>You squirm.</code>
  </td>
</tr>
<tr>
  <th>
    sskills 
  </th>
  <td>
    Short skills for your character. A shortened version of skills including current sp for all skills, how many skill points have been gained this cycle, and how long until the next training cycle.
  </td>
</tr>
<tr>
  <th>
    sstats 
  </th>
  <td>
     Short Stats for your character. A shortened version of stats including Health points, fatigue level, consciousness, how much they are carrying, body temperature, position, stance, and if they are currently approached to anyone.
  </td>
</tr>
<tr>
  <th>
    stand 
  </th>
  <td>
    Stand up
  </td>
</tr>
<tr>
  <th>
    stare [character|item|
  </th>
  <td>
     Social command<br>
 <code>You stare.</code><br>
<code>You stare at a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    stats 
  </th>
  <td>
    See your character sheet. Includes Character background, age, physical characteristics and attributes.
  </td>
</tr>
<tr>
  <th>
    stock 
  </th>
  <td>
      
  </td>
</tr>
<tr>
  <th>
    stop 
  </th>
  <td>
    Stops whatever ongoing activity your character is doing.
  </td>
</tr>
<tr>
  <th>
    stow 
  </th>
  <td>
   Sets a container for stowing items; any time you automatically put something away as your hands become full, it will go into this container.    
   <br/> Use: stow <container name>, ie: stow my 2 sack. 
  </td>
</tr>
<tr>
  <th>
    strangle 
  </th>
  <td>
     
  </td>
</tr>
<tr>
  <th>
    stretch 
  </th>
  <td>
     Social command<br>
 <code>You stretch lazily.</code>
  </td>
</tr>
<tr>
  <th>
    strike 
  </th>
  <td>
     
  </td>
</tr>
<tr>
  <th>
    strum 
  </th>
  <td>
     
  </td>
</tr>
<tr>
  <th>
    strut 
  </th>
  <td>
     
  </td>
</tr>
<tr>
  <th>
    stuff 
  </th>
  <td>
     
  </td>
</tr>
<tr>
  <th>
    submit 
  </th>
  <td>
     
  </td>
</tr>
<tr>
  <th>
    sulk 
  </th>
  <td>
     Social command<br>
 <code>You sulk.</code>
  </td>
</tr>
<tr>
  <th>
    surrender 
  </th>
  <td>
     
  </td>
</tr>
<tr>
  <th>
    sw 
  </th>
  <td>
     Shortcut for "Go Southwest"
  </td>
</tr>
<tr>
  <th>
    swap 
  </th>
  <td>
     Swaps the contents of your hands.
  </td>
</tr>
<tr>
  <th>
    swapsp 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    swim 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    swingpick 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    swoon 
  </th>
  <td>
            Social command<br>
 <code>You swoon.</code><br>
<code>You swoon at the sight of a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    take 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    tap 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    target 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    taunt 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    teach 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    tell 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    tend 
  </th>
  <td>
    Healing command. Examines patients for injuries. Person must be sitting, kneeling, or laying down.
  </td>
</tr>
<tr>
  <th>
    think 
  </th>
  <td>
    Game-wide communication. Think aloud to the entire gameworld. OOC communication not allowed.
  </td>
</tr>
<tr>
  <th>
    thread 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    thump 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    tickle 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    time 
  </th>
  <td>
    See what time of day it is.
  </td>
</tr>
<tr>
  <th>
    tip 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    titter 
  </th>
  <td>
     
  </td>
</tr>
<tr>
  <th>
    toast [character]
  </th>
  <td>
            Social command<br>
 <code>You raise a toast.</code><br>
<code>You raise a toast to a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    toggle-think 
  </th>
  <td>
    Toggles your think-net participation.
  </td>
</tr>
<tr>
  <th>
    toggle-who 
  </th>
  <td>
    Toggles your who list visibility.
  </td>
</tr>
<tr>
  <th>
    tongue 
  </th>
  <td>
    Stick your tongue out.
  </td>
</tr>
<tr>
  <th>
    toss 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    touch 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    train 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    traits 
  </th>
  <td>
    See all of your characters traits
  </td>
</tr>
<tr>
  <th>
    transfer 
  </th>
  <td>
    Non-player command.
  </td>
</tr>
<tr>
  <th>
    transfer-person 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    tremble 
  </th>
  <td>
            Social command<br>
 <code>You tremble.</code> 
  </td>
</tr>
<tr>
  <th>
    trial 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    tug 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    tune 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    turn 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    twiddle 
  </th>
  <td>
            Social command<br>
 <code>You twiddle your thumbs.</code>
  </td>
</tr>
<tr>
  <th>
    twist 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    unbait 
  </th>
  <td>
    Removes bait from a fishing pole.
  </td>
</tr>
<tr>
  <th>
    uncover 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    undress 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    ungag 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    ungroup 
  </th>
  <td>
    Separates a group of groups into individual piles.
  </td>
</tr>
<tr>
  <th>
    unguard 
  </th>
  <td>
    Stop guarding a person, object, or exit.
  </td>
</tr>
<tr>
  <th>
    unhide 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    unlearn 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    unload 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    unthread 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    untie 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    unuse 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    unwarrant 
  </th>
  <td>
    <b>High ranking law enforcers only</b> Removes an existing warrant
  </td>
</tr>
<tr>
  <th>
    unwield 
  </th>
  <td>
    Unwields your weapon
  </td>
</tr>
<tr>
  <th>
    up 
  </th>
  <td>
    Move character through the exit above, if possible.
  </td>
</tr>
<tr>
  <th>
    use 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    ustab 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    uuddlrlrba 
  </th>
  <td>
    Joke command, reference to common cheat code.
  </td>
</tr>
<tr>
  <th>
    vote 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    waggle 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    wait 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    walk [to &lt;mark&gt;] 
  </th>
  <td>
    Used to start walking instead of running. If used with <code>to <mark></code> with start automatic navigation to known marks. <br>
Example: <code>walk to toga</code>
  </td>
</tr>
<tr>
  <th>
    wander 
  </th>
  <td>
    <b>Disabled</b>
  </td>
</tr>
<tr>
  <th>
    warcry 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    warrant 
  </th>
  <td>
    <b>Law enforcers only</b> Issues a warrant for arrest.
  </td>
</tr>
<tr>
  <th>
    wary 
  </th>
  <td>
    Changes your combat posture to wary.
  </td>
</tr>
<tr>
  <th>
    watch 
  </th>
  <td>
    Toggles watching for moving around you.
  </td>
</tr>
<tr>
  <th>
    wave [character]
  </th>
  <td>
        Social command<br>
 <code>You wave.</code>
 <code>You wave to a man in a hooded cloak.</code>
  </td>
</tr>
<tr>
  <th>
    wealth 
  </th>
  <td>
    Used to determine currently available currency on character. Note that currency not reachable, in a closed container for example, is not considered.
  </td>
</tr>
<tr>
  <th>
    wear 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    weather 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    west 
  </th>
  <td>
    Shortcut for "go west" Move your character through the western exit if available.
  </td>
</tr>
<tr>
  <th>
    whack 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    whisper 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    who 
  </th>
  <td>
    OOC command. Shows current users online, but should not be considered in-character information.
  </td>
</tr>
<tr>
  <th>
    wield 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    wiggle 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    wince 
  </th>
  <td>
        Social command<br>
You see: <code>You wince.</code>
  </td>
</tr>
<tr>
  <th>
    wink [character] 
  </th>
  <td>
    Social command <br>
Example: <code>wink</code><br>
You see: <code>You wink.</code><br>
They see: <code>A man in a hooded cloak winks.</code>
  </td>
</tr>
<tr>
  <th>
    wipe 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    withdraw &lt;item|amount in currency&gt; 
  </th>
  <td>
    Used to withdraw items from automated storage like banks and message centers.<br>
Example: <code>withdraw 400 denar</code>, <code>withdraw parchment</code>
  </td>
</tr>
<tr>
  <th>
    woot 
  </th>
  <td>
    Social command<br>
You see: <code>You raise your fist in the air and shout, "Hurray!"</code>
  </td>
</tr>
<tr>
  <th>
    work 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    wring 
  </th>
  <td>
    
  </td>
</tr>
<tr>
  <th>
    write on &lt;media&gt; [in &lt;language&gt;] 
  </th>
  <td>
    Begins writing.
  </td>
</tr>
<tr>
  <th>
    yawn 
  </th>
  <td>
    Social command<br>
You see: <code>You yawn.</code>
  </td>
</tr>
<tr>
  <th>
    yell &lt;message&gt; 
  </th>
  <td>
    Allows for yelling, which can be heard over a distance. The distance from the yelling person determines if the message can be clearly heard.<br>
Example: <code>yell Help!</code><br>
You see: <code>You yell, "Help!"</code><br>
Others see: <code>You hear a man in a hooded cloak yell, "Help!" from the southeast.</code><br>
Others far away see: <code>You hear someone yelling from the southeast.</code>
  </td>
</tr>
</table>
