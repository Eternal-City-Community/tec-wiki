# Combat Overview

The Eternal-City offers a complex combat system. This guide will attempt to offer both basic and advanced knowledge of the mechanics surrounding the combat system as a whole.

---
## Combat Overview
Getting involved in combat is as easy as walking up to a rat and trying to pet it. Determining if you hit or dodge your opponent involves many different factors, all of which are explained below. 

Of course, there's a bit more to it than that. If you're **new to combat** in The Eternal City, you may want to start with **[Combat Guide](/newbie-combat-guide/)**. 

If you're ready to risk it all and **looking for something to kill**, you can consult the list of **[hunting grounds](/hunting-grounds/)**.

Having **problems with another character in-game**? Look over details regarding **[Player vs Player Conflict](/pvp/)**.


### Related Commands
* pos?ture
* berserk | aggressive | normal | wary | defensive
* fight
* skills
* skills ? <skill name>
* ssk
* practice
* defenses


### Rank Bonus
The Eternal-City uses a **Rank Bonus (RB)** system. Every single rank that you learn in a skill will increase that skills effectiveness. The early ranks will offer you more rank bonus whereas the higher you are in a rank, the less it will give you. It is a diminishing return system. Difficulty of a maneuver does not effect this base rank bonus, but the level of 'basics knowledge' you have of a skill set will add additional RB.

Your Rank Bonus is always visible when using the 'skills' command.
***<Example Image>***

To determine your Rank Bonus, you can use the [Rank Bonus Calculator](/rank-bonus-calculator/)

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


#### Basics & Sub-Skills
You rank bonus in a move can be calculated as such.

```
RB = ([RB in Basics] * [sub-skill difficulty modifier]) + [RB in sub-skill]
```


Your RB in a skill is determined by the Rank Bonus from your Basics skill + your Rank Bonus in the actual sub-skill itself. For example, if you know One-Handed Swords, your ranks in the basics One-Handed Swords skillset will offer a bonus to your One-Handed Swords Jab sub-skill. The rank bonus offered to your sub-skill is dependent upon the difficulty of the sub-skill itself. Sub-skills are: Easy, Average, Difficult and Impossible. Harder maneuvers will not only cost more Skill Points, but they will also receive a much lower bonus from your Basics skill.

| Subskill Difficulty | Rank Bonus Added |
| --- | --- |
| Easy | 75% |
| Average | 50% |
| Difficult | 25% |
| Impossible | 10% |

***<Example Image>***
***<Example Text. Sword Jab.>***


[Back to Top](#Top)

<a id="Posture"></a>
#### Combat Posture
Unlike with non-combat skillsets, combat skillsets are impacted by your **Combat Posture** aka **"Stance"**. If you're in a more **Defensive** stance, you're more focused on using the full potential of your defences, therefore less focus on your attacks. Alternatively,  if you're in a more **Berserk** stance, you're more focused on using the full potential of your attacks, therefore less focus on your defences.

There are five stances that allow you to balance your fighting style.
| Stance | Attack | Defense |
| --- | --- | --- |
| Berserk | 100% | 0% |
| Aggressive | 75% | 25% |
| Normal | 50% | 50% |
| Wary | 25% | 75% |
| Defensive | 0% | 100% |


[Back to Top](#Top)

#### 'Fighting'

| Fighting Options | Percentage Applied |
| --- | --- |
| Fight all-out | 100% |
| Fight seriously | 75% |
| Fight half-serious | 50% |
| Fight barely-serious | 25% |
| Fight toyingly | 10% |


[Back to Top](#Top)

### Attacking

#### Rotations
Only applies to humanoids.
| Attacks |  |  |  |  | Repeat Penalty (penalty) [cumulative penalty] |
| --- | --- | --- | --- | --- | --- |
| Attacks | jab | chop | swat | slash | stab |
| Attacks | jab | jab (-40) | jab (-30) [-70] | jab (-20) [-90] | jab (-10) [-100] |
| Attacks | jab | jab (-40) | chop | jab (-10) [-50] | jab (-20)[-70] |
| Attacks | jab | chop | jab (-30) | swat | jab (-10)[-40] |
| Attacks | jab | chop | swat | jab (-20) | slash |
| Attacks | jab | chop | swat | slash | jab (-10) |


[Back to Top](#Top)

#### Targeting/Aiming
Depending on the attack, it may allow you to aim. Some attacks are restricted to certain areas (e.g. can't kick a face or chop a foot). Some restrict you in precision (can only aim high/mid/low, not for a hand or neck or foot). Attempting to aim an attack will add a **penalty to your success/offense** (make it X points harder).

When aiming High, Mid or Low, there is a smaller penalty, but a random chance to hit a body part in that area.
| Aiming | Body Parts | Aiming Penalty |
| --- | --- | --- |
| High | Head, Face, Neck, Right shoulder, Left shoulder, Right arm, Left arm, Right hand, Left hand, Chest | -20 |
| Mid | Waist, Right thigh, Left thigh | -20 |
| Low | Right thigh, Left thigh, Right leg, Left Leg, Right foot, Left foot | -20 |

When aiming at specific body parts, the penalty is greater, but if you connect you will hit the targeted location.
| Aiming | Aiming Penalty |
| --- | --- |
| Head | -70 |
| Face | -75 |
| Neck | -75 |
| Right shoulder, Left Shoulder | -30 |
| Left arm, Right arm | -60 |
| Left hand, Right Hand | -70 |
| Chest | -25 |
| Waist | -25 |
| Right thigh, Left thigh | -30 |
| Right shin, Left Shin | -55 |
| Right foot, Left foot | -65 |


[Back to Top](#Top)

#### Critical Hits
Critical hits can change any number of things, from severely wounding a limb to the point of disabling it, causing bleeders, changing your combat posture, changing your prone position. For a more extensive list of examples, see [Critical Hits](/critical-hits/).


[Back to Top](#Top)

### Defending
Given that your character may know many defensive maneuvers (e.g. blocks, dodges, etc.), there is a layering system when it comes to defences. All skills can (and should) be used in combination with [Combat Maneuvers](/combat-maneuvers/). If you use a one-handed weapon, you can (And typically should) also take advantage of using [Shields](/shields/). 

If wielding a weapon, using a [Shield](/shields/) and able to perform [Combat Maneuvers](/combat-maneuvers/), you will have access to three layers of defence. If you use a two-handed weapon and [Combat Maneuvers](/combat-maneuvers/), you will only have access to two layers of defence. 

Your defensive maneuver (block/dodge) with the highest RB is your **1st** layer of defence and all of its rank bonus will be counted. Your next highest RB defensive maneuver is your **2nd** layer of defence and 1/2 of its RB will be counted. If you have another defensive maneuver, it is your **3rd** layer and 1/3 of its RB will be counted.

| Multiple Layers of Defense | Percentage Applied |
| --- | --- |
| Highest RB Dodge/Block | 100% |
| Second highest RB Dodge/Block | 1/2 |
| Third highest RB Dodge/Block | 1/3 |

[Back to Top](#Top)

#### Defensive Holes

### Penalties

#### Posture
| Postures | Penalty | Penalty range |
| --- | --- | --- |
| Standing | None |  |
| Sitting, Kneeling, Laying | ??? | Slightly below average speed and agility = -52 |

#### Healing Tools

Healing tools are great for speeding up the recovery of injuries, but they can lower your defensive capabilities. **Each bandage** you wear and every ***itchy* stitch** will lower your defence and make you easier to hit.

Itchy stitches will show as irritated, *"The aging stitches in your left thigh itch and irritate, interrupting your concentration."*


| Misc. Penalties | Penalty |
| --- | --- |
| Bandages | -4 defense per bandage |
| Stitches | -5 offense per *itchy* stitch |
| Splints |  |


| Current Hit Points % | Penalty |
| --- | --- |
| 100% | None |
| 75% | -10 offense |
| 50% | -20 offense + 400% fatigue loss |
| 25% | -30 offense + 600% fatigue loss |


[Back to Top](#Top)

#### Character Condition
The state of your character also plays an impact on combat. The more wounded or even hungry you are can play a part in this.
If your character is **extremely [hungry](/character-condition/#Nourishment) or [thirsty](/character-condition/#Nourishment)**, you may see your fatigue drain faster or your HP diminish.
If your character is **severely [wounded](/character-condition/#Wounds)**, you may wince as you attempt to perform actions.
If your character is **heavily [encumbered](/character-condition/#Load)**, you will have a penalty to your offence and defensive skills.
If the **[lighting level](/character-condition/#Lighting) is too dark**, you will have a penalty to your offence and defensive skills.


[Back to Top](#Top)

### Stats
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

Source 1: --http://forum.skotos.net/forum/our-games/the-eternal-city/the-eternal-city-mechanics/42426-the-new-change-to-defense?p=793473#post793473--

#### Stat Skills
Dex
Perception
Speed
Agility

[Back to Top](#Top)

### Armor
To view a more extensive list of [Armor](/armor/).
Armor reduces [wounds](/character-condition/) which can be inflicted by attacks. Each combat skill set and sub skill has a different level of damage. Each piece of armor also has a level of absorbency. If you have enough armor, you can completely absorb a successful attack.

| Armor Grade |
| --- |
| Excellent |
| Very Good |
| Good |
| Fairly Good |
| Little Protection |
| No Protection |

[Back to Top](#Top)

#### Armor Layering
Amor can be layered, something something.

### Strategy

#### Stuns
Stunning removes all defences.

#### Feints
Feints are targeted in 3 different areas: high, mid or low. Succeeding in a feint will remove all defences from that area.

#### Hooks / Traps / Disarms

#### Retreat vs. Fallback
Everyone can use Retreat. Not a 'skill'. No roll. Can be interrupted. Leaves openings
Fallback is a [Combat Maneuvers](/combat-maneuvers/) skill, requiring lessons. No openings. More difficult to do with worst [lighting](/character-condition/). 

Use fallback when you can, but there are certain instances where retreat would be best.

#### Specialty Skills
[# Mobile-skirmisher]

#### Mobile Skirmisher

| Weight | Defensive Bonus |
| --- | --- |
| 0 | 20 |
| 0.1–5 | 19 |
| 5.1–10 | 18 |
| 10.1–15 | 17 |
| 15.1–20 | 16 |
| 20.1–25 | 15 |
| 25.1–30 | 14 |
| 30.1–35 | 13 |
| 35.1–40 | 12 |
| 40.1–45 | 11 |
| 45.1–50 | 10 |
| 50.1–55 | 9 |
| 55.1–60 | 8 |
| 60.1–65 | 7 |
| 65.1–70 | 6 |
| 70.1–75 | 5 |
| 75.1–80 | 4 |
| 80.1–85 | 3 |
| 85.1–90 | 2 |
| 90.1–95 | 1 |
| 95.1–100 | 0 |

##### Archery
Rotations do not apply.
Foot shots
Missile Defense

##### Brawling / Pankration
Grappling
'Free me'

[Back to Top](#Top)
