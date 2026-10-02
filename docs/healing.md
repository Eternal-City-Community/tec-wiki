---
title: "Healing"
category: "Reference"
parent: skills
---

# Healing

### Skill Overview

Healers are an absolutely essential asset to Midlight. They are required everywhere, as perils include dangerous physical environments (falling into pits, climbing trees, etc.) as well as the more obvious combat risks to character health.

**For more in-depth guidance on the skillset, consult the [Healing Guide](/healing-guide/)***(in progress)*.

| >> | Skill Info | >> | >> | >> | Ranks Taught by Trainer |
| --- | --- | :---: | :---: | :---: | :---: |
| ~ Skills/Actions | ~ Difficulty | ~ Iskara | ~ Cipus | ~ Piroska | ~ Tullaria |
| *<u>Healing</u>* | Easy | 100 | 200 | 50 | 80 |
| [Bandage Wound](#Bandage-Wound) | Easy | 100 | 150 | 30 | 80 |
| [Rouse](#Rouse) | Easy | 100 | 150 | 30 | 80 |
| [Administer](#Administer) | Average | 100 | 150 | 30 | 80 |
| [Arrow-Pulling](#Arrow-Pulling) | Average | 100 | 150 | 30 | 80 |
| [Diagnose](#Diagnose) | Average | 100 | 150 | 30 | 80 |
| [Remove Bandages](#Remove-Bandages) | Easy | 100 | 150 | 30 | 80 |
| [Application](#Application) | Easy | 100 | 150 | 30 | 80 |
| [Clean Wound](#Clean-Wound) | Easy | 100 | 150 | 30 | 80 |
| [Stitch Wound](#Stitch-Wound) | Difficult | 100 | 150 | 30 | 80 |
| [Remove Stitches](#Remove-Stitches) | Average | 100 | 150 | 30 | 80 |
| [Set Bone](#Set-Bone) | Difficult | 100 | 150 | 30 | 80 |
| [Splint Bone](#Splint-Bone) | Average | 100 | 150 | 30 | 80 |
| [Remove Splint](#Remove-Splint) | Easy | 100 | 150 | 30 | 80 |
| Apply Tourniquet | Average | 100 | 150 | 30 | 80 |
| Remove Tourniquet | Easy | 100 | 150 | 30 | 80 |

| >> | Healing Lores | >> | >> | >> | Ranks Taught by Trainer |
| --- | --- | :---: | :---: | :---: | :---: |
| ~ Lores | ~ Difficulty | ~ Iskara | ~ Cipus | ~ Piroska | ~ Tullaria |
| [Pressure Wound Technique](#Pressure-Wound-Technique) | Easy | 25 | 25 | 25 | - |

**Directions to Iskara** ([Iridine](/gardens-and-hospice/)): Walk to Hospice, Nx7, Wx1, Nx1
**Directions to Piroska** ([Town of Rock Valley](/town-of-rock-valley/)): Walk to Hospice, wait for drover to appear, follow drover, Ex12, Nx2, Ex15, S, W

**Directions to Tullaria** ([Franlius](/town-of-franlius/)): Take the ship to Franlius from Blackvine. She's on the docks.
**--Directions to Cipus-- (Currently Unavailable)** ([Monlon](/monlon/)): Take the ferry to Monlon, Nx3, W, N, NW, W, Nx3, NEx2, Nx2, NE, Nx2, Wx3, NW, NEx3, N, NWx3, W, SWx2, NWx2, NE, Nx3, U, N, Ex3, S

#### Notes on Learning
* Healing requires the use of the **[Tend](#Tend)** command, which requires no skill to use, but is the first step in most healing skills.
* Healing is **more difficult to learn** than most skillsets since **all skills cost an additional five skill points** (SP) to learn. _
*Example:* Your first easy skill costs 10 skill points to learn initially, and then 5 skill points for every subsequent rank in that skill. If it were in your 1st slot, healing requires 15 SPs for the first rank in an easy skill and 10 SPs for every subsequent rank. When using the [Training Cost Calculator](/training-cost-calculator/) be sure to check the **Healing** box to adjust costs accordingly.
* For characters learning Healing for the first time, the **starting skills** are: [Diagnose](#Diagnose), [Clean Wound](#Clean-Wound), [Bandage Wound](#Bandage-Wound), and [Remove Bandages](#Remove-Bandages).


### Related Commands
Related commands are commands that require no skill or training to use, but are necessary as part of the Healing skill set.

### Tending  *tend &lt;patient&gt; [thorough]* {#Tend}

To begin healing someone, you must focus on a prone (sitting, laying, kneeling) patient. Once you are tending to them, you can then commence any type of healing that is required.

Higher ranks in the Diagnose skill will allow you to perceive more information when using the regular TEND command.

You can also tend a patient **thoroughly** to get more detailed information about the patient's wounds. It requires more time to do this.

**When you see this in use you see:**

<div class="skill-template">

> *tend me*
 You examine yourself.
 On a quick examination, you determine that your right hand and left hand need to be diagnosed and tended; General Health: Uninjured.
 (You should now DIAGNOSE each wounded body part to get more information.)
 (For more information about how to use your healing actions, type ?BASIC HEALING.)
 Gilven appears to be somewhat dehydrated.
 Gilven appears to be somewhat malnourished.
You will be busy for nine more seconds.


 > *tend me thorough*
 You examine yourself thoroughly.
 On a quick examination, you determine that your right hand and left hand need to be diagnosed and tended; Your waist has been stitched. General Health: Uninjured.
 Gilven appears to be somewhat dehydrated.
 Gilven appears to be somewhat malnourished.
 You will be busy for twenty-nine more seconds.

</div>


### Skill details

### Diagnose  *diagnose &lt;body part&gt;* {#Diagnose}

Diagnosing can give a healer more information about a specific type of wound. Diagnosing is not required in order to begin healing, but it can be useful for treating NPCs, unconscious characters, for role-playing purposes, or if you're just not sure what you need to do.

**When you see this in use you see:**

<div class="skill-template">

> *diagnose neck*
[Success: 48, Roll: 83] His neck is unwounded. This part does not need bandaging. There are no stitches on this part.

 > *diagnose left hand*
 You gently probe at the wound with your fingers.
 [Success: 48, Roll: 67] Her left hand is slashed open. It is bleeding. There are no broken bones. Her left hand is encrusted with filth. This part needs new bandages. There are no stitches on this part.

</div>

### Bandage Wound  *bandage &lt;body part&gt; with &lt;bandage&gt;* {#Bandage-Wound}

Healers now start with this basic skill. Bandages have a chance to slow down or stop bleeding wounds. A healer's success, skill level, and the intensity of the bleeder all factor into the final result/helpfulness. It is generally better to clean, stitch, and then bandage the wound (although check with the patient first, as some characters prefer not to be bandaged). 

Bandages can be removed and reapplied, which makes this an excellent skill to practice on yourself. You just need a small wound and a large pile of bandages, as bandages are one-time use. They can be removed by using REMOVE BANDAGE, but there must be no clothing or accessories covering the bandage for it to work. The skill "Remove Bandages" is much more effective for this, as it does not require the removal of clothing, and also gives skill points toward Healing.

**Tools Required**: Bandages

**When you see this in use you see:**

<div class="skill-template">

> *bandage left hand with bandage*
 [Success: 1, Roll: 47] You wrap a clean bandage around your left hand.

</div>

### Remove Bandages  *cut bandages [from] &lt;body part&gt;* {#Remove-Bandages}

Bandages can restrict a character's movement, so ofttimes bandage removal is requested. This is useful as a career skill, and also for practicing, as it gives Healing SPs where manually removing bandages does not.

**When you see this in use you see:**

<div class="skill-template">

> *cut bandage from head*
 [Success: 1, Roll: 68] You remove the bandages from your head.

 > *cut bandage from r hand*
[Success: 1, Roll: 44] You remove the bandages from your right hand.

 > *cut bandage from left foot*
[Success: 1, Roll: 68] You remove the bandages from your left foot.

</div>

### Rouse  *rouse &lt;patient&gt; [with] &lt;smelling salts&gt;* {#Rouse}

Rousing a character can briefly awaken them while they are unconscious. Please note that this could have adverse consequences depending on how far under a character is.

**Tools Required**: Smelling salts

### Arrow Pulling  *yank arrow from &lt;body part&gt;* {#Arrow-Pulling}

Even without any training, it is possible to pull an arrow from someone but if you are not incredibly lucky, you will do further harm to your patient and potentially cause some bleeding. A successful arrow pull will be much faster than a failed one and cause little or no additional stress to your patient.

**When you see this in use you see:**

<div class="skill-template">

> *yank arrow from left arm*
 [Success: 71, Roll: 99] You carefully pull the arrow from a thug's left arm, causing minimal damage.

</div>

### Administer  *feed &lt;edible item&gt; to &lt;person&gt;* {#Administer}

Administer can be used to feed medicine, food, or beverages to characters unable to feed themselves. Feeding an unconscious character food can sometimes help them regain consciousness (a hungry character with the Increased Metabolism trait will not regain fatigue until they are full). There are other creative uses for administer as well, such as in role-playing scenarios.

**When you see this in use you see:**

<div class="skill-template">

> *feed fish to thug*
 [Success: 37, Roll: 87] You feed a fat, oily fish to a thug.

</div>

### Stitch Wound  *stitch &lt;body part&gt; with &lt;thread&gt;* {#Stitch-Wound}

Stitching is the only way to fully close a wound when it is bleeding. Cleaning the wound first may help the injury to heal faster. This skill is harder to master than most, but it is one of the most needed skills as bleeding wounds eventually lead to unconsciousness. Therefore, being very skilled at stitching will make a Healer faster, and thus more desirable as an assistant.

**Tools Required:** a surgical needle; suture thread

This skill has a chance of **[naturally increasing](/stats/#naturalatt)** a character's **Perception** & **Reasoning**.

**When you see this in use you see:**

<div class="skill-template">

> *stitch left hand with thread*
 [Success: 18, Roll: 23] You carefully hold your left hand closed and stitch it shut.

</div>

### Remove Stitches  *cut stitches [from] &lt;body part&gt;* {#Remove-Stitches}

Stitches get itchy after a while, which can become an irritating distraction, which makes removing them a popular request. A character can use the command CONDITION (or just COND) to see where they have stitches, which can help a healer be more efficient at removing their stitches.

**When you see this in use you see:**

<div class="skill-template">

> *cut stitches from right shin*
 [Success: 36, Roll: 42] You carefully remove the stitches from your right shin.

</div>

### Clean Wound  *clean &lt;body part&gt; with &lt;antiseptic&gt;* {#Clean-Wound}

Cleaning wounds is great practice, given that you have a large supply of antiseptic.

**Tools Required**: Antiseptic

**When you see this in use you see:**

<div class="skill-template">

> *clean left hand with antiseptic*
 [Success: 5, Roll: 54] You clean your left hand.

</div>

### Application  *apply &lt;item&gt; [to] &lt;body part&gt;* {#Application}

Apply salves & gels to injured body parts. The more knowledgeable you are with this skill, the longer the salve will last.

**Tools Required**: An applicable salve

**When you see this in use you see:**

<div class="skill-template">

> *get vial*
You take a small stoppered clay vial labeled 'Painkiller Salve'.

 > *apply gel to left hand*
 [Success: 1, Roll: 20] You apply some rich green gel to your left hand. As you apply some rich green gel to your left hand, your skin numbs and the pain recedes slightly.

 > *apply gel to left hand*
 [Success: 1, Roll: 99] You apply some rich green gel to your left hand. As you apply some rich green gel to your left hand, your skin numbs and the pain recedes quite a bit.

</div>

### Set Bone  *align &lt;body part&gt;* {#Set-Bone}

Before a broken bone can heal, it should be set and splinted. Setting bones is difficult work, and is usually reserved for well-practiced healers.

**When you see this in use you see:**

<div class="skill-template">

> *align right hand*
 [Success: 73, Roll: 91] Gritting your teeth, you pull and twist the bones of a thug's right hand back into their proper alignment.

</div>

### Splint Bone  *splint &lt;body part&gt; [with] &lt;longish item&gt;* {#Splint-Bone}

Before a broken bone can heal, it should be set and splinted. Splinting bones is much easier than setting them, and a wide variety of objects can be used as splints.

**When you see this in use you see:**

<div class="skill-template">

> *splint right shoulder with splint*
 [Success: 37, Roll: 62] You strap a wooden splint to a woman in a hooded cloak's right shoulder, holding it firmly in place.

</div>

### Remove Splint  *cut &lt;splint&gt; [from] &lt;body part&gt;* {#Remove-Splint}

Removing splints is very similar to removing bandages and stitches. When you successfully remove a splint in this way, the splinting object is not destroyed and can be used again.

**When you see this in use you see:**

<div class="skill-template">

> *cut splint from right hand*
 [Success: 23, Roll: 57] You cut away the splint from a woman in a hooded cloak's right hand.

</div>

### Pressure Wound Technique  *pressure &lt;body part&gt;* {#Pressure-Wound-Technique}

To attempt to stem the flow of blood from a wound you must ensure your patient is laying still in a position which gives you easy access to the wounded area. Kneel down and apply direct pressure to the wound, ensuring it is pressed closed.

Applying pressure to a wound on your own body is more difficult. Lay down and do your best to pressure the wound with both hands where possible. To stop applying pressure, just type remove.

**When you see this in use you see:**

<div class="skill-template">

> *pressure waist*
 [Success: 18, Roll: 99] Carefully positioning your hands you apply pressure to the wound on your waist.

</div>
