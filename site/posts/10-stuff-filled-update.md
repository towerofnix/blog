
    title: "Stuff-filled update"
    permalink: '10-stuff-filled-update'
    date: {m: 5, d: 20, y: 2017}
    categories:
    - 'text'
    - 'dev'

---

# Stuff-filled update

This last week or so was pretty productive! I think the world ended a few
times, the general state of everything everywhere got worse, and several of
the things you always thought were good have apparently been for evil and
malevolent causes all this time. Welcome to humanity. (Some exaggeration
implied.)

*Locally,* I made a few things! I'd originally written this in chronological
order but that didn't work well. No sorting guaranteed from here on.

I made a Dragon Quest IX alchemy thing. You give it the name of an alchemy
recipe; it tells you all the ingredients that are needed, and all the
ingredients required to make each of those ingredients, and so on (down to
ingredients that can't be alchemized). That took a while to make - *mostly*
because of the gigantic file storing all the recipes in the game (that I've
discovered) that I typed out by hand. It mostly looks like
[this](static/media/10-recipe-file-screenshot.png).

I worked on Ludum Depot 38 Cool Edition a bit. [Ludum Depot 38][ld38] is a
game [eevee][eevee] and [glitchedpuppet][glip] made; Cool Edition is an
endless (infinity waves) version of that game that I'm working on. Basically
I implemented a few suggestions that Opa-Opa gave;
[read them](static/media/10-thanks.png) if you're interested.

I made a program that more or less imports images into [Sploder][sploder]
games. (You can't import images in the custom graphics editor, and even if you
could, they'd only be 16x16 tiles; which wouldn't be manually feasible for
large tiles!) That ended up looking something like this:

![Sploder magic.](static/media/10-sploder-magic.png)

I wrote a bit about it [here][sploder-magic].

I made [a quick "game"][cupcakes]. It's pretty boring; the main fun of it was
implementing [the engine behind it][cupcake-src] from scratch. (The only really
useful part was seeing klinklang's object implementation, which was quite
possibly stolen from somewhere else. I'd link you to klinklang, but it's a
library that's somehow been split up and used in a bunch of eevee's games;
it doesn't have any central repository as far as I know, so I'll just direct
you to [eevee's GitHub page](https://github.com/eevee/).)

I turned [a whole bunch of GameFAQs text][grotto-guide] into a more
human-readable PDF and [printed it][printed-guide]. I'm pretty satisfied with
the result, even though I'll probably never read that guide more than once or
twice (and then, only specific parts of it); but then again, that's kind of
how references are.

I also technically drew a [thing](static/media/10-whelp.png), but I'm not
really impressed by it. I didn't *really* feel like drawing when I made that
\- you know, that itch to make something and see how it turns out (even if it
ends up entirely imperfectly/terribly). So it isn't quite as close to me as
some of the other stuff I've drawn (mostly what I've posted on this blog).

So not a horribly boring week! Better than [quick update][a-quick-update]'s
one (er, three), that's for sure.

  [ld38]: https://eevee.itch.io/lunar-depot-38
  [eevee]: https://twitter.com/eevee/
  [glip]: https://twitter.com/glitchedpuppet/
  [sploder]: http://sploder.com/
  [sploder-magic]: http://forums.sploder.com/index.php/topic,504355.msg6410307.html
  [cupcakes]: https://twitter.com/towerofnix/status/864434231107366912
  [cupcake-src]: https://github.com/towerofnix/Lexy-and-the-Quest-for-Cupcakes/
  [grotto-guide]: https://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/61151
  [printed-guide]: https://twitter.com/towerofnix/status/865376968249925633
  [a-quick-update]: posts/7-quick-update.html
