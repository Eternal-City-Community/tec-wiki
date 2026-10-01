---
title: "Skills"
---

# Skills

The world of Midlight offers an abundance of opportunities for all types of characters. Whether you fancy yourself a soldier, tailor, mercenary, pickpocket or constable, there is a skill set that will suit your needs. Skills in The Eternal City are divided into specialized groups of knowledge called Skill Sets. These range from One-Handed Swords and Pickpocketing to Healing actions such as Basic Stitching or Clean Wound. Every Skill Set consists of a series of discrete Actions that characters learn and master to become proficient in a specific field. The Skill Set chosen during character creation is called the Primary Skill and is the set in which the character will advance most quickly. Progress in a skill or action is measured in ranks, with each rank contributing to the overall chance of success when attempting an action.

### Related Commands

These are useful commands for **learning & teaching skills**.
* skills [?] [*<skillset name>*] 
* ssk?ills [costs]
* @cycle?-info
* learn [lore] [*<skill>*] from <trainer> [with <skill>|general] [# <1-50>]
* teach [lore] [*<skill>*] [to <max rank>]
* lore
* @sp-c?ount
* @sp-to-gsp *<skill> <number-of-gsp>*

See **syntax** and all **[commands](/commands/)**.

### Skills Overview
A Skill Set in The Eternal City is a collection of specialized knowledge that a character can acquire and perfect. Topics such as Pickpocketing, One-handed Swords, or Tailoring are just a few examples of the diverse skill sets available in Midlight. Each skill set is composed of a series of discrete Actions, or pieces of knowledge that a character will acquire. These actions encompass various aspects of gameplay, from individual combat maneuvers like the Lunge or Cross Block, to non-combat actions such as Basic Stitching or Clean Wound. Actions are the practical applications of a character's knowledge, while skill sets represent the broader categories of knowledge that encompass them.

During character creation, players select their Primary Skill, which is the skill set in which their character will excel most quickly and effectively based on their attributes.

Character progress within a skill or action is measured in ranks. Each rank a character earns in a skill or action contributes incrementally to their overall chance of success when attempting the related action.

<a id="SP"></a>
### [#](#SP)Skill Points (SP)
Every successful action you perform grants you Skill Points (SP) in the related skill or action. For example, successfully executing a Sword Lunge earns you SP in the One-Handed Swords skill. The Eternal City now operates on a training cycle system where a pool of skill points is available to earn each real-life week (in-game month). The number of skill points you've used from the pool, repeated actions, hunting grounds, and stats all influence the number of points you gain per action. To optimize your gains, it's recommended to rotate through at least five actions and hunting grounds if it's a combat skill set. Any unused skill points in a cycle roll over to the next cycle, with a bonus to help utilize them.

You can spend Skill Points to purchase ranks in the related skill or action. The cost of a rank in an action or skill varies based on factors such as its difficulty, how similar it is to your character's Primary Skill, and whether it's the initial rank. The first rank of a skill or action always costs more than subsequent ranks, reflecting the investment required to learn something new.

<a id="EarningSP"></a>
#### [#](#EarningSP)Earning SP
Skill points are earned by successfully performing known skill actions or by cracking tears. As you earn more skill points throughout the week, your SP earn rate will steadily reduce. The SP earn rate is determined by a formula that takes into account the total SP earned, with higher totals resulting in lower rates. Additionally, a bonus is applied based on the total SP earned, with higher totals resulting in lower bonuses. There is also an SP threshold based on the total SP earned, with higher totals resulting in higher thresholds. The exact formula is as follows:

New skill point gains are as follows:

0-750 = 0.025
751-850 = 0.020
851-900 = 0.015

900 = 0.001

There is also a bonus for total skill points earned:

0-4999 = base + 0.100
5000-9999 = base + 0.075
10000-19999 = base + 0.050
20000-50000 = base + 0.025

50000 = base + 0.000

Finally, there is an SP threshold based on total skill points earned:

0-4999 = base * 2.00
5000-9999 = base * 1.80
10000-15999 = base * 1.55
16000-24999 = base * 1.25
25000-99999 = base * 1.10

99999 = base * 1.00

The base threshold SP is 500.

<a id="rollover"></a>
##### [#](#rollover) Rollover SP
Based on the formulas mentioned above, you can determine the amount of SP you are allowed to earn each week *before* beginning to use your rollover SP. Keeping your rollover SP maxed at 900 can be beneficial if you want to maximize the amount of SP earned each week in a limited amount of time. You will have a bonus to gaining SP faster as long as you have rollover banked. 

Type @cycle to see your weekly "Rollover SP" for the current training cycle. This is a snapshot from the beginning of the week. It will not show any rollover you have consumed this week - you need to keep track of that yourself.

The amount of SP you can earn without draining your rollover depends on your character's total lifetime sp earned. This will be listed as "Total SP gained" if you type @sp-count.

| Total SP gained | SP you can earn each week *before* rollover starts to be consumed |
| --- | --- |
| 0 - 4999 | 1000 SP |
| 5000 - 9999 | 900 SP |
| 10000 - 15999 | 775 SP |
| 16000 - 24999 | 625 SP |
| 25000 - 99999 | 550 SP |
| 100000+ | 500 SP |

Rollover SP will recover each week if you do not meet the cap indicated in the table above.

If you earn more SP than indicated, and begin using your rollover, that is fine - just keep in mind it will slow your SP gain rate for the current and subsequent weeks until rollover recovers.


<a id="glean"></a>
##### [#](#glean) Gleaning
One way to earn SP is through gleaning. If someone near you is performing a skill set that you know, and they are much more skilled than you, there is a chance you will gain SP just by observing them. This can apply to all types of skills, including combat, non-combat, and language skills. However, automatic skills such as dodging do not apply, and only skills with explicit actions can be gleaned.

<a id="dummy"></a>
##### [#](#dummy) Practice Dummy
Practice dummies exist throughout the gameworld in various dojos.

Characters **under** a certain threshold (**250 combat ranks and 1,000 skill points gained** total) can **use practice dummies and archery targets** to gain SP whenever the target is struck, at the same rate as hitting a normal opponent.

<a id="GSP"></a>
#### [#](#GSP) General Skill Points (GSP)
General Skill Points, or GSP, are skill points that can be used to train in any skill set.

There are several ways to obtain GSPs:

You can convert SP from a specific skill to GSP using the @sp-to-gsp command (available to paid account subscriptions only).
Certain account perks award GSP.
You can convert Role Points (RPs) to GSP using the @buy-gsp command (available to paid account subscriptions only).
Cracking Rock Valley tears has a chance to award GSP, depending on the tear type.

You can also convert GSP to a specific skillset using the @gsp command. For example, if you have 7 knives SP and 7 GSP, but you want to learn a knives skill that costs 9 SP, you can use @gsp to convert 2 of your GSP to knives SP, giving you 9 total knives SP to use for training.


<a id="Learning"></a>
#### [#](#Learning) Learning Skills
Learning new skills or additional ranks in a skill requires you to **spend skill points**. You can learn from both Player Characters (PCs) or Non-Player Characters (NPCs). Learning from either will require the same amount of skill points, but NPCs typically have a standard cost associated to learning which can be calculated using the [training cost calculator](/training-cost-calculator/).

When you learn an initial non-combat skill set with [GSP](#GSP), you will receive a few subskills to start with. However, if you unlearned a skill set and have saved SP that you use to relearn it, you will not receive any subskills. On the other hand, when you learn a weapon or defense skill with GSP or banked SP, you will not receive any subskills, but you will have access to the "Attack" (ATT) command.

<a id="SelfTraining"></a>
##### [#](#SelfTraining)Self-Training
If no teacher is available for the ran you want to progress to, you will need to self-train ranks to advance further. There is currently a restriction that **all ranks above 1,150 must be self-trained**. No teachers, including other players, can teach above rank 1,150.

* Self-Training requires that you know at least 1 existing rank in the desired skill.
* Self-Training requires more SP to increase a skill's rank compared to learning from a teacher. The higher the rank, the more SP required *(see below table)*. 
* The **[Self-Taught](/traits/#SelfTaught) trait** can help reduce the cost per rank of self-training.

| Rank Range | Self-Training | Self-Training w/ Self-Taught |
| --- | --- | --- |
| 1 - 2,001 | 200% SP | 150% SP |
| 2,002 - 3,001 | 400% SP | 350% SP |
| 3,002 - 4,001 | 600% SP | 550% SP |
| 4,002 - 5,001 | 800% SP | 750% SP |
| 5,002 - 7,001 | 1,000% SP | 950% SP |
| +7,002 | 1,200% SP | 1,150% SP |


Example: Assuming an **Easy** skill in **1<sup>st</sup> slot** that normally requires **5 SP** to learn from a teacher (if possible).

| Scenario | Calculation | SP Cost |
| --- | --- | --- |
| Self-training rank 1 to 2 (no self-taught) | 5 SP x 200% | 10 SP |
| Self-training rank 1 to 2 (with self-taught) | 5 SP x 150% | 7.5 SP |
| Self-training rank 2,500 to 2,501 (no self-taught) | 5 SP x 400% | 20 SP |
| Self-training rank 2,500 to 2,501 (with self-taught) | 5 SP x 350% | 17.5 SP |
| Self-training rank 4,500 to 4,501 (no self-taught) | 5 SP x 800% | 40 SP |
| Self-training rank 4,500 to 4,501 (with self-taught) | 5 SP x 750% | 37.5 SP |


<a id="skill-actions"></a>
### Skill Actions

Learning new skills and actions in The Eternal City requires finding someone who knows them and can teach them. Training facilities can be found throughout Iridine, and anyone with a rank of 10 or higher in a skill or action can teach it. It is also possible to self-train, but this method costs double the usual amount of skill points per rank, unless the character has the self-taught trait, which reduces the cost to one and a half times the usual amount.

Performing most skills, with the exception of automatic actions such as dodging, requires a certain amount of time known as the round-time (RT) to complete.

### Skill Slots

Each character starts with a certain number of skill slots (between 2 and 4) determined by their ability to reason. Most characters begin with only one skill and can increase their knowledge until they have filled all their skill slots. After this point, they must pay an additional 250 RPs for each extra skill slot. This cost applies only to the ability to purchase skills, not to the skills themselves. The cost to learn the first rank of a skill increases by 3 skill points per skill, and the cost to rank up in each skill increases by one point. There is no limit to the number of skills a character can have, but it becomes increasingly impractical to continue adding skills.

<a id="RB"></a>
### [#](#RB) Rank Bonus (RB)

**Rank Bonus (RB)** is a bonus applied to a character's skills based on their rank in a particular skill set. The higher the rank, the greater the bonus. The **[Rank Bonus Calculator](/rank-bonus-calculator/)** can be used to determine a character's current RB.

Your rank bonus may be **impacted** from the **effects of [sanity](/magic/#sanity)**.

### Skills

Characters can learn new ranks in a skill set using either the skill set's SP or GSP. The rank of the skill set itself is known as the "basics" or "fundamentals," while the skills within that skill set are known as sub-skills.

Notes on Learning

A character's rank in a sub-skill cannot be higher than their rank in the skill set's basics.
Increasing a character's rank in the basics of a skill set increases the Rank Bonus for all sub-skills.
Increasing a character's rank in a sub-skill affects only that specific skill.
In combat skill sets, higher-ranked sub-skills tend to have better Critical Hits.
To learn a skill from another character, use the learn command.
To learn a specific piece of lore, use the learn lore command.

#### Basics
Basics refer to the fundamental knowledge of a skill set. In order to learn sub-skills within a skill set, a character must first achieve a certain rank in the skill set's basics.

#### Sub-Skills
Sub-skills are the individual actions or pieces of knowledge within a skill set. A character's rank in a sub-skill cannot exceed their rank in the skill set's basics.

#### Lores
Lore refers to the background information and knowledge associated with a skill set. It is possible to learn a skill set's lores without having any practical knowledge of the associated skill set.

<a id="Combat"></a>
### [#](#Combat)Combat Skill Sets
Combat skills can be used to fight opponents in the game world.

#### Offensive Skill Sets

* [Archery](/missile-weapons-bows/)
* [Brawling](/brawling/) - Unarmed combat skill set that focuses on punches and kicks.
* [Cestus](/cestus/) - Unarmed gladiatorial combat skill set that uses metal gauntlets.
* [Chainblade](/chainblade/) - Skill set that uses a chain with a blade attached.
* [Knives](/knives/) Fighting Styles: [Cineran Knife Fighting (CKF)](/cineran-knife-fighting-knives/) - Skill set that focuses on the use of knives in combat, including the Cineran Knife Fighting style.
* [Falcata](/falcata/) - Skill set that uses a short, curved sword called a falcata.
* [Falx](/falx/) - Skill set that uses a curved, two-handed polearm called a falx.
* [Hoplite Combat](/hoplite-combat/) - 
* [One-handed Axes](/one-handed-axes/)  - Skill set that focuses on the use of one-handed axes in combat.
* [One-handed Crushing](/one-handed-crushing/) - Skill set that focuses on the use of one-handed blunt weapons in combat.
* [Two-handed Crushing](/two-handed-crushing/) - Use warhammers to smash things.
* [One-handed Swords](/one-handed-swords/) Fighting Styles: [Avros](/avros-one-handed-swords/), [Nelsor](/nelsor-one-handed-swords/) & [Pardelian](/pardelian-one-handed-swords/). - Skill sets that focuses on the use of one-handed swords in combat, including the Avros, Nelsor, and Pardelian fighting styles.
* [Pankration](/pankration/) - Unarmed combat skill set that combines wrestling and striking techniques.
* [Slings](/sling/) - Skill set that focuses on the use of slings for ranged attacks.
* [Spears](/spears/) - Skill set that focuses on the use of spears in combat.
* [Staves](/staves/) - Skill set that focuses on the use of quarterstaffs, fang staves, double maces and bladed staves in combat.
* [Tridents](/tridents/) - Skill set that uses a three-pronged spear-like weapon called a trident.
* [Two-handed Axes](/two-handed-axes/) - Skill set that focuses on the use of two-handed axes and pickaxes in combat.
* [Whips](/whips/) - Skill set that uses whips as a weapon in combat.

#### Defensive Skill Sets

* [Combat Maneuvers](/combat-maneuvers/) - Defensive manuevers such as dodges and reflexes
* [Shields](/shields/) - Defensive manuevers and shield bashes


<a id="NonCom"></a>
### [#](#NonCom)Non-Combat Skill Sets
Non-combat skills cannot directly inflict damage on another character, but they can be used as stand-alone skills or in support of combat skills.

#### Service Skill Sets

* [Healing](/healing/) - Skill set that teaches the use of herbs and medical techniques to heal wounds
* [Locksmithing](/locksmithing/) - Skill set that focuses on the art of forging locksmithing tools and working on locks


#### Survival & Crafting Skill Sets

* [Herbalism](/herbalism/) - Skill set that teaches the identification and use of medicinal herbs to brew potions and salves.
* [Hunting](/hunting/) - Skill set that teaches the art of hunting animals for food and resources and some weapon crafting
* [Outdoor Survival](/outdoor-survival/) - Skill set that teaches the skills needed to survive in the wilderness
* [Tailoring](/tailoring/) - Skill set that teaches the art of creating clothing and other textiles


#### Subtlety Skill Sets

* [Pickpocketing](/pickpocketing/) - Skill set that focuses on the art of stealing items from others
* [Setups](/setups/)
* [Street Smarts](/street-smarts/)
