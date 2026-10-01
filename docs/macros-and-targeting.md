# Macros And Targeting

### What are Macros and Targets?

These commands are used together to streamline commands. A "MACRO" is your personalized shorthand command for a longer command input. Changing your "target" as your character's environment changes allows your macros to apply to new people, creatures, or things, depending on your circumstances. For example, you can shorten having to type PUNCH BANDIT to typing simply PUN while using TARGET to change the target of your opponent from a bandit, to a thug, to an esecarnus, to a faceplate, to 1 bandit or 3 bandit. 

Check out ?MACRO/?TARGET for the game’s help file on this subject.

Note: The commands "TARGET" and "@MTARG" are the same.

### Step-by-Step Set Up

#### Step One:
Set a target. Type: TARGET BANDIT. This will direct your properly macroed attacks at the first creature in the room named BANDIT.

#### Step Two: 
Choose a short three to four letter abbreviation for each of your attack commands. For example, SLASH becomes SLA, and BEAR HUG can become BHUG. If you like, you can also use numbers to indicate their most used attacks. 1 = most common attack, 2 = next most common attack, and so on. (After you’ve read through this tutorial at least once, play around for what works best for you.)

#### Step Three:
Set your first macro. Type: @macro SLA 
When prompted with the message “Enter the string you wish to associate with this macro, or hit return to abort:” type: SLASH <TARGET>
You can now type SLA for your character to attempt to SLASH your target.

#### Step Four:
Set your target! Type: TARGET FLUVITUR or TAR FLUVITUR
You can now type SLA for your character to attempt to SLASH FLUVITUR. (SLA = SLASH. <TARGET> = FLUVITUR.)

#### Step Five:
The AC command checks the approach status of all creatures, including characters, in the room. 
Type AC MAN, for example, to list all the creatures with the letters MAN in their short description. Note that they are numbered, starting at 1. 
Type TARGET 2 MAN for macroed attacks to now orient at the 2nd creature with the letters MAN in its short description.
Type AC . (yes, that’s a period) to check the approach status of any non-hidden creature in the room. The period ( . ) is a placeholder telling TEC “please check for anything of any letter.” The period ( . ) can be used in a multitude of other commands similarly, such as GET . FROM CORPSE, and MATCH . 

#### Step Six:
Repeat Step 3 for each of your attack commands.
Advanced: Set aiming macros for each of your attacks. For example, you may wish to macro SLAH to mean SLASH <TARGET> HIGH, and KICL to mean KICK <TARGET> LOW. You can get even more nuanced: SLAHE = SLASH <TARGET> HEAD; SLAN = SLASH <TARGET> NECK and so on.

#### Step Seven:
You can set your TARGET to look for any of multiple creatures in a room. For example, TARGET BANDIT|MAN|ESECARNUS|WOLF will attack the first of any of those creatures in a room. The list will not set a priority order. 
Be careful when using MAN as a target - player-characters wearing faceplate can accidentally get attacked by a careless macro user.

#### Step Eight: 
Macros can also be used to create EMOTEs for your character to use more than once. For example: @macro squintsus. When used, the following will appear: Your character squints suspiciously at his/her surroundings.

You did it! You are set up for a faster, more streamlined combat in TEC. Play around with the options to figure out what suits you.
