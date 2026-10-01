# Leather Working Guide

* Leatherworking

Leatherworking is a non-combat crafting skillset concerned with cutting, shaping, joining, and decorating prepared hides. A skilled leatherworker can turn leather and rawhide into armor, clothing, containers, weapon fittings, belts, footwear, and other useful goods.

Unlike crafts built around a single repeated action, most leatherworking projects are assembled from a number of separately prepared components. A finished item may require the leatherworker to measure and lay out material, cut it, thin or shape its edges, punch holes, mold pieces, and finally lace, rivet, or sew the components together.

Leatherworking is closely related to [[tanning]], although tanning is not required to practice the craft. Leatherworkers capable of tanning their own hides have a ready source of material, while others will need to obtain leather or rawhide from another player.


### Getting Started

Leatherworking is taught through **Basic Leatherworking** and a collection of individual crafting actions.

Basic Leatherworking appears to function similarly to the basic skill in tailoring: increasing your individual leatherworking skills contributes to your overall ability with the craft, while Basic Leatherworking itself affects such things as available recipes and your Rank Bonus while working.

Leatherworking recipes can be viewed with:

{{recipes}}

The bottom of the recipe list also displays your available recipe slots:

> Recipe and Lore Slots:
> Basic Leatherworking - 119 Total Slots, 116 Used.

The number of available slots is influenced by **Memory** as well as your leatherworking ability. The exact formula is not currently known.

To examine the construction requirements for a recipe, use:

{{recipe-recall}}

and select **Basic Leatherworking**.

### Leatherworking Skills

The following leatherworking actions have been observed.

| Skill | Difficulty | Common Tools |
| --- | --- | --- |
| Basic Leatherworking | — | — |
| Layout Leather Component | Easy | Chalk, Measuring Cord |
| Cut Leather Component | Easy | Shears |
| Punch Leather Holes | Easy | Mallet, Punch |
| Lace Leather Components | Easy | Leather Lace |
| Bevel Leather Component | Average | Knife |
| Skive Leather Component | Average | Knife |
| Line Leather Item | Average | Unknown |
| Rivet Leather Components | Average | Rivets |
| Apply Metal Studs | Average | Unknown |
| Mold Leather Component | Difficult | Mallet |
| Sew Leather Components | Difficult | Leather Sewing Needle |
| Emboss Leather Item | Difficult | Mallet, Leather Punch |

Malktros has been observed teaching the individual leatherworking actions through at least **rank 50**. The available training limits may change and should be checked in game.

#### Leather Dye Colors

Leather dye is available in the following colors:

| Color Group | Available Colors |
| --- | --- |
| **Red & Pink** | Blood Red, Cinnabar Red, Coral, Crimson, Dark Red, Deep Red, Dusk Rose, Ember Red, Fiery Red, Mottled Red, Pale Pink, Pink, Red, Red Ochre, Scarlet, Wine Red |
| **Blue** | Ashen Blue, Azure, Azurite Blue, Blue, Dark Blue, Deep Blue, Dusky Blue, Lapis Blue, Light Blue, Mottled Blue, Pale Blue, Periwinkle, Slate Blue, Smoke Blue |
| **Green** | Dark Green, Deep Green, Light Green, Malachite Green, Moss Green, Mottled Green, Pale Green, Peat Green, Sea-glass Green |
| **Purple & Violet** | Berry Purple, Dark Purple, Deep Indigo, Deep Purple, Dusky Violet, Indigo, Lavender, Light Purple, Lilac, Mulberry, Pale Purple, Purple, Smokey Plum, Smokey Violet, Violet |
| **Yellow & Gold** | Amber, Bright Yellow, Golden Yellow, Mottled Yellow, Pale Yellow, Saffron Gold, Sunny Yellow, Yellow, Yellow Ochre |
| **Orange** | Burnt Orange, Dark Orange, Light Orange, Orange, Pale Orange |
| **Brown & Earth** | Brown, Clay Brown, Dark Brown, Dust Brown, Pale Sienna, Raw Umber, Sienna, Sun-baked Ochre, Tan, Tawny |
| **Grey, Black & White** | Black, Deep Black, Fog Grey, Grey, Iron Grey, Light Grey, Pale Grey, Snow White, Umber Black, White |
| **Teal & Cyan** | Cyan, Dark Teal, Deep Teal, Light Teal, Pale Teal, Turquoise |
| **Olive** | Deep Olive, Light Olive, Olive |
| **Other** | Blackberry, Mottled Brown, Multi-colored, Oiled |

#### Command Templates

| Action | Command |
| --- | --- |
| Layout | {{layout <material>}} |
| Cut | {{cut <incomplete>}} |
| Skive | {{skive <incomplete>}} |
| Bevel | {{bevel <incomplete>}} |
| Mold | {{mold <incomplete>}} |
| Punch | {{punch <incomplete>}} |
| Lace | {{lace <item> to <incomplete>}} |
| Rivet | {{rivet <item> to <incomplete>}} |
| Sew | {{sew <item> to <incomplete>}} |
| Emboss | {{emboss <item>}} |

In most cases the required tools only need to be somewhere in your inventory. The game will automatically reach for the appropriate tool and return it after the action.

For example:

> You reach for a piece of chalk and a measuring cord.

If the tool is already held, this portion of the messaging is omitted.

**Embossing is an exception:** the mallet and punch have been reported as needing to be held.

### Working With Leather

Leatherworking recipes use measured portions of leather or rawhide.

Known component sizes include:

* eighth length
* quarter length
* half length
* full length

Leather can be divided by placing the material on the ground, holding a pair of shears, and using:

{{divide}}

Pieces of compatible raw material can also be consolidated. For example:

{{consolidate raw with 2 raw}}

Exact syntax will depend upon how the pieces are identified in the room.

**Important:** Once material has been cut for a project, it can no longer be dyed. Dye the leather before beginning construction.

Combining components of different colors results in the completed item being described as **multi-colored**.

### How Recipes Work

Leatherworking items are constructed from components rather than directly from raw material.

A component normally has a sequence of required preparation steps. A common sequence is:

# Layout

# Cut

# Skive

# Bevel

# Punch

Other components may require molding or another specialized action.

Once the required components have been completed, they are joined together according to the item's assembly instructions using lacing, riveting, or sewing.

Because many partially completed components can have similar names, keeping a **clean work area** is strongly recommended. Accidentally using the wrong component can waste a considerable amount of material.

#### Example: Gladius Scabbard

A leather gladius scabbard requires:

> **2 Scabbard Lengths** — one quarter length each

Each scabbard length is made by:

# Lay out a quarter length of leather.

# Cut the length.

# Skive the edges.

# Bevel the edges.

# Punch holes.

Once both lengths are finished:

# Lace the two lengths together to form the scabbard.

This illustrates the basic leatherworking workflow:

**material → components → prepared components → assembly → finished item**

#### Example: Leather Backpack

Some recipes contain **sub-assemblies**.

A leather backpack requires:

> **1 Backpack Shell**
>
> * 1 Backpack Body — half length
> * 1 Backpack Flap — quarter length
>
> **2 Straps** — eighth length each

The body and flap are first assembled into the backpack shell.

The final construction is then:

# Rivet the first shoulder strap to the shell.

# Rivet the second shoulder strap to complete the backpack.

#### Example: Leather Manica

A left or right leather manica requires:

> **8 Plates** — eighth length each
> **1 Hand Guard** — eighth length
> **1 Shoulder Guard** — quarter length
> **4 Straps** — eighth length each
> **4 Buckles**

Assembly:

# Lace the hand guard to the first plate.

# Lace the remaining plates sequentially.

# Lace the shoulder guard to the top.

# Rivet the four straps.

# Sew on the four buckles.

This requires approximately **1 7/8 lengths of leather per manica**, or **3 3/4 lengths for a pair**, before accounting for mistakes or failed work.

The left and right manica require separate finished-item recipes, but their component recipes are shared.

### Known Finished Recipes

Leatherworking includes a large number of recipes. Finished items observed include:

| Armor and Clothing | Equipment and Containers |
| --- | --- |
| Leather Cuirass | Leather Backpack |
| Leather Fighting Harness | Leather Baldric |
| Leather Gauntlets | Leather Belt |
| Leather Gloves | Leather Belt Hoop |
| Leather Greaves | Knife Sheath |
| Leather Thigh Greaves | Gladius Scabbard |
| Leather Helmet | Falcata Scabbard |
| Leather Tunic | Leather Quiver |
| Leather Vest | Leather Pouch |
| Leather Waistguard | Leather Hat |
| Left Leather Manica | Knee-high Leather Boots |
| Right Leather Manica |  |
| Shoulder Pteryges |  |
| Stiff Leather Pteryges |  |
| Leather Breeches |  |
| Open-Toed Leather Sandals |  |

Most finished recipes have several corresponding component recipes that must also be learned.

For example, the cuirass uses separate recipes for its body, front, back, and straps, while a helmet uses separate browguard, cheekguard, chinstrap, crown, and neckguard components.

#### Recipe Difficulty

The majority of known leatherworking recipes and component recipes have been observed as **Easy**.

Known exceptions include:

| Recipe | Difficulty |
| --- | --- |
| Cuirass Front Recipe | Average |
| Open-Toed Leather Sandal Recipe | Average |

Recipe difficulty is separate from the difficulty of the leatherworking action used to produce the component.

### Embossing

Completed leather goods can be decorated using the **Emboss Leather Item** skill.

Use:

{{emboss <item>}}

Known embossing patterns include:

* Alligator
* Stars
* Bear
* Beaver

Embossing may require **multiple successful actions** before the pattern is completed.

A successful action does not necessarily mean the entire embossing job is finished.

Failures may damage part of the developing design without necessarily ruining the item:

> You strike a bronze punch at the wrong angle, blurring a row of teeth ... and carefully smooth the leather.

Additional embossing patterns may exist.

### NPC Commissions

Leatherworkers can accept commissions from NPC customers at the leatherworking shop.

NPC customers periodically enter the workshop and announce the item they want. Anyone present may accept the commission by answering the customer affirmatively.

For example:

> "Good day. I'm looking to have some leatherwork done, if you're interested."
>
> "I've been looking all over for a red rawhide falcata scabbard."

Only **one commission may be accepted at a time**.

Observed commissions request non-armor items such as:

* pouches
* hats
* scabbards
* other utility goods

Armor commissions have not been observed.

Commissioned goods have been reported as requiring **rawhide**, and customers may request one of several colors.

After accepting a commission:

# Use {{recipe-recall}} to determine the required components.

# Produce the requested item in the requested material and color.

# Give the completed item to **Priscia**, the consignment clerk.

# Payment is credited through the shop.

Large balances may be paid using vellum in the same manner as other stores.

### Training Leatherworking

A convenient inexpensive training item is the **Leather Pouch Square** because it repeatedly uses several fundamental component skills.

A pouch square uses:

# Layout

# Cut

# Skive

# Bevel

# Punch

Two prepared squares can then be joined, giving opportunities to practice assembly skills as well.

Players who also know tanning can obtain inexpensive practice material from low-value animal pelts rather than purchasing leather or rawhide from other players.

The Pits and other areas containing plentiful low-value animals have been used for this purpose by player hunters.

#### Skill Difficulty Matters

The easiest leatherworking actions improve rapidly enough that very low success values have been reported within relatively few ranks.

The Average and Difficult actions require more investment.

For example, early player testing reported approximately:

| Skill | Example Rank | Example Success |
| --- | --- | --- |
| Layout | 11 | 1 |
| Punch | 10 | 1 |
| Cut | 1 | 5 |
| Skive | 20 | 28 |
| Bevel | 20 | 28 |
| Mold | 3 | 17 |
| Sew | 1 | 49 |
| Rivet | 1 | 49 |
| Emboss | 1 | 79 |

These numbers should be treated only as examples. Attributes, Basic Leatherworking, individual skill ranks, and other factors may affect Success.

#### Roundtime

Roundtime decreases as leatherworking ability improves.

Early testing produced times such as:

| Action | Example Early RT |
| --- | --- |
| Layout | about 28 seconds |
| Cut | about 23–28 seconds |
| Skive | about 18–23 seconds |
| Bevel | about 18–23 seconds |
| Punch | about 18–23 seconds |
| Mold | about 38–43 seconds |
| Sew | about 43 seconds |

Different components appeared to produce somewhat different roundtimes, so these should **not** be treated as fixed values.

Most basic component actions observed during early training had a practical floor of approximately 18 seconds at the ranks tested.

#### Training Costs

Player observations during early training recorded the following lesson costs:

| Rank | Cost |
| --- | --- |
| 2 | 15 denars |
| 3 | 22 denars |
| 4 | 30 denars |
| 5 | 37 denars |
| 6 | 45 denars |
| 7 | 52 denars |
| 8 | 60 denars |
| 9 | 67 denars |
| 10 | 75 denars |

More data is needed to determine the complete training-cost formula.

### Basic Leatherworking and Recipe Slots

Basic Leatherworking has two particularly important effects.

#### Rank Bonus

Higher Basic Leatherworking contributes to better overall performance while crafting.

Because individual leatherworking actions also have their own ranks, investing in the actions that are giving you difficulty may be more useful than simply concentrating on a single skill.

#### Recipe Capacity

Leatherworking recipes occupy recipe slots.

Typing:

{{recipes}}

shows both the number of recipes learned and your current slot capacity.

**Memory increases the number of available recipe slots.**

Basic Leatherworking also appears to increase available slots, although the exact relationship between Basic Leatherworking, individual skills, and Memory has not yet been determined.

At 82 Basic Leatherworking and 200 Memory, one player reported:

> Basic Leatherworking - 119 Total Slots, 116 Used.

Another character with 134 Memory and much lower leatherworking ability reported:

> Basic Leatherworking - 20 Total Slots, 16 Used.

These examples demonstrate the relationship but are not sufficient to derive an exact formula.

### Leather Armor

Leatherworking can produce a variety of player-crafted armor pieces, including:

* fighting harnesses
* manicae
* waistguards
* pteryges
* cuirasses
* greaves
* thigh greaves
* helmets
* gauntlets
* other leather garments

Early player comparisons found several crafted pieces to be comparable to commonly available non-Reputation leather armor.

In particular, players reported crafted **manicae** and **waistguards** performing similarly to store-bought versions.

Player-crafted armor is **not generally intended to replace high-end Reputation armor**, and exact protection, weight, coverage, and layering should be documented separately through controlled testing.

Claims that leatherworker-made manicae possess special anti-magic properties are a joke and should not be relied upon.

### Profitability

NPC commissions provide an income source for leatherworkers, although early testing found the profit relatively modest compared with the amount of time required.

One early test estimated a pouch made from purchased rawhide at approximately **115 denars of profit for roughly twelve crafting actions**, with an estimated production rate around **one talent per hour** at very low Success values.

These figures were recorded shortly after the system's release and should not be assumed to represent current profitability. Material prices, roundtimes, commission payouts, and game balance may have changed.

Leatherworkers who tan their own low-value pelts may substantially reduce their material costs.

### Tips

* **Dye first.** Leather cannot be dyed after it has been cut into a component.
* Keep your workspace clean when assembling complicated projects.
* Required tools usually only need to be in your inventory.
* Embossing may require the mallet and punch to actually be held.
* Use {{recipe-recall}} frequently; complicated items may contain sub-assemblies.
* Train difficult steps individually rather than assuming Basic Leatherworking alone will solve them.
* Memory is particularly valuable to dedicated leatherworkers because it increases recipe capacity.
* Tanning pairs naturally with leatherworking and can provide inexpensive practice material.
* Left and right versions of an item may use separate final recipes while sharing the same component recipes.
* Different-colored components produce a **multi-colored** finished item.

### Research Still Needed

The following areas need additional player testing:


* Complete list of embossing patterns.
* Exact minimum roundtimes for each action.
* Effect of component size or recipe on roundtime.
* Full leather and rawhide material consumption for every recipe.
* Quality effects of Basic Leatherworking and individual subskills.
* Armor protection values.
* Armor weight.
* Armor coverage and layering.
* Comparison of crafted armor with shop, Reputation, and special drop armor.
* Current NPC commission payout formula.
* Complete list of items NPCs may commission.
* Complete list of commission colors.
