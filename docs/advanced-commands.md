# Advanced Commands

[Emotes](#Emotes)
[Advanced Macros](#AdvancedMacros)
[Advanced Speech](#AdvancedSpeech)
[Miscellaneous Advanced Commands](#AdvancedMisc)

---
<a id="Emotes"></a>
## Emotes
### Basic Emotes
You can express yourself using the 'emote' command or the ':' command shortcut followed by your action.

Example:
***emote dances around the room with a wide grin on his face.***

The players in the same room will see:
***Constantine dances around the room with a wide grin on his face.***

### Advanced Emotes:
To make your emotes more targeted and dynamic, you can use advanced syntax by enclosing the name of the person or object in the room with the "<>" symbols.

Examples:

//**emote dances around the room and winks suggestively towards <leda>.
emote dances around <bar>.
emote dances around <leda> and smiles suggestively, grabbing <leda> by the arm.**//
In the above examples, the players in the same room will see the action with the targeted person or object's name, while the targeted person will see it as if it is directed towards them.

You can also use '+p' in conjunction with '<>' to indicate the possessive form.

Example:

***emote dances around the room and grabs <leda+p> arm.***
The players in the same room will see:
***Constantine dances around the room and grabs Leda's arm.***

The usage of '@' in an emote allows you to switch your character's name from the beginning to where you place the '@' symbol.

Example:

***emote Hooting wildly, @ dances around the room.***
The players in the same room will see:
***Hooting wildly, Constantine dances around the room.***

You can combine '@' and '<>' with '+p' in a single emote to create more dynamic and targeted emotes.

Example:

***emote Hooting wildly, @ dances around the room and grabs <leda+p> arm.***
The players in the same room will see:
***Hooting wildly, Constantine dances around the room and grabs Leda's arm.***
While Leda will see:
***Hooting wildly, Constantine dances around the room and grabs your arm.***
---
<a id="AdvancedMacros"></a>
## Advanced Macros

### Basic Macros:

Macros are SHORTHAND commands that can be typed in to execute long or specific commands without having to fully type them out. Macros can be very useful for combat, emoting and general actions that can be quite tedious. You can type in @macro while in the game to see the macro menu:


~~~
Macros
 [A] Add Macro
 [D] Delete Macro
 [L] List Macro [15 defined]
 [S] Set Macro Set
 [C] Create Macro Set
 [R] Remove Macro Set
 [I] Import Macro Set
~~~


Every character starts with 15 "defined" macros. These are fe1-fe15. If for example you set fe1 to "stand", click on the I that is just above the mini-map in the Orchil client will immediately enter the "stand" command for you in the game. You can set fe1, fe2, etc. all the way up to fe15 to have macros that you can easily click on. You can also have several macro sets on a single character based on the tasks at hand, if you wish (for example: a character who knows pickpocketing and combat, a character who has specially set up macros for gladiating that he doesn't want to use outside of the arena, etc.).

Now, if you type in @macro you will make the macro menu pop up. Enter A into the input field and then press enter.


~~~
Enter the shorthand macro string:
~~~


This is the short command that you wish to transform into a longer command. As an example, you could type in TL and then press enter. You will then be prompted with the following:


~~~
Enter the string you wish this macro to expand to:
~~~


This is the longer command that you wish TL to transfer into. TL could be anything that you wish, but in this case, TL would be use for TAKE LANTERN. You then type in TAKE LANTERN and press Enter.

You have successfully added a macro! Macros can extend to anything you wish it to. Some other examples: pwims -> put whip in my sack, supersmile -> emote opens his mouth wide open and flashes a quick smile. , help -> yell I need help! I'm being attacked! , fb -> fall back , and the list goes on and on!

#### Quickly Adding Macros

You can quickly add new macros to your existing macro set WITHOUT having to go through the @macro menu. Simply type in:

**@macro TT**

Which will then create a shorthand macro for the **TT** command and then type in what you wish the command to expand to:

**take torch**

Simply press enter and voila! Your have a brand new macro set without having to go through the menu. Typing in **TT** will now do: **take torch**.

#### Macro Sets

Now let's say that you wish to have different macro sets for your fe1-fe15. You can do so by creating more than one macro set. Here is how to do it:

In the menu, select **C**. Let's name our new macro set PICKPOCKETING. From there you will go back to the previous menu. Type in **S** and then type in **pickpocketing**. Your current macro set will now be pickpocketing. You can now set up your fe1-fe15 for your pickpocketing play (@macro fe1 -> l for trader, @macro fe2 -> app trader, @macro fe3 -> l trader, @macro fe4 -> lift pouch from trader, etc.) You now have your "default" and "pickpocketing" macro sets. You can create as many as you like. All you have to do is use @macro and then use **S** to set your active macro set.

### Advanced Macros:

The TARGET command can be used in conjunction with the macro system. The TARGET command allows you to target a specific object which your macros will then use as reference:

Combat Usage:

Shorthand macro:
stf
Expanded macro:
slash <target> face

Now if you type in: **target thug** and you try your **stf** macro it will attempt to **slash thug face**. The <target> will be replaced by whatever you set your target as while using the TARGET command.

You can also make use of | (shift+#) to create several targets that will be cycled through. For example: **target thug|brute|dog** will now target those three opponents. If there are no thugs or brutes, the dog will be your target. It will always cycle from first to last in terms of priority.

Instead of always typing out **target thug|brute|dog** when you go to the alleys, you could create a macro for it:

Shorthand macro:
alleys
Expanded macro:
target thug|brute|dog

You could therefore set one for every hunting ground in the game. "island" -> target crab|gull|snapper|fluvitur and so on.

Keep in mind that if you use MAN or WOMAN as a target, you may accidentally attack a friend if they make use of a faceplate, so always try to be as precise as possible when creating targets. Simply using "thu" instead of "thug" could result in you attacking Thurok.

Emote Usage:

The TARGET command can also be used in macros that make use of the emote command.

Shorthand macro:
supersmile
Expanded macro:
emote opens his mouth wide open and flashes a quick smile at <target>.

You can also make use of the above syntax in the EMOTE section to create all sorts of macro'ed emotes. If you wish to use a possessive with your target, you can also do so: <<target>+p>
Expanded macro:
emote opens his mouth wide open and flashes a quick smile in <<target>+p> direction.

It would show up as: **Yourname opens his mouth wide open and flashes a quick smile in Leda's direction.** when you enter the **supersmile** command if Leda is your TARGET.

---
<a id="AdvancedSpeech"></a>
## Advanced Speech

### Verbs and Adverbs

The verb system that TEC is a fantastic way to enhance your character, it is also seriously underused. The verbs and adverbs allow you to describe how you are speaking, rather than just saying something.

Don't just ask that hood not to slit your throat, whine to him, beg of him, blubber at him. If you're feeling confident you could demand of him, interrupt him, preach to him or even mock him.

You can also further refine your speech with adverbs. By combining verbs and adverbs, you'll have thousands of new ways to say something!

### Syntax

There are a variety of ways that you can use verbs and adverbs, ranging from simple (**yelp man**) to the complex (**yelp submissively to man "Please don't hurt me!**)
The syntax for using verbs is really quite simple. Once adverbs are thrown into the mix things do get a little more complicated but you should have no problem with it once you've used it a couple of times.

   <!-- WRAPPER FOR TABLE -->
|  |
| --- |
| \|\|~ Command Syntax \|\|~ Example \|\|~ Outcome \|\|<br>\|\| verb target <sup>†</sup> \|\| scoff man \|\| You scoff at a man. \|\|<br>\|\| verb preposition target \|\| purr toward man \|\| You purr toward a man. \|\|<br>\|\| verb preposition target "speech-text \|\| observe to man "I hate patricians. \|\| You observe to a man, "I hate patricians." \|\|<br>\|\| verb "speech-text \|\| declare "I am not wearing any breeches today! \|\| You declare, "I am not wearing any breeches today!" \|\|<br>\|\| verb adverb "speech-text <sup>‡</sup>  \|\| gurgle drunkenly "Tha's some tasy ale!" \|\| You gurgle drunkenly, "Tha's some tasy ale!" \|\|<br>\|\| verb adverb preposition target "speech-text <sup>‡</sup> \|\| sputter threateningly to man "Leave my pet fish alone. \|\| You sputter threateningly to a man, "Leave my pet fish alone." \|\| |
<sup>†</sup>,,Most verbs use a certain default preposition if you do not specify it.,,
<sup>‡</sup>,,You can swap the order of the verb and adverb.,,

### Additional Examples

   <!-- WRAPPER FOR TABLE -->
|  |
| --- |
| \|\|~ Example \|\|~ You See... \|\|~ Other Players See... \|\|<br>\|\| murmur "I hate collecting tunics for a living. \|\| You murmur, "I hate collecting tunics for a living" \|\| Phwoar murmurs, "I hate collecting tunics for a living." \|\|<br>\|\| chirp "My patrician pays me a talent a week. \|\| You chirp, "My patrician pays me a talent a week. \|\| Marnevel chirps, "My patrician pays me a talent a week." \|\|<br>\|\| screech "I hate patricians! \|\| You screech, "I hate patricians!" \|\| Phwoar screeches, "I hate patricians!" \|\|<br>\|\| groan marn \|\| You groan at Marnevel \|\| Phwoar groans at Marnevel \|\|<br>\|\| whoop phw \|\| You whoop at Phwoar \|\| Marvevel whoops at Phwoar \|\|<br>\|\| cheer marn \|\| You cheer for Marnevel \|\| Phwoar cheers for Marnevel \|\|<br>\|\| announce marn "You need a bath! \|\| You announce to Marnevel, "You need a bath!" \|\| Phwoar announces to Marnevel, "You need a bath!" \|\|<br>\|\| inform phw "You smell like raw sewage. \|\| You inform Phwoar, "You smell like raw sewage." \|\| Marnevel informs Phwoar, "You smell like raw sewage." \|\|<br>\|\| babble to marn "You smell worse.\|\| You babble to Marnevel, "You smell worse." \|\| Phwoar babbles to Marnevel, "You smell worse." \|\| |


### Preposition List


~~~
to
at
for
toward
towards
~~~


Note that some prepositions only work with certain verbs. For example:
* You can cheer ***for*** someone, but you can't cheer ***to*** them.
* You can preach ***to*** someone, but you can't preach ***for*** them.

### Verb List

Notes:
* This is not a complete list of verbs. Experiment on your own to find others!
* Verbs vary in functionality. For example, some verbs **require** speech-text. Other verbs do not support speech-text.


abuse
admit
agree
announce
answer
apologize
argue
articulate
ask
bark
bawl
bay
beg
begin
bellow
bleat
blubber
bray
breathe
brush
burn
call
chant
chat
chatter
cheer
chew
chirp
cite
cluck


clutch
collapse
comment
complain
continue
correct
cower
crow
dare
declare
decline
demand
denounce
deplore
disagree
enunciate
exclaim
finish
float
goose
greet
gripe
grovel
guffaw
gurgle
hum
inform
inquire
insist
interrupt


invite
jog
joke
lisp
massage
meditate
mewl
mock
moo
mourn
murmur
neigh
observe
pause
pipe
plead
pontificate
prance
pray
preach
pronounce
protest
purr
quack
question
quote
rant
rave
refuse
relax


remark
remind
reply
report
retort
rumble
run
saunter
scoff
screech
shift
shout
simmer
simper
skip
slink
slither
slump
smack
snigger
snore
sob
sprint
squall
squawk
stagger
stammer
state
straighten
stress


stride
stroke
stutter
support
swagger
swear
sweat
talk
tease
thank
threaten
trill
trot
turn
vociferate
warble
warn
weep
whine
whinny
whoop
wipe
wish
wonder
wrinkle
yap
yelp


### Adverb List

NOTE: This is not a complete list of adverbs. Experiment on your own to find others!


abashedly
abnormally
abominably
abruptly
absentmindedly
abstractedly
abstrusely
absurdly
abusively
accidentally
acrimoniously
actively
acutely
adeptly
adequately
admiringly
adoringly
adroitly
agreeably
alarmedly
alarmingly
alertly
alluringly
ambiguously
ambitiously
amiably
amply
amusingly
angelically
angrily
animatedly
annoyingly
anxiously
apathetically
apologetically
appealingly
appreciatively
apprehensively
appropriately
approvingly
arbitrarily
ardently
arrogantly
artlessly
ascetically
assuredly
astutely
attentively
attractively
audaciously
autocratically
automatically
avariciously
awkwardly
backwardly
badly
banally
barbarically
basely
bashfully
beautifully
becomingly
beguilingly
bemusedly
beneficially
benevolently
bewitchingly
bitterly
bizarrely
blandly
blankly
blasphemously
blatantly
bleakly
blindly
blissfully
blithely
bluntly
blushingly
boldly
boomingly
bootlessly
boringly
bountifully
braggingly
brashly
bravely
briefly
brightly
briskly
broadly
brusquely
brutally
buoyantly
busily
busily
calmly
candidly
carnally
casually
chaotically
charmingly
chastely
cheerfully
cheerlessly
childishly
chivalrously
clearly
cleverly
clumsily
coaxingly
cockily
coherently
coldly
colorfully
comfortably
comically
commandingly
commonly
compassionately
compellingly
compliantly
conceitedly
concernedly
condescendingly
confidently
confusedly
congenially
conscientiously
consciously
considerately
consistently
contagiously
contemplatively
contemptuously
contradictorily
contritely
conveniently
copiously
cordially
courteously
covertly
covetously
coyly
craftily
crappily
crassly
crazily
crisply
critically
crookedly
crudely
cruelly
cryptically
curiously
curtly
cynically
daintily
dangerously
daringly
darkly
dauntingly
debonairly


deceitfully
decently
decidedly
decisively
deeply
defamatorily
deferentially
definitely
deflatedly
deftly
dejectedly
deliberately
delightfully
deliriously
dementedly
depravedly
derangedly
derisively
desolately
despondently
despotically
desultorily
detachedly
deviously
diabolically
dignifiedly
directly
dirtily
disagreeably
disapprovingly
disarmingly
discerningly
disconsolately
discouragingly
discreetly
disdainfully
disgracefully
disgustingly
dishonorably
disparagingly
dispassionately
distantly
distastefully
distinctly
distractedly
distrustfully
docilely
dogmatically
doubtfully
dreamily
drearily
drolly
drowsily
dubiously
dully
dumbly
eagerly
earnestly
easily
eccentricly
ecstatically
effervescently
efficiently
egotistically
elaborately
elatedly
elegantly
emphatically
enchantingly
encouragingly
energetically
enjoyably
enragedly
enticingly
enviously
erratically
erroneously
evasively
evenly
evilly
exaggeratedly
exasperatedly
exasperatingly
excessively
excitedly
exorbitantly
expertly
expressively
extravagantly
exuberantly
facetiously
faintheartedly
faintly
faithfully
falsely
falteringly
familiarly
fanatically
farcically
favorably
fearfully
feebly
femininely
fervently
fiendishly
fiercely
firmly
fitfully
flagrantly
flashily
flatly
flauntingly
fleetingly
flexibly
fluently
foolishly
formally
forwardly
foully
frankly
frantically
freely
friendily
frolicsomely
funnily
furiously
futilely
gaily
generously
genially
gently
genuinely
germanely
gladly
gleefully
glibly
gloatingly
gloomily
gloriously
glumly
gorgeously
gracefully
graciously
gradually
gratefully
gravely
greedily
gregariously
grimly
grossly
grouchily
gruffly
guiltily
guiltlessly
halfheartedly
handily
haphazardly
happily
harassingly
harmlessly
harshly
hastily
hatefully


haughtily
hauntingly
heartily
heavily
heroically
hesitantly
hoarsely
hollowly
honestly
honorably
hostilely
hotly
humbly
hungrily
hurtfully
hushedly
hypocritically
icily
idiotically
idly
ignorantly
impartially
impatiently
imperatively
imperfectly
impertinently
impetuously
imposingly
impressively
improperly
imprudently
impudently
impulsively
impulsively
impurely
inadvertently
inanely
incessantly
incidentally
incoherently
incongruously
inconsiderately
inconsistently
inconsolably
incorrectly
incredibly
indecently
indifferently
indiscreetly
indistinctly
indolently
inebriatedly
ineptly
inflexibly
informally
ingeniously
ingenuously
ingratiatingly
inhumanly
iniquitously
inordinately
inquisitively
insanely
insensibly
insensitively
insipidly
insistently
insolently
instinctively
insultingly
intelligently
intensely
intimately
intrepidly
intriguingly
irately
irksomely
ironically
irrationally
irregularly
irrelevantly
irresolutely
irritably
irritatingly
jauntily
jealously
jocosely
jocularly
jokingly
jollily
jovially
joyously
judiciously
justly
keenly
kindly
lamely
languidly
lasciviously
lavishly
lazily
lecherously
leisurely
lethargically
lewdly
libelously
liberally
lingeringly
listlessly
loftily
logically
loudly
lovingly
lowly
loyally
lucidly
ludicrously
lustfully
madly
majestically
malevolently
maniacally
manipulatively
masculinely
masochistically
meanly
meekly
mellowly
menacingly
merrily
methodically
meticulously
mightily
minutely
mirthfully
miserably
mockingly
moderately
monotonously
morosely
motionlessly
mournfully
mournfully
morosely
muddledly
munificently
musically
mutely
mysteriously
naggingly
naively
narrow-mindedly
nastily
naughtily
negatively
negligently
nervously
neutrally
niggardly
noisily
nonchalantly
nonsensically
noticeably


obligingly
obliviously
obscenely
obscurely
observantly
obtusely
obviously
oddly
officially
ominously
openly
optimistically
ornately
outrageously
outspokenly
overwhelmingly
painfully
particularly
passionately
passively
pathetically
patiently
patronizingly
peacefully
peculiarly
peevishly
penitently
pensively
permissively
pertinently
pesteringly
petulantly
philosophically
phlegmatically
piously
piteously
pitifully
pitilessly
placidly
plausibly
playfully
pleadingly
pleasantly
pleasingly
poignantly
pointedly
pointlessly
pompously
ponderously
poorly
positively
possessively
powerfully
practically
precariously
precipitously
pretentiously
primly
proficiently
profusely
promptly
properly
propitiously
proudly
providently
prudently
pruriently
pryingly
purposefully
quaintly
queerly
questioningly
quickly
quiveringly
quizzically
radiantly
ragingly
randomly
rapidly
rapturously
rashly
rationally
ravenously
readily
reasonably
rebelliously
recklessly
reflectively
regally
regretfully
regularly
relentlessly
relevantly
reliably
relievedly
religiously
remorselessly
remotely
repeatedly
repulsively
respectfully
restlessly
revoltingly
richly
ridiculously
rightlessly
rigidly
rigorously
ritually
robustly
romantically
roughly
royally
rudely
ruggedly
ruthlessly
sadly
sagely
sappily
sarcastically
sardonically
satisfactorily
savagely
scandalously
schemingly
scowlingly
scrupulously
secretly
sedately
seductively
selectively
self-importantly
self-indulgently
selfishly
senselessly
sensibly
sensitively
seriously
servily
sexily
shamefully
sharply
shockingly
showily
shrewdly
shrilly
shyly
significantly
silently
sincerely
sinfully
sinisterly
skeptically
skillfully
slanderously
sleepily
slightly
slothfully
slyly
smartly
smilingly
smirkingly
smoothly


smuttily
softly
solemnly
somberly
somnolently
sonorously
sophisticatedly
sordidly
sorrowfully
soundly
sourly
spartanly
spiritually
spitefully
splendidly
spontaneously
sportively
squeamishly
staidly
startlingly
stately
stately
staunchly
steadfastly
steadily
sternly
stiffly
stiltedly
stingily
stoically
stolidly
stonily
stoutly
strictly
strongly
stubbornly
stuffily
stupidly
sturdily
suavely
subduedly
submissively
suddenly
sufferingly
suggestively
suitably
sullenly
supportively
surely
surprisingly
suspiciously
systematically
tactfully
tamely
tastefully
tearfully
teasingly
tediously
temperately
temptingly
tenderly
tensely
terribly
tersely
thankfully
thinly
thirstily
thoroughly
thunderously
tightly
timidly
timorously
tiredly
tolerantly
torpidly
toughly
traitorously
tranquilly
treacherously
tremendously
tritely
truly
trustworthily
tumultuously
turbulently
unassumingly
uncertainly
uncompromisingly
unconsciously
uncontrollably
unconvincingly
uncouthly
understandably
understandingly
unevenly
unfavorably
unfeelingly
unhappily
unhesitantly
unimpressively
unintelligibly
unpleasantly
unpretentiously
unscrupulously
unselfishly
unsurely
unsystematically
unyieldingly
uprightly
urbanely
urgently
uselessly
vacantly
vaguely
vainly
valorously
vapidly
venally
venerably
veraciously
viciously
vigorously
vilely
villainously
vindictively
violently
virginally
virtuously
vivaciously
vulgarly
vulnerably
wantonly
warily
warmly
warningly
waveringly
weakly
wearily
wearisomely
weirdly
welcomingly
wetly
whimsically
whinily
wickedly
willfully
wisely
witlessly
wittily
wonderingly
worshipfully
worthily
woundedly
wrathfully
wretchedly
wrongly
yearningly
yieldingly
zealously
zestfully
zestily


<a id="AdvancedMisc"></a>
## Advanced Miscellaneous Commands
### Dress/Undress/Outfits/Wear All
#### Dress
**dress <outfit name>**  (See @outfits)

#### Undress
**undress**  (removes all clothing items)
Note: By default you will stow things in your current container item. You can set this with 'stow <storage container name>'

#### @outfits
**@outfits**  (set outfits of specific items  - in order of putting on / removing order)

#### Wear All
**wear all**  (attempts to wear all clothing in the area in correct order)
**wear all <container>** (attempts to wear all clothing in the specified container in correct order)
More details:
```From:    Senses
To:      *news
When:    2:11 pm, Sunday, March 10, 2024
Subject: New command - Wear All
---
Hello TEC community!
For as long as I can remember, it has been an ordeal for charcters to dress
themselves. Trying to recall what should be worn first, middle, last, it can
be a chore, especially for less experienced characters. Although we have had
the "undress" command for quite some time, it has had no counterpart to
actually put the clothes ON you. Today that changes!
Command: wear all
- This will attempt to wear all pieces of clothing/armor/etc. in the room with
you.
Command: wear all <container>
- This will attempt to wear everything that is inside a sack, wagon etc.
The system will do it's best to wear things in an appropriate order, such as
wearing sacks under a sagum or paenula, or wearing a bow on the outer layer so
that it can be drawn, but it is not perfect. Players who have a particular
preference can remove and wear things normally to make fine adjustments.
Testing has shown the command to work very reliably, but not all TEC items
play by the rules, and I expect there to be some exceptions. Give it a whirl
and enjoy!```
