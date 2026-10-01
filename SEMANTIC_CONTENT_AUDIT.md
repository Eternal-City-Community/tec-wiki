# Semantic content audit

Compares prose in the initial migration import against current pages while ignoring tables, headings, raw HTML, and code blocks.

- Flagged pages: **153**

## docs/rank-bonus-calculator.md
- Missing substantive prose lines: **133**
- font-family: verdana, arial, helvetica, sans-serif;
- / Smooth addition when clicking the + button /
- transition: background-color 0.25s, opacity 0.25s;
- div.sword-icon { background-image: url("https://eternal-city.wikidot.com/local--files/rank-bonus-calculator/swords.png"); }
- div.shield-icon { background-image: url("https://eternal-city.wikidot.com/local--files/rank-bonus-calculator/shield.png"); }
- div.tree-icon { background-image: url("https://eternal-city.wikidot.com/local--files/rank-bonus-calculator/tree.png"); }
- div.three-col-icon { background-image: url("https://eternal-city.wikidot.com/local--files/rank-bonus-calculator/three-column.png"); }
- div.five-col-icon { background-image: url("https://eternal-city.wikidot.com/local--files/rank-bonus-calculator/five-column.png"); }
- div.five-row-icon { background-image: url("https://eternal-city.wikidot.com/local--files/rank-bonus-calculator/five-row.png"); }
- div.three-row-icon { background-image: url("https://eternal-city.wikidot.com/local--files/rank-bonus-calculator/three-row.png"); }
- div.one-row-icon { background-image: url("https://eternal-city.wikidot.com/local--files/rank-bonus-calculator/one-row.png"); }
- table.rb-rank-inputs { width: 100%; height: 100%; }
- table.rb-rank-inputs tr td { padding: 5px; text-align: center; }
- table.rb-rank-inputs input:focus { outline: 2px solid 333; }
- table.rb-rank-bonuses tr td { padding: 3px 0.2em 2px 0.2em; }
- table.rb-rank-bonuses tr.rb-table-headers td { padding-top: 0; }
- table.rb-rank-bonuses input:focus { outline: none; }
- table.rb-rank-bonuses tr td.offensive-stance,
- table.rb-rank-bonuses tr td.defensive-stance {
- table.rb-rank-bonuses tr td.defensive-stance { display: none; }

## docs/shops.md
- Missing substantive prose lines: **132**
- This page originally included `franlius-notice` on Wikidot. The transcluded content still needs review.
- //SHOPDATA is defined in the shopinventories text file. You must edit the file if you want to update any shop details.
- //The most recent version of this file is shopinventories20260326.txt (last updated by Dragonus).
- //Unfortunately it had to be stored in a separate file because otherwise it exceeded the Wikidot page character limit.
- //If you want to edit the file but you can't figure it out, feel free to ask Irisa for help.
- var locationMatch, shopNameMatch, itemMatch, i, m;
- var locationRegex = new RegExp(/^\s\\\([^\]+)\\\(?:\s\[\swikipage\s=\s(.+)\s\])?/); //[1]=location name [2]=wikipage
- var shopNameRegex = new RegExp(/^\s---((?:(?!\().)+?)\s(?:\(([^\)]+)\))?---(?:\s\[.(rotating.stock).\])?/); //[1]=shop name [2]=shopkeeper [3]=rotating stock tag
- var itemRegex = new RegExp(/^\s((?:(?!---|\\\)[^\n])+?)\s((?:\d+(?:t|d|st|s| tokens)\b\s)+)\s(?:\[\s([^\]]+?)\s\]\s)?$/); //[1]=item [2]=price [3]=options
- var shopTbl = document.getElementById("shop-table").getElementsByTagName("tbody")[0];
- if (shopInfo[i].trim().length === 0) { continue; } //skip empty lines
- if (m) { itemMatch = m; addShopTableRow(shopTbl, locationMatch, shopNameMatch, itemMatch); }
- if (m) { shopNameMatch = m; addShopTableRow(shopTbl, locationMatch, shopNameMatch); }
- if (m) { locationMatch = m; addShopTableRow(shopTbl, locationMatch); }
- function addShopTableRow(tbl, locObj, shopObj, itemObj) {
- var header, tr, td1, td2, td3, td4, div, span, a;
- if (locObj === undefined) { return; } //error
- header.appendChild(document.createTextNode(locObj[1]));
- } else if (itemObj === undefined) { //shop name
- header.appendChild(document.createTextNode(shopObj[1] + (shopObj[2] ? (" - " + shopObj[2]) : "")));

## docs/money-calculator.md
- Missing substantive prose lines: **72**
- function convertAllToSens(sens,sterces,denars,cents,talents) {
- var inSens = sens + sterces coinValuesInSens['sterce'] + denars coinValuesInSens['denar'] + cents coinValuesInSens['cent'] + talents coinValuesInSens['talent'];
- function convertSensToArrayOfCoins(sens,maxCoinTypeNameIndex) {
- maxCoinTypeNameIndex = parseFloat(maxCoinTypeNameIndex);
- if (isNaN(maxCoinTypeNameIndex) || !coinTypeNames[maxCoinTypeNameIndex]) {
- /alert("maxCoinTypeNameIndex not passed valid value:"+maxCoinTypeNameIndex);/
- maxCoinTypeNameIndex = coinTypeNames.length - 1;
- for (var i = coinTypeNames.length - 1; i >= 0; i--) {
- if (i > maxCoinTypeNameIndex) {coins[coinTypeNames[i]] = 0; continue;};
- coins[coinTypeNames[i]] = truncateDecimals(sens / coinValuesInSens[coinTypeNames[i]],0);
- sens -= coins[coinTypeNames[i]] coinValuesInSens[coinTypeNames[i]];
- // add any remaining (fractional) sen to total:
- var talentsGiven = document.getElementsByName('talentsGiven');
- var centsGiven = document.getElementsByName('centsGiven');
- var denarsGiven = document.getElementsByName('denarsGiven');
- var stercesGiven = document.getElementsByName('stercesGiven');
- var sensGiven = document.getElementsByName('sensGiven');
- var multipliersGiven = document.getElementsByName('multipliersGiven');
- var calculatedInSens = document.getElementsByName('calculatedInSens');
- var calculatedInSterces = document.getElementsByName('calculatedInSterces');

## docs/herbalism-guide.md
- Missing substantive prose lines: **44**
- Tiny winkled black seedpod (20) ||= Mortar & Pestal ||= 20 Ranks in Brew Fundamentals ||
- Ridged brilliant red mushroom cap (5) ||= Mortar & Pestal ||= 30 Ranks in Brew Fundamentals ||
- Ridged brilliant red mushroom cap (5) ||= Boiling Pot
- Water ||= red|XX Ranks in Brew Fundamentals ||
- Ridged brilliant red mushroom cap (50) ||= Boiling Pot
- Water ||= red|XX Ranks in Brew Fundamentals ||
- Tiny wrinkled black seedpod (50) ||= TBC ||= 10 Ranks in Brew Paint ||
- Piece of lacy red moss speckled with black (50) ||= TBC ||= 10 Ranks in Brew Paint ||
- Long stem covered in small spiky leaves (50) ||= TBC ||= 20 Ranks in Brew Paint ||
- Tiny soft blue flower (50) ||= TBC ||= 30 Ranks in Brew Paint ||
- Semi-transparent grey crystal (25) 🪙 ||= TBC ||= 30 Ranks in Brew Paint ||
- Yellow fruit with a thick peel (5) 🪙 ||= (TBC) Mixing Stick
- Mortar & Pestal ||= red|XX Ranks in Brew Paint ||
- Piece of rough, dark-grey bark (50) ||= TBC ||= red|XX Ranks in Brew Paint ||
- Piece of lacy red moss speckled with black (50)
- Deep yellow flower with red veining (25) ||= TBC ||= red|XX Ranks in Brew Paint ||
- Piece of pale blue moss frosted with white (25) ||= TBC ||= red|XX Ranks in Brew Paint ||
- Enormous brownish-green leaf (25) ||= TBC ||= red|XX Ranks in Brew Paint ||
- Straight brown thorn that is very hard (25) ||= TBC ||= red|XX Ranks in Brew Paint ||
- Long, dark green tri-pointed leaf (25) ||= TBC ||= red|XX Ranks in Brew Paint ||

## docs/traits.md
- Missing substantive prose lines: **24**
- Community Note: [Pickpocketing, Setups & Street Smarts are considered neither combat or non-combat and are unaffected by this trait.]||
- Mutually exclusive with Weak Constitution. ||
- Mutually exclusive with Frail Sensibility. ||
- Mutually exclusive with Lack of Concentration. ||
- Mutually exclusive with Provincial Attitude. ||
- Mutually exclusive with Weak Constitution. ||
- [Community Note: Cost to buy from NPCs is reduced by 3%.]||
- Mutually exclusive with Provincial Attitude. ||
- Community Note: As of 1/5/2024, the self-training calculation scales at higher ranks. See [Self-Training for details.||
- Community Note: Increased SP gain from [tears.]||
- [Community Note: The chance for this to occur is affected by your ranks.] ||
- [Community Note: The standard penalty without this trait is: if you are approached by 2 enemies, they each get +20 to hit you. If you are approached by 3 enemies, they each get +40 to hit you.] ||
- [Community Note: Types of boons include: 10% fatigue recovery, 10% health recovery, satiation recovery & recovery of a random wound. Limited to once per hour.]||
- Mutually exclusive with Worldly Knowledge. ||
- [Community Note: There's a high chance of fainting if you remain standing and little to no chance of fainting if you remain laying.] ||
- Mutually exclusive with Night Vision and Night Owl. ||
- Community Note: Characters also cannot collect/touch [tears and can be stunned by Aziri. ||
- Mutually exclusive with Dursc Constitution. ||
- [Community Note: Characters will, on occasion, wake up up from a nightmare. This will cause the character to remain stunned for a brief period of time, until the nightmare finishes. The character will also suffer a slight HP & Fatigue loss.]||
- Community Note: Remaining in [pitch-black darkness is said to help calm the mind.]||

## docs/bio_serasia.md
- Missing substantive prose lines: **22**
- 'You have grown to be a muse, my dear...and I know it will be the hearts of young warriors, willing to fall upon their swords at your beckon, that will try and woo you..' A smile creased his aged cheeks.
- Blushing lightly she replied, 'Far be it from me to get such attention, but your compliments are well taken Father Lotus. Now, allow me to know why you have called me at this hour? Business of sorts?'
- 'Aye...business. The business of marriage' He looked up at her through his spectacles and smiled yet again. 'Seems Artren Franco, the eligible son of Tresar Franco Isra, has been asking for your hand. We closed out a deal concerning the dowery 2 nights ago, love. Would you care to pick out the maids yourself, or shall I as well?...perhaps it would be quite picturesque to..'
- Seemingly dreamily he kept on with his plans, though she barely paid attention, her breath growing faint, her brow furrowing, her teeth nearly drawing blood as they bit into her lower lip. When he was finally done with his list of 'ideas', he looked at her, his eyes narrowing.
- 'eh.....uh..well of course, sir...just a bit overtaken with all this talk of marriage...p-perhaps I should retire to my chambers, aye?'
- He grumbled slightly and nodded. 'We shall finish our talk at sunrise then'
- She carried her own luggage for the first time through the tall gate of the brilliant palace. Resa waited for her at the other side, a dark woolen shawl tightly gripped about her shoulders.
- The young woman wiped at her tear-stained cheeks and nodded, crumpling into her nurse's arms.
- Mounting the carriage, she was whisked away to the small cottage out in the nearby woods where Resa had lived for so many years. The cottage itself was cozy, a warm fire glowing in the crudely made fireplace. Her room was small by comparison, but dimly lit, with plenty of homespun quilts and pillows on the feather mattress. A small trunk sat by the edge of the bed, an oak dresser in the far corner, a cedar chest by the western wall. On the windows were birch shutters, drawn back slightly, the glass panel lifted to allow a gentle breeze.
- 'Home...' she breathed, as she unpacked her bags, and folded her clothes away.
- Involuntarily she brough her hands to her full belly, her fingertips gliding over the smooth fabric of the yellow apron.
- 'Best name I know in Iridine is...well...Resa' She winked and continued to stir the pot, occassionally dipping her spoon to catch the broth and taste it on her tongue.
- 'You tease me well, Mema' She pondered for a long while and then said, 'If it is a girl, perhaps her name should be Isaria, and if a boy, Dagen..'
- The older woman smiled and nodded. 'Wonderful choice'
- Serasia smiled as well, though her brow furrowed with a troubling flashback...her eyes, haunted.
- 'I'll miss you....' She smiled despite the tears streaming down her weathered cheeks. 'You know I have loved you as my own'
- 'And you know it is returned with all that is in me' Serasia replied, kissing Resa's cheek.
- 'I will not be far from you...merely a few miles. I will see you often, I swear.'
- Her own eyes brimmed as she picked up her hemp bags and slung them over her shoulder.
- 'I am glad you are starting a life, dear. This one will be different. It will be a new morning for you..bright, filled with love, blessings. Be safe and go with God'

## docs/tailoring-guide.md
- Missing substantive prose lines: **22**
- Not available for standard purchase. May be available via request. ||
- Each master recipe will list its related sub-recipes.
- You have to type the full name, no shortcuts.
- Sew two Pouch Squares together to create the pouch body.
- (repeat as needed) || - A master recipe will require multiple pieces/parts.
- Repeat steps 2.1, 2.2, 2.3 & 2.4 as needed to create the appropriate pieces.
- In this example, because we need two (2) pouch squares, we would perform steps 2.1 to 2.3 twice.
- The recipe will tell you how much fabric is required.
- With pattern in-hand (e.g. pouch square pattern).
- The description changes to "a homespun wool cloth laid out for a pouch square".
- The description changes to "a homespun wool cut-out in the shape of a pouch square".
- (if needed) || - Certain sub-recipes require sewing to finish.
- This example does not need it, but if making a shirt, you need to sew a sleeve to itself to complete an individual sleeve.
- With a (threaded) sewing needle & a thimble in-hand.
- Sew two Pouch Squares together to create the pouch body.
- With a (threaded) sewing needle & a thimble in-hand.
- The description changes to "an incomplete neckpouch".
- The description changes to "a homespun wool neckpouch".
- You have to type the full name, no shortcuts.
- The maker's mark allows someone to identify the maker of an item by inspecting it.

## docs/account.md
- Missing substantive prose lines: **21**
- Note: The Welcome Area (WA) does not count as time in-game and you will not gain RPs for being in the WA.||
- Note: The Welcome Area (WA) does not count as time in-game and you will not gain RPs for being in the WA.||
- Each RP award from Staff also counts as points towards "RPer of the Month". (e.g. "You have just been awarded 5 role points.(Sword Night) Good work!" ) ||
- (e.g. 300+ was 3:1 the number, so at 300 you'd get 900 RPS. Lower end was 1:1 and went up to 2:1 around 100) ||
- A Premium Subscription is required for this option. ||
- Sandbar Domus (400) - Includes 6 rooms | Materials: Marble floors & painted plaster walls.
- Rock Valley Domus (500) - Includes 4 rooms | Materials: Painted/Polished timber.
- Blackvine Domus (500) - Includes 5 rooms | Materials: Unfinished timber, stone, and brick.
- Seld Domus (500) - Includes 5 rooms | Materials: Rustic timber, unplastered stone, and brick.
- Steps Domus (500) - Includes 5 rooms | Materials: Aged painted plaster and cracking stone construction.
- Quartz Heights Domus (600) - Includes 7 rooms + an atrium | Materials: Highest-quality marble floors and richly decorated walls. ||
- Once purchased, you'll receive the "domus bath" option in your perks menu. When you're ready to use it, send in an request to get started. (Using the perk will prompt you with the same information).
- The baths can be in a new room (typically by going down, as long as there is space) or they can replace an existing room.
- There is no IG or RP cost to transform/add a new room for a basic bath. If you want to upgrade your basic bath cosmetically, there would be an IC charge for that. ||
- (whichever is higher) for 7 days. This impacts RPs/Hour rate.
- It does not stack with promotional Role Point gain rates, and may only be purchased once per month. ||
- Note: You will get the most out of this purchase if your character has already
- trained and is as close to minimum SP gains this Cycle as possible.
- Community Note: This purchase appears limited to once per month. (30 calendar days)
- A Premium Subscription is required for this option.

## docs/historic-map-marnevel-iridine.md
- Missing substantive prose lines: **18**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/cityofiridine.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/harbour-south.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/harbour-north.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/stonetogainn.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/sirlockestogaroom.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/north-sewers-and-sea-caves.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/riverside-west.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/riverside-east.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/riverside-east.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/bronze-lane.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/colosseum.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/gardens-west.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/gardens-east-and-hospice.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/sandbar-west.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/sandbar-east.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/transinvexium-west.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/transinvexium-east.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine/transinvexium-east-building-interiors.gif)

## docs/locksmithing-guide.md
- Missing substantive prose lines: **15**
- Imprint the wax with the instrument. ([/locksmithingWax-Imprint Create Wax Imprint])
- Repeat until finished. ( rolls vary on skill level) ||
- Etch characters onto the wax imprint. ([/locksmithingWax-Letter-Etching Wax Letter Etching])
- Create a mold from the wax imprint. ([/locksmithingClay-Mold Create Clay Mold])
- Repeat until finished. ( rolls vary on skill level) ||
- Get a crucible and put a piece of metal slag inside. (your choice of metal!)
- Hold the crucible and the tongs in hand, then heat the crucible over the furnace.
- Repeat until you have liquid metal. (8 echoes) ||
- Example: 'forge tool with crucible and mold'. ||
- Rank 10 Pick Lock-Unlocking at other locations ||
- Rank 1 Pick Lock-Locking at other locations ||
- Place the tumbler's key in the container before handing it in. ||
- Place the tumbler's key in the container before handing it in. ||
- Place the tumbler's key in the container before handing it in. ||
- Place the tumbler's key in the container before handing it in. ||

## docs/old-cult-of-ereal.md
- Missing substantive prose lines: **9**
- (deceased) ||= (Tharius’) Chief of Spies ||< The Council of Elders
- iii. Drusus Rustius – Heart of Ereal ( Nurturing Light )
- iv. Jarin Seneda – Eye of Ereal ( Revealing Light )
- vii. Bernard Tubero – Hand of Ereal ( Bright Hope ) ||
- (Reports to Council of Elders) ||= Eye of Ereal ||= Heart of Ereal ||= Hand of Ereal ||
- (Reports to rank directly above) ||= Glass ||= Mist ||= Gentle ||
- (Reports to rank directly above) ||= Revealer ||= Druid ||= Glimmer ||
- (Reports to rank directly above) ||= Shepherd ||= Guide ||= Comforter ||
- (Reports to rank directly above) ||||||= Focus ||

## docs/historic-map-marnevel-the-steps.md
- Missing substantive prose lines: **7**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-the-steps/steps-full.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-the-steps/steps-central.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-the-steps/steps-north.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-the-steps/steps-east.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-the-steps/steps-south.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-the-steps/steps-sewers.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-the-steps/steps-interiors.jpg)

## docs/historic-map-marnevel-monlon.md
- Missing substantive prose lines: **6**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-monlon/monlon.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-monlon/catacombs.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-monlon/mines.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-monlon/rockslide.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-monlon/battlefield.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-monlon/ravines.gif)

## docs/historic-map-pepaquest-west-grasslands.md
- Missing substantive prose lines: **6**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-west-grasslands/grasslands.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-west-grasslands/north-forest.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-west-grasslands/banditforestmap.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-west-grasslands/oak-woods.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-west-grasslands/burnt-villa.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-west-grasslands/spider-caverns.jpg)

## docs/hoplite-combat.md
- Missing substantive prose lines: **6**
- Pierce ||= Hoplite Combat Stance ||= 250 ||= 500 ||
- Pierce ||= Hoplite Combat Stance ||= 250 ||= 500 ||
- Bruise ||= Hoplite Combat Stance ||= 250 ||= 500 ||
- Bruise ||= Hoplite Combat Stance ||= 250 ||= 500 ||
- Pierce ||= Hoplite Combat Stance ||= 250 ||= 500 ||
- Bruise ||= Hoplite Combat Stance ||= 250 ||= 500 ||

## docs/missile-weapons-bows.md
- Missing substantive prose lines: **6**
- 20 Ranks in Steady Aim ||= 300 ||= 75 ||= 500 ||= 175 ||
- 20 Ranks in Steady Aim ||= 300 ||= 75 ||= 500 ||= 175 ||
- 40 Ranks in Steady Aim ||= 300 ||= 75 ||= 500 ||= 175 ||
- 20 Ranks in Foot Shot ||= 300 ||= 75 ||= 500 ||= 175 ||
- Pierce ||= - ||= 100 ||= 75 ||= 150 ||= 175 ||
- 20 Ranks in Quick Draw ||= 300 ||= 75 ||= 500 ||= 175 ||

## docs/staves.md
- Missing substantive prose lines: **6**
- 20 Ranks in Staves Parting Swat || 175 || 300 || 95 || - ||
- 40 Ranks in Staves Parting Smash || 175 || 300 || 95 || - ||
- 10 Ranks in Staves Swat || - || - || - || - ||
- Bruise || 40 Ranks in Staves Snap Strike || - || - || - || - ||
- 10 Ranks in Staves Snap Strike || - || - || - || - ||
- 20 Ranks in Staves Longarm Strike || - || - || - || - ||

## docs/historic-map-marnevel-rock-valley.md
- Missing substantive prose lines: **5**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-rock-valley/rock-valley-area.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-rock-valley/town-of-rock-valley.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-rock-valley/rock-valley-palisade.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-rock-valley/stromheim.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-rock-valley/fenri-gifr-ruins.gif)

## docs/historic-map-pepaquest-iridine-outskirts.md
- Missing substantive prose lines: **5**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-iridine-outskirts/campus-martinus.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-iridine-outskirts/transinvexium-east.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-iridine-outskirts/old-city.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-iridine-outskirts/signaltower-island.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-iridine-outskirts/sea-caves.jpg)

## docs/historic-map-pepaquest-iridine.md
- Missing substantive prose lines: **5**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-iridine/warehouse-district-west.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-iridine/warehouse-district-east.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-iridine/temple-district.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-iridine/transinvexium-west.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-iridine/transinvexium-central.jpg)

## docs/pankration.md
- Missing substantive prose lines: **5**
- 20 Ranks in Pankration Forward Elbow ||= 75 ||= 500 ||
- 20 Ranks in Pankration Rising Elbow ||= 75 ||= 500 ||
- Bruise || 30 Ranks in Pankration Driving Knee
- 30 Ranks in Pankration Wide Knee ||= 75 ||= 500 ||
- 40 Ranks in Pankration Rising Palm ||= 75 ||= 500 ||

## docs/tecelite.md
- Missing substantive prose lines: **5**
- ![](https://eternal-city.wdfiles.com/local--files/tecelite/script%20id.jpg) ![](https://eternal-city.wdfiles.com/local--files/tecelite/script%20id%202.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/tecelite/script%20move%20list.jpg) ![](https://eternal-city.wdfiles.com/local--files/tecelite/script%20move%20list%202.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/tecelite/script%20weapon%20list.jpg) ![](https://eternal-city.wdfiles.com/local--files/tecelite/script%20weapon%20list%202.jpg) ![](https://eternal-city.wdfiles.com/local--files/tecelite/script%20weapon%20list%203.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/tecelite/script%20shield%20list.jpg) ![](https://eternal-city.wdfiles.com/local--files/tecelite/script%20shield%20list%202.jpg) ![](https://eternal-city.wdfiles.com/local--files/tecelite/script%20shield%20list%203.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/tecelite/recolor%20keyword%20manager.jpg) ![](https://eternal-city.wdfiles.com/local--files/tecelite/colorpicker.jpg)

## docs/test.md
- Missing substantive prose lines: **5**
- This page originally included `:scp-wiki:component:collapsible-sidebar` on Wikidot. The transcluded content still needs review.
- This page originally included `:snippets:suo` on Wikidot. The transcluded content still needs review.
- This page originally included `:snippets:suo` on Wikidot. The transcluded content still needs review.
- This page originally included `:snippets:suo` on Wikidot. The transcluded content still needs review.
- This page originally included `:snippets:suo` on Wikidot. The transcluded content still needs review.

## docs/chainblade.md
- Missing substantive prose lines: **4**
- 20 Ranks in Chainblade Flying Slash ||= 200 ||= 500 ||
- 10 Ranks in Chainblade Close Stab ||= 200 ||= 500 ||
- Cut||= 30 Ranks in Chainblade Overhead Spin ||= 200 ||= 500 ||
- 20 Ranks in Chainblade Raptor Spike ||= 200 ||= 500 ||

## docs/cult-of-ereal.md
- Missing substantive prose lines: **4**
- (deceased) ||= (Tharius’) Chief of Spies ||< The Council of Elders
- iii. Drusus Rustius – Heart of Ereal ( Nurturing Light )
- iv. Jarin Seneda – Eye of Ereal ( Revealing Light )
- vii. Bernard Tubero – Hand of Ereal ( Bright Hope ) ||

## docs/falx.md
- Missing substantive prose lines: **4**
- 20 Ranks in Falx Wild Strike ||= 200 ||= 500 ||
- 20 Ranks in Falx Wild Strike ||= 200 ||= 500 ||
- 20 Ranks in Falx Spinning Backhand ||= 200 ||= 500 ||
- 40 Ranks in Falx Whirlwind Slash ||= 200 ||= 500 ||

## docs/historic-map-marnevel-far-east.md
- Missing substantive prose lines: **4**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-far-east/eastern-grasslands-oak-forest.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-far-east/grey-sands.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-far-east/brigand-treehouse.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-far-east/esecarnuscaves.gif)

## docs/historic-map-marnevel-iridine-outskirts.md
- Missing substantive prose lines: **4**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine-outskirts/campus-martius.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine-outskirts/vetallun-road.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine-outskirts/moondeep-old-city.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-iridine-outskirts/lighthouse-isle.gif)

## docs/historic-map-marnevel-vetallun-blackvine.md
- Missing substantive prose lines: **4**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-vetallun-blackvine/vetallun.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-vetallun-blackvine/blackvine.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-vetallun-blackvine/blackvine-surrounding-area.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-vetallun-blackvine/salt-beds.png)

## docs/tridents.md
- Missing substantive prose lines: **4**
- 40 Ranks in Trident Parting Jab ||= 300 ||= 500 ||= 154 ||
- 10 Ranks in Trident Jab ||= 300 ||= 500 ||= 154 ||
- 30 Ranks in Trident Stab ||= 300 ||= 500 ||= 154 ||
- 20 Ranks in Trident Jab ||= 300 ||= 500 ||= 154 ||

## docs/whips.md
- Missing substantive prose lines: **4**
- 20 Ranks in Triple Crack ||= 300 ||= 500 ||= 154 ||
- 20 Ranks in Sky Circle Slash ||= 300 ||= 500 ||= 154 ||
- 40 Ranks in Sky Circle Rake ||= 300 ||= 500 ||= 154 ||
- 40 Ranks in Precise Snap ||= 300 ||= 500 ||= 154 ||

## docs/cestus.md
- Missing substantive prose lines: **3**
- Pierce ||= 20 Ranks in Cestus Jab || 300 || 500 ||= 154 ||
- Cut || 30 Ranks in Cestus Spike Slash || 300 || 500 ||= 154 ||
- 20 Ranks in Cestus Rear Upcut || 300 || 500 ||= 154 ||

## docs/historic-map-iridine-streets.md
- Missing substantive prose lines: **3**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-iridine-streets/harbor-of-the-moons.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-iridine-streets/northwestern-iridine.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-iridine-streets/bronze-square-shops.jpg)

## docs/historic-map-marnevel-invex-delta.md
- Missing substantive prose lines: **3**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-invex-delta/invex-river-delta.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-invex-delta/burnt-villa.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-invex-delta/spider-caverns.jpg)

## docs/historic-map-marnevel-salinae.md
- Missing substantive prose lines: **3**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-salinae/swamps.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-salinae/swamp-buildings.gif)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-salinae/bandit-complex.jpg)

## docs/historic-map-pepaquest-vetallun-blackvine.md
- Missing substantive prose lines: **3**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-vetallun-blackvine/vetallun.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-vetallun-blackvine/vetallun-gardens.jpg)
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-vetallun-blackvine/blackvine.jpg)

## docs/hoplite-combat-guide.md
- Missing substantive prose lines: **3**
- retalq short spear w/ any shield ||= 1 + MoS ||= 2 + MoS ||= 2 + MoS ||= 2 + MoS ||= 2 + MoS ||= 1 + MoS ||
- iron short spear w/ light shield ||= 2 + MoS ||= 2 + MoS ||= 2 + MoS ||= 3 + MoS ||= 2 + MoS ||= 1 + MoS ||
- iron spear w/ heavy shield ||= 2 + MoS ||= 2 + MoS ||= 3 + MoS ||= 3 + MoS ||= 2 + MoS ||= 1 + MoS ||

## docs/index.md
- Missing substantive prose lines: **3**
- ![Map of Iridine - The Eternal City MUD](https://eternal-city.wikidot.com/local--files/files/Map%20of%20Iridine%20-%20FULL.jpg)
- ![Play Now](https://login.eternalcitygame.com/login.php)
- This page originally included `latest-updates` on Wikidot. The transcluded content still needs review.

## docs/jewelry-guide.md
- Missing substantive prose lines: **3**
- Cast Stud Earrings, Broad Cast Ring, Broad Cast Bracelet, Cast Simple Band, Cast Charm, Ornate Forged Ring, Forged Bangle, Forged Anklet, Cast Bangle, Cast Pendant, Simple Band Ring, Drop Earrings, Eyebrow Ring, Nose Ring, Nose Stud, Septum Ring, Lip Ring, Lip Stud, Forged Tiara, Wire Ring
- Wire Earrings, Wire Bracelet, Wire Anklet, Hoop Earrings
- Locket (20 tiny links + body + lid + hinge pin)

## docs/nelsor-one-handed-swords.md
- Missing substantive prose lines: **3**
- 10 Ranks in Swords Slash || 300 || 500 ||= 154 ||
- 20 Ranks in Swords Slash || 300 || 500 ||= 154 ||
- Cut || 20 Ranks in Swords Slash || 300 || 500 ||= 154 ||

## docs/two-handed-axes.md
- Missing substantive prose lines: **3**
- 20 Ranks in 2H Axe Overhead Chop || 300 || 500 ||
- 20 Ranks in 2H Axe Basic Slash|| 300 || 500 ||
- 10 Ranks in 2H Axe Basic Slash || 300 || 500 ||

## docs/v3_homepage.md
- Missing substantive prose lines: **3**
- ![](https://eternal-city.wikidot.com/local--files/files/Map%20of%20Iridine%20-%20FULL.jpg)
- ![Play Now](https://login.eternalcitygame.com/login.php)
- Knife Slash (10 Ranks) || 175 || 80 || 50 || 75 || 75 ||

## docs/avros-one-handed-swords.md
- Missing substantive prose lines: **2**
- Pierce || 40 Ranks in Swords Jab ||= 100 ||= 500 ||
- Will on a missed roll. This can be negated with 90 ranks in Avros Gladius Combat.

## docs/cineran-knife-fighting-knives.md
- Missing substantive prose lines: **2**
- 20 Ranks in Knives Underhand Stab ||= 500 ||= 50 ||
- Cut || 20 Ranks in Knives Slash ||= 500 ||= 50 ||

## docs/franlius.md
- Missing substantive prose lines: **2**
- This page originally included `franlius-notice` on Wikidot. The transcluded content still needs review.
- ![](https://eternal-city.wdfiles.com/local--files/files/Franlius%202025-08.png)

## docs/game-world.md
- Missing substantive prose lines: **2**
- ![](https://eternal-city.wdfiles.com/local--files/files/Midlightmasks2.5parchmentfilter3v2.png)
- ![](https://eternal-city.wdfiles.com/local--files/files/realms%20of%20midlight.jpg)

## docs/harbor-of-the-moons.md
- Missing substantive prose lines: **2**
- ![Illustrated image of The Harbor of the Moons](https://eternal-city.wdfiles.com/local--files/files/TheHarbor-Final.jpg)
- This page originally included `harbor` on Wikidot. The transcluded content still needs review.

## docs/hg-franlius.md
- Missing substantive prose lines: **2**
- This page originally included `franlius-notice` on Wikidot. The transcluded content still needs review.
- This page originally included `franlius` on Wikidot. The transcluded content still needs review.

## docs/illustrated-iridine-and-neighbors.md
- Missing substantive prose lines: **2**
- ![](https://eternal-city.wdfiles.com/local--files/illustrated-iridine-and-neighbors/simple-iridine-regional.gif)
- ![](https://eternal-city.wdfiles.com/local--files/illustrated-iridine-and-neighbors/artistic-iridine-regional.jpg)

## docs/knives.md
- Missing substantive prose lines: **2**
- Cut || 20 Ranks in Knife Slash || 500 || 100 ||= 85 || 300 || 75 || 75 ||
- 10 Ranks in Knife Slash || 500 || 100 ||= 85 || 300 || 75 || 75 ||

## docs/nav-overview.md
- Missing substantive prose lines: **2**
- This page originally included `franlius-notice` on Wikidot. The transcluded content still needs review.
- This page originally included `franlius-notice` on Wikidot. The transcluded content still needs review.

## docs/one-handed-axes.md
- Missing substantive prose lines: **2**
- 20 Ranks in Axe Pivot Smash || 500 || 90 ||= 300||
- 40 Ranks in Axe Stepping Chop || 500 || 90 ||= 300||

## docs/one-handed-crushing-guide.md
- Missing substantive prose lines: **2**
- bone club ||= 1 + MoS ||= 1 + MoS ||= 2 + MoS ||
- Blackroot war-club ||= 2 + MoS ||= 1 + MoS ||= 2 + MoS ||

## docs/spears.md
- Missing substantive prose lines: **2**
- 10 Ranks in Spear Stab|| 300 || 125 ||= 300 || 500 ||= 154 ||
- 40 Ranks in Spear Stab || 300 || 125 || - || 500 ||= 154 ||

## docs/the-colosseum.md
- Missing substantive prose lines: **2**
- ![Illustrated image of Map of The Harbor of the Moons](https://eternal-city.wdfiles.com/local--files/files/TheArena-Final.jpg)
- This page originally included `colosseum` on Wikidot. The transcluded content still needs review.

## docs/archived_historic-map-marnevel-franlius.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-marnevel-franlius/franlius.png)

## docs/bio_drekk.md
- Missing substantive prose lines: **1**
- This page originally included `bio:drekk-drykk` on Wikidot. The transcluded content still needs review.

## docs/bio_drykk.md
- Missing substantive prose lines: **1**
- This page originally included `bio:drekk-drykk` on Wikidot. The transcluded content still needs review.

## docs/black-hand-caverns.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/blackhandcaverns032023.png)

## docs/blackvine.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/blackvine%202025-10.png)

## docs/brigand-treehouse.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/brigand-treehouse/EastoftheSalinaeRiver-brigandtreehouse.gif)

## docs/bronze-lane.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/bronze-lane/iridine-bronzelane.gif)

## docs/burnt-villa.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/invexriverdelta-burntvillaupdated112517.gif)

## docs/city-of-iridine.md
- Missing substantive prose lines: **1**
- This page originally included `iridine` on Wikidot. The transcluded content still needs review.

## docs/city-of-monlon.md
- Missing substantive prose lines: **1**
- This page originally included `monlon` on Wikidot. The transcluded content still needs review.

## docs/colosseum.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/iridine-colosseum1.gif)

## docs/cullaiden-island-map.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/cul.gif)

## docs/cullaiden-island-temple.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/cullaiden-island-temple/cullaiden%20island%20abandoned%20temple)

## docs/cullaiden-island.md
- Missing substantive prose lines: **1**
- This page originally included `cullaiden-island-map` on Wikidot. The transcluded content still needs review.

## docs/dual-daggers.md
- Missing substantive prose lines: **1**
- Pierce ||= Dual Daggers Sanguine Stance ||= 50 ||= 500 ||

## docs/east-ravanite-tunnels.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/EastRavaniteTunnels.PNG)

## docs/eastern-grasslands-and-woods.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/eastofthesalinaeriver-eastgrasslandsandwoods-2026-09-08-update.png)

## docs/filinius-villa.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/turriniofiliniusestate20260329.png)

## docs/fist-fort.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/fist-fort.png)

## docs/forum.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/forum/iridine-forum-2024.png)

## docs/gardens-and-hospice.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/Iridine-Gardens.gif)

## docs/grey-sands.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/GraySands.gif)

## docs/harbor.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/iridine-harbor-03-2023.png)

## docs/hg-aralex-pit.md
- Missing substantive prose lines: **1**
- This page originally included `rat-pits-and-aralex-pits` on Wikidot. The transcluded content still needs review.

## docs/hg-bandit-complex.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/BanditComplex.jpg)

## docs/hg-black-hand-caverns.md
- Missing substantive prose lines: **1**
- This page originally included `black-hand-caverns` on Wikidot. The transcluded content still needs review.

## docs/hg-brigand-treehouse.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/brigand-treehouse)

## docs/hg-burnt-villa.md
- Missing substantive prose lines: **1**
- This page originally included `burnt-villa` on Wikidot. The transcluded content still needs review.

## docs/hg-colosseum.md
- Missing substantive prose lines: **1**
- This page originally included `colosseum` on Wikidot. The transcluded content still needs review.

## docs/hg-iridine-pits.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/RatPitsandAralexPits.gif)

## docs/hg-iridine-sewers.md
- Missing substantive prose lines: **1**
- This page originally included `sewers-and-sea-caves` on Wikidot. The transcluded content still needs review.

## docs/hg-quartz-heights-boardwalk.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/quartz-heights/iridine-quartzheights1.gif)

## docs/hg-rock-valley-broken-tower.md
- Missing substantive prose lines: **1**
- This page originally included `franlius` on Wikidot. The transcluded content still needs review.

## docs/hg-rock-valley-burial-grounds.md
- Missing substantive prose lines: **1**
- This page originally included `franlius` on Wikidot. The transcluded content still needs review.

## docs/hg-sea-caves.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/iridine-sewers.gif)

## docs/hg-shipwreck.md
- Missing substantive prose lines: **1**
- This page originally included `shipwreck` on Wikidot. The transcluded content still needs review.

## docs/hg-spider-caverns.md
- Missing substantive prose lines: **1**
- This page originally included `spider-caverns` on Wikidot. The transcluded content still needs review.

## docs/hg-undertown.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/Undertown.jpeg)

## docs/hg-vetallun-apple-orchard.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/invexriverdelta-vetallun2.gif)

## docs/hg_fist-fort.md
- Missing substantive prose lines: **1**
- This page originally included `fist-fort` on Wikidot. The transcluded content still needs review.

## docs/hg_monlon-battlefields.md
- Missing substantive prose lines: **1**
- This page originally included `monlon-battlefield` on Wikidot. The transcluded content still needs review.

## docs/hg_monlon-ravines.md
- Missing substantive prose lines: **1**
- This page originally included `monlonravines` on Wikidot. The transcluded content still needs review.

## docs/historic-map-pepaquest-far-east.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/historic-map-pepaquest-far-east/east-grasslands-oak-forest.jpg)

## docs/humanoids.md
- Missing substantive prose lines: **1**
- a battle-scarred bronze-plated rough leather helmet

## docs/hunting-grounds.md
- Missing substantive prose lines: **1**
- [This is a new hunting ground that has been released yesterday. The estate has been divided into sections that are suited for characters between 1000-5000 TCR.]

## docs/hunting.md
- Missing substantive prose lines: **1**
- primitive (no cordage) || average || 0.9 lbs ||

## docs/illustrated-iridine.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/illustrated-iridine/illustrated-iridine-large.jpg)

## docs/iridine.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/irdine-master.png)

## docs/kelestian-outpost.md
- Missing substantive prose lines: **1**
- This page originally included `monlon-kelestian-outpost` on Wikidot. The transcluded content still needs review.

## docs/legal_privacy-policy.md
- Missing substantive prose lines: **1**
- This page originally included `:modules:include:6` on Wikidot. The transcluded content still needs review.

## docs/legal_start.md
- Missing substantive prose lines: **1**
- This page originally included `:modules:include:4` on Wikidot. The transcluded content still needs review.

## docs/legal_terms-of-use.md
- Missing substantive prose lines: **1**
- This page originally included `:modules:include:5` on Wikidot. The transcluded content still needs review.

## docs/lighthouse.md
- Missing substantive prose lines: **1**
- This page originally included `signal-tower-island` on Wikidot. The transcluded content still needs review.

## docs/midlight-map.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/midlight-map/Midlight.gif)

## docs/modules-reference.md
- Missing substantive prose lines: **1**
- This page originally included `:csi:include:module-summary` on Wikidot. The transcluded content still needs review.

## docs/monlon-battlefield.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/Monlon-battlefieldupdated101217.gif)

## docs/monlon-catacombs.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/monlon-catacombs/Monlon-catacombsupdated101217.gif)

## docs/monlon-ravines.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/new-monlon-ravines-map-2023-08-03.png)

## docs/monlon-rockslide.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/monlon-rockslide/monlon-rockslideupdated101217.gif)

## docs/monlon.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/Monlon2022-11-25.png)

## docs/old-city-and-moondeep.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/iridine-oldcitymoondeep.gif)

## docs/pirate-ship.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/pirateship.jpg)

## docs/quartz-heights.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/iridine-quartzheights-02-29-2024.png)

## docs/rat-pits-and-aralex-pits.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/RatPitsandAralexPits.gif)

## docs/republic-of-iridine.md
- Missing substantive prose lines: **1**
- ![Map of Iridine - The Eternal City MUD](https://eternal-city.wikidot.com/local--files/files/Map%20of%20Iridine%20-%20FULL.jpg)

## docs/reputation.md
- Missing substantive prose lines: **1**
- This page originally included `franlius-notice` on Wikidot. The transcluded content still needs review.

## docs/riverside.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/iridine-riversidenew.gif)

## docs/rock-valley-region.md
- Missing substantive prose lines: **1**
- This page originally included `rock-valley` on Wikidot. The transcluded content still needs review.

## docs/rock-valley.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/rockvalley.gif)

## docs/sandbar.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/Iridine-sandbar.gif)

## docs/search_site.md
- Missing substantive prose lines: **1**
- Search the wiki for information about skills, weapons, combat, crafting, locations, NPCs, organizations, lore, and more.

## docs/seld.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/EastoftheSalinaeRiver-Seld1.gif)

## docs/sewers-and-sea-caves.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/iridine-sewers-11-29-2022.png)

## docs/shipwreck.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/shipwreck-02-24-2026.png)

## docs/signal-tower-island-guide.md
- Missing substantive prose lines: **1**
- This page originally included `signal-tower-island` on Wikidot. The transcluded content still needs review.

## docs/signal-tower-island.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/signal-tower-island/Iridine-Signaltowerupdated111117.gif)

## docs/spider-caverns.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/spider-caverns/invexriverdelta-spidercavernsupdated112917.gif)

## docs/stats.md
- Missing substantive prose lines: **1**
- Each attribute in your character's stats is linked to a hidden numeric value, which corresponds to the descriptive adjectives you see on the character sheet. While knowing the exact numbers isn't always necessary, it can be useful—especially when planning to use role-points to improve a particular attribute. Understanding these values helps you estimate how many role-points you'll need to reach your desired stat level. (See the section for details on the cost of increasing attribute potential by 10 points. Completing training courses will also raise your attribute’s numeric value by 1 point.)

## docs/storm-drain-system.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/Iridine-storm-drain-system.gif)

## docs/stromheim.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/Rockvalley-stromheim1.gif)

## docs/the-salinae-swamp.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/invexriverdelta-salinaeswamp1.gif)

## docs/the-steps-sewers.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/Steps-Sewers.gif)

## docs/the-steps-south.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/the-steps-south/Steps-South-04-2024.png)

## docs/the-west-grasslands.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/the-west-grasslands/invexriverdelta-westgrasslands2.gif)

## docs/town-of-franlius.md
- Missing substantive prose lines: **1**
- This page originally included `franlius` on Wikidot. The transcluded content still needs review.

## docs/town-of-rock-valley-map.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wikidot.com/local--files/files/Rockvalleytown.png)

## docs/town-of-rock-valley.md
- Missing substantive prose lines: **1**
- This page originally included `town-of-rock-valley-map` on Wikidot. The transcluded content still needs review.

## docs/town-of-vetallun.md
- Missing substantive prose lines: **1**
- This page originally included `vetallun` on Wikidot. The transcluded content still needs review.

## docs/transinvexium.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/transinvexium/iridine-transinvexium1.gif)

## docs/two-handed-crushing.md
- Missing substantive prose lines: **1**
- Bruise ||= 2H Crushing Smasher Stance ||= 250 ||= 500 ||

## docs/unofficial-world-map.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/Map%20of%20Iridine%20-%20FULL.jpg)

## docs/vetallun-road.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/vetallun-road/iridine-vetallunroad1.gif)

## docs/vetallun.md
- Missing substantive prose lines: **1**
- ![](https://eternal-city.wdfiles.com/local--files/files/invexriverdelta-vetallun-2025.png)

## docs/village-of-blackvine.md
- Missing substantive prose lines: **1**
- This page originally included `blackvine` on Wikidot. The transcluded content still needs review.

## docs/village-of-seld.md
- Missing substantive prose lines: **1**
- This page originally included `seld` on Wikidot. The transcluded content still needs review.

## docs/village-of-stromheim.md
- Missing substantive prose lines: **1**
- This page originally included `stromheim` on Wikidot. The transcluded content still needs review.

## docs/weapons.md
- Missing substantive prose lines: **1**
- weapon's quality level or RB Bonus, but these weapons

## docs/whips-guide.md
- Missing substantive prose lines: **1**
- simple whip of soft leather ||= 2 + MoS ||= 1 + MoS ||= 2 + MoS ||
