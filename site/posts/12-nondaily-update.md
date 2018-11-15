
    title: 'Non-daily Update'
    date: {m: 5, d: 31, y: 2017}
    categories:
    - 'text'
    - 'dev'

---

# Non-daily Update

I made myself a text file for storing a log of the things I do in a few days
ago. It's kind of shocking how huge it is; I really feel more productive when
I can write a paragraph or two about all the different things I do in a day.
I might release the whole file somewhere, at some point; meanwhile here's a
bunch of excerpts from my log so far (it's ~2000 words long in just four days,
haha).

(This really is just an excerpt, though; I cut out a fair amount of videos or
school that I didn't have much to comment on. Think of this page as a 100%
quote of the interesting things in my log.)

(I added a bunch of links for context; all the content was written by me,
generally not long after I did whatever I mentioned in each paragraph.)

## May 28th

* I did a quiz on the general topic of waves in physical science. I started
  writing proper notes (as I do for my geometry); they’re helpful, but it’s
  a bit annoying that I didn’t start earlier. Oh well.

* I merged Broadcast Vars into [Scrap][scrap]. Scrap is pretty much finished
  at this point.

* I looked up [Baiyon][baiyon] after a [PixelJunk Eden track][pj-eden]
  randomly played on iTunes. Apparently he collaborated with [C418][C418] to
  make the track [185][185]! What a small world.

* I discovered Eden Obscura, a new PixelJunk game. This is being made RIGHT
  NOW, so it'll be something to keep an eye out for!

* I learned not to use the `fs-promise` NPM module anymore, since it's
  deprecated. Opt for `mz/fs` instead!

* I read [a blog post][introspection] by [eevee][eevee]; it's quite
  ridiculously relatable (..though I haven't tried to do all the things I want
  to, yet..) and worth reading in general.

* I read eevee's [weekly update][weekly-update]. "I'm feeling pretty good?" is
  generally the way I'd describe the days that go well for me, too. — This was
  a comforting little paragraph to read:

  > I was held at gunpoint by glip and forced to help them design my own
  > characters, which is, extremely cool and good. I’m starting to think they
  > like doing creative work with me and think I have interesting ideas??"

## May 29th

* I read a few old stories I made and published on a blog I don't use anymore.
  They weren't that bad, considering I was around five when I wrote them.

* I did a section on electromagnetic waves (and the electromagnetic spectrum)
  in my physical science course. I don't feel like the course teaches it very
  well; they never seem to give explanations on WHY anything works the way it
  does. I guess since this is essentially an introductory course, I'm not
  really supposed to expect much of that, but.. it'd be more interesting if
  they explained why things work the way they do at least a little, you know?

  While doing that I also wrote a few paragraphs on the math behind some
  behaviour of waves; I think that it'll be helpful, considering I've been
  having a bit of trouble totally understanding the actual logic behind how
  waves work.

  Also, the questions for my science always feel a bit.. stupid? They're
  pretty much always a matter of "can you remember all the facts we threw at
  you in the lecture?" or "did you take enough notes? - did you catch that
  one detail?". Of the five questions on the section, three of them were just
  "which is true?" questions on the positioning of different types of waves
  on the EM spectrum.

  (I mentioned that I'm not really satisfied with what they teach, right?
  Like, they didn't even explain what the difference between electromagnetic
  and non-electromagnetic waves are.. just that some waves fall on the EM
  spectrum, and some don't, and that the ones that do are EM waves.)

* I watched [a video][smw] on a jailbreak for Super Mario World. It's a bit
  crazy to think that people are still discovering incredible bugs and tricks
  for ancient games like Super Mario World.

* I worked on my Raspberry Pi music player a bit. That included improving
  the reliability of the iTunes/`python3 -m http.server` crawler; there
  shouldn't be any more missing albums or artists. I also added a few options
  to the command line interface for it; you can now keep and ignore specific
  groups. It's not technically more powerful than iTunes itself, but I'd say
  it's a lot more comparable, now, and potentially easier to use.

* I watched [time mop][time-mop] by [bill wurtz][billwurtz]. I wonder what
  makes the part where it goes past zero so funny? Maybe it's just the fact
  that it's doing something so *obviously* intuitively right ("it's already
  going down, why stop at zero?") but also entirely unexpected (countdowns
  usually do stop at zero), combined with the happy, fun music in the
  background.

## May 30th

* I did a bunch of geometry and learned about transformation matrices. Well,
  it was mostly the topic of adding and multiplying matrices; that's not too
  surprising, though (and fine; it was interesting anyways). I wrote a bunch
  on multiplying matrices, but it only works in one case (when multiplying AxB
  \* BxA matrices), which doesn't help much when the other case (multiplying
  AxB \* BxC matrices) is also valid. I'm pretty sure the lecture skipped
  glossed over that case.

* I worked on the HTTP music player and added a fair few number of new
  features. The most important one is that it now preloads tracks while one is
  already playing; basically, it does all the work it needs to do to play a
  track while one is already playing, so that you don't notice it doing that
  work, and there's no significant pause between two tracks anymore. I also
  made it possible to play tracks in order rather than shuffled, fixed a bug
  or two, and cleaned up a bunch of code.

* I read a few forum threads on the old Scratch forums (pre-2.0). They seem to
  have been a nicer place back then.

* I worked a bit on my algebra on KhanAcademy and got to a point where I
  mastered 500 skills. That's nice. I also 100%-mastered a few earlier grade
  levels (third and fourth), as well as arithmetic; though they were all
  pretty much already mastered.

## May 31st

* I wrote a bit on [an idea][grandia] to make Grandia III have competitive
  battles. I don't actually know how, though, and probably nobody on that
  subreddit does either, but whatever. The idea's still there.

* I read an (adapted) article titled "Will Technology Make You
  Healthier?". It's relatively self-descriptive, but it did touch on
  less obvious subjects like the controversy around future possibilities.
  (Is it alright to take from a human embyro to help someone, if in the
  process, the embyro will be destroyed?)

* I watched ["The Speed of Light is NOT About Light"][speed-of-light], by
  [PBS Space Time][space-time].

  It generally explained how the speed of light really doesn't derive from
  the speed that light travels at (rather it's the reverse), but I didn't
  find that it explained HOW particularly well (essentially they said that
  the universal constant, which the speed of light is equivalent to, must
  have the value that it does because of various other universal rules; but
  they didn't really explain the math that leads to it actually having the
  value it does).

  Particular topics I'd like to know more of include how the Lorentz
  transformation works, the difference between that and the previously set
  system, what Maxwell's equations actually mean, and why they require a
  specific constant value for the universal constant.

* I improved the style for `<code>`s on my blog. I think code looks nicer now;
  hopefully other people do, too.

* I worked on my Raspberry Pi HTTP-based music player a bunch. For me, the
  person who programs it all, I split it into a bunch of different files; that
  was done over the course of a series of messy git commits and computer-swaps.
  I also made it so that the temporary song download now use actual tempfiles,
  rather than hidden files that are semi-automatically deleted by the play.js
  program - so now things are in general a lot cleaner. Before, pressing ^C
  wouldn't get rid of the WAV for the currently playing file (nor the WAV for
  the up-next song), so you'd end up with tons of leftover WAVs, quickly eating
  up hundreds of megabytes (two new files every time you run the player!).
  That's fixed now - *real* tempfiles, which I'm now using, are automatically
  deleted by the system!

* I made my music player use `util.promisify` for `fs` methods. So much for
  `mz/fs` being relevant.

* I read a short story about a kid who broke his leg and got it fixed, all
  without getting any donations or funding from family friends (or others),
  and his not-particularly-rich family didn't even have any financial stress,
  period. I won't spoil the trick - [read it yourself!][one-free-solution]

  Okay, but seriously, it's kind of interesting to think about not having any
  sort of fund-raiser needed. I never really thought of the stress that must
  come, you know, financially, in places where healthcare isn't free. I guess
  it's kind of taken for granted until you've got experience with a place
  that doesn't have free healthcare.

  [scrap]: http://towerofnix.github.io/scrap-mod/
  [baiyon]: http://baiyon.com/en/
  [pj-eden]: https://www.youtube.com/playlist?list=PLB0A37E2F550DB027
  [C418]: https://c418.org/
  [185]: https://c418.bandcamp.com/track/185
  [eevee]: https://eev.ee/
  [introspection]: https://eev.ee/blog/2017/05/28/introspection/
  [weekly-update]: https://eev.ee/dev/2017/05/28/weekly-roundup-in-flux/
  [smw]: https://www.youtube.com/watch?v=Ixu8tn__91E
  [time-mop]: https://www.youtube.com/watch?v=DofhF-2sg1o
  [billwurtz]: http://www.billwurtz.com/
  [grandia]: https://www.reddit.com/comments/6een02/
  [speed-of-light]: https://www.youtube.com/watch?v=msVuCEs8Ydo
  [space-time]: https://www.youtube.com/channel/UC7_gcs09iThXybpVgjHZ_7g
  [one-free-solution]: http://www.upworthy.com/when-her-5-year-old-broke-his-leg-this-mom-raised-0-its-actually-inspiring
