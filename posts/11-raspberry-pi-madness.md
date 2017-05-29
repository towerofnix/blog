    title: "Raspberry Pi madness"
    permalink: '11-raspberry-pi-madness'
    date: {m: 5, d: 26, y: 2017}
    categories:
    - 'text'

---

# Raspberry Pi madness

I got a Raspberry Pi, so, here's some rambling about it and what I've made
with it.

First things first - the Raspberry Pi is *weird.* It's just funny having a tiny
little computer that can do pretty much anything (that isn't terribly
computationally powerful). I guess it's not too surprising, since mobile
devices are already way more powerful (and nearly smaller) than the Raspberry
Pi; but this thing feels a bit different, maybe because I'm actually able to
program it..? (But then there's Pythonista, too. Maybe it's the ability to
SSH into the box sitting on my desk?)

It's also just fun to look at. I took a picture of it:

![Setup](static/media/11-setup.png)

(That picture looks an awful lot like an album cover.)

Although my new setup is a bit less crazy (I got rid of the HDMI output,
keyboard and mouse).

There's one distinct thing in that photo, though - the radio. I've got three
reasons for using that radio, instead of the HDMI TV output:

**Reason one:** I don't want it to rely on HDMI, since sometimes HDMI might
not be available.

**Reason two:** Radios give a nicer feeling. Having the radio speaker output
sound seems more friendly than a gigantic TV (and/or a dedicated monitor)
doing it.

**Reason three:** I wasn't using the radio anyways.

Okay, but, *what am I doing with it?*

Short answer: it's playing my iTunes library.

Long answer: it's downloading song files I have in my iTunes media folder and
playing those. No files are stored on the Raspberry Pi (except for the
currently playing track). I also made it be able to filter things by "group",
which really just means by artist and (optionally) album.

..Ah, who am I kidding? This intro's way too long. I just want to show how it
actually works!

---

## Generating the Playlist

The first thing we need to do is create a file containing all the songs and the
URLs we can use to download them. I like using `python3 -m http.server` as my
main static server, because it only takes that one command to use, so we'll try
to parse the output of that.

Thankfully, the format for directory listings with that server is relatively
simple; every `<a>` on the page links to a file or a deeper folder. Since we're
building a *tree* of the entire library (root -> artists -> albums), we'll need
to navigate the directory recursively; to do that we just run the crawl-folder
function on every `<a>` href-path that ends with `/`.

Like I noted, the tree we end up with goes from the root folder, to a folder
for each artist, and then a folder for each of an artist's albums.

There's actually a setting in the iTunes preferences that does all of that
sorting for us - under Advanced Preferences, "Keep iTunes Media folder
organized". That's enabled by default, I think. How convenient.

I wrote the program that crawls the `python3` server in a separate file from
the main `play.js` script; `crawl-itunes.js`. In fact, it doesn't *require*
iTunes in any way; really it'll generate a tree for any `python3` (or similar)
server. (It probably won't work if the server gives parent-directory links, or
if there's links; it isn't built to deal with potential infinite recursion,
since that's not a problem in my case.)

## Picking the Track

Our playlist file essentially acts as a big listing of track titles and links
to the HTTP download for respective files; we'll use it to pick our song.
(That's what it's made for, after all!)

The thing is, we want to randomly pick a track from all the tracks in our
playlist file. But our playlist file is a tree. We have two options here:

* Recursively pick a random file or sub-group, until we hit a file. Use that.

* Flatten the tree, then pick a random item. Use that.

I went with the second option. The actual code behind it is boring, obviously,
so I won't bother going over it; but in summary we really are just flattening
the tree and picking a random item.

Also, now's a good time to mention the optional "group path" option I made for
the program. If it's specified, the track-selector will only pick from tracks
under the passed group. (Sub-groups are split by `/`; so, for example, you
could make it only pick tracks from *Epic Battle Fantasy IV* by giving it the
group path string `'Phyrnna/Epic Battle Fantasy IV'`.)

## Downloading the Music

Before we can actually play anything, we'll need to download the track we want.
Just downloading the entire track before playing it works; the Raspberry Pi and
the device with the iTunes library are on the same network, so there's no
significant buffering.

Our picked track playlist-item conveniently stores two pieces of information:
the title of the song[\*] and the download link for it. Clearly we'll need the
download link. It's just the HTTP URL we can fetch to download the track; so
that's what we do.

[\*] Really the text between `<a href="..">` and `</a>`; not the actual
title of the track that's stored in the file's metadata. I'm too lazy to
figure out how to get that, plus I think some formats don't even have any
metadata of that sort.

## Converting the Audio File

Before we can actually play the file, we still need to do one thing.
Realistically, our files aren't going to all be in a format the play command
we're using will accept; we need to convert them to a standard format, like
WAV, first.

That's not actually difficult, though. We can use `avconv`[\*] to convert the
downloaded file using a child process; that's just `avconv -y -i in out.wav`.
(`-y` is there to ignore any "should this file be overwritten?" prompts.)

[\*] Originally I'd thought to use `ffmpeg`, but apparently that doesn't
actually exist as a proper package, and `avconv` is the more standard fork
people use. But it looks like `ffmpeg` and `avconv` work basically the same
way, at least to the user; so at least I didn't also have to learn a whole new
command-line program!

## Playing the Audio File

Playing the audio file is as easy as running the `play` command. In fact,
that's what we do!

This step is actually that stupidly simple. It's literally just `play out.wav`.

And then we loop back to picking another track!

## What else can this do?

I'd like to make a playlist file that somehow plays music from a YouTube
channel that has tons of music uploads; SiIvaGunner and HeavyMetal Rocker1988
come to mind. That shouldn't be too hard to do, but it would probably mean
either making an in-between server that downloads and responds with the
downloaded YouTube audio (*stupid!*) or making the program work by downloading
YouTube audio, directly onto the Raspberry Pi (not stupid).

Making it into an actual radio transmitter would be cool, too.
