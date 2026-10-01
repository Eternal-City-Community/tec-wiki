---
title: "Nav Overview"
---

# Nav Overview

## Getting Around
There are many ways to getting around the game world...

### Related Commands

These are useful commands for staying aware of your **character's current state** and well-being.
* walk to <marked destination>
* run
* walk
* mark [<destination>]
* wait for <ferry|ship|dock>
* drag wagon <direction> 
* drag wagon to <marked location> 
* pull wagon <direction> [<number of paces> <direction> <number of paces> ... ] 
* pull wagon to <marked location> 

See the full list of [commands](/commands/).

### Walking

#### Walk-To
Some locations within Iridine are considered to be *"common knowledge"*. From **major streets** you can use **'walk to <marked destination>'** to get to other nearby landmarks. For example, inside the city of Iridine, if you are standing on a main street then you can type **walk to bank** and your character should begin instinctively walking to the Bank.

You **cannot** use **'walk to'** to get to somewhere that's too far away. As an example, you cannot use the command to **walk to blackvine** directly from within the capital city of Iridine. You would need to first get closer to Blackvine (**walk to vetallun crossroad**) then you could walk to the **Blackvine** marked location.

<a id="Mark"></a>
##### Marked Destinations
For a full list of all known (aka marked) destinations, type in **mark**.

To add a (limited amount) of personal marked locations to use personally, use the mark? <destination> command. *(Note: Only destinations on main roads can be marked and walked to.)*

To remove a personal destination, use the same mark <destination> format with the destination name.

By default, you can add an initial 7 personal marked destinations.


### Running
- Run disbands folks following you who aren’t running
- In areas where there is round time to move, run gets through faster - and uses fatigue.
- In areas where there is no round time, run and walk are the same speed and fatigue.
- You toggle on run, and then use walk to. This is somewhat faster than if run isn’t toggled on.

The fastest way to move through round time areas is with run toggled on, and manually entering the directions. That cuts down on the pause between movements that isn’t part of runtime. Like using walk to toga from bank is slower than spamming it manually.

### Purchased Wagons
Wagons can be **pulled** or **dragged**.


* Both **pull** & **drag** allow you to move to a **marked location**. Example: drag wagon to toga & pull wagon to toga.
* How much you pull or drag doesn't seem to be impacted by how much you're carrying. So if your wagon is too heavy to drag, you can take out and wear a bunch of the sacks, drag it, then put the sacks back into the wagon and pull it.


<u>**Benefits of pull**</u>
* The pull command allows you to **move a heavier wagon** than dragging it. Though both commands do each have their own weight limits.
* The pull command allows specifying a number of paces. Example: To pull the wagon east 10 paces then north 2 paces, you can type pull wagon e 10 n 2.

<u>**Benefits of drag**</u>
* Only the drag command allows you to move up and down. Example: drag wagon u & drag wagon d respectively.

***Wagons** are also **very buggy***. When being followed and attempting to drag or pull a wagon through doors or certain outdoor areas, the **person following you is sometimes left behind**.

### Checkpoints

#### Phoenix Guards
The **[Phoenix Guards (PG)](/orgs/#PG)** are a special division of soldiers, stationed at the 2 main checkpoints ([Transinvexium](/transinvexium/) & [Vetallun Road](/vetallun-road/)) to enter the [City of Iridine](/city-of-iridine/). You cannot carry a person or drag items past PG soldiers. The Phoenix Guards may search you for [contraband](/contraband/).

Citizenship will make you get checked for contraband less frequently than those smelly foreigners. 


<a id="Fast-Wagon"></a>
### [#](#Fast-Wagon)*(Fast-Travel)* Wagons
Travel wagons exist in the game world. For paid wagons, only 1 ticket must be purchased.

#### Iridine <-> Rock Valley
**Free:** Located in front of the **Hospice**, a drover arrives and shouts out for all interested passengers to follow him. All interested in taking this wagon must follow the **drover**.

| Trip | Duration |
| --- | --- |
| Wait Time | ~2m 0s |
| Travel Time | ~7m 4s |
| **One-Way Trip** | ~9m 4s |

**Paid:** For the price of [a plain grey ticket](/shops/) you can board a wagon on-demand for a trip from Iridine to Rock Valley and vice versa. 

| Trip | Duration |
| --- | --- |
| Wait Time | ~1m 3s |
| Travel Time | ~8m 0s |
| **One-Way Trip** | ~9m 3s |

***<insert map snippet>***


#### Franlius <-> Seld


size 100%The **[Town of Franlius](/town-of-franlius/)** is currently **under attack by undead soldiers**, due to an ongoing storyline run by the Game Masters.


For the cost of [A pale blue ticket](/shops/), you can take a wagon from Seld to Franlius and vice versa. Estimated travel times are listed below.

| Trip | Duration |
| --- | --- |
| Wait Time | ~1m 3s |
| Travel Time | ~8m 0s |
| **One-Way Trip** | ~9m 3s |

***<insert map snippet>***


### Ships & Ferries
There is 1 ship and 2 ferries located within the game world to help transport you. As you wait for ferries or ships, don't forget you can often [Fish](/hunting/#cast) from most docks. If the desired ship or ferry is not at its dock, you can use the wait for <ship/ferry> command to wait for it to arrive and to have your character board automatically.

**Note:** If someone is **following** you, they will not do so if you move due to the wait for <ship/ferry> command.

***<insert map snippet>***


#### Iridine <-> Franlius (Ship)


size 100%The **[Town of Franlius](/town-of-franlius/)** is currently **under attack by undead soldiers**, due to an ongoing storyline run by the Game Masters.


| Trip | Duration |
| --- | --- |
| Wait in Iridine | 6m 05s |
| Iridine -> Franlius | 6m 30s |
| Wait in Franlius | 6m 05s |
| Franlius -> Iridine | 6m 30s |
| **Round Trip** | ~25m 10s |

If you're waiting on the Franlius, asking the sailor, *"Where's the ship?"* could have these replies which indicate the approximative wait time for it to return. ***Need to be updated with new times.***


~~~
"The ship just left a bit ago, the trip to Iridine just started." [25.5 - 31 minutes]
"Judging by when it left, the ship should be about half way back to Iridine now." [22.5 - 25.5 minutes]
"It is close to time for the ship to return to the dock in Iridine." [18.5 - 22.5 minutes]
"The ship is docked at Iridine by now, getting ready to head back here." [12.5 - 18.5 minutes]

"The ship should just now be leaving Iridine." [11 - 12 minutes]
"The ship left not too long ago, on its way here." [7 - 11 minutes]
"The ship should be about half way here by now." [4 - 7 minutes]
"The ship left a while ago. It should be almost here by now." [0 - 4 minutes]

"The ship is right there. You blind?" [0 minutes]
~~~


***<insert map snippet>***


#### Iridine <-> Signal Tower Island (Ferry)

***<insert map snippet>***


#### Vatallun <-> Seld <-> Monlon (Ferry)

| Trip | Duration |
| --- | --- |
| Wait in Vetallun | 1m 30s |
| Vetallun -> Seld | 2m 12s |
| Wait in Seld | 1m 30s |
| Seld -> Monlon | 4m 0s |
| Wait in Monlon | 1m 30s |
| Monlon -> Seld | 4m 00s |
| Wait in Seld | 1m 30s |
| Seld -> Vetallun | 2m 12s |
| **Round Trip** | ~17m 24s |

***<insert map snippet>***
