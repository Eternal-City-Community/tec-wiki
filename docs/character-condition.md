---
title: "Character Condition"
category: "Reference"
---

# Character Condition

![](/assets/wikidot/files/Condition%20Graphic.png)


In *The Eternal City*, your character is more than just a digital avatar — they are a living, breathing individual with real needs, vulnerabilities, and limitations. Survival in this world demands more than combat prowess or clever dialogue; it requires attention to the basic necessities of life. Your character must remain **healthy**, **nourished**, **hydrated**, and **well-rested** to function effectively. Neglecting these needs can lead to fatigue, illness, or even slipping into a coma, affecting everything from movement speed to combat performance.

Beyond physical well-being, your character is also bound by the laws of physics and physiology. They can only **carry a limited amount of weight**, determined by their strength, stamina, and any gear or magical enhancements they possess. Overburdening yourself can slow you down, make you more vulnerable in battle, or prevent you from fleeing danger. Managing your inventory wisely — choosing what to carry, what to store, and what to leave behind — becomes a strategic decision that can shape your journey through the city’s perilous streets and shadowy corners.


### Related Commands

These are useful commands for staying aware of your **character's current state** and well-being.
* cond?ition - Provides a status of your stance, posture, wounds, hunger, thirst, fatigue, sanity, and weight limit.
* @hps - Toggles showing when you lose HP
* stat?s - Shows all of your character's information and attributes
* ss?tats - A shorter version of stats that shows HP, Fatigue, Weight limit, stance, but not attributes
* weal?th - Show how much coin (and Nehal Tokens) you have on hand. 
* pos?ture - Shows just what combat stance you're in.
* @coma-time - Show you how long in RL hours your coma will last. 


See the full list of [commands](/commands/).

<a id="HP"></a>
### Health Points
Health Points (HP) measure how much damage your character can sustain before becoming incapacitated. The amount of HP you have is determined by your [Endurance](/stats/#endurance) stat.

Each inflicted wound can cause damage to your HP, and if your HP falls below 0, your character will fall unconscious. Some traits, like [Iron Will](/traits/#IronWill), can modify this threshold.

<a id="Coma"></a>
#### Coma
If your character's HP falls below zero, they will fall unconscious. If the damage is severe enough, they may fall into a coma. The threshold for falling into a coma is typically the negative value of your maximum health points, meaning that if you have a maximum of 100 HP, you would fall unconscious at -1/100 HP and fall into a coma at -100/100 HP.  The threshold for falling into a coma can be changed with certain traits, such as [Vitality](/traits/#Vitality). 

There is also a **[PvP#coma](/pvp/#coma) means to bypass the threshold** and immediately enter an unconscious person into a coma using the **kill** command on them.

Once in a coma, you must be admitted to one of the various coma wards throughout the game world, either by another character bringing you or by using a luck! point. Treatment in the coma ward takes several days, and you can use @coma-time to check your remaining recovery time.

Once you've recovered from a coma, you will suffer from coma sickness, which temporarily reduces your [stats](/stats/). The amount of time spent in a coma affects the length of time your character will have coma sickness, typically around the same length of time as the coma itself.

For more information on Comas and Coma Sickness, consult the ?coma help file in-game.

<a id="Nourishment"></a>
### Nourishment
In order to maintain good health, your character must eat and drink water regularly. Your need for nourishment increases as you spend more time in the city, and hunger can cause your stomach to rumble audibly.

To check your level of fullness, use the condition or satiation commands in-game.

<a id="Hunger"></a> <a id="Satiation"></a>
#### Hunger
Different types of food will fill you up to varying degrees. As you become hungrier, you will receive notifications of hunger or a rumbling stomach, some of which can be heard by others.

| Levels of Satiation |
| --- |
| Gorged |
| Stuffed |
| Well-fed |
| Full |
| Somewhat peckish |
| Peckish |
| Hungry |
| Famished |
| Starving to death (causing -5 HP and -5% fatigue per tick) |

<a id="Thirst"></a>
#### Thirst
Drinking water is essential for staying healthy. To check your level of thirst, use the condition command in-game.

Consuming large amounts of alcohol can make your character drunk to the point of slurring their speech and stumbling around. When your character is drunk, you may notice temporary changes to their [statistics](/stats/).

| Levels of Thirst |
| --- |
| Extremely hydrated |
| Well-hydrated |
| Hydrated |
| Parched |
| Thirsty |
| Very thirsty |
| Extremely thirsty |
| Dying of thirst (causing -5 HP and -5% fatigue per tick) |

Remember to keep your character fed and hydrated to avoid negative consequences!


<a id="Load"></a>
### Encumbrance

Encumbrance, or the weight your character is carrying, affects both their fatigue drain and combat performance. The maximum amount of weight your character can carry depends on their [strength](/stats/).

| Encumbrance level | Stand up RT | Fatigue Loss % | Combat RB Penalty |
| --- | --- | --- | --- |
| No load to speak of | 1+MoS | Normal | None |
| Light load | 1-2+MoS | Normal | None |
| Moderate load | 2-5+MoS | Normal | None |
| Significant load | 5-7+MoS | Normal | -1 Offense & -2 Defense (per lbs past Moderate) |
| Heavy load | 7-10+MoS | Doubled | -1 Offense & -2 Defense (per lbs past Moderate) |
| Very heavily encumbered | 10-12+MoS | Doubled | -1 Offense & -2 Defense (per lbs past Moderate) |
| Extremely encumbered and having difficulty moving | 12-14+MoS | Doubled | -1 Offense & -2 Defense (per lbs past Moderate) |
| Carrying about all that you can, and can barely move | 14-15+MoS | Doubled | -1 Offense & -2 Defense (per lbs past Moderate) |
| Overloaded, and about to collapse under the weight | 15-17+MoS | Doubled | -1 Offense & -2 Defense (per lbs past Moderate) |

For more information on combat RB penalty, see [Combat Overview](/combat-overview/).

<a id="Wounds"></a>
### Wounds

Wounds inflicted on your character can be classified as cutting, piercing, bruising, or burning*. Each type of wound has different levels of severity, from minor to potentially disabling. Wounds can stack up, and taking enough damage to a limb or body part can affect your character's movement and combat abilities.

*Burning* wounds are caused by sources other than traditional weapons, such as certain creatures in the game or accidental contact with fire.*

##### Wound Severity Descriptions

| Wound Degree | Cutting | Piercing | Bruising | Burning* |
| --- | --- | --- | --- | --- |
| Level 1 | Shallow cut | Faint wound | Small bruise | Minor burn |
| Level 2 | Cut | Puncture | Bruise | Burn |
| Level 3 | Deep cut | Deep puncture | Ugly bruise | Moderate burn |
| Level 4 | Severe cut | Severe puncture | Major bruise | Severe burn |
| Level 5 | Devastating cut | Gaping wound | Fracture | ??? |


<a id="Bleeding"></a>
#### Bleeding

During combat, your character may sustain bleeding wounds (or bleeders) if they are hit with a critical hit, particularly from cutting or piercing attacks. Some skills, such as CKF Face Slash, can also cause bleeding wounds upon a successful attack.

The severity of bleeding wounds varies and can range from slowly oozing blood to severe bleeding. If left untreated, more severe bleeders may lead to unconsciousness or worse, so it's important to seek immediate medical attention via healing.

| Type | Description | HP Loss* |
| --- | --- | --- |
| Slowly Oozes | Blood slowly oozes from your right arm. | 1.5 - 5 HP |
| Trickles | Blood trickles from your left arm. | 6.5 - 10 HP |
| Bleeds Freely | Your neck bleeds freely. | 15 - 18 HP |
| Gushes | Blood gushes from your left thigh. You are bleeding badly! | 20 - 30 HP |
| Spurts | Blood spurts from your neck. You are severely bleeding! | 35 HP |

**The amount of HP lost is listed "per bleed". The frequency a bleeding wound might bleed could be as little as once a minute or as often as once every few seconds. The severity of HP loss can be impacted by the selection certain traits, such as [Bleeder](/traits/#bleed) & [Aversion to Pain](/traits/#AtP).*

<a id="Fatigue"></a>
### Fatigue

Fatigue represents how tired your character is and ranges from 100% (fully rested) to -50% (exhausted to the point of collapse). Every action you take requires fatigue, but some actions have a more noticeable impact than others. Your exact level of fatigue can be viewed using the stats and sstats commands, while the condition command provides a general "level of fatigue."

You regain 1% fatigue per "tick" (i.e., every 5 minutes) but this can be increased or decreased. Higher Endurance stats and certain traits, such as Athletic, allow you to perform more actions before becoming fatigued.

| Levels of Fatigue |
| --- |
| You feel well-rested. |
| You feel somewhat fatigued. |
| You are completely exhausted. |
| You are about to collapse from exhaustion. |

Some factors that increase fatigue gain include being in a prone position, resting in certain areas such as a bath or rented inn room, and using certain herbalism potions. On the other hand, factors that decrease fatigue gain or increase fatigue usage include being overly wounded, being overly encumbered, being stuck with arrows, and having an uncomfortably high body temperature.

After reaching a completely exhausted level of fatigue, your character's success rate for many actions will significantly decrease. Being about to collapse from exhaustion makes it difficult to perform any actions at all.

Important Note: Fatigue is one of the only things that can increase while your character is asleep. If you rest in a rented inn room or a flop house, you can regain fatigue, though at a slower rate, even while asleep.

<a id="Sanity"></a>
### Sanity

Sanity levels are impacted by various actions, such as praying to shrines or performing magic. You can check your sanity level by typing the condition command, which will only display if your sanity is not at normal levels.

<a id="Recovery"></a>
### Recuperation
Your character naturally recovers from fatigue and restores HP over time. Certain actions and locations can help increase recovery rates.

Laying down increases the rate at which you recover from fatigue.

Certain locations like warm and cold baths, as well as inn rooms and flophouses, can increase your fatigue recovery rate. In fact, you can even recover your character's fatigue while sleeping in an inn room or flophouse.

<a id="Position"></a>
### Position
Your character can be in a variety of positions, such as sitting or laying down. Being in any position other than standing is known as being prone.

When you are prone, you will suffer a penalty to your stats, with the exception of the Wrestler trait.

Certain skills require you to be in a particular position. For example, most dodges and blocks can only be performed while standing. Rolling dodge can only be performed while laying down, and certain blocks such as Vulture Block and Ducking Cross Block can only be triggered while kneeling.

To receive healing, you must be in a prone position for a healer to tend to you.

| Position | Defensive Penalty |
| --- | --- |
| Standing | No penalty |
| Squatting | Penalty |
| Kneeling | Penalty |
| Sitting | Penalty |
| Laying | Penalty |

<a id="Lighting"></a>
### Lighting

The level of lighting in an area can affect your ability to see and may even result in penalties when trying to perform certain actions that require visibility.

| Lighting Level | Description |
| --- | --- |
| Very brightly lit | The area is well-lit and visibility is not an issue. |
| Somewhat dark | Although not particularly difficult to see, the area is somewhat dark. |
| A bit difficult to see | The area is somewhat dark, making it a bit difficult to see. |
| Difficult to see | The area is very dark, making it difficult to see. |
| Almost impossible to see | The area is pitch black, making it almost impossible to see. |


<a id="Temperature"></a>
### Body Temperature
Body temperatures do...

| Lighting Level |
| --- |
| Hot |
| Comfortable |


### Character appearance

Hairstyles ([Barbershops](/hair-styles-barbershop/)), 
Custom Descriptions ([Customization Gudie](/customization-guide/))

### Misc
Wealth (Denar & Tokens)
