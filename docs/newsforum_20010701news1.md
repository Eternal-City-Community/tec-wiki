---
title: "Newsforum 20010701news1"
category: "World & Maps"
---

# Newsforum 20010701news1

Message 9 on *news:
From:    Scott
To:      *news
When:    9:35 pm, Sunday, July 01, 2001
Subject: Skotos Verb additions to TEC
---
In an effort to standardize things somewhat between TEC and the Skotos
evocation system, several hundred new social commands and over 1000 adverbs
have been added to TEC. 
The patterns of words in the new social commands can vary based upon how
complex the concept being expressed is: 
> adverb verb preposition target speech-text 
> verb adverb preposition target speech-text 
> verb target speech-text 
> verb target 
The adverb can be any of an exhaustive list. If one is missing that you'd like
to use, put it in an @request. The adverb is always optional. 
The verb is the command name, same as current TEC socials. 
The preposition will vary by command and isn't required for all commands. 
The target is the person or item within your environment that you wish to
interact with. 
The speech-text will begin with a " and extend to the end of the command. The
examples should make this clear. 
Examples: 
> rant at Tug "You constables. Always warranting me! 
> piteously whine to Kaylarae "Please, don't arrest me... 
The output will always be in the following order: 
> actor verb adverb preposition target speech-text. 
You see: 
> You rant at Tug, "You constables. Always warranting me!" 
> You piteously whine to Kaylarae, "Please, don't arrest me..." 
Tug sees: 
> JoeThief rants at you, "You constables. Always warranting me!" 
Kaylarae sees: 
> JoeThief piteously whines to you, "Please, don't arrest me..." 
Everyone else sees: 
> JoeThief rants at Tug, "You constables. Always warranting me!" 
> JoeThief piteously whines to Kaylarae, "Please, don't arrest me..." 
If any of the parts are missing and aren't required, then they won't be
included into the output. 
As always, please @report any issues, errors or inconsistencies that may arise
with the implementation of this system. 
We hope you enjoy it!
