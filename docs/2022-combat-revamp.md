---
title: "2022 Combat Revamp"
category: "Skills & Combat"
parent: announcements
---

# 2022 Combat Revamp

[TOC]

## General
* Practice Dummies and Archery Targets now provide the same SP gaining capabilities, with the dummy being raised, and the target being lowered. Each will now provide SP when struck until the attacker has either 250 combat ranks, or 1000 skill points gained total, whichever comes first.
* The creatures in the Iridine sewers and the Iridine dumps that were made to practically explode when hit by a non-newbie character have been returned to their original toughness. The intent here is to provide more hunting option for characters that need a stepping stone between Signaltower Island and the Ludus Valerius in difficulty, both alone or along side higher-ranked characters. Higher ranked characters can benefit from these areas as well, especially for a solid dose of nostalgia.
* All stepping attacks have been brought toward a baseline accuracy level. This means that while still unique across the skillsets that have them in terms of base damage, aimability, and number of strikes, stepping attacks that were previously very difficult to block have become easier to block, and stepping attacks that were exceptionally easy to block have been given an accuracy boost.
* The penalty to skill point gain for not rotating actions has been removed. This applies to both combat and non-combat actions. While there still is a cumulative penalty for using the same action a very large number of times, overall, players should notice an increase in skill point gain compared to the former system when using the same action over the course of the weekly cycle.


## Skill Sets

### Archery
* Shots not longer consume double fatigue.
* Added a new difficult block, Handle Parry, that defends against weapon hooks, catches, and some disarms that can't otherwise be dodged.
* Handle Parry is available to be learned from Fern in Vetallun, Shantaz in Seld, and Jarla in Stromheim.
* Archery attacks now have a penalty to accuracy for repeating attacks similar to all other attacks except that the maximum penalty that can be accrued is much lower and the number of attacks that need to be cycled through in order to see no penalty is three.
* Ranks in Archery now reduce the chance for arrows to break and disappear under normal circumstances, greatly reducing the amount of arrows that need to be replaced after fight. Note that arrows that get lodged in enemies and their shields can be collected with the "pull <corpse>" and "rip arrow from <shield>" commands. Arrows can be removed from living targets with the "yank arrow from <body part>" command after tending them. Ripped and yanked arrows still have a greater chance of becoming damaged or destroyed in the process.
- Addition of a new command "recover arrows". This command will pull arrows from all the corpses in the archer's area one at a time, similar to the "collect" command. It begins with the most recently killed corpse working backwards toward the first corpse and can be cancelled at any time with the "stop" command.
* The roundtime for pulling arrows from a corpse has been further reduced.
* The roundtime for Quick Draw has been reduced.
* Another bug that was causing arrows to disappear has been fixed.
* Archers should no longer throw their bow instead of shooting an arrow in some rare circumstances.
* Hand Shot can no longer create openings or put the target in roundtime.


### Brawling
* Punch now has reduced accuracy.
* Sucker Punch now bypasses a portion of the target's defense.
* Uppercut now has increased accuracy.
* The roundtime for Body Slam has been reduced.
* Formerly, Leg Whip always made the user prone, with a chance to knock the target down. Leg Whip now allows both the user and the target to utilize their ranks in Backwards Rolling Rise or Simple Rolling Rise to automatically stand from its effects. Note that this attack can still be performed while already prone.


### Cestus
* Cestus Short Upcut no longer requires wielder to be in Weaving Stance
* Cestus Low Block can now block sweep attacks
* Cestus Upward Thrust can now automatically approaches the target if they are not already approached.
* Base damage for Spike Slash and Short Upcut have been increased.


### Chainblade
* Ring Uppercut now interacts with different target types more appropriately. Due to a bug, the chance to stun the target could reach 100% in some circumstances and has been fixed.
* Ring Block now blocks a wider variety of attacks.


### Combat Maneuvers
* Addition of a new skill, Melee Advance. This skill allows the user to approach a target without needing to manually retreat from other combatants first. Melee Advance gets a bonus to speed from its ranks and the Speed attribute of the user, with the maximum speed bonus being achieved at rank 150. Characters with a high Speed attribute may reach the maneuver's maximum speed at lower ranks. Additionally, the user can leave defensive openings while attempting the maneuver. The chance for these openings to occur is nullified by achieving rank 90 in Combat Maneuvers or Melee Advance, whichever occurs first. Melee Advance has a prerequisite of rank 30 in Fall Back.
* Melee Advance is available to be learned from Leda in the Iridine Harbor, Mervia in Seld, and Rontubius in Monlon.
* When performing a Backwards Rise or Simple Rolling Rise automatically, the riser will no longer be placed in additional roundtime and will not have a chance to leave defensive openings.
* Leda now teaches all skills to a minimum rank of 100.
* Rolling Dodge will now become active when the dodger is sitting or kneeling instead of only when laying. If a Rolling Dodge is triggered while sitting or kneeling, it will cause the dodger to become laying once the maneuver is complete.
* Combat Guarding is no longer nearly impossible to bypass, without regard for the skill level of the participants. It now takes ranks in the skill into account, as well as the guard's and trespasser's attributes and overall combat ability. The success and roll to bypass the guard will now be shown to both parties in most circumstances. When the guard is challenged, roundtimes for the guard have been removed and roundtimes for the trespasser are now reduced based on the trespasser's speed attribute. The success to begin guarding a person, place, or thing remains very easy and is not related to the success for maintaining the guard against a trespasser. When multiple characters guard the same person, the skill of the highest ranked guard is checked, with a bonus for each additional guard. Items and exits may only be guarded by one character at a time. Finally, when someone is guarding an exit, the description of the room will now include the direction of that exit to prevent confusion when multiple exits share the same name.


### Falx
* Falx Overhead Chop and Narrow Slash now do slightly more damage.


### Knives
* Knives attacks now receive a bonus from CKF Screnaca Coranadin Stance
* Knife Underhand Stab now bypasses a portion of the opponent's defense similar to other "upswing" type attacks
* Knife Overhead Strike now has increased accuracy
* The base damage of retalq daggers have been increased by 10%.
* The base damage of boison daggers have been increased by 33%. Any damage bonus given to boison daggers from reforging has carried over and applies on top of the new base damage for the weapon.
* Note that weapon base damage is one factor of many that figure in to an attack's final damage.
* Damage for Underhand Stab and multi-hitting moves have been decreased slightly.
* Knives Round Strike is now more difficult to block.
* Ranks in Knives and Round Strike now count toward Round Strike's chance to circumvent the target's defenses.
* The base damage for Round Strike has been increased.


#### CKF
* CKF Triple Cut now has a reduced roundtime
* CKF attacks now receive a better stance bonus
* Slashing Block now provides no special benefits when triggered, thus players are not obliged to or rewarded for building Knife characters to maximize triggering of Slashing Block.
* Wrist Slash may now be executed at will and can now be blocked. The chances to automatically create a bleeding wound and/or disarm the target have been reduced and are based on the slasher's ranks.
* Face Slash can now stun the target for a longer period of time and is based on the slasher's ranks.
* The forehand/backhand bonus to accuracy and damage is now applied regardless of if or what type of shield the user is wielding.


### One-Handed Axes
* Axe Basic Chop now gets a larger accuracy bonus from stance.
* Axe Basic Chop, Slash, Head Swat, and Leg Strike now have a reduced roundtime.
* Axe Pivoting Longarm now gets a larger accuracy bonus from stance and bypasses a portion of the target's defense.
* Axe Stepping Legstrike now bypasses a portion of the target's defense.
* Axe Chopping Block now blocks more attacks, including weapon hooking and catching attacks.
* Axe Hook now has reduced accuracy.
* Protarian now teaches One-Handed Axes skills to rank 100.
* The base damage of retalq axes have been increased by 15%.
* The base damage of boison axes have been increased by 15%. Any damage bonus given to boison axes from reforging has carried over and applies on top of the new base damage for the weapon. Note that weapon base damage is one factor of many that figure in to an attack's final damage.
* Shield-Breaker now has reduced accuracy.
* Axe Pivoting Longarm is now slightly less accurate.


### One-Handed Crushing
* All One-Handed Crushing attacks now get an accuracy bonus from Iunius' Stance.
* Iunius' Stance bonus has been raised, comparable to other stances.
* Simple Bash is now more difficult to block and cannot be aimed low.
* Smash, Leg Strike, and Round Strike are now more difficult to block.
* Stepping Crush is now average and deals more damage.
* Added a new average block, Club Head Block, that defends against problematic attacks, including weapon hooks and catches.
* Head Block is available to be learned from Cassius in the Iridine Harbor, Cralus in Blackvine, and Rontubius in Monlon.
* Ranks in One-Handed Crushing and Round Strike now count toward Round Strike's chance to circumvent the target's defenses.
* Upswing can no longer be aimed low.
* Leg Strike is now slightly less accurate.


### One-Handed Swords
* All shield requirements have been removed. A gladius wielder can use any OHS or style attack they know, and will automatically assume the appropriate stance if able. Pardelian Turtle Stance still requires a shield and any shield type will meet this.
* All attacks that have chances to make the wielder fumble, leave openings, fall down etc. will no longer do so after achieving rank 90 in the relevant parent skill.
* One-Handed Swords attacks now receive a bonus based on the wielder's style stance
* Sword Jab, Slash, and Chop now have a reduced roundtime.
* The base damage of boison gladii have been increased by 10%. Any damage bonus given to boison gladii from reforging has carried over and applies on top of the new base damage for the weapon.

#### Avros
* Avros Flinging Disarm can now requires much fewer ranks to be useful.
* Avros Strike and Smash no longer puts the target in roundtime and more reliably knocks down the target with sufficient ranks.
* Note that Avros Sunrise Block and Pardelian Downward Block only function while in their respective stance. Be mindful of this when switching stances to perform moves from other styles.


#### Nelsor
* Nelsor Vulture Block can now be executed while standing if the wielder has a two-handed grip.
* Nelsor Arch of the Sky and Leaping Cross Strike have a slightly reduced roundtime.


#### Pardelian 
* Pardelian Stab and Twist now caps at rank 100 rather than increasing damage to infinity.
* Pardelian Side Jab now benefits from Stab and Twist and has a lower accuracy bonus. It also no longer requires the target to be surrounded, and does not receive its accuracy bonus unless they are.
* Note that Avros Sunrise Block and Pardelian Downward Block only function while in their respective stance. Be mindful of this when switching stances to perform moves from other styles.
* Ranks in Pardelian Gladius Combat, and Tag and Strike, now count toward Tag and Strike's chance to circumvent the target's defenses similar to other round strike attacks.
* The roundtime for Shield Charge and Shield Sap have been adjusted to work with the new shield speed modifiers.


### Pankration
* Pankration Strike and Rise is now average
* Pankration Knife Hand is now more difficult to block
* Wide Knee and Knife Hand have increased accuracy.
* Lead and Cross now has increased accuracy.
* Waist Clasp now has reduced accuracy and consumes more fatigue when used.


### Shields
* The roundtime for shield attacks are no longer determined by the speed of the wielder's weapon. Instead, it is determined by the shield itself. Each shield type now has its own speed modifier, with the heavier shields being slower than lighter shields.


### Spears
* All spear attacks now get a stance bonus when the wielder assumes either Scorpion Stance or Hoplite Stance.
* Most spears long range only attacks can now be executed at either range.
* Spear Upward Slash now bypasses a portion of the opponent's defense similar to other "upswing" type attacks.
* Spear Chop, Upward Slash, Round Strike, and Charge now have a reduced roundtime.
* Ranks in Spears and Round Strike now count toward Round Strike's chance to circumvent the target's defenses.
* Spear Weapon Strike is now able to be blocked by a wider variety of blocks across different skillsets/styles.
* Base damage for Upward Slash, Stepping Stab, and Weapon Strike have been reduced.
* Base damage for Chop has been increased. Chop remains long range only.
* Base damage for Round Strike, when the attack is not blocked or dodged, has been increased.


### Staves
* Staves Stepping Spin can no longer be aimed low and has had its damage reduced.
* Staves Pivot Smash is now more difficult to block.
* Staves Snap Strike and Simple Strike now have increased accuracy.
* Staves Stepping Spin and Defensive Sweep now have reduced accuracy.


### Tridents
* Trident Stab and Trident Jab no longer take a penalty in short range and have a reduced roundtime
* Trident Sweep and Trident Feint can now be executed at either range
* Pierce is now more difficult to block.
* Trident Pierce and Rotating Bash can now be executed at either range.
* Trident Blunt Bash, Slash, and Jab have increased accuracy.
* Trident attacks that would randomly snare the wielder's trident when blocked no longer do so.
* Trident Weapon Catch and Defensive Catch now have reduced accuracy.
* Trident Defensive Catch has been transformed into Trident Defensive Bash, a close-range bludgeoning attack that steps the user one increment more defensive. Characters formerly having ranks in Defensive Catch will see that their ranks now apply to Defensive Bash instead. Defensive Bash has a prerequisite of 20 ranks in Blunt Bash.


### Two Handed Axes
* 2H Axe Hook no longer bypasses 25% of the opponent's defense.
* 2H Axe Head Block now blocks overhead type strikes.
* Woodcutter Slash no longer bypasses a portion of the target's defense.
* Crossing Block is now easy.
* Up Slash now bypasses a portion of the opponent's defense similar to other "upswing" type attacks.
* Basic Slash and Cross Chop can now be executed at either range.
* The Two-Handed Axes trainer, Clobris, has joined Protarian at his shop on Bronze Lane.
* Subskill prerequisites have been reevaluated and lowered overall.
 * Ankle Hook - no prerequisites.
 * Arm Hook - no prerequisites.
 * Woodcutter Slash - no prerequisites.
 * Falling Strike - 10 Ranks in Chop.
 * Overhead Chop - 20 Ranks in Chop.
 * Cross Chop - 20 Ranks in Chop, 20 Ranks in Overhead Chop.
 * Up Slash - 10 Ranks in Chop, 10 Ranks in Basic Slash.
 * Hip Slash - 20 Ranks in Basic Slash.
 * Stepping Slash - 30 Ranks in Basic Slash
 * Haft Sap - 10 Ranks in Haft Strike.


### Whips
* Whip Flogging the Bull is now average and can be executed at either range
* Whip Precise Snap is less randomized and now behaves similar to other "sap" type attacks
* Whip Sky Circle Slash can now be performed at either range
* Whip Simple Strike is now easy and no longer has a large accuracy penalty
* All whip attacks now get a stance bonus from either Sky Circle Stance or Fast Coil Stance.
* Addition of a new average attack, Forward Snap, that bypasses a portion of the opponent's defense similar to other "upswing" type attacks.
* Addition of an average block, Coil Block, that provides defense against problematic attacks including weapon hooks and catches. This block requires the wielder to be in Fast Coil Stance, and will assume the stance automatically provided the wielder is at least rank 80 in Fast Coil Stance, similar to how Pankration blocks operate.
* New ship skills are available to be learned from Arison on Bronze Lane.
* Whip Lykatos' Scourge and Sky Circle Slash now have increased accuracy.
* Whip Forward Snap and and Sky Circle Slash are now more accurate.


## New Min-Gains Chart


~~~
New mingains look like this: 
                  0-750 = 0.025
                751-850 = 0.020
                851-900 = 0.015
                   >900 = 0.001
      Bonus for total skill points (based on total SP earned): 
                     0-4999 = base + 0.100
                  5000-9999 = base + 0.075
                10000-19999 = base + 0.050
                20000-50000 = base + 0.025
                     >50000 = base + 0.000
      SP Threshold (based on total SP earned): 
                     0-4999 = base * 2.00
                  5000-9999 = base * 1.80
                10000-15999 = base * 1.55
                16000-24999 = base * 1.25
                25000-99999 = base * 1.10
                     >99999 = base * 1.00
* base threshold SP = 310
~~~
