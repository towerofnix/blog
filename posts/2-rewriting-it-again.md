
    title: 'Rewriting it Again'
    permalink: '2-rewriting-it-again'
    date: {m: 4, d: 12, y: 2017}
    categories:
    - 'text'
    - 'blog-dev'

---

# Rewriting it Again

It's been brought to my attention that my blog requires JavaScript to operate
even the slightest reasonable amount. (It's true! Have you tried opening the
site with JavaScript disabled?) I agree that that's bad for a number of
reasons:

* Anybody using a web browser without JavaScript has to go to the
  *code repository* to read the posts. I repeat - *code repository*.

* Most websites work without JavaScript enabled, and a blog certainly has no
  good real-world excuse to require the language.

* Having a single-page layout works really badly for a whole host of reasons,
  including Google indexing, Disqus comment sharing, and jumping to an element
  with an ID (you know, stuff like `index.html#contact`), which are all
  relatively important things.

So I'm rewriting the blog again. This time every update will be automatically
converted by my own computer into static HTML documents. I'm pretty sure that's
how most serverless blogs work.

In the meanwhile, here's a quick picture of something that happened to one of
my characters when I failed to draw their hair well:

![Oops, this was not intentional](static/media/01-oops.png)
