---
title: "Combat Guide"
category: "Skills & Combat"
---

# Combat Guide

### work in progress 


The Eternal-City offers a complex combat system. This guide will attempt to offer both basic and advanced knowledge of the mechanics surrounding the combat system as a whole.

---
### Basic Commands:

**stats**: shows you a full list of your stats and some other useful information

**ss**: stands for "short stats", only shows the basic information such as HP, fatigue, load
condition: shows your stance, fight level, wounds, bandages/stitches/splints, fatigue level, hunger, thirst and load

**skills**: will show you your entire skill list. Can use variations to obtain specific information: "skills brawling" will only show you your brawling skills.

**skills ?**: will show you the commands to use the skills you know. Using "skills ? brawling" will only show you the commands for the brawling skillset.

**ssk**: will show you the amount of Skill Points you have banked per skillset. Will also show you how many Skill Points to have gained this cycle.

**approach/advance/engage**: will make you enter close range to a target

**retreat**: will make you retreat from close range, but will make you leave openings. Can learn "fall back" in the Combat Maneuvers skillset to retreat without leaving openings. retreat <direction> will allow you to retreat and automatically leave an area to the targeted destination.

**ac**: will show you the approach status of targets in the room

**@hps**: can be toggled on/off to let you know how much HP you have when you are attacked (only triggers if damage is dealt)

**watch**: can be toggled on/off. Will let you know when people move in close rooms. Will also let you hear combat sounds in close rooms. Higher perception stat will let you see/hear farther.

**stand**: Makes your character stand up.

**scan**: Allows you to scan in a cardinal direction to allow your character to see potential targets in nearby rooms. Useful for missile weapons.

**passivewield**: Allows you to automatically unwield your weapon when asked to do so by a lawkeeper. Toggled on/off.

---
Step 1: Basic fighting / Practice dummy

Head on over to the nearby practice dummy which can be found at pretty much every trainers' dojo. This will be your first training target.

If you use a weapon, you will want to make sure that it is wielded. Depending on the weapon you will require one or two hands that are free. To make sure that your hands are free you can use the 'inhand' command. You can also 'look me' to look at yourself and see if your hands are free.

You will wield your weapon automatically in one or two hands by using the 'wield' command. Most one-handed weapons can be wielded in two hands and it may be required for certain skills (such as Swords Sidestrike).

->wield quarterstave
You wield your oak quarterstave in both hands.

While your weapon is wielded, you will have access to its offensive and defensive skills. You will only start out with the basic attack, but you will be able to learn brand new skills.

You must now approach the dummy in order to attack it.

->approach dummy
You begin to move towards a practice dummy.
You stop next to a practice dummy.

You are now in close range and will be able to attack the dummy.

->attack dummy
[Success: 5, Roll: 56] You hit a practice dummy with your oak quarterstave! It suffers a minor hit to its waist.

Your 'success' is how difficult it is for you to hit the practice dummy. The lowest success you can have is 5 and the highest is 95. You will always have a 5% chance to miss an attack by default. You will also have a 5% chance of hitting even the most capable fighter. Your 'roll' is a random 1-100 value that is generated when you launch your attack.

By hitting the practice dummy, you will be generating Skill Points which are your 'experience points' so to speak. Once you have accumulated enough Skill Points, you will be able to purchase Ranks (skill levels). The practice dummy only allows you to gain 100 total Skill Points before you have to move on and find a new target to practice upon.

You can view your Skill Points gained by using the 'skills' command or the 'ssk' command. Once you have earned enough Skill Points, you will be able to learn new skills that will make you not only more powerful, but will also allow you to maximize your SP gain.

You must cycle five skills in order to negate the Skill Point gain penalty. This means that as soon as you are able to, it would be a good idea to learn five different skills. Be warned that some skills have pre-requisites or are harder by default, so you should take a look at the following to learn the best early skills for your particular skillset:

--/insert table with skillsets + attacks here later\--

If you have less than average speed, it is highly recommended that you learn Combat Maneuvers and the Reflexes skill right away. It will automatically bring you up to average speed stat level. In some cases, that may very well remove an entire 1-2 seconds of roundtime for every action you do. You can learn Combat Maneuvers and Reflexes by using your primary skillset's Skill Points (learn combat maneuvers from leda with axes  --- as an example).

---
Step 2: Basic Fighting / Low Level Training

Now that you have just earned your 100 Skill Points from the practice dummy, you will need to find a training ground that will allow you to earn more Skill Points. There are several options at your disposal:

Signal Tower Island: The creatures to be found here are angry gulls, rock crabs, fluvitur pups and saltwater snapper turtles. They are very easy to hit and will have a hard time hitting you. It is a fairly large area and the spawn is fairly low. Creatures here will not fall unconscious. They will die automatically.

Shipwreck (northwest corner of Signal Tower Island): You will stumble upon a shipwreck where you fill find fluviturs. These are harder to hit and to dodge than the regular creatures found on Signal Tower Island, but they are still relatively easy. If you have decent stats, you will be able to handle them with ease.

Sewers (near Stone Toga Inn): This area is vast and is composed of several different areas where the animals that spawn will differ. The northwestern area, closest to the Stone Toga Inn will have large brown rats, osecars and sewer rodents. These are fairly easy, but can prove far more problematic than the creatures found on Signal Tower Island. Not recommended right away unless you have decent armor and stats.

Vetallun's Apple Orchard: Situated farther outside of the town, the apple orchard has worms and wasps that are on par with the creatures found on Signal Tower Island. It is dangerous to travel from Iridine to Vetallun due to the bandit presence along the road. Bandits are more commonly found near the Traevant Forest.

Seld's Gardens: Just like the apple orchard and Signal Tower Island, the gardens offer very easy to handle creatures. Seld is very far from Iridine and it is not recommended for new players to venture there.

Rock Valley's Attic: Similar to Seld's Gardens, the apple orchard and Signal Tower Island, the bats found within the attic are very easy to handle. The area is fairly small and provides a constant stream of bats. Rock Valley is also not recommended for new players.

As you gain some ranks under your belt, you will gradually start doing more damage to the creatures found within those hunting grounds. Some mechanics are in place to discourage higher level characters from farming these areas. Once you reach ~300 total combat ranks, these areas will be completely useless to you as you will not be able to earn Skill Points very efficiently. The Shipwreck found on Signal Tower Island does -not- have these mechanics enabled.

After you have learned some ranks and skills, you should now be able to handle the first tier in Ludus Valerius. This gladiator training school can be found directly to the west of Bronze Lane. It is recommended that you have some basic armor before attempting your luck here. Skill Point Gain is vastly increased (almost doubled) when compared to the regular hunting grounds, but you will however not be able to earn any coin while training. The Skill Point Gain increase does not apply to min-gains.

---
### Basic Mechanics:

**Health Points**: Your health points are your HP. The amount of health points your character has is directly tied to your endurance stat. The maximum amount of HP a character can have is 200.

**Health Regeneration**: You will gradually recuperate HP. The amount recovered is static and cannot be influenced unless you head to the Cold Baths. You will recover a low portion of your health back every 20 seconds.

**Health States**: Your character will have four health states: 1) Conscious, 2) Unconscious, 3) Comatose and, 4) Dead. The enemies that are found within the game will -no- have the Comatose state. This is reserved to player characters only.

**Conscious**: This is the regular state your character is in. Your character is able to do everything normally.

**Unconscious**: If, for some reason, your health points reach 0 or less, you will fall into a state of unconsciousness. Your character will not be able to interact with the world surrounding it. You will only have access to Out of Character commands (such as the ability to check your stats, skills, etc.). You will remain in a state of unconsciousness until your character recovers and reaches 0 HP. While in this state, your character regenerates Health Points at the regular rate.

**Comatose**: The comatose state is reached once your characters is very soundly unconscious. This happens very rarely unless certain conditions are met. Player characters -can- send you in a comatose state by spending 250 role-points. NPCs will -not- continue attacking you while you are unconscious unless they were specifically designed to do so (read: very dangerous and deadly ones). Once in a comatose state, you will need to either use a luck! point or be brought to a coma ward by another player. There is a random chance that you may be brought to the ward by a passerby, as well. A coma typically lasts 48 hours (you can check the time via @coma-time). You will also suffer from side effects of having been in a coma for another 48 hours. A player character acolyte can bring you out of a coma and nullify or lessen the coma effects.

**Dead**: In The Eternal-City, death is final. Once a character or NPC of any kind dies, it is dead for good and cannot be brought back to life. Your character can only die at the hands of a GameMaster, if he is subject to a PK ticket, or if you use the END command while in a comatose state. It is otherwise impossible for your character to die permanently. You can also use the @retire command if you wish to retire a character (limit of one retire per 365 days, you earn a VC based on your retired character's VC level -1). You will have a choice to leave a corpse behind or to simply vanish for good.

**Fatigue**: Your fatigue is your 'energy' level. Depending on the action that you are attempting to do, it will consume a specific amount of energy. The amount of fatigue your character has is directly tied to your endurance stat. Once a character reaches 0% fatigue, you will become fatigued and must rest. Note: You can still attack when reaching negative fatigue, but you will suffer a hefty -100 penalty to any actions done.

**Fatigue Regeneration**: You will gradually recuperate Fatigue. The amount recovered is dynamic based on several factors. Your location, HP % and position (laying, sitting, kneeling, standing) all play a role in how much you will regenerate every 20 seconds. Laying down in the warm baths OR cold baths is the quickest way.

**Sleeping**: Your character can also regenerate fatigue (but not health points) while sleeping. To do so, you -must- use the sleep command while in an inn room, a bedroom, a bunk room, a lean-to or a few other very specific rooms.

**Hunger**: Using the "satiation" command you will be able to see your character's current hunger level. Hunger is also seen as the green bar in the client. Hunger may have a minimal impact on your character's recovery. If you reach the "dying of hunger" stage, you will receive a -5 HP and -10% fatigue penalty every 5 minutes.

**Hydration**: You can view your character's current hydration level by using the "condition" command. Hydration is -not- visible as one of the four bars in the game's client. The blue bar is your character's current load status. Thirst may have a minimal impact on your character's recovery. If you reach the "dying of thirst" stage, you will receive a -5 HP and -10% fatigue penalty every 5 minutes.

**Position**: Your character can be in a few positions which will impact what actions you can do. Laying, sitting, kneeling or standing are the available positions. You will also suffer combat penalties based on your position. Your position matters when attempting to recuperate fatigue.

**Stance**: There are five stances available: Berserk, Aggressive, Normal, Wary and Defensive. Each have different assigned combat properties which change your offense/defense levels.

**Weapon stances**: Some weapon skillsets will have stances available to them. Someone in a fighting stance will show up both in the character description and in the room description. Some skillsets require the stance to perform certain maneuvers. An offensive bonus is generally given for being in an active weapon stance.

**Fighting range**: You can fight up-close while approached (close combat), while standing in the same room (ranged combat) or from nearby rooms (missile-weapon combat). Close combat requires you to be approached to your target. Ranged combat allows you to fight someone while in the same room, but without being approached. Missile-weapon combat allows you to throw your weapon (spears, trident, axes) or use a bow to attack a target when using the 'scan' command.

**Success**: Your success is how successful you are at attempting to attempt an action. Your success is determined by how skilled you are versus your opponent's skill. Stats are always factored in.

**Roll**: Your roll is a completely random number generated that will be between 1 and 100. You cannot, under any circumstances, affect your roll.

**Cross-training**: In order to learn Combat Maneuvers, you can use -any- weapon skillsets to learn them. To do so, simply type: "learn combat maneuvers from <trainer> with <skillset>". The same principle works with Shields. You can earn Skill Points in Combat Maneuvers by using the Killing Blow skill on unconscious targets. Shields can also earn Skill Points by using the various shield bashes. Other skillsets such as Pankration and Brawling have interchangeable Skill Points, meaning that you can learn Pankration with skill points in Brawling and you can learn Brawlng with skill points in Pankration. The same works with Knives/Cineran Knife Fighting and Swords/Avros, Swords/Pardelian and Swords/Nelsor.

**Stat-skills**: These skills allow one to train up their stats up to a maximum level. This number should be equivalent to more or less ~175 in the appropriate stat. If your current stat is above this number, you will not be receiving any benefit to learning it. Footwork in the Combat Maneuvers skillset will help you with Agility (raises your opponent's success). Reflexes in the Combat Maneuvers skillset will help you with Speed (slightly raises your opponent's success + lowers your roundtime). Most weapon skillsets will have a variant of Grip (Dexterity - makes it easier to hit your target) and Accuracy (Perception - slightly makes it easier to hit your target).

**Roundtime**: You will have a cooldown after you perform any given action. This cooldown referred to as Roundtime will depend based on the action, the weapon and your Speed attribute. The harder hitting weapons and skills will generally be slower. The Combat Maneuvers skill Reflexes can be learned to lower your Roundtime.

**Damage**: This is one area that is vastly different from other games. Damage is not seen as a number. All damage that is done will have a word associated to it depending on the severity of the wound.

**Damage**: Puncture: Faint wound > puncture > deep puncture > severe puncture > gaping wound
**Damage**: Bruising: Small bruise > bruise > ugly bruise > major bruise > fracture
**Damage**: Cutting: Shallow cut > Cut > Deep cut > Severe cut > Devastating cut

**Limb Damage**: Your wounds will gradually heal and disappear, but should you receive too many severe wounds to a particular limb, you will receive penalties. Should you have a damaged foot, shin or thigh, you may stumble and fall and occasionally stop when attempting an action. Should you have a damaged hand, arm or shoulder, you may drop your weapon and occasionally stop when attempting an action. You will also lose fatigue when wincing. Your willpower affects how much limb damage you can receive before starting to feel the effects.

**Fumbling**: Every time you perform a combat action, you will have more or less a 3% chance of performing a fumble. These can range from unwielding, dropping your weapon to the ground, leaving an opening, falling to the ground or a simple stumble. To keep yourself from performing an awful fumble, you will have to learn the Combat Maneuvers skill called Recovery. You must be Rank 50 against non-player characters or rank 100 against player characters to alleviate the effects. You may still have a chance of performing one against player characters, but the chance is minimal.

You fumble and stumble backwards!
You fumble, but regain your footing in a wary combat posture!
You fumble, but regain your footing in an aggressive combat posture!
You fumble, but regain your footing in a defensive combat posture!
You fumble, but regain your footing in a normal combat posture!
You fumble, but regain your footing in a berserk combat posture!
You fumble and fall on your butt!
You fumble, falling to one knee!
You fumble, losing your grip on a boison-tined trident!
You fumble, dropping an Altene double mace!
You fumble! The momentum of your strike causes a wall shield to slip off your arm and fall to the ground!
You fumble your balance for a moment and leave a low opening!
You fumble your balance for a moment and leave a high opening!
You fumble your balance for a moment and leave a middle opening!
You stumble.
You start to fumble, but manage to maintain your balance. (next attack gets bonus)

**Fumbling + execute attack**: "You start to fumble, but recover quickly and follow through with your attack." when you see this message, your next attack will receive a bonus based on your ranks in recovery (and your ranks in the attack?). The bonus caps at +25.

**Fumbling + poor attack**: " description here " when you see this message, your next attack will receive a penalty. The penalty applied is -25 to your next attack.

**Load**: The load that your character carries around will have an impact on your fighting capabilities. Your load and its effects are based on the weight you are carrying and your character's strength. You will generally want to stay away from being encumbered because it will impact your fighting abilities. A moderate or light load is recommended. The higher your load, the longer your roundtime will be when standing up. You can alternatively learn the Combat Maneuvers skill Backwards Rolling Rise to have a lower roundtime when using this action. Be warned that you cannot use it if you are too heavily encumbered.

**Sweeps**: This combat skill can be found in the Staves, Spears and Tridents skillsets. The sweeping skill attempts to knock the target on its back. A roundtime will be imposed upon the person being swept to the ground based upon the roll over success. To completely nullify sweeps against NPCs you will have to learn Simple Rolling Rise or Backwards Rolling Rise. 1 rank equals 1% chance to automatically rise. Be warned that stats and load will play a role. It is advised to learn one of these maneuvers to rank 120. You cannot completely nullify sweeps when fighting in PvP. There will always be a small chance (25% ? - need to verify) of being swept. -All- rolls over success will be a successful sweep.

**Knockdowns**: Several combat skillsets have knockdown maneuvers. The intent is to knock your opponent to the ground. Some skills will leave your opponent laying or kneeling on the ground when successful. Unlike sweeps, you will not be able to use Simple Rolling Rise or Backwards Rolling Rise to automatically rise when falling to the ground. Additionally, unlike sweeps, the knockdown maneuvers will not automatically leave your opponent on the ground when rolling over success. Your roll over success, ranks in the skill being used and stats (yours as well as your target's) will play a role to see if a knockdown occurs.

**Stuns**: Some combat skills such as One-Handed Crushing Sap or Cineran Knife Fighting Face Slash will have the possibility of inflicting a stun. Much like knockdowns, a simple roll over success will not guarantee a stun. Your roll over success, ranks in the skill being used and stats (yours as well as your target's) will play a role to see if a stun occurs. When stunned, you will be unable to complete any action. A stun's duration depends on the skill being used. Some critical hits will also have stun effects associated to them and the duration varies depending on the critical hit and its severity. When stunned, you will also be unable to defend yourself - you will not be able to dodge or block any attacks for the duration of the stun.

**Stun Stacking**: Stuns cannot be stacked. The duration of the first stun is the one that will indicate when your target will unstun. If you land critical hits that would normally stun a target, they will have no effect. The same applies to attacks like Sword Sap where if your target is already stunned, you will not be able to add further stacks to the current stun. If you use an attack that has the possibility of creating a stun such as Sword Sap, it will only work once per xx seconds to avoid the creation of stun locks. However, you can use Sword Sap to create a stun and once the target is no longer stunned, you can use another attack that has a chance to create a stun and this one -will- still have that stun chance. The stun lock penalty only applies to an attack done in the last xx seconds that has created a stun.

**Silent stuns**: Some critical hits will create silent stuns, which means that you will not receive the following message when the attack occurs: "An old ugly slave is stunned!" but you will receive the "An old ugly slave is no longer stunned." message once the stun is finished. They are otherwise identical to regular stuns.

**Disarms**: Some skills such as Spears Weapon Strike and Clubs Knock Aside have a chance to disarm you when successful. You will have to wield your weapon if this happens. Some will even make you drop your weapon to the ground. While you are not wielding your weapon, you will not be able to utilize your weapon blocks.

**Weapon traps**: Some skills such as Tridents Weapon Catch, Cestus Weapon Trap and Whip Entangle will attempt to trap the target's weapon. If successful, you will no longer be able to attack with your weapon. You must then use the 'free' command and a success/roll will determine if you will free your weapon. Strength is the primary factor when determining if you can free your weapon. You can alternatively drop your weapon which will make you instantly lose the weapon battle. The loser will incur a roundtime penalty where he will not be able to complete any actions.

**Feints**: These skills allow you to create an opening on your target. The duration of this opening is completely dependent upon the target. Attacks, standing up, retreating and other actions will remove the opening and your target's defense will return to normal.

**Openings**: "An old slave has left a ample high defensive opening." when you see a message of this sort, what it means is that the target has left an opening which you can take advantage of. Currently, the size of the opening does -not- matter. The only thing that matters is whether there is an opening or not. An opening completely nullifies all weapon blocks, dodges and defenses. The only thing that remains is the target's natural defense via agility/speed. Opening can be created by using skills such as Feint, your target leaving openings when using skills such as Avros/Nelsor, using the 'retreat' command or simply leaving openings due to wounds to the hands/arms/shoulders/feet/shins/thighs when attempting an attack.

**Weapon quality**: Your weapon's quality will affect your success. The greater the quality, the greater the bonus. The lower the quality, the higher the penalty. Weapon quality has no impact on damage output or critical hit quality. This bonus/penalty will range from -6 all the way to +6.

**Weapon qualities**: extremely poor - very poor - poor - below average - slightly below average - average - good - great - excellent - superior

---
The Eternal-City uses a Rank Bonus system. Every single rank that you learn in a skill will receive a bonus based on its level set upon an exponential ramp. The early ranks will offer you more rank bonus whereas the higher you are in a rank, the less it will give you. It is a diminishing return system. Difficulty of a maneuver does not effect this base rank bonus.


| Skill Rank | Level of Expertise | Rank Bonus Gained |
| --- | --- | --- |
| 1 - 9 | Novice | +3 per rank |
| 10 - 19 | Practiced | +2 per rank |
| 20 - 29 | Familiar | +2 per rank |
| 30 - 39 | Learned | +1 per rank |
| 40 - 49 | Capable | +1 per rank |
| 50 - 59 | Outstanding | +0.5 per rank |
| 60 - 69 | Expert | +0.5 per rank |
| 70 - 79 | Adept | +0.5 per rank |
| 80 - 89 | Master | +0.5 per rank |
| 90 - 100 | Grand Master | +0.5 per rank |
| 101-150 | Grand Master | +0.25 per rank |
| 151-200 | Grand Master | +0.125 per rank |
| 201-500 | Grand Master | +0.0625 per rank |
| 501-1000 | Grand Master | +0.025 per rank |
| 1001+ | Grand Master | +0.01 per rank |


Your rank bonus in a skill is determined by the Rank Bonus from your Basics skill + your Rank Bonus in the actual sub-skill itself. For example, if you know One-Handed Swords, your ranks in the basics One-Handed Swords skillset will offer a bonus to your One-Handed Swords Jab sub-skill. The rank bonus offered to your sub-skill is dependent upon the difficulty of the sub-skill itself. Sub-skills are: Easy, Average, Difficult and Impossible. Harder maneuvers will not only cost more Skill Points, but they will also receive a much lower bonus from your Basics skill.


| Subskill Difficulty | Rank Bonus Added |
| --- | --- |
| Easy | 75% |
| Average | 50% |
| Difficult | 25% |
| Impossible | 10% |


Stances. These are used to determine your current Rank Bonus usage. The Eternal-City uses an Offense and Defense system where attacks are considered part of the Offense system and blocks/dodges are part of the Defense system. Your rank bonus in an attack or a block/dodge determines how successful you will be at attacking or defending. There are five stances: berserk, aggressive, normal, wary and defensive. These allow you to customize your fighting style.


| Stance | Attack | Defense |
| --- | --- | --- |
| Berserk | 100% | 0% |
| Aggressive | 75% | 25% |
| Normal | 50% | 50% |
| Wary | 25% | 75% |
| Defensive | 0% | 100% |


The Eternal-City uses a layer system when it comes to its Defense system. If you use the one-handed weapons, Shields and Combat Maneuvers skills you will have access to up to three layers of defense. If you use a two-handed weapon, you will only have access to two layers of defense. Your block or dodge with the highest Rank Bonus will be your first layer of defense. It will make use of its complete rank bonus. Your second highest dodge/block will only use 50% of your rank bonus in said skill. 


| Multiple Layers of Defense | Percentage Applied |
| --- | --- |
| Highest RB Dodge/Block | 100% |
| Second highest RB Dodge/Block | 50% |
| Third highest RB Dodge/Block | 33% |


The Eternal-City also allows you to change your fight level. This is something that you should -never- use unless for some reason or another you are trying to hide your skills when using a weapon or to even up the playing field when fighting someone who is lesser skilled than you are. Note: this can be used for testing mechanics effectively, as well. Do remember to fight all-out once you are done or it could be dangerous for your character.


| Fighting Options | Percentage Applied |
| --- | --- |
| Fight all-out | 100% |
| Fight seriously | 75% |
| Fight half-serious | 50% |
| Fight barely-serious | 25% |
| Fight toyingly | 10% |


| Postures | Penalty | Penalty range |
| --- | --- | --- |
| Standing | None |  |
| Sitting, Kneeling, Laying | ??? | Slightly below average speed and agility = -52 |


While the healing skillset will allow you to recover from injury faster, it also has a downside. If you are still wearing bandages or have unwanted stitches that need to be removed, you will receive combat penalties. Please note that these penalties -do- stack for each set that you have on your character. Additionally, having stitches and bandages on your hands will make your character more likely to fumble.


| Misc. Penalties | Penalty |
| --- | --- |
| Bandages | -4 defense per bandage |
| Stitches | -5 offense per stitches |
| Splint | ??? |


| Current Hit Points % | Penalty |
| --- | --- |
| 100% | None |
| 75% | -10 offense |
| 50% | -20 offense + 400% fatigue loss |
| 25% | -30 offense + 600% fatigue loss |


* Dying of thirst: -5 HP and -10% fatigue per 'tick'. Every 'tick' happens at 5 minute intervals.


| Only applies to humanoids |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Attacks |  |  |  |  | Repeat Penalty (penalty) [cumulative penalty] |
| Attacks | jab | chop | swat | slash | stab |
| Attacks | jab | jab (-40) | jab (-30) [-70] | jab (-20) [-90] | jab (-10) [-100] |
| Attacks | jab | jab (-40) | chop | jab (-10) [-50] | jab (-20)[-70] |
| Attacks | jab | chop | jab (-30) | swat | jab (-10)[-40] |
| Attacks | jab | chop | swat | jab (-20) | slash |
| Attacks | jab | chop | swat | slash | jab (-10) |


| Encumbrance level | Pounds | Penalty per Pound | Strength | Stand up RT | Fatigue Loss % |
| --- | --- | --- | --- | --- | --- |
| No load to speak of | 0-9 | None | Below Average | 1+MoS | 100% |
| Light load | 10-22 | None | Below Average | 1-2+MoS | 100% |
| Moderate load | 22.5-44 | None | Below Average | 2-5+MoS | 100% |
| Significant load | 45-66 | -1 Offense/-2 Defense | Below Average | 5-7+MoS | 100% |
| Heavy load | 67-88 | -1 Offense/-2 Defense | Below Average | 7-10+MoS | 200% |
| Very heavily encumbered | 89-106 | -1 Offense/-2 Defense | Below Average | 10-12+MoS | 200% |
| Extremely encumbered and having difficulty moving | 106.5-123 | -1 Offense/-2 Defense | Below Average | 12-14+MoS | 200% |
| Carrying about all that you can, and can barely move | 124-131.5 | -1 Offense/-2 Defense | Below Average | 14-15+MoS | 200% |
| Overloaded, and about to collapse under the weight | 132-152 | -1 Offense/-2 Defense | Below Average | 15-17+MoS | 200% |


| Stats | Effect |
| --- | --- |
| Strength | Damage boost, carrying capacity (strength/2 = moderate/significant load change) |
| Speed | Lowers Roundtime, defense bonus (speed / 4) |
| Agility | Defense bonus (agility / 2) |
| Dexterity | Offense bonus (dexterity / 2), Critical Hit Modifier |
| Perception | Offense bonus (perception / 4), Spatial Awareness (watching, scan, searching) |
| Empathy | ?? Accuracy or avoidance see source 1, Animal Training, Magical Ability |
| Willpower | Hiding, Sneaking, Damage threshold for coma?, Damage received? |
| Endurance | Hit Points (HP = Endurance), Regeneration Rate |
| Reasoning | Skill Slots, Learning Rate?? |
| Memory | Amount of lores that can be learned |
| Judgement | Bartering?, some non-combat skills? |
| Charisma | Bartering? |
| Appearance | Bartering? |


Source 1: http://forum.skotos.net/forum/our-games/the-eternal-city/the-eternal-city-mechanics/42426-the-new-change-to-defense?p=793473#post793473

 
|  |
| --- |
| \|\|~ Stat Description \|\|~ Numeric Value \|\|<br>\|\| Abysmal \|\|= 0 - 60 \|\|<br>\|\| Very Poor \|\|= 61 - 70 \|\|<br>\|\| Poor \|\|= 71 - 80 \|\|<br>\|\| Below Average \|\|= 81 - 90 \|\|<br>\|\| Slightly Below Average \|\|= 91 - 100 \|\|<br>\|\| Average \|\|= 101 - 110 \|\|<br>\|\| Slightly Above Average \|\|= 111 - 120 \|\|<br>\|\| Above Average \|\|= 121 - 130 \|\|<br>\|\| Fairly Good \|\|= 131 - 140 \|\|<br>\|\| Good \|\|= 141 - 150 \|\|<br>\|\| Very Good \|\|= 151 - 165 \|\|<br>\|\| Great \|\|= 166 - 180 \|\|<br>\|\| Exceptional \|\|= 181 - 190 \|\|<br>\|\| Outstanding \|\|= 191 - 200 \|\|<br>\|\| Remarkable \|\|= 201 - 210 \|\|<br>\|\| Extraordinary \|\|= 211 - 220 \|\|<br>\|\| Phenomenal \|\|= 221 - 230 \|\|<br>\|\| Incredible \|\|= 231 - 240 \|\|<br>\|\| Inhuman \|\|= 241 - 250 \|\|<br>\|\| Superhuman \|\|= 251 - oo \|\| |


| Aiming | Body Parts | Aiming Penalty |
| --- | --- | --- |
| High | Head, Face, Neck, Right shoulder, Left shoulder, Right arm, Left arm, Right hand, Left hand, Chest | -20 Offense |
| Mid | Waist, Right thigh, Left thigh | -20 Offense |
| Low | Right thigh, Left thigh, Right leg, Left Leg, Right foot, Left foot | -20 Offense |


| Body Part | Aiming Penalty |
| --- | --- |
| Head | -70 Offense |
| Face | -75 Offense |
| Neck | -75 Offense |
| Right shoulder, Left Shoulder | -30 Offense |
| Left arm, Right arm | -60 Offense |
| Left hand, Right Hand | -70 Offense |
| Chest | - 25 Offense |
| Waist | -25 Offense |
| Right thigh, Left thigh | -30 Offense |
| Right shin, Left Shin | -55 Offense |
| Right foot, Left foot | -65 Offense |


Notes:

(to add later)
-encumbrance + penalties
-stats + benefits
-stat-skills
-combat skillsets guides
-feints explanation + openings
-aiming + penalties
-armor + damage explanation
-armor layering
-damage levels
-wounds + penalties + recuperation
-critical hits
-fatigue (regeneration, depletion)
-attacks, blocks, dodges explanation
-stuns
-disarms
-weapon traps
-grappling
-stance changers
-position changers
-retreating
