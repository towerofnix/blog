<!-- I'm lazy and don't feel like changing this all into following the "no more than 80 characters on a line" rule; I originally wrote this as a GItHub issue. Sorry! -->

# Being sad about how images don't work on the blog's GitHub page
## (AKA: An explanation of the `<base>` HTML tag)

Case in point: [this.](https://github.com/towerofnix/blog/blob/38a7b7e0a52e92474ce215b5eae87cf30cf9becd/posts/8-a-snake-maybe.md)

The issue is that I cheat<sup>[1]</sup> and use the [`<base>`][base-tag] tag to have easier embed URLs for things like images.

For example, suppose I write `my-fancy-post.md`, and I want to include the image `cool-image.png`. My options:

1. The easy way. Use absolute paths: `![Cool image!](/static/media/cool-image.png)`. But what if the blog's root path isn't `/`? In fact, it *isn't* – my blog's currently presented at `https://towerofnix.github.io/blog/`. We'd be embedding `https://towerofnix.github.io/static/media/cool-image.png`. And that doesn't exist, of course; I don't have a `static` folder under [`liam4.github.io.git`](https://github.com/towerofnix/towerofnix.github.io) or [a repository with that name](https://github.com/towerofnix/static/), so GitHub pages considers it to not exist. What we want is <code>https:/<b></b>/liam4.github.io<strong>/blog</strong>/static/cool-image.png</code>.

2. The (just slightly) less easy way. Use relative paths: `![Cool image!](../static/media/cool-image.png)`. *That* should work, right? The post HTML documents are stored at `(site root)/posts/blah.html`, so we'd be referencing `(site root)/posts/../static/media/cool-image.png`, or, simplified, `(site root)/static/media/cool-image.png`. Great! It works. Except – hold on. We display the most recent post [on the homepage](https://github.com/towerofnix/blog/issues/1), at `(site root)/index.html`. That means, from `index.html`, we'll be loading `(site root)/../static/media/cool-image.png`. And that's not right.<sup>[2]</sup> (citation: option 1).

3. The right way (which takes too long to explain in a single list item). Use [`<base>`][base-tag]: `<base href='https://liam4.github.io/blog/'> (..) ![Cool image!](static/media/cool-image.png)`.

`<base>` seems like magic at first, but it isn't really [black magic](http://www.catb.org/jargon/html/B/black-magic.html), because it's in the spec.<sup>[3]</sup> Basically<sup>[4]</sup>, `<base>` changes where relative paths are relative to. So by changing it to `https://liam4.github.io/blog/`, all relative paths are loaded according to that. `foo/bar.html` will *always* refer to `https://liam4.github.io/blog/foo/bar.html`, as long as there's a `<base>` tag that href's to `https://liam4.github.io` in the document.

Bonus points for using `<base>`:

* It's really easy to embed `<base>` on every page, just by having it be in the `<head>`-part of my generic blog page template.

* `<base>` also works on things like links, which makes it *really* easy to link to any page on the blog, from any page on the blog. (Example: the navigation bar has the same HTML on every page of the blog, but the links still work irregardless of what page the navigation bar actually shows up on. Another: linking to a blog post from anywhere on the site – even other post pages – is easy; just link to `posts/post-file.html`!)

The only problem with `<base>` is that when you're viewing an HTML preview of your markdown file, you don't get to see the images, since the `<base>` is ignored while the HTML preview is compiled.<sup>[5]</sup> (It should be pretty clear why – `![](static/media/foo.png` no longer refers to `https://liam4.github.io/static/media/foo.png`, but rather, `(current directory)/static/media/foo.png`, which won't appear correctly unless `(current directory)` happens to be the site root (i.e. the directory containing `static`).)

I don't really see a way to solve that, though. The benefits greatly outweigh that cost, so `<base>` is what I'm using.

---

PS, did anybody here by chance know me by my art and not my code?

..Nah, I'm the only person who follows my blog anyways. And the only other people that do probably know me from (generally) code-writing-based communities, for the stuff I've programmed, not my art.

<!-- PPS, to anybody reading the source code of this post, I've thought about how ending my post with "also, you lost the game" might actually make people comment *less*, since they'll be required to go tell somebody they lost the game (as per The Rules), which is essentially a distraction. Also, you lost the game! -->

---

<sup>[1] This isn't actually true; I'm pretty sure I'm following the intended use of `<base>`. See option 3.</sup>

<sup>[2] See option 1.</sup>

<sup>[3] "It's in the spec" doesn't really make something *not* [magic](http://www.catb.org/jargon/html/M/magic.html), if nobody can understand what the spec is saying, which is sometimes the case (citation needed). What makes it not magic is that it actually does make sense when I explain it to you (citation needed).</sup>

<sup>[4] I get to say that because nobody else says it (since nobody knows about `<base>`). (Cheesy "all right I'll leave now" here.)</sup>

<sup>[5] [Markdown is *supposed* to let you embed any HTML tags you want into your document](https://daringfireball.net/projects/markdown/syntax#html), but GitHub doesn't follow that rule and gets rid of `<base>` tags (and *every* tag except for what's on [their whitelist](https://github.com/jch/html-pipeline/blob/1b5058918eeb0507ac225934cd3e9238f0b94139/lib/html/pipeline/sanitization_filter.rb#L42-L49)) when it compiles markdown previews. So, [sure enough](https://gist.github.com/towerofnix/ac3a23d5fefbde422f44685674f5feac), setting the `<base>` within the markdown document doesn't work for GitHub markdown previews, which is the use case in which our issue practically lies.</sup>

  [base-tag]: https://developer.mozilla.org/en/docs/Web/HTML/Element/base