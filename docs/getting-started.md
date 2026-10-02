---
title: "Getting Started"
category: "Guides & Commands"
parent: index
---

# Getting Started


 
<iframe class="tec-video" src="https://www.youtube.com/embed/z2WpvB8jFUk?start=87" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
 


Welcome to **The Eternal City**(TEC)! Here you will find a starters guide for getting familiarized with the world of Midlight. This guide is meant to get you on your feet and familiar with the game world, basic mechanics, and role-play environment within The Eternal City. There are numerous in-depth sources on the wiki, in the in-game library, and elsewhere to aid you as you continue to progress in the game world.


For a quick*(-ish)* overview and to get a sense for TEC, feel free to watch this player-made **"Let's Play TEC!"** tutorial from our very own livak.


### Basic Speech

So you've managed to log in, you're in the welcome room and you've got no idea how to say hi! Here are a couple of quick speech syntaxes for various means of communication:

**Indirect speech** - You can speech generally to the room by type SAY <message>. A shorthand of this is also using the ' symbol.
> Command:
> SAY or ' Hi, I'm new! My name is Inigo Montoya. Prepare to die!
> What others see:
> Inigo says, "Hi, I'm new! My name is Inigo Montoya. Prepare to die!"

**Direct Speech** - You can speak directly to a character or NPC or even an object if you really wanted to by using SAY TO <person>. The shorthand 
> Command:
> say to Constantine I'd like a drink OR "cons I'd like a drink.
> What Constantine sees:
> Soandso says to you, "I'd like a drink."
> What other's see:
> Soandso says to Constantine, "I'd like a drink."

**Whispering** - You can also whisper directly to a person if you'd like to be discreet. This is the preferred way to ask an out-of-character question when you absolutely have to in-game. If speaking OOC, it is suggested to use brackets in your speech [] . 
**Warning: There is a skill in-game that allows others to hear your whispers.**
> Command:
> OOC: Whisper to Constantine [I don't know what I'm doing, can you help me?]
> IC: whisper to Constantine I like your beard.
> What other's see:
> Soandso whispers to Constantine.

More **advanced speech** options can be found here:
* [Advanced Speech](/advanced-speech/)

#### Thinknet
**Thinknet** - Think net is an in-character channel. It is a way to contact others from a distance without running all over the game trying to find them. To use think you can use THINK <message>. There is no direct speech on this channel.
> Command:
> THINK Good morning Iridine!
> What everyone sees:
> Soandso thinks aloud: Good Morning Iridine!

This channel can be toggled on and off using the toggle-think command.

#### OOC Channel
**OOC Channel** - The out-of-character channel is a way to ask questions about syntax, game mechanics, or just general help that may not be able to ask in-game. You can use OOC <message> to communicate here. There is no direct speech on this channel. FYI - This channel will display your character name in-game and your account name in the Welcome Area.
> Command:
> OOC How do I do this?
> What others see: 
> <OOC:> Soandso asks, "How do I do this?

This channel can be toggled on and off using the toggle-ooc command.


### Character Generator

All new characters are expected to create a name that is thematically accurate for the time period revolving around the early Roman Republic. Most players create Roman Sounding names but the various races are each interpreted as their own mix of Roman, Medieval, and Fantasy characteristics. Some sources for you to consider are:

* [Behind Roman Names](https://www.behindthename.com/names/usage/ancient-roman)
* [Behind Celtic Names](https://www.behindthename.com/names/usage/ancient-celtic)
* [Ancient Greek Names](https://tekeli.li/onomastikon/Ancient-World/Greece/)

The [Character Generator](/character-generator/) in TEC is unique in the realm of MUDs. It does not follow a typical stat point and skill distribution list similar to models found in many D&D-based environments but attempts to create a character for you based on your roleplaying choices. For example, selecting an Altene Stavesman who was a loner, loved the wilderness, and was teased as a child, strong, muscular, and disciplined may grant you a character with excellent endurance, strength, but low empathy. Players typically go one of two routes. Either they try to maximize the character generator to fit the outcome, such as a trader or soldier, or they choose role-playing options and, upon creation, decide how that character will fit into the game world. [A Guide to Building a Combat Character](https://forum.skotos.net/showthread.php?t=93215), created by user Giant, is an excellent resource for seeing how this system works.
### Interacting with objects
Throughout your time in Midlight, you'll most likely need to pick things up, put them down, wear, wield, or interact with various things. Below is a list of commands to do so:

**GET** - In order to pick something up, you'll need to GET <item>. You can also choose which item if you have multiple items that are similar or identical using GET # <item> where # is the number you'd like to get. Sometimes an item is in a container of some sort. If you'd like to get an item from your sack for example, you could do GET <item> from <sack>. Both the item and the container can have a # prefix to them for specificity. You can also specify MY to limit the options to only things on your character.
> Commands: 
> get torch
> You take a torch.
> get 3 torch
> You take a torch.
> get torch from sack
> You take a torch from a sack.
> get torch from 3 sack
> You take a torch from a blue sack.
> get torch from my backpack
> You get a torch from your backpack.

**PUT/DROP** If you'd like to put an item somewhere, you can use the PUT <item> in/on/under <place>. If you'd like to leave it on the ground you can DROP <item>. Again, these can be specified with the # and MY prefixes.
> Commands:
> put torch in sack
> You put a torch in a sack.
> drop torch
> You drop a torch.
**Wearing clothes** - People will probably give you funny looks in Iridine if you're running around in your birthday suit! Not to mention, Impropriety is a crime in the City of Iridine. You can REMOVE <item> to unwear it. You can WEAR <item> to of course wear it. Some items may be required to be worn under or over other clothing. 
> Commands:
> wear tunic
> You wear a silky white tunic covered in daisies.
> remove tunic
> You remove a tunic.
**Wielding a weapon** In order to use a weapon you'll need to WIELD it. This can be achieved by using the WIELD <weapon> command. You can also UNWIELD as well if you're done fighting. Sometimes you'll only want to wield a weapon in one or two hands. There are also the 1W and 2W commands for those purposes. 
> Commands:
> wield trident
> You wield a bronze trident with tin tines.
> unwield trident
> You stop wielding a bronze trident with tin tines.
> 2w trident
> You wield a bronze trident with tin tines in both hands.
Notes: 
* Wielding a weapon in the city is illegal outside of combat areas. You can use PASSIVE-WIELD to toggle whether you automatically unwield your weapon in front of law keeper NPCs.
* Thieves can grab your weapon out of your hand if it isn't wielded. So always be sure to store your weapon when not wielding it.

**Stow** STOW let's you choose which container you automatically put items into when your hands are full and pick something up.
> Command:
> STOW #|my <container>
> A simple woolen sack will be used for stowage.

**Accepting and offering items** As a newcomer, lots of friendly folks will often give you some stuff to get started. You'll need to know how to ACCEPT them. Then one day, you can return the favor and OFFER items to others.
> Commands:
> Accept <person>
> You accept a shiny new weapon from soandso.
> Offer <item> to <person>
> You offer a cool thing to soandso.
### Checking your inventory
**Inventory** You can see what all you have on you by using INVENTORY or I or INV for short. This will list all the items you are wearing, wielding, and any open containers you have on you. 

Note: Containers will only be shown on one level. A sack within a sack will not display the contents of the second sack.

**IW** IW (short for Inventory Weight) will list what every item you're wearing or carrying weighs to an approximate level within one pound.

**Checking containers** You can look in the contents of a container by using LOOK in #|my <container>
### Skills 
The world of Midlight has many opportunities for all walks of life. You can be a gladiator, a soldier, a mercenary or constable. You can be a tailor, locksmith, hunter, healer, or woodsman. Or if you're more into the seedier walk of life there are more subtle arts to be learned. Below explains how your character's skills work within The Eternal City. 

Performing an action will give you Skill Points (SP) to learn fun and new lessons to improve your character. 
Below is a list of helpful commands related to skills:

**Skills** SKILLS will give you a long list of all the skills & languages you know. You can also use SKILLS <skill> to specify a certain skillset.

** Skills ?** SKILLS ? will show you the commands for all skills you know. EXTREMELY USEFUL when first learning the game.

**SSK** sskills or SSK is your short skills. It lists the skillsets and how much skill points you have in each skill set.

**SSK COSTS** This command will tell you what each skillsets SP cost is based on the difficulty and the skill slot it's located in.

**Learning** Once you've earned enough SP to gain new lessons, you'll need to find a trainer. This can be an NPC trainer or a player. There's plenty of player characters who are happy to teach for free so don't feel afraid to ask in think-net first to save some coin. In order to learn, you'll need to LEARN <skill> from <person>. You can also learn up to 25 ranks at a time (As long as you have SP) by using LEARN <skill> from <person> #<1-25>. Some skills can be learned with SP from other skillsets. You will always default to the skillset you're learning unless you specify with LEARN <skill> from <person> with <otherskillset>. 
> Commands:
> Learn stab from stabberman
> You successfully train stab to 1.
>
> Learn stab from StabbyMcStabberson # 25
> You successfully train stab to 25.
>
> Learn dodge from BruceLee with swords
> You successfully train dodge to 1.

For more information on skills you can check out: [Skills](/skills/)
Also, all skills available in-game are listed on the left-hand navigation. 
### Newbie Areas
There are a few places in-game that specifically catered to new characters.
**Phaedra** - New characters will start off at Phaedra. <insert RP flavor>. She is located one pace on the eastern side of The Stone Toga Inn. The Stone Toga Inn is one of the main meeting hubs. 
**Signal Tower Island** - This area is meant specifically for newbie characters. You will need to take a ferry to get there. In order to get on the ferry you will need to use a few special commands. WAIT FOR FERRY will make you automatically walk onto the ferry from either dock. WAIT FOR DOCK will automatically walk you off of the ferry onto the dock. If the ferry is already at the dock, you can just walk on yourself as well. 
Things to do:
* You can fight gulls, crabs, fluviturs (a dog-like creature), and snapping turtles here. If you skin their stomaches, inside will be gastrolith pebbles which you can turn into the Od'H.
* You can also dive for pearls here. For a more in-depth guide on pearl diving go to the [Diving Guide](/newbie-mission-guide/#Diving)
> Directions to Signal Tower Island Ferry Landing- Walk to Toga n x 2, w x 3, nw x 1.
> Directions to Keistos' Dive Shack - From Ferry landing on Island - w x 2, nw x 2, n x 5.
>
> **Note: Laying on the floor in Keistos' Dive Shack will regenerate your fatigue faster than anywhere else on the island. He doesn't mind, he knows you've been swimming all day.** 
**Od'H (Officium de Humanitas)** - The sect of the Revealing Light (one of three sects under the Cult of Ereal) has established a small encampment nearby the Stone Toga Inn to help facilitate the livelihood of young adults, refugees, and new residents to the great Republic of Iridine. Those wishing to benefit must prove they are interested in becoming a valuable asset to the Republic by working for the greater good.

You earn a reputation with this establishment by providing crafted goods, managing the population of harmful critters, and offering the gastrolith stones found within their stomachs, net mending, milling flour, delivering crates, and offering fresh skinned meat and fish, mined ore, and pelts from critters. 
> **Directions**: Walk to Toga, w, nw (numbers 14-19 on the Riverside map)
> **Note**: Only characters with less than 300 Total Ranks will be able to enter this establishment.
More information on this establishment can found here: [Officium de Humanitas](/newbie-office/)
### Newbie Quests

When your character completes the tutorial, they are plopped into the live game world with a codex of tips at the bench of Phaedra, your new character guide. She can answer some basic questions not covered in your tutorial or in your newbie codex. You will also have access to the Auxilia Channel, a channel for new characters seeking help in the game world. When in doubt and in need of assistance, use the player chat channel think net. This is an in-character channel, and to access it simply THINK <what you want to ask>. Your first task should be exploring your surroundings and getting to know the city. From Phaedra, go NORTH 1 Pace, then WEST 1 Pace to arrive at the Stone Toga Inn, a common meeting spot for players on the edge of the Harbor and Forum areas in the city. Here, if you wait a moment, your first newbie quest should appear.

Drovers and workers will stop by from time to time asking for help delivering items to trainers, shops, etc that act as good orientations to important spots in the game world. They will also offer pay when the job is done. These basic, introductory quests can help you find your way around. There are a number of activities you can find by visiting our Newbie Quests page that help build up coin for your character to buy armor, training, and clothing as well as get you around the world.

### Shops
Various merchants throughout the game world will sell items that you may want to purchase.  
**STOCK** - The STOCK command will allow you to see a list of all items a particular shop sells.
**Seeing a specific item** - You can also ask the shopkeeper to show you something you're interested in. This will give you various properties of the item that will let you decide if it's worth your hard-earned coin.
> Command:
> "<NPC Name> Show me <item>
> Example:
> You say to Sesquiculus, "Show me ration."
> Sesquiculus shows you a food ration.
> This is a large, rough chunk of black travel bread.  The bread is specially baked to be hard and light.  Never known for its great taste, the black bread is remarkable in that it is light and filling.
> There are a couple of mouthfuls left.
> It would appear to be in perfect condition.
> Sesquiculus returns a food ration to the stock.
Note: For armor, it will also display how well it protects.

For a list of all shops, what they sell and for how much check out our searchable list of shops here: [Shops](/shops/)

### Selling Items
Some shop owners will provide you with coins for items you find in your adventures. Below are a few commands:
**Getting the value for your item** - You can SHOW <item> to <shopkeeper> to see if they're interested in an item. They'll either give you a price for it or tell you they aren't interested.
> Command:
> show torch to Sesquiculus
> You show a torch to Sesquiculus.
> Sesquiculus says, "I'll give you one denar, three sterces, and one sen for a torch."
Prices vary based on your appearance, charisma, traits, and other factors like market fluctuation and quality of item.
**Selling an item** - If you're happy with the price they'll give you, you can sell the item by using OFFER. 
> Command:
> offer torch to Sesquiculus
> Sesquiculus accepts a torch.
**Seeing your balance** - You can ask an NPC for what they owe you by asking them for your balance.
> Command:
> "Sesquiculus Balance?
> You say to Sesquiculus, "Balance?".
> Sesquiculus says, "I owe you one denar, three sterces, and one sen."
**Getting paid** You can ask the NPC for your change in order to get what is owed. Some shop keepers will pay you in bank notes if the amount is over a certain price. Others will directly deposit it into the bank for a 5% fee.
> Command:
> "Sesquiculus Change?
> You say to Sesquiculus, "Change?"
> Sesquiculus says, "Here's the change I owe you."
> Sesquiculus hands you some coins.
Note: Generally speaking, it's not advantageous to take advantage of a direct deposit. You lose money and they'll usually just write you a bank note anyways.
### Banking
After you sell your items, you'll want to put that hard-earned coin into the bank to protect it from would-be thieves. 
There are several banks in Midlight, usually one in each main town. 
Senada's Bank is the main bank of Iridine and can be found by using WALK TO BANK. From the waypoint, head north twice where you'll find the clerks.

**Inventory** You can ask the old bank clerk for your inventory and he'll let you know what items and coin you have available in your bank.
> "Clerk Inventory?
> You say to an old bank clerk, "Inventory?"
> An old bank clerk nods to you.
> An old bank clerk flips through a sheaf of papers.
> An old bank clerk flips back a few pages.
> The clerk tells you, "Our records show that we are holding a yellow sack, a pile of food rations, a sagum, a necklace, a leather tunic, and a scale whip for you."
> The clerk tells you, "You have eight talents, thirty-nine cents, twenty denars, and one sterce - 161943 in sens - in your account."
You can hold a total of ten items in your bank. It's highly suggested to use containers as these items so you can store more in your bank.
**Withdrawl** To remove coins or items from the bank you simply WITHDRAW <item> for items or WITHDRAW # <currency>. 
Note: Withdrawing an item costs 25 denars per transaction. 
> Commands:
> withdraw 1 talent
> You make a withdrawal request to the clerk.
> An old bank clerk hands you your coinage.
>
> withdraw whip
> An old bank clerk deducts the fee from your account.
> An old bank clerk motions to an attendant, who proceeds to a back room.
> An attendant returns and hands a scale whip to an old bank clerk.
> An old bank clerk makes some notes within a sheaf of papers.
> An old bank clerk flips through a sheaf of papers, making a few marks.
> An old bank clerk gives a scale whip to you.

**Banking Menu** Alternatively, there is the banking menu which allows you to see the contents of your containers in storage, transfer funds to other banks for a fee, and see your currency balance. This can be accessed by using the BANK command within the bank. The menu itself is very selfexplanatory. 
Note: The only thing you cannot do in this menu is make withdraws. 

### Points of Interest

The world of Midlight has thousands of rooms for you to venture into. All have unique descriptions, will interact in various ways be it spawning a creature or triggering an environmental detail such as wind-waving trees. The world is vast and can be dangerous, and as a new character you will want to familiarize yourself mainly with the city of Iridine before venturing further. An [Iridine Map List](/maps/) is available for those wishing to use them. Otherwise, within the city itself there are a number of pre-marked points here that can be accessed on your MARK list. Your character will walk to them automatically by typing WALK TO BANK for example, but the character must be on the main street in order to use them.

* The Bank - Seneda's Bank is the place to put your valuable items and coins. READ SIGN upon entering to understand how to withdraw, deposit, etc or enter BANK when inside to access the banking menu. This bank can transfer coins between the others banks in the world.
* The Stone Toga Inn - Focal point for many events, pints of ale, and lots of lore. This Inn also houses some of the most popular rooms available to rent in the city
* The Colosseum - The grand arena where gladiators fight and shows are hosted for the benefit of the mob
* The Constables Headquarters - If you have a question about crimes or need to inquire about something that was stolen, go here. This also hosts the city jail.
* Bronze Lane and Square - Home to a number of armor and weapons shops, trainers, and the useful Ludus, or gladiator school.
* The Hospice - The game world's healing center, where PC and NPC healers can fix you up. It also serves as the main training center for new healers to the city where NPC patients can be tended to.
* The Bath House - A great place to recover from fatigue. SIT or LAY in the warm water of the Tepidarium to recover fatigue. Do the same in the cold baths to help wounds heal.
* The Curia - Senate Chambers and seat of Iridine's government.
* The Temple of Ereal - Grand Temple of the City. Here, citizens come to pray for guidance and acolytes come to train.
* The Junk Dealer - Find a rotten wooden club? He'll buy it.
