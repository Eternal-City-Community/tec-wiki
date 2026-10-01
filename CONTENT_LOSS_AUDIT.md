# Content loss audit

Baseline: be39d0ef1e85bae444464ce11f2f19e46e7f9258 (initial Wikidot import)

- Pages compared: **854**
- Flagged pages: **97**

Flagged when headings or legacy anchors disappeared, or the page shrank by at least 15%.

## Flagged pages

### docs/praetor-guide.md
- Size: 30791 -> 30387 (1.3% shrink)
- Headings: 81 -> 39
- Missing headings: **Status bar**: your vitals, a lighting readout (click it to check the light level), and whether you're connected. | **Tab bar**: **All** is always there, plus any custom tabs you've set up and a **Metrics** tab. See Tabs below. | **Output pane**: game text scrolls here. The mouse wheel and PgUp/PgDn scroll it, and a burst of incoming text keeps following the bottom unless you've scrolled up to read back. | **Minimap**: rooms as colored squares. White lines are open passages, black lines are walls, brighter squares are better-lit rooms. | **Compass**: green arrows are exits you can take right now. The center dot carries up/down markers when a room has them. | **Vitals**: Health, Fatigue, Encumbrance, and Satiation. Click one to check your exact condition. | **Actions, Modes, and Variables tabs**: **Actions** holds your own button sets (set them up under **Action Sets** in the Esc menu). **Modes** lists the loaded automation modes. **Variables** manages saved values you can insert into typed commands and Action buttons. Changes made here are the same ones shown under **Automation**, then **Variables**, in the Esc menu. | **Command input**: where you type to the game. A **hint line** appears just above it while you type a slash command, showing what the command expects. | **Play and current-mode buttons**: the play button starts a play script (see Play scripts below), and the button beside it shows the running mode. Click it to switch. While a typed command chain still has commands waiting, the play button is replaced by a **Stop** button that discards the rest of the chain. | Uses the saved {{container}} and {{item}} values, falling back to {{chest}} and {{key}}. | Repeats the search after each unbusy response. | Advances when the success text appears. | Cancels everything if {{You find nothing}} appears. | Gets the item after the configured {{;;}} delay. | Displays a notification after the next configured delay. | Press **Esc** | Choose **Display & Behavior**, then **Settings** | Change what you need | **Save** | Press **Esc** | Choose **Automation**, then **Quick-Cycle Modes** | Toggle the modes you want in the cycle | **Save**. Alt+M now advances through them in list order | Press **Esc** | Choose **Filters**, then **Ignore OOC Accounts** (or **Ignore Think Characters**) | Add the name | **Save** | Press **Esc** | Choose **Display & Behavior**, then **Notifications** | Turn on **Allow Script Notifications** if Lua modes should be allowed to send notifications. It is off by default and controls both their desktop alerts and in-app notices; built-in threshold and pattern notifications still work independently | Choose whether notifications play the operating system's default sound | Set a **health-below** threshold (on by default, at 25) or a **fatigue-below** threshold (off by default, at 10) | Add your own **text patterns**: text to match, plus an optional notification title and message. Matching is case-insensitive; {{*}} matches any run of characters and {{?}} matches one character | **Save** | Type **/send** and press **Enter** | Pick the text file in the file dialog | A **Send File** window shows the file's name, its line count, and how many batches it will go out in | Click **Save** to start sending | Press **Esc** | Choose **Automation**, then **Persistent Data**
- Legacy anchors: 16 -> 16

### docs/leather-working-guide.md
- Size: 17631 -> 17730 (-0.6% shrink)
- Headings: 52 -> 25
- Missing headings: Layout | Cut | Skive | Bevel | Punch | Lay out a quarter length of leather. | Cut the length. | Skive the edges. | Bevel the edges. | Punch holes. | Lace the two lengths together to form the scabbard. | Rivet the first shoulder strap to the shell. | Rivet the second shoulder strap to complete the backpack. | Lace the hand guard to the first plate. | Lace the remaining plates sequentially. | Lace the shoulder guard to the top. | Rivet the four straps. | Sew on the four buckles. | Use {{recipe-recall}} to determine the required components. | Produce the requested item in the requested material and color. | Give the completed item to **Priscia**, the consignment clerk. | Payment is credited through the shop. | Layout | Cut | Skive | Bevel | Punch
- Legacy anchors: 0 -> 0

### docs/orgs.md
- Size: 18402 -> 18076 (1.8% shrink)
- Headings: 28 -> 28
- Missing headings: [#](#Auxilii)Divortium Auxilii | [#](#Constables)The Iridine Constables | [#](#Legio)Legio | [#](#Vigiles)The Monlon Vigiles | [#](#PG)The Phoenix Guard | [#](#Watch)Rock Valley Watch | [#](#QM)The Quaesitus Monitor | [#](#LexLegalis)Lex Legalis | [#](#BC)Black Centurions | [#](#TG)Harbor Rats | [#](#Alati)Umbra Alati | [#](#Shrikes)Shrikes | [#](#Sinistrals)Sinistrals | [#](#Traevant)Traevant Militia | [#](#BVM)Blackvine Volunteer Militia | [#](#MVG)Monlon Volunteer Guard | [#](#SS)Seld Sentinels | [#](#CoE)Cult of Ereal | [#](#SoE)Soldiers of Ereal | [#](#CL)Cruentus Laureola | [#](#SW)Silver Wolves | [#](#GoL)Guild of Locksmiths | [#](#HoL)Healers of Light | [#](#Vestis)Vestis Formatae | [#](#DE)Diamond Eye | [#](#Slime)Slime Squad
- Legacy anchors: 26 -> 26

### docs/old-cult-of-ereal.md
- Size: 18778 -> 18628 (0.8% shrink)
- Headings: 49 -> 38
- Missing headings: [#](#High-Priest)High Priest | [#](#High-Priest-Proxy)High Priest’s Proxy | **[bio:Titus Ahala](/bio_titus-ahala/)** - Member of the [Sect of the Bright Hope](#BrightHope). | **[bio:Albius Anande](/bio_albius-anande/)** - Member of the [Sect of the Revealing Light](#RevealingLight). | **[bio:Drusus Rustius](/bio_drusus-rustius/)** - **Leader** of the [Sect of the Nuturing Light](#NurturingLight). | **[bio:Jarin Seneda](/bio_jarin-seneda/)** - **Unofficial head of the Council of Elders** & **Leader** of the [Sect of the Revealing Light](#RevealingLight). | **[bio:Sartor Mithus](/bio_sartor-mithus/)** - Member of the [Sect of the Bright Hope](#BrightHope). | **[bio:Spurius Ravilla](/bio_spurius-ravilla/)** - Member of the [Sect of the Revealing Light](#RevealingLight). | **[bio:Bernard Tubero](/bio_bernard-tubero/)** - **Leader** of the [Sect of the Bright Hope](#BrightHope). | [#](#NurturingLight)The Nurturing Light | [#](#RevealingLight)The Revealing Light | [#](#BrightHope)Bright Hope | [#](#Walker)Walker | [#](#Acolyte)Acolyte | Apprentice *(highest ranking before Shepherd/Guide/Comforter)* | Novice | Initiate-Elect | Initiate | [#](#Festivals)Festivals | [#](#Palilia)Palilia | [#](#Armilustrium)Armilustrium | [#](#Lupercalia)Lupercalia | [#](#Feralia)Feralia
- Legacy anchors: 13 -> 13

### docs/stats.md
- Size: 16936 -> 16612 (1.9% shrink)
- Headings: 28 -> 28
- Missing headings: [#](#Agility)Agility | [#](#Appearance)Appearance | [#](#Charisma)Charisma | [#](#Dexterity)Dexterity | [#](#Empathy)Empathy | [#](#Endurance)Endurance | [#](#Judgement)Judgement | [#](#Memory)Memory | [#](#Perception)Perception | [#](#Reasoning)Reasoning | [#](#Speed)Speed | [#](#Strength)Strength | [#](#Willpower)Willpower | [#](#trainingcourses)The Training Courses | Location: [Vetallun](/vetallun/) | [#](#numerics)Numeric Equivalents | [#](#improvingattributes)Improving Attributes | [#](#naturalatt)Natural Attribute Increases | [#](#temporarymods)Temporary Modifiers
- Legacy anchors: 21 -> 20
- Missing anchors: RolePointPurchases | RolePoint Purchases

### docs/avros-one-handed-swords.md
- Size: 12432 -> 5698 (54.2% shrink)
- Headings: 14 -> 5
- Missing headings: Avros Dueling Stance  *duel* | Avros Rapid Strike  *rstrike <target>* | Avros Forced Thrust  *fthrust <target>* | Avros Needle Strike  *needlestrike <target>* | Avros Stab and Slash  *sslash <target>* | Avros Whirling Strike  *whirl <target>* | Avros Pivot Lunge  *pivot <target>* | Avros Flailing Defense  *distract <target>* | Avros Flinging Disarm  *fling <gladius>* | Avros Sunrise Block
- Legacy anchors: 11 -> 2
- Missing anchors: Dueling, Rapid, Forced, Needle, Stab, Whirling, Pivot, Flailing, Flinging

### docs/jewelry-guide.md
- Size: 17457 -> 17497 (-0.2% shrink)
- Headings: 56 -> 39
- Missing headings: Form the wax piece. | Create a clay mold from the wax form. | Bake the mold. | Smelt the required metal. | Cast the metal into the prepared mold. | Perform any additional recipe steps. | Optionally engrave the finished jewelry. | Optionally set compatible gemstones. | Hot-working metal into the required stock. | Cold-working the stock into components. | Assembling components when required. | Engraving the finished piece, if supported. | Setting gemstones, if supported. | Layout the intended cut. | Rough cut the stone. | Shape the required facets. | Polish the finished gemstone.
- Legacy anchors: 0 -> 0

### docs/rp-expenditure.md
- Size: 14756 -> 14600 (1.1% shrink)
- Headings: 29 -> 29
- Missing headings: Rp Expenditure | [#](#Creature)Creature Button Pushes | [#](#moveCharacter)[5] Exchange Character Order on Playlist | [#](#NPC)[10] Create a Playable NPC character | [11] Purchase a Veteran character package | [#](#logout)[12] Custom Logout Message | [#](#superior)[15] Superior Weapon Upgrade | [#](#properties)Property | [#](#store)Store (Package) Purchase | [#](#club-house)Club House (Package) Purchase | [#](#fixture)Permanent Light Fixture | [#](#alteration)Room Alteration | [#](#keying)Quick Keying Door | [#](#room)Additional Room | [#](#npc)Additional NPC | [#](#customItem)Custom Item
- Legacy anchors: 14 -> 14

### docs/cult-of-ereal.md
- Size: 18046 -> 17859 (1.0% shrink)
- Headings: 36 -> 29
- Missing headings: [#](#High-Priest)High Priest | [#](#High-Priest-Proxy)High Priest’s Proxy | **[bio:Titus Ahala](/bio_titus-ahala/)** - Member of the [Sect of the Bright Hope](#BrightHope). | **[bio:Albius Anande](/bio_albius-anande/)** - Member of the [Sect of the Revealing Light](#RevealingLight). | **[bio:Drusus Rustius](/bio_drusus-rustius/)** - **Leader** of the [Sect of the Nuturing Light](#NurturingLight). | **[bio:Jarin Seneda](/bio_jarin-seneda/)** - **Unofficial head of the Council of Elders** & **Leader** of the [Sect of the Revealing Light](#RevealingLight). | **[bio:Sartor Mithus](/bio_sartor-mithus/)** - Member of the [Sect of the Bright Hope](#BrightHope). | **[bio:Spurius Ravilla](/bio_spurius-ravilla/)** - Member of the [Sect of the Revealing Light](#RevealingLight). | **[bio:Bernard Tubero](/bio_bernard-tubero/)** - **Leader** of the [Sect of the Bright Hope](#BrightHope). | [#](#Festivals)Festivals | [#](#Palilia)Palilia | [#](#Armilustrium)Armilustrium | [#](#Lupercalia)Lupercalia | [#](#Feralia)Feralia
- Legacy anchors: 7 -> 7

### docs/customization-guide.md
- Size: 25765 -> 25758 (0.0% shrink)
- Headings: 32 -> 23
- Missing headings: [#](#Alterations)Item Alterations | The character this request is for: | The item’s name (short description) and long description (look) | The item’s location: It’s easiest if you deposit your item and any components in a sack in your bank account, or keep it on you. Otherwise, submit your request from the item’s location (if it’s in your bedroom, for example). Regardless, let us know where we can find it! | Optional: Which bank account you want the coin withdrawn from (by default, it is withdrawn from Seneda’s forum bank). | [#](#Props)Custom Roleplay Prop | [#](#gearAlteration)Gear Alteration Package | [#](#CustomItems)Custom Items (Armor, Weapon, Face covers) | The character this request is for | The type of item you are requesting (e.g. “a superior retalq gladius”) | The name (short description) and long description (look) | The location of any components you are supplying | Optional: Which bank account you want the coin withdrawn from (by default, it is withdrawn from Seneda’s forum bank). | [#](#Makeovers)Character Makeovers / Custom Descriptions
- Legacy anchors: 5 -> 5

### docs/character-condition.md
- Size: 12811 -> 12677 (1.0% shrink)
- Headings: 19 -> 19
- Missing headings: [#](#HP)Health Points | [#](#Coma)Coma | [#](#Nourishment)Nourishment | [#](#Hunger)Hunger | [#](#Thirst)Thirst | [#](#Load)Encumbrance | [#](#Wounds)Wounds | [#](#Bleeding)Bleeding | [#](#Fatigue)Fatigue | [#](#Sanity)Sanity | [#](#Recovery)Recuperation | [#](#Position)Position | [#](#Temperature)Body Temperature
- Legacy anchors: 15 -> 15

### docs/languages.md
- Size: 6483 -> 6515 (-0.5% shrink)
- Headings: 18 -> 11
- Missing headings: [#](#Learning)Learning Languages | **Approach the desk attendant**: Once inside the library, type app desk to approach the library attendant. | **Ask about your language of choice** | **Study with your tutor:** When you are with your language tutor, they will say a phrase and you will need to repeat it using the 'echo <tutor>' command to earn language SP. With enough practice, you will gain enough proficiency to rank up in the language. | **Depart:** Your tutor will conclude your lesson after you have had 20 lessons that *(real-life)* day. If you would like to leave early, tell your tutor **"Let me out"** or **"I'm ready to leave"**. | [#](#Success)Mastering Languages | [#](#Blackroot)Rock Valley - Blackroot Teacher | **Knock on the door to enter.** | **Study with your tutor:** When you are with a tutor, echo what he says ("echo man"). If you are successful, and with enough practice, you will gain some proficiency in the language. | **Depart:** Your tutor will conclude your lesson after you have had 20 lessons that *(real-life)* day. If you would like to leave early, tell your tutor **"Let me out"** or **"I'm ready to leave"**. | [#](#Kelestian)Monlon - Kelestian Healer | [#](#Lingo)Steps - Steps Lingo Teacher
- Legacy anchors: 5 -> 5

### docs/skills.md
- Size: 16811 -> 16646 (1.0% shrink)
- Headings: 25 -> 25
- Missing headings: [#](#SP)Skill Points (SP) | [#](#EarningSP)Earning SP | [#](#rollover) Rollover SP | [#](#glean) Gleaning | [#](#dummy) Practice Dummy | [#](#GSP) General Skill Points (GSP) | [#](#Learning) Learning Skills | [#](#SelfTraining)Self-Training | [#](#RB) Rank Bonus (RB) | [#](#Combat)Combat Skill Sets | [#](#NonCom)Non-Combat Skill Sets
- Legacy anchors: 12 -> 12

### docs/faq.md
- Size: 3510 -> 3530 (-0.6% shrink)
- Headings: 20 -> 12
- Missing headings: [#](#about)About | Unmatched **real-time** strategic **combat** mechanics. | A very **large and immersive game world**, set in the Roman era. | **Mandatory role play**. | Classless **skill system** that allows players to **craft their own playstyle** and distinct personas. | [#](#account)Account | Check the **[Latest Updates](//#LatestUpdates)** section of this Wiki. | Forward all in-game mail messages to your **email** inbox by using the @email command in the WA. | Subscribe to the official **TEC Newsletter**: https://mailchi.mp/e15b15d2c6d3/tec-email-subscription . | Visit the official **TEC Forums**: https://www.eternalcitygame.com/index.php/community/ | [#](#IG)In-Game
- Legacy anchors: 4 -> 4

### docs/reputation.md
- Size: 27803 -> 27655 (0.5% shrink)
- Headings: 10 -> 34
- Missing headings: [#](#Franlius)Franlius | [#](#Monlon)Monlon | [#](#Seld)Seld | [#](#Stromheim)Stromheim | [#](#Aralex)Aralex Eggs | [#](#Gangs)Gang | [#](#CoE)Cult of Ereal | [#](#Krimalus)Krimalus | [#](#Herbalism)Herbalism
- Legacy anchors: 20 -> 20

### docs/tailoring-guide.md
- Size: 16953 -> 15477 (8.7% shrink)
- Headings: 22 -> 21
- Missing headings: [#](#Tools)Tools | [#](#Fabric)Fabric | [#](#Fabric)Fabric Chart | [#](#Thread)Thread | [#](#Clothing)Create Clothing | [#](#HandlingCloth)Handling Cloth | [#](#Stitching)Stitching (Patterns | Edging) | [#](#Jobs)Jobs
- Legacy anchors: 10 -> 10

### docs/newbie-mission-guide.md
- Size: 7180 -> 7143 (0.5% shrink)
- Headings: 9 -> 10
- Missing headings: [#](#JunkDiver)Dumpster Diving - Quartz Heights | [#](#RottenApples)Rotten Apples - Vetallun Orchard | [#](#BarrelRepair)Barrel Repair - Vetallun Orchard | [#](#NetMending)Net Mending - Iridine Harbor | [#](#Milling)Milling Flour - Iridine | [#](#Diving)Clams Diving - Signal Tower Island | [#](#Salt)Salt Harvesting | [#](#Mining)Stone Mining
- Legacy anchors: 8 -> 8

### docs/herbalism-guide.md
- Size: 17062 -> 16403 (3.9% shrink)
- Headings: 25 -> 24
- Missing headings: [#](#Tools)Tools | [#](#Containers)Containers | [#](#Brewing)Brewing - Fundamentals | [#](#BrewingPaint)Brewing - Paint | [#](#BrewingFlasks)Brewing - Flask | [#](#BrewingSalves)Brewing - Salve | [#](#BrewingPotions)Brewing - Potions
- Legacy anchors: 10 -> 10

### docs/hunting-grounds.md
- Size: 16328 -> 16054 (1.7% shrink)
- Headings: 20 -> 20
- Missing headings: [#](#Iridine)City of Iridine | [#](#Rock-Valley)Rock Valley | [#](#Invex)Invex River Delta | [#](#East)East of Invex River | [#](#Swamps)The Salinae Swamps | [#](#Franlius)Franlius | [#](#Monlon)Monlon
- Legacy anchors: 7 -> 7

### docs/newbie-combat-guide.md
- Size: 13346 -> 13357 (-0.1% shrink)
- Headings: 19 -> 12
- Missing headings: Find the nearest [Practice Dummy](/skills/#dummy) and begin by approaching it and [ATTACK DUMMY](/skills/#EarningSP) until you earn 1,000 SP (total) or 250 combat ranks (total), whichever comes first. These are the current caps used for training on practice dummies. | Locate your trainer and learn the easiest attacks first to 1, then spend the remaining on average attacks. | Proceed to [Signal Tower Island](/signal-tower-island/) until you gain enough Skill Points to raise your basics to 10 and all attacks available to you to 10. | Continue to train at the island and learn Combat Maneuvers and Sidestep, Dodge, Duck, Jump, Leg Dodge, and Swaying Dodge to 10. | Acquire armor to cover your shins, waist and chest, thighs, shoulders, and head (the Auxilii can help with this). | Proceed to the Ludus and take an aggressive or berserk stance against the slaves in the southern portion | Train as mentioned above and continue until you are proven too worthy of the southern, tier 1, opponents.
- Legacy anchors: 0 -> 0

### docs/veteran-characters.md
- Size: 67664 -> 65825 (2.7% shrink)
- Headings: 21 -> 49
- Missing headings: They can be **purchased using Role Points** (RPs). The costs to purchase are listed below. | They can be **received "randomly" for free** (e.g. via [@perks](/account/#Perks) or parchment event). | They can be **received in exchange for 'retiring' your existing character**. The level of the received  VC package is calculated based on character age, RPs spent, and total skill points earned. If the character being retired was a VC themself, it defaults to the higher value between the original VC level and the new package calculation, with the max level for @retire being VC19. You can check what level your character qualifies for beforehand using the @vc-level command. | They can be **awarded for free** as the result of **your character's death in a storyline (e.g. @chop) or a [character Player-Kill (PK)](/pvp/#PKs)**. The VC level awarded from an @chop may be above VC19 if determined by the staff. | Purchase: | Lobby Veteran Character Lobby
- Legacy anchors: 13 -> 13

### docs/religion.md
- Size: 5601 -> 5585 (0.3% shrink)
- Headings: 11 -> 10
- Missing headings: [#](#Ereal)Ereal | [#](#Ravan)Ravan | [#](#Lucifal)Lucifal | [#](#Aera)Aera | [#](#Invex)Invex | [#](#Helia)Helia
- Legacy anchors: 6 -> 6

### docs/services.md
- Size: 6590 -> 6847 (-3.9% shrink)
- Headings: 22 -> 22
- Missing headings: [#](#Buyers)Buyers | [#](#Gem-Buyer)Gem Buyers | [#](#Inns)Innkeepers | [#](#Healers)Healers | [#](#Vendors)Vendors | [#](#property)Property
- Legacy anchors: 7 -> 7

### docs/rock-valley-region.md
- Size: 11560 -> 12135 (-5.0% shrink)
- Headings: 15 -> 16
- Missing headings: [#](#Aziri) The Aziri Tribe | [#](#Lokeen) The Lokeen Tribe | [#](#Nehal) The Nehal Tribe | [#](#Resting-Place)The Resting Place | [#](#Burial-Grounds)The Burial Grounds | [#](#Broken-Tower)Broken Tower
- Legacy anchors: 8 -> 8

### docs/account.md
- Size: 18039 -> 17482 (3.1% shrink)
- Headings: 9 -> 15
- Missing headings: [#](#AccountSub)Account Subscriptions | [#](#RolePoints)Role Points (RPs) | [#](#Storypoints)StoryPoints (StPs) | [#](#Perks)Perks
- Legacy anchors: 10 -> 10
- Missing anchors: requests-property

### docs/flora-fauna.md
- Size: 23401 -> 23362 (0.2% shrink)
- Headings: 6 -> 154
- Missing headings: [#](#Animals)Animals | [#](#Fish)Fish | [#](#Plants)Plants | [#](#Trees)Trees | [#](#Fruit)Fruit
- Legacy anchors: 6 -> 6

### docs/locksmithing-guide.md
- Size: 16588 -> 15200 (8.4% shrink)
- Headings: 24 -> 23
- Missing headings: [#](#Lockpicks)Lockpicks (& keys) | [#](#Forging)Forging *(Key | Lockpick)* | [#](#Etching)Etching | [#](#Jobs)Jobs
- Legacy anchors: 4 -> 4

### docs/herbalism.md
- Size: 10963 -> 10442 (4.8% shrink)
- Headings: 18 -> 16
- Missing headings: Lemon Juice @<&#124;>@ Yellow fruit with a thick peel  2 | Rose Incense @<&#124;>@ Blossoming red flower 20 | Craft Vessel  *craft [jar@<&#124;>@flask@<&#124;>@bottle@<&#124;>@vial] [from@<&#124;>@with] <clay>* | Volume Estimation  *estimate <liquid@<&#124;>@powder@<&#124;>@container>*
- Legacy anchors: 12 -> 12

### docs/property.md
- Size: 4468 -> 4428 (0.9% shrink)
- Headings: 8 -> 8
- Missing headings: [#](#domus)Domus | [#](#store)Store | [#](#club-house)Club House | [#](#transfers)Property Transfers
- Legacy anchors: 4 -> 4

### docs/praetor.md
- Size: 13790 -> 13731 (0.4% shrink)
- Headings: 27 -> 22
- Missing headings: Press **Esc** | Choose **Display & Behavior**, then **Settings** | Untick **Check for updates on startup** | **Save**
- Legacy anchors: 0 -> 0

### docs/political-factions.md
- Size: 4433 -> 4436 (-0.1% shrink)
- Headings: 15 -> 15
- Missing headings: [#](#Anande)Anande Faction | [#](#Calsuan)Calsuan Faction | [#](#Allende)Allende Faction | [#](#Independents)Independents
- Legacy anchors: 4 -> 4

### docs/staves-guide.md
- Size: 6422 -> 6430 (-0.1% shrink)
- Headings: 23 -> 19
- Missing headings: Staves Guide *(in progress)* | From another player | In the VC creation lobby | One of 2 NPC trainers.
- Legacy anchors: 0 -> 0

### docs/praetor-scripts.md
- Size: 17435 -> 17475 (-0.2% shrink)
- Headings: 25 -> 20
- Missing headings: Press **Esc** | Choose **Automation**, then **Quick-Cycle Modes** | Toggle the modes you want in the cycle | **Save**
- Legacy anchors: 2 -> 2

### docs/wealth.md
- Size: 3499 -> 3519 (-0.6% shrink)
- Headings: 12 -> 11
- Missing headings: [#](#Iridine)Iridinian Currency | [#](#Nehal)Nehal Currency | [#](#Cinera)Cineran Currency | [#](#banking)Banking
- Legacy anchors: 5 -> 5

### docs/index.md
- Size: 3851 -> 20745 (-438.7% shrink)
- Headings: 8 -> 9
- Missing headings: Homepage | [#](#LatestUpdates)Latest Updates | [#](#WhatsNew)What's New In-Game
- Legacy anchors: 3 -> 3

### docs/search_site.md
- Size: 585 -> 186 (68.2% shrink)
- Headings: 2 -> 1
- Missing headings: Search Site | Search The Eternal City Wiki
- Legacy anchors: 0 -> 0

### docs/leather-working.md
- Size: 14568 -> 12910 (11.4% shrink)
- Headings: 19 -> 18
- Missing headings: Layout Leather  *TBD*
- Legacy anchors: 15 -> 14
- Missing anchors: Layout-Leather

### docs/republic-of-iridine.md
- Size: 8539 -> 8519 (0.2% shrink)
- Headings: 11 -> 11
- Missing headings: [#](#Politics)Politics | [#](#Law)Laws
- Legacy anchors: 2 -> 2

### docs/ckf-guide.md
- Size: 3120 -> 3141 (-0.7% shrink)
- Headings: 19 -> 18
- Missing headings: CKF Guide *(in progress)* | [#](#fhbh)Forehand / Backhand
- Legacy anchors: 1 -> 1

### docs/announcements.md
- Size: 2005 -> 1380 (31.2% shrink)
- Headings: 3 -> 3
- Missing headings: [#](#promos)Monthly Promotions
- Legacy anchors: 1 -> 1

### docs/whips-guide.md
- Size: 3445 -> 3349 (2.8% shrink)
- Headings: 16 -> 15
- Missing headings: Whips Guide *(in progress)*
- Legacy anchors: 0 -> 0

### docs/game-world.md
- Size: 3393 -> 3308 (2.5% shrink)
- Headings: 7 -> 7
- Missing headings: [#](#realms)Realms of Midlight
- Legacy anchors: 2 -> 2

### docs/tailoring.md
- Size: 34072 -> 33431 (1.9% shrink)
- Headings: 16 -> 16
- Missing headings: [#](#FabricChart)Fabric Chart
- Legacy anchors: 13 -> 13

### docs/healing-guide.md
- Size: 10079 -> 10003 (0.8% shrink)
- Headings: 23 -> 26
- Missing headings: Healing Guide (in progress)
- Legacy anchors: 0 -> 0

### docs/2022-10-14-ama.md
- Size: 178135 -> 178204 (-0.0% shrink)
- Headings: 2 -> 2
- Missing headings: October 14^^th^^, 2022 - Ask Me Anything
- Legacy anchors: 0 -> 0

### docs/bio_tulca-i.md
- Size: 2050 -> 2049 (0.0% shrink)
- Headings: 2 -> 2
- Missing headings: Tulca - 1^^st^^ King of Iridine
- Legacy anchors: 0 -> 0

### docs/bio_tulca-ii.md
- Size: 1044 -> 1044 (0.0% shrink)
- Headings: 2 -> 2
- Missing headings: Tulca II - 5^^th^^ King of Iridine
- Legacy anchors: 0 -> 0

### docs/monlon-invasion.md
- Size: 8998 -> 9002 (-0.0% shrink)
- Headings: 5 -> 4
- Missing headings: Monlon Invasion!
- Legacy anchors: 0 -> 0

### docs/contraband.md
- Size: 6233 -> 6238 (-0.1% shrink)
- Headings: 8 -> 8
- Missing headings: [#](#Tears)Tears
- Legacy anchors: 1 -> 1

### docs/gmmeeting01102021.md
- Size: 28980 -> 29045 (-0.2% shrink)
- Headings: 2 -> 2
- Missing headings: GM Meeting - October 1^^st^^, 2021
- Legacy anchors: 0 -> 0

### docs/magic.md
- Size: 8880 -> 8894 (-0.2% shrink)
- Headings: 12 -> 12
- Missing headings: [#](#sanity)Sanity
- Legacy anchors: 1 -> 1

### docs/town-hall-meeting-03-27-2020.md
- Size: 26919 -> 26995 (-0.3% shrink)
- Headings: 2 -> 2
- Missing headings: March 27^^th^^, 2020 - Town Hall Meeting
- Legacy anchors: 0 -> 0

### docs/bio_parsos-emrial.md
- Size: 1403 -> 1409 (-0.4% shrink)
- Headings: 2 -> 2
- Missing headings: Parsos Emrial - 6^^th^^ King of Iridine
- Legacy anchors: 0 -> 0

### docs/history.md
- Size: 14377 -> 14434 (-0.4% shrink)
- Headings: 12 -> 12
- Missing headings: [#](#timeline)Timeline
- Legacy anchors: 2 -> 2

### docs/outdoor-survival.md
- Size: 33248 -> 33384 (-0.4% shrink)
- Headings: 29 -> 29
- Missing headings: Outdoor Climbing  *climb <object@<&#124;>@location>*
- Legacy anchors: 21 -> 21

### docs/law.md
- Size: 5441 -> 5469 (-0.5% shrink)
- Headings: 5 -> 5
- Missing headings: [#](#Lawkeepers)Lawkeepers
- Legacy anchors: 1 -> 1

### docs/falx.md
- Size: 15946 -> 16040 (-0.6% shrink)
- Headings: 26 -> 26
- Missing headings: Falx Wild Strike
- Legacy anchors: 24 -> 24

### docs/divortium-auxilii.md
- Size: 6004 -> 6049 (-0.7% shrink)
- Headings: 5 -> 5
- Missing headings: [#](#Charter)The Auxilii Charter
- Legacy anchors: 1 -> 1

### docs/pvp.md
- Size: 8286 -> 8342 (-0.7% shrink)
- Headings: 10 -> 10
- Missing headings: [#](#PKs)Player (character) Killing (PKs)
- Legacy anchors: 1 -> 1

### docs/bio_granthulius.md
- Size: 427 -> 431 (-0.9% shrink)
- Headings: 2 -> 2
- Missing headings: Granthulius - 2^^nd^^ King of Iridine
- Legacy anchors: 0 -> 0

### docs/falcata-guide.md
- Size: 5553 -> 5601 (-0.9% shrink)
- Headings: 17 -> 17
- Missing headings: [#](#Weapons)Weapons
- Legacy anchors: 1 -> 1

### docs/nav-overview.md
- Size: 7373 -> 7438 (-0.9% shrink)
- Headings: 17 -> 17
- Missing headings: [#](#Fast-Wagon)*(Fast-Travel)* Wagons
- Legacy anchors: 2 -> 2

### docs/one-handed-axes-guide.md
- Size: 5883 -> 5934 (-0.9% shrink)
- Headings: 19 -> 18
- Missing headings: One-Handed Axes Guide
- Legacy anchors: 0 -> 0

### docs/senate.md
- Size: 1987 -> 2004 (-0.9% shrink)
- Headings: 3 -> 2
- Missing headings: [#](#Cursus-Honorum)Cursus Honorum
- Legacy anchors: 1 -> 1

### docs/one-handed-swords-guide.md
- Size: 6314 -> 6380 (-1.0% shrink)
- Headings: 17 -> 17
- Missing headings: [#](#Weapons)Weapons
- Legacy anchors: 1 -> 1

### docs/bio_king-vetallun.md
- Size: 420 -> 425 (-1.2% shrink)
- Headings: 2 -> 2
- Missing headings: Vetallun  - 3^^rd^^ King of Iridine
- Legacy anchors: 0 -> 0

### docs/kelestia.md
- Size: 1544 -> 1567 (-1.5% shrink)
- Headings: 9 -> 8
- Missing headings: [#](#combat)Combat & Martial Arts
- Legacy anchors: 1 -> 1

### docs/hunting-guide.md
- Size: 1725 -> 1754 (-1.7% shrink)
- Headings: 20 -> 19
- Missing headings: Hunting Guide (in progress)
- Legacy anchors: 1 -> 1

### docs/bio_quintus-the-marauder.md
- Size: 639 -> 651 (-1.9% shrink)
- Headings: 2 -> 2
- Missing headings: Quintus the Marauder - 4^^th^^ King of Iridine
- Legacy anchors: 0 -> 0

### docs/cestus-guide.md
- Size: 1893 -> 1930 (-2.0% shrink)
- Headings: 17 -> 16
- Missing headings: Cestus Guide (in progress)
- Legacy anchors: 0 -> 0

### docs/ut-jor.md
- Size: 1625 -> 1662 (-2.3% shrink)
- Headings: 8 -> 7
- Missing headings: Ut-Jor
- Legacy anchors: 0 -> 0

### docs/outdoor-survival-guide.md
- Size: 1184 -> 1213 (-2.4% shrink)
- Headings: 17 -> 16
- Missing headings: Outdoor Survival Guide *(in progress)*
- Legacy anchors: 0 -> 0

### docs/weapons.md
- Size: 1186 -> 1215 (-2.4% shrink)
- Headings: 3 -> 3
- Missing headings: [#](#Reforge)Reforging (Ferrarius)
- Legacy anchors: 1 -> 1

### docs/specialty-items.md
- Size: 807 -> 856 (-6.1% shrink)
- Headings: 2 -> 2
- Missing headings: [#](#Reforge)Reforging (Ferrarius)
- Legacy anchors: 1 -> 1

### docs/players-guide.md
- Size: 189 -> 232 (-22.8% shrink)
- Headings: 2 -> 1
- Missing headings: Player's Guide
- Legacy anchors: 0 -> 0

### docs/character-bios.md
- Size: 196 -> 48826 (-24811.2% shrink)
- Headings: 2 -> 1
- Missing headings: Submit a Bio
- Legacy anchors: 0 -> 0

### docs/money-calculator.md
- Size: 27136 -> 793 (97.1% shrink)
- Headings: 1 -> 2
- Legacy anchors: 0 -> 0

### docs/shops.md
- Size: 25717 -> 1041 (96.0% shrink)
- Headings: 1 -> 1
- Legacy anchors: 0 -> 0

### docs/rank-bonus-calculator.md
- Size: 35699 -> 2972 (91.7% shrink)
- Headings: 6 -> 6
- Legacy anchors: 0 -> 0

### docs/test.md
- Size: 1412 -> 412 (70.8% shrink)
- Headings: 4 -> 4
- Legacy anchors: 0 -> 0

### docs/legal_start.md
- Size: 154 -> 66 (57.1% shrink)
- Headings: 1 -> 1
- Legacy anchors: 0 -> 0

### docs/modules-reference.md
- Size: 169 -> 78 (53.8% shrink)
- Headings: 1 -> 1
- Legacy anchors: 0 -> 0

### docs/legal_terms-of-use.md
- Size: 161 -> 80 (50.3% shrink)
- Headings: 1 -> 1
- Legacy anchors: 0 -> 0

### docs/legal_privacy-policy.md
- Size: 163 -> 84 (48.5% shrink)
- Headings: 1 -> 1
- Legacy anchors: 0 -> 0

### docs/one-handed-crushing-guide.md
- Size: 10897 -> 5767 (47.1% shrink)
- Headings: 6 -> 6
- Legacy anchors: 0 -> 0

### docs/historic-map-marnevel-iridine.md
- Size: 4076 -> 3069 (24.7% shrink)
- Headings: 19 -> 19
- Legacy anchors: 0 -> 0

### docs/news-forum.md
- Size: 896 -> 678 (24.3% shrink)
- Headings: 6 -> 6
- Legacy anchors: 0 -> 0

### docs/historic-map-marnevel-monlon.md
- Size: 1216 -> 928 (23.7% shrink)
- Headings: 7 -> 7
- Legacy anchors: 0 -> 0

### docs/historic-map-marnevel-the-steps.md
- Size: 1609 -> 1264 (21.4% shrink)
- Headings: 8 -> 8
- Legacy anchors: 0 -> 0

### docs/historic-map-pepaquest-iridine.md
- Size: 1902 -> 1496 (21.3% shrink)
- Headings: 17 -> 17
- Legacy anchors: 0 -> 0

### docs/newbie-non-combat-guides.md
- Size: 518 -> 414 (20.1% shrink)
- Headings: 3 -> 3
- Legacy anchors: 0 -> 0

### docs/humanoids.md
- Size: 5285 -> 4260 (19.4% shrink)
- Headings: 11 -> 11
- Legacy anchors: 7 -> 7

### docs/historic-map-marnevel-rock-valley.md
- Size: 1196 -> 973 (18.6% shrink)
- Headings: 6 -> 6
- Legacy anchors: 0 -> 0

### docs/historic-map-marnevel-far-east.md
- Size: 960 -> 794 (17.3% shrink)
- Headings: 5 -> 5
- Legacy anchors: 0 -> 0

### docs/historic-map-marnevel-salinae.md
- Size: 665 -> 558 (16.1% shrink)
- Headings: 4 -> 4
- Legacy anchors: 0 -> 0

### docs/historic-map-marnevel-vetallun-blackvine.md
- Size: 1001 -> 845 (15.6% shrink)
- Headings: 5 -> 5
- Legacy anchors: 0 -> 0

### docs/historic-map-marnevel-iridine-outskirts.md
- Size: 1011 -> 854 (15.5% shrink)
- Headings: 5 -> 5
- Legacy anchors: 0 -> 0
