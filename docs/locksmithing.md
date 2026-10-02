---
title: "Locksmithing"
category: "Crafting & Trade"
---

# Locksmithing

## Skill Overview

With as many doors as there are in a city the size of Iridine, those with the knowledge to install, repair, and build locks are a much-needed commodity. A locksmith's duties are not confined to doors: adventurers frequently need locked chests and containers opened and are often willing to pay for the privilege of discovering what lies within.

The locksmiths of Iridine are primarily concentrated around Apula's place of business and the Guildhall across the Invex along Vetallun Road. Apula accepts freelance locksmiths who wander into her shop and may occasionally offer work when her own hands are tied.

A locksmith starting out can assist residents by opening locked containers. More advanced locksmiths can forge duplicate keys and lockpicks, make keyrings, jam or repair locks, and install or remove locking mechanisms.

**For additional step-by-step guidance, see the [Locksmithing Guide](/locksmithing-guide/).**

## Trainers

| Skill / Action | Difficulty | Apula | Ititia | Fefellus | Admina | Clauditis |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| Locksmithing | Easy | 50 | 100 | 80 | 100 | 200 |
| [Pick Lock - Unlocking](#pick-lock---unlocking) | Easy | 50 | 90 | 65 | 70 | 150 |
| [Pick Lock - Locking](#pick-lock---locking) | Average | 50 | 90 | 60 | 70 | 150 |
| [Study Lock](#study-lock) | Easy | 50 | 90 | 60 | 70 | 150 |
| [Lock Lore](#lock-lore) | Easy | 50 | 90 | 60 | 70 | 150 |
| [Unjam Lock](#unjam-lock) | Difficult | 50 | 90 | 65 | 70 | 150 |
| [Jam Lock](#jam-lock) | Easy | 50 | 90 | 60 | 70 | 150 |
| [Fashion Lockpick](#fashion-lockpick) | Average | 50 | 70 | 60 | 90 | 150 |
| [Create Wax Imprint](#create-wax-imprint) | Average | 50 | 70 | 60 | 90 | 150 |
| [Create Clay Mold](#create-clay-mold) | Difficult | 50 | 70 | 60 | 90 | 150 |
| [Forge Lock Instrument](#forge-lock-instrument) | Difficult | 50 | 70 | 60 | 90 | 150 |
| [Install Lock](#install-lock) | Difficult | 50 | 70 | 65 | 90 | 150 |
| [Uninstall Lock](#uninstall-lock) | Impossible | 50 | 70 | 65 | 90 | 150 |
| [Wax Letter Etching](#wax-letter-etching) | Average | 25 | 70 | 60 | 90 | 125 |
| [Fashion Keyring](#fashion-keyring) | Difficult | 25 | 70 | 60 | 80 | 125 |

### Trainer Locations

**Apula — [Iridine](/bronze-lane/)**  
From Bronze Lane: north ×5, west ×1.

**Fefellus — [Vetallun](/town-of-vetallun/)**  
Travel to Vetallun Road, continue to the Vetallun Crossroads, then west ×2, south ×1, east ×1.

**Ititia — [Blackvine](/village-of-blackvine/)**  
Travel to Vetallun Road, continue to the Vetallun Crossroads, then toward Blackvine: south ×1, southeast ×1, east ×4, south ×4, east ×2, south ×1.

**Admina — [Town of Rock Valley](/town-of-rock-valley/)**  
The migrated directions were: walk to the Hospice, wait for the drover to appear, follow the drover, east ×12, north ×2, east ×10, south ×5, west ×1, north ×1.

**Clauditis — [Seld](/village-of-seld/)**  
From Seld Town Square: north ×2, west ×4, north ×1.

## Notes on Learning

Characters learning Locksmithing for the first time with **[GSP](/skills/#GSP)** begin with:

- Pick Lock - Unlocking
- Lock Lore
- Study Lock

## Skill Details

### Pick Lock - Unlocking

**Difficulty:** Easy

```text
unlock <lockable object> with <lockpick>
```

All characters new to locksmithing begin with this action. There is a practice board at Riverside Locks, Apula's shop, which can be unlocked indefinitely. With enough training, a locksmith can learn to lock containers as well, allowing a portable practice container to be used.

The difficulty of this skill is affected by lighting. A well-lit room provides the best chance of success.

**Required Tools:** Lockpick

This skill has a chance of **[naturally increasing](/stats/#naturalatt)** Reasoning, Perception, and Judgement.

**Example**

```text
> unlock chest with lockpick
[Success: 5, Roll: 94] You hear a click as a tumbler mechanism releases.
```

### Pick Lock - Locking

**Difficulty:** Average

```text
lock <lockable object> with <lockpick>
```

This action is primarily useful for training, but it can also serve as a temporary substitute when a key is missing.

**Required Tools:** Lockpick

This skill has a chance of **[naturally increasing](/stats/#naturalatt)** Reasoning and Perception.

**Example**

```text
> lock chest with lockpick
[Success: 5, Roll: 38] You hear a click as a tumbler mechanism closes.
```

### Study Lock

**Difficulty:** Easy

```text
study <lockable object>
```

Studying a lock makes the locksmith's next relevant task easier, but the benefit applies only once and has a time limit that is not explicitly displayed.

Study Lock can be especially useful against mechanisms that are otherwise too difficult to pick or repair efficiently. It can also reveal that a mechanism has been jammed.

**Example**

```text
> study chest
[Success: 1, Roll: 98] You carefully study a tumbler mechanism and feel that you have a pretty firm grasp of how its locking mechanism operates. The lock has been jammed, but after further study you are confident that can be fixed.
```

### Lock Lore

**Difficulty:** Easy

```text
recall lock tumbler
```

Lock Lore offers no direct mechanical advantage, but it can be useful for gaining skill points because it requires no tools and can be practiced almost anywhere.

This skill has a chance of **[naturally increasing](/stats/#naturalatt)** Willpower, Reasoning, Judgement, and Memory.

**Example**

```text
> recall lock tumbler
[Success: 1, Roll: 43] The lock mechanism consists of a basic collection of interlocked metal teeth that slide apart when opened with the appropriate key.
```

### Unjam Lock

**Difficulty:** Difficult

```text
unjam <jammed object> with <lockpick>
```

A jammed container or door must be unjammed before it can be unlocked. Difficult mechanisms may require several successful attempts.

When working on doors, a failed attempt to uninstall a lock may jam it. The lock must then be unjammed and unlocked before another uninstall attempt can be made.

Lighting affects the difficulty of this action.

**Required Tools:** Lockpick

!!! warning
    A failed unjamming attempt can make the mechanism even more jammed. If a lock is especially difficult, studying it before each attempt can help. Continuing to work on a lock beyond your ability can make the job harder for the next locksmith.

**Examples**

```text
> unjam chest with lockpick
You manage to jam the mechanism even more.
[Success: 5, Roll: 1] You carefully twist and manipulate a silver lockpick.

> unjam chest with lockpick
The lock gives some, but is not completely unjammed.
[Success: 5, Roll: 69] You carefully twist and manipulate a silver lockpick.

> unjam chest with lockpick
[Success: 5, Roll: 100] You carefully twist and manipulate a silver lockpick. You feel an obstruction release, and you have confidence the lock will operate normally now.
```

### Jam Lock

**Difficulty:** Easy

```text
jam <locked object> with <lockpick>
```

Useful mostly for training, Jam Lock can also make a container more difficult for another locksmith to open.

**Required Tools:** Lockpick

**Example**

```text
> jam chest with lockpick
[Success: 5, Roll: 93] You carefully twist and manipulate a silver lockpick.
```

### Fashion Lockpick

**Difficulty:** Average

```text
fashion lockpick from <thin wire>
```

A locksmith can fashion temporary lockpicks from **thin wire**. These lockpicks degrade with use. Greater skill can produce better-quality lockpicks, which can make later locksmithing tasks easier.

**Required Tools:** A thin length of wire

**Example**

```text
> fashion lockpick from wire
[Success: 1, Roll: 83] You take the thin length of tin wire firmly and work it into a carefully twisted tin lockpick.
```

## Forging Keys and Lockpicks

Duplicating a key or lockpick is a multi-stage process:

1. Create a wax imprint of the original locking tool.
2. Create a clay mold around the completed wax imprint.
3. Heat the clay mold until it hardens.
4. Heat a metal slag over a high-flame furnace until molten.
5. Pour the molten metal into the hardened mold with Forge Lock Instrument.
6. Keep or crack the mold after the finished copy is produced.

### Create Wax Imprint

**Difficulty:** Average

```text
imprint <wax> with <locking tool>
```

Creating a wax imprint is the first step in forging a new key or lockpick. Wax is sold at Apula's and other locksmithing shops.

Higher ranks remain useful even after the displayed success reaches 5 because greater skill reduces the number of successful repetitions needed to complete the imprint. The migrated page notes that a new locksmith may need 20–30 successful attempts while a master may need only 4–5.

A completed wax imprint can be labeled with a stylus:

```text
label wax <label text>
```

If an imprint is going poorly, the wax can be reset and reused:

```text
squeeze <wax>
```

**Required Tools:** Jar of wax and the key or lockpick being copied

**Examples**

```text
> get wax from yellow ceramic jar
You scoop out a bit of wax.

> imprint wax with lockpick
[Success: 1, Roll: 44] You warm the wax in your hand in preparation for imprinting and form it around the silver lockpick.

> imprint wax with lockpick
[Success: 1, Roll: 68] You painstakingly mold an unfinished wax imprint closely around the teeth of a silver lockpick.

> imprint wax with lockpick
[Success: 1, Roll: 29] You carefully remove a silver lockpick from the wax imprint and survey your finished work.
```

### Wax Letter Etching

**Difficulty:** Average

```text
etch <imprinted wax> <text>
```

Wax Letter Etching adds text to a completed wax imprint. When the imprint is later used to forge a locking tool, the etched text appears on the finished item. Greater skill allows longer inscriptions.

**Required Tools:** Thin wooden stylus

This step is optional.

**Example**

```text
> etch wax Apula
[Success: 5, Roll: 65] You lift up your thin wooden stylus and quickly etch 'Apula' onto a wax imprint of a lockpick. You finish and consider your work.
```

### Create Clay Mold

**Difficulty:** Difficult

```text
create mold of <imprinted wax> with <clay>
```

Creating a clay mold is the second step in forging a new locking tool. A completed mold must be heated until hardened before it can be used for casting.

A stylus can be used to label the mold:

```text
label mold <label text>
```

An unfinished clay mold can be recycled by putting it back into the clay jar and scooping the clay back out.

Unwanted molds can be destroyed with:

```text
crack <mold>
```

**Required Tools:** Fully imprinted wax, clay, and a low-heat source for baking

**Examples**

```text
> get clay from small white ceramic jar
You scoop out a bit of clay.

> create mold of wax with clay
[Success: 1, Roll: 51] You massage some clay in your hands, softening it, before applying some to the wax imprint.

> create mold of wax with clay
[Success: 1, Roll: 46] Using the warm clay, you work on wrapping it around the raised wax formation that mimics the original metal.

> create mold of wax with clay
[Success: 1, Roll: 86] Adding some final touches to the mold, you soon have the imprint completely encased in clay with a small hole for the wax to runoff from. It is ready to be baked.
```

### Forge Lock Instrument

**Difficulty:** Difficult

```text
forge tool with <crucible> and <mold>
```

With crucible and tongs in hand, the locksmith pours molten metal into a hardened mold. Metal can be reheated and the process repeated as necessary. Once finished, the mold can be retained for future copies or cracked.

To prepare molten metal, a slag of metal must first be heated over a **high-flame furnace**. The migrated page notes that heating the slag itself requires no Locksmithing skill action.

**Required Tools:** Hardened mold, crucible containing molten metal, tongs, and a high-heat source

**Example**

```text
> forge tool with crucible and mold
[Success: 1, Roll: 76] You pour some molten metal from a crucible into a hole on top of the mold. After a short while, you crack the clay open to reveal a silver lockpick.
```

## Locks

### Install Lock

**Difficulty:** Difficult

```text
install <tumbler> in <object>
```

Installing a new lock has a long roundtime and requires substantial training to perform reliably. Locks can be installed on lockable objects on which the locksmith has permission to work.

In many cases, an existing lock must be uninstalled before a new mechanism can be installed.

**Required Tools:** Tumbler mechanism

**Example**

```text
> install tumbler in trunk
[Success: 1, Roll: 73] You set the placement of the new tumbler mechanism with great care.
```

### Uninstall Lock

**Difficulty:** Impossible

```text
uninstall lock from <object>
```

A failed uninstall attempt can jam the lock. A jammed lock must be unjammed and unlocked before another extraction attempt can be made.

The roundtime for uninstalling a lock is shorter than installing one, but the action can still be time-consuming for an inexperienced locksmith.

**Example**

```text
> uninstall lock from coffer
[Success: 76, Roll: 80] You manage to break the lock apart into manageable pieces for extraction.
```

### Fashion Keyring

**Difficulty:** Difficult

```text
fashion keyring from <thick wire>
```

Fashion Keyring allows a locksmith to create keyrings from **thick wire**. Greater skill allows larger keyrings to be produced.

Thin wire used for Fashion Lockpick will not work for this action.

**Required Tools:** A thick length of wire

**Example**

```text
> fashion keyring from wire
[Success: 5, Roll: 65] You take the thick length of tin wire firmly and work it into a large tin keyring.
```

## Quick Command Reference

```text
unlock <object> with <lockpick>
lock <object> with <lockpick>
study <object>
recall lock tumbler
unjam <object> with <lockpick>
jam <object> with <lockpick>
fashion lockpick from <thin wire>
imprint <wax> with <locking tool>
squeeze <wax>
label wax <label text>
etch <imprinted wax> <text>
create mold of <imprinted wax> with <clay>
label mold <label text>
crack <mold>
forge tool with <crucible> and <mold>
install <tumbler> in <object>
uninstall lock from <object>
fashion keyring from <thick wire>
```

## See Also

- [Locksmithing Guide](/locksmithing-guide/)
- [Skills](/skills/)
- [Commands](/commands/)
- [Village of Seld](/village-of-seld/)
- [Town of Rock Valley](/town-of-rock-valley/)
