# Useful Macros For Thieves

!!! note "Dynamic Wikidot content"
    The original page used the `CSS` module here. This dynamic section needs a replacement on the new wiki.


<a id="Top"></a>

### Table of Contents

* [How to Create A Macro](#Intro)
 * [What is a Macro](#Whatis)
 * [The Macro Menu](#Menu)
* [The Essentials](#Essentials)
 * [Targeting Macros](#Targeting)
 * [Movement Macros](#Movement)
 * [Theft Macros](#Theft)
* [Random But Useful Macros](#Random)
* [Closing Notes](#Conclusion)

<a id="Intro"></a>
### How to Create a Macro

First, for those of us that aren't all that familiar with macros in TEC or how they work, I felt a quick and broad overview of how to create and use macros would be very beneficial. For those of you that know your way around the macro system, feel free to skip on down to [The Essentials](#Essentials).

<a id="Whatis"></a>
#### What is a Macro

A macro is essentially a shortcut for a longer command. For instance, one of the macros that we will be creating today is for the command "lift pouch from <target>". While this is not an overly verbose command, it takes a lot longer to type out than the macro version of it - "lt". Stealing is all about efficiency and ease, the less time I spend typing, the more time I can spend watching for movement near me.. or checking how much wealth I've managed to steal so far. Macros also reduce the chance of mistyping a command at a crucial moment. For instance, if you spot a constable character moving toward you and you've still got a pouch in hand, typing dp instead of discard pouch is far easier under pressure. Follow it up with a quick y to confirm discarding it and voila, evidence properly disposed of - hopefully before the constable walks in on you.

<a id="Menu"></a>
#### The Macro Menu

In order to make a macro, we first need to access the menu for controlling macros and macro sets. Do so by typing the command "@macro" and you should see the following screen:


```
=[Macros]=====================================================================
 [A] Add Macro
 [D] Delete Macro
 [L] List Macro [??? defined]
 [S] Set Macro Set
 [C] Create Macro Set
 [R] Remove Macro Set
 [I] Import Macro Set
==============================================================================
macros>
```


Now we'll go over what each option does:

##### A - Add Macro

This option will allow you to create a macro using a simple two step process. Open up the macro menu and type A to take a look at how it's done. You should see something like this:


```
Enter the shorthand macro string:
```


What this means is the short version of the command you want to use, or rather the macro to replace the command. For the purpose of this command, we're going use the phrase "innocent" as the short version, minus the quotation marks of course. Type in innocent then press enter. Which brings us to the next step in the process: 


```
Enter the string you wish this macro to expand to:
```


This means the actual command you want to be executed when you type in the word "innocent". In this case, we're going to use an emote as the full command: emote raises his hands in the air and proclaims to you, "I swear, mister constable, I didn't do it!"

This time you'll want to leave the quotation marks in there so it will look like a legitimate proclamation of innocence. Useful no? Now you can type in 8 letters instead of a full sentence. It can even be used to override the results of an actual command. For instance, if you created a macro for the word "slash" that expanded to "slash constable face", you'd be all set for counter attacking those pastry eating do gooders with a hard knife slash to the face. Take that lawman!

##### D - Delete Macro

This option is pretty straight forward, if you mistyped a macro or made a silly one like we just did, you can delete it. Let's go ahead and delete our innocent macro since no one would believe it, humorous though it may be. Open up the macro menu once more and type D then enter. You should see the following (Note: I've modified this substantially in order to protect the innocent: Me!):


```
=[Defined Macros in default macro set.]=======================================
 
 fe1                fe2                fe3                fe4             
 fe5                fe6                fe7                fe8             
 fe9                fe10               fe11               fe12            
 fe13               fe14               fe15              innocent
==============================================================================
Delete which macro?
```


From here, all you have to do is type in the exact macro you wish to delete. So to kill our innocence proclaiming macro, simply type in innocent, then press enter.


```
Macro "innocent" deleted.
```


You can use that for any macro that you create, plus any that are already defined. However, I'd encourage you to leave the ones already in there - I'll explain why here in just a moment.

##### L - List Macro

This option will list out the shorthand and long version of every macro you have created. If you have not created any macros as of yet, your screen should look something like this: 


```
=[Defined Macros in default macro set.]=======================================
 fe1                            @macro fe1
 fe2                            @macro fe2
 fe3                            @macro fe3
 fe4                            @macro fe4
 fe5                            @macro fe5
 fe6                            @macro fe6
 fe7                            @macro fe7
 fe8                            @macro fe8
 fe9                            @macro fe9
 fe10                           @macro fe10
 fe11                           @macro fe11
 fe12                           @macro fe12
 fe13                           @macro fe13
 fe14                           @macro fe14
 fe15                           @macro fe15
==============================================================================
```


You might be asking yourself at this point, what on earth is all this fe number crap? Those, my friend, are the macros that make the roman numeral buttons on the Java client work. Don't delete them if you use the Java client. If you don't use the Java client, well, might as well just leave them in there just to be on the safe side - why break something if you don't have to.

##### S - Set Macro Set

This command is used to set which macro set you'll be using. So what exactly is a macro set now? Well, it's a set of macros grouped together for a specific purpose. For instance, if you're both a swordsman and a thief, you might create a macro set for each one so that none of your macros will conflict. After all gs might be useful for get sword for the swords set of macros, or gs might be useful for get sen for the thief set - see conflicts! Splitting them up depending on what you're doing at the time makes life easier. Anyway, open up the macro menu and type S then enter and you'll get this as the result:


```
=[Defined Macro Sets.]========================================================
 
 default
 
Current active set: default
==============================================================================
Activate which Macro Set?
```


For now, the only set you should have is the default set. We'll have to fix that. For now, just type in default and press enter to exit this menu.

##### C - Create Macro Set

Ah, now this is the command we need in order to make a new macro set. Open up the macro menu and type C then enter:


```
Enter a name for your new Macro Set:
```


Since this guide is focused around pickpocketing macros, we're going to create a new macro set called pickpocketing. So type in pickpocketing, then press enter.


```
Macro Set pickpocketing created.
```


##### R - Remove Macro Set

This command is useful for removing macro sets that you may have created on accident, or no longer have a use for. Open up the macro menu again and type R then enter:


```
=[Defined Macro Sets]=========================================================
 
 default            pickpocketing   
==============================================================================
Delete which Macro Set?
```


Simply type in the name of the macro set you wish to delete and press enter, in this case I'm going to remove the pickpocketing set just as an example:


```
Really delete pickpocketing Macro Set? [Y/n]
```


Hit Y then enter, and the set and all of the macros associated with it will be deleted, and unrecoverable I might add. Therefore, use this option with caution.


```
Macro Set pickpocketing deleted.
```


##### I - Import Macro Set

This command allows you to import a macro set from another character. For instance, if you have a thief character from the past (can only be used on existing characters) that had some useful macros, you can use this to import them from him. So open the macro menu once more, press I, then enter (Once more, heavily modified to protect the innocent):


```
=[Available Import Points]====================================================
1. Baleron
2. Thaelan
==============================================================================
Import from which point?
```


The first option will be your account itself, so we'll try to import from that. Press 1 then enter, and you should get another set of options:


```
 
 default            swords             Bows               Pickpocketing   
==============================================================================
Import which Macro Set?
```


I'm going to import my swords set of macros just because, so type in swords and press enter for the following option:


```
Import in to existing Macro Set? [y/N]
```


What this is asking is if you want to import those sword macros into your currently in use macro set, in this case, the default set. Let's hit N for no, and it will create a macro set labeled swords for us instead of throwing all those macros into the default set.

##### Macro Recap

By now, you should have a relatively decent grasp for how to navigate the macro menu and how to create macros. One little tidbit that I left out is that there is also a macro for creating macros. Simply type in @macro followed by the shorthand version. So if we were going to recreate our innocent macro again, type in @macro innocent and it will then prompt you for the full version of the command just like if you had gone into the menu and chosen option A.

Proper use of macros will make your life in TEC a thousand times easier, and save your wrists some wear and tear from typing. I highly recommend playing around with the system and learning all of the ins and outs on how to use it. One final word on macros, they're very useful for making RP specific 'tics' for your character, such as an eyetwitch or a limp or any other sort of depth you may want to add to them. Try it out and breathe some new life into your roleplaying with some interesting macroed emotes.

[Back to Top](#Top)

---
<a id="Essentials"></a>
### The Essentials

Now that we've gone over the basics of how to add a macro and make a macro set, we're going to go into the basic macros that form the basis for all of the more advanced macros we're going to use. The first set of macros is to help you manage which marks you're working and easily switch between them as you please, thus I refer to them as targeting macros.

<a id="Targeting"></a>
#### Targeting Macros

The first macro we are going to set up is lft, which expands to look for <target>. This utilizes the @mtarg command to look for whatever you specify as your target. We could leave it at that, but then you're still typing out @mtarg prostitute if you want to steal from prostitutes now aren't you? That just isn't efficient enough for a proper thief, no sir! Here's how we're going to set up our targeting macros:

| Macro Short Form | Macro Long Form |
| --- | --- |
| lft | look for <target> |
| trad | @mtarg trader |
| pros | @mtarg prostitute |
| pat | @mtarg patrician |
| work | @mtarg worker |
| mine | @mtarg miner |
| sol | @mtarg soldier |

I'm sure by now you've figured out the form that we're using. A shortened version of the marks name expands out to an @mtarg macro for that particular mark. It saves time and lets you change targets quickly whenever you want to. Also, @mtarg will be used for all further macros in this guide, so doing this properly is very, very important. Coincidentally, for those warrior types out there, you could just as easily use this method for hunting grounds (ex. treehouse: @mtarg man|brigand|archer).

<a id="Movement"></a>
#### Movement Macros

Now that we have our targeting macros in place, we need to set up the macros to let us get up next to the mark quickly, and if you know a thing or two beyond the basics, get away from them quickly as well. The following are some useful movement macros:

| Macro Short Form | Macro Long Form | Skill Used | Purpose |
| --- | --- | --- | --- |
| app | approach <target> | None, standard command | Approach |
| grt | ground <target> | [Setups](/setups/) - Ground Approach | Approach |
| st | street <target> | [Setups](/setups/) - ??? | Approach |
| dt | drunken <target> | [Setups](/setups/) - ??? | Approach |
| fb | fall back | [Combat Maneuvers](/combat-maneuvers/) - Fall Back | Retreat |
| ft | fade <target> | [Setups](/setups/) - ??? | Retreat |

It should also be noted that you can use the retreat command, or its shortened form of ret without the need for any macro at all. I've added a few non-standard macros in there, if you don't know what they do or what they're used for, well you'd better make friends with some more skilled folk to find out. I can't give you all the secrets outside the game after all.

<a id="Setups"></a>
#### Setup Macros

There are a number of useful setup maneuvers that we can put to use before actually stealing from the target, like using ear for coin to find out if they've even got enough coin on them to bother over. Here is the short macros for some of the more common skills, and some of the less common ones for those in the know.

| Macro Short Form | Macro Long Form | Skill Used | Purpose |
| --- | --- | --- | --- |
| ct | coin <target> | [Setups](/setups/) - Ear for Coin | Check mark's wealth |
| lt | look <target> | None, standard command | Check for tubes, sacks, or other containers |
| gt | glance <target> | [Setups](/setups/) - ??? | Shh! It's a secret! |
| spt | spook <target> | [Setups](/setups/) - Draw Attention | Reduce Success for your next move |
| ps | palm sen | [Pickpocketing](/pickpocketing/) - Palm | Maximize that sp gain |
| ups | unpalm sen | [Pickpocketing](/pickpocketing/) - Palm | Maximize that sp gain |

It may or may not be common knowledge, but having a three move rotation for a non-combat skillset will maximize your sp gain per move. So it would be very much worth your while to ground approach the mark, coin them, then spook them for an easy three moves in setups. This is also possible with pickpocketing, if you know the right sort of people to learn some additional maneuvers from.

<a id="Theft"></a>
#### Theft Macros

Now for the really fun ones - stealing stuff! After all, the thrill of that next big mark is what drives us right? Let's get down to business and make the macros that make us the coin we crave so much.

| Macro Short Form | Macro Long Form | Skill Used | Purpose |
| --- | --- | --- | --- |
| clt | lift pouch from <target> | [Pickpocketing](/pickpocketing/) - Cut and Lift | Steal a coin pouch |
| slice | *See below | [Pickpocketing](/pickpocketing/) - ??? | Steal something? |
| slt | slift gladius from <target> | [Pickpocketing](/pickpocketing/) - ??? | Steal something? |
| klt | klift dagger\|knife\|blade\|dirk from <target> | [Pickpocketing](/pickpocketing/) - ??? | Steal something? |
| ep | empty pouch into my sack | None, standard command | Empty the pouch into your sack |
| dp | discard pouch | None, standard command | Discard the now empty pouch |

*The expanded slice command would have broken the table, so here it is: slice mesh|tan|crude|reddish|bag|neck|box|fur|tiny|tube|sack|backpack from <target>
*Special credit goes to Miss A.T.T. for alerting me to this one, you know who you are.

Unfortunately, there is no easy macro for grabbing items since the items to be grabbed are far too varied to make one macro for. If you thought the slice one was bad, that one would be a mile long by comparison.

[Back to Top](#Top)

---
<a id="Random"></a>
### Random But Useful Macros

There are still a few useful macros for a thief to know that don't exactly fall into the standard categories we have above, so I'll throw them below for your use and enjoyment!

##### Street Smarts Macros

| Macro Short Form | Macro Long Form | Skill Used | Purpose |
| --- | --- | --- | --- |
| fc | find cover | [Street Smarts](/street-smarts/) - City Hiding | Get out of sight, quickly |
| sp | signpost | [Street Smarts](/street-smarts/) - Mimic Signpost | Evade PC Constables, hopefully |
| ss | stash sen | [Street Smarts](/street-smarts/) - Stash | Train up your [Street Smarts](/street-smarts/) |

##### Opening Doors Like a Boss

Scared a thief might be lurking outside your inn room, just waiting to yank that key out of your hand and steal back all that precious loot you've horded? Worry no more, because keys can be palmed, my friend (But not keyrings, sorry).

| Macro Short Form | Macro Long Form | Skill Used | Purpose |
| --- | --- | --- | --- |
| gk | get my key | None, standard command | Get your key out |
| pk | palm key | [Pickpocketing](/pickpocketing/) - Palm | Palm that key, ain't nobody stealing it |
| uld | unlock door with key | None, standard command | Unlock that door, macro style |
| opd | open door | None, standard command | I just saved you 5 characters of typing |
| cld | close door | None, standard command | Hah, 6 characters this time |
| lkd | lock door with key | None, standard command | Lockin that door, like a boss |
| putk | put key in my pouch | None, standard command | Key never left your palm til you put it away, safe and sound |

It's okay to be paranoid, really. You are a thief after all. You know what it's like out there man!

[Back to Top](#Top)

---
<a id="Conclusion"></a>
### Closing Notes

I hope you have enjoyed this guide and found its contents useful. Macros are truly a very powerful aspect of TEC and when used properly they can make playing vastly easier, as well as enhancing RP by giving you a canvas of emotes available with the use of a single keyword. Learn them, use them, love them, and most of all have fun out there!
