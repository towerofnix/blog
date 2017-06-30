const fs = require('fs')
const yaml = require('js-yaml')
const marked = require('marked')
const fixWS = require('fix-whitespace')
const mjAPI = require('mathjax-node')
const cheerio = require('cheerio')

const { promisify } = require('util')

const ncp = promisify(require('ncp').ncp)
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const readDir = promisify(fs.readdir)

const SITE_ORIGIN = (process.env.BLOG_ORIGIN || 'http://localhost:8000/')

mjAPI.config({
  MathJax: {}
})

mjAPI.start()

const mathjaxTypeset = (math, format) => new Promise((resolve, reject) => {
  mjAPI.typeset({
    math, format,
    svg: true
  }, function(data) {
    if (data.errors) {
      reject(data.errors)
    } else {
      resolve(data.svg)
    }
  })
})

const build = () => (
  readDir('posts')
    // .DS_Store was being caught before this filter was added.. oops!
    .then(postFiles => postFiles.filter(item => item.endsWith('.md')))

    .then(postFiles => Promise.all(postFiles.map(
      f => readFile('posts/' + f, 'utf-8')
    )))
    .then(contents => Promise.all(contents.map(parsePostText)))
    .then(posts => Promise.all([
      readFile('pages/about.md', 'utf-8')
        .then(md => writeFile('site/about.html', generateAboutPage(md))),

      writeFile('site/archive/all.html', generateArchivePage(posts)),

      getCategoryData()
        .then(categoryData => Promise.all([
          writeFile(
            'site/archive.html',
            generateArchiveCategoriesPage(categoryData)
          ),

          writeFile(
            'site/index.html',
            generatePostPage(getLatestPost(posts), categoryData)
          ),

          ...posts.map(
            post => writeFile(
              'site/' + getPostPath(post),
              generatePostPage(post, categoryData)
            )
          ),

          writeCategoryPages(posts, categoryData)
        ])),

      ncp('static', 'site/static')
    ]))
    .then(() => console.log('Built. Site origin: ' + getSiteOrigin()))
)

const generateStaticPage = (md, head = '') => (
  generateSitePage(head, marked(md))
)

const generatePostPage = (post, categoryData) => {
  const categories = post.config.categories

  const categoryLinks = (
    (categories && categories.length > 0)
    ? categories.map(id => fixWS`
      <a href='${getCategoryPath(id)}'>${categoryData[id].title}</a>
    `)
    : null
  )

  const categoryLinkText = (
    categoryLinks
    ? 'categories: ' + categoryLinks.join(', ')
    : 'no categories'
  )

  return generateSitePage(
    // No description-meta here.. yet. In theory there should be, but Google
    // does a pretty good job at guessing descriptions from the content of
    // the post.
    fixWS`
      <title>${post.config.title}</title>
      ${generateMetaHead({
        'Description': getPostDescription(post),
        'twitter:card': 'summary',
        'twitter:site': '@towerofnix',
        'twitter:title': post.config.title,
        'twitter:description': getPostDescription(post),
        'twitter:image': post.config.thumbnail || null,
        'twitter:image:alt': null // </3 TODO: fix this?
      })}
    `,

    fixWS`
      ${post.html}
      <p class='post-meta'>
        (-towerofnix,
          <a href='${getPostPermalink(post)}'>${getTimeElement(post)}</a>;
          ${categoryLinkText})
      </p>
      <div id='disqus_thread'></div>
      ${
        generateDisqusEmbedScript(
          post.config.permalink, getPostPermalink(post)
        )
      }
    `
  )
}

const generateAboutPage = md => {
  const description = (
    "The (slightly) extended description of towerofnix's blog."
  )

  return generateStaticPage(
    md,
    fixWS`
      <title>Blog</title>
      ${generateMetaHead({
        'Description': description,
        'twitter:card': 'summary',
        'twitter:site': '@towerofnix',
        'twitter:title': "About",
        'twitter:description': description,
      })}
    `
  )
}

const generateSitePage = (head, body) => {
  if (!head.includes('twitter')) {
    // TODO: It would be really nice to be able to log the title of the page
    // here! - But virtually impossible without being smart and parsing the
    // head text.
    console.warn('No twitter meta tags..?\n' + head + '\n\n')
  }

  if (!head.includes('Description')) {
    console.warn('No Description meta tag..?\n' + head + '\n\n')
  }

  return fixWS`
    <!DOCTYPE html>
    <html>
      <head>
        <base href='${getSiteOrigin()}'>
        <meta charset='utf-8'>
        ${head}

        <link rel='stylesheet' href='static/site.css'>
      </head>
      <body>
        <div id='main'>
          <div id='nav'>
            <a href='index.html'>(Front.)</a>
            <a href='about.html'>(About!)</a>
            <a href='archive.html'>(Archive.)</a>
          </div>
          <div id='content'>
            ${body}
          </div>
        </div>
      </body>
    </html>
  `
}

const generateMetaHead = dict => {
  return Object.entries(dict)
    .filter(([ k, v ]) => {
      if (!v) {
        // It's normal to have a null value (that means "there's nothing in
        // this field"), but for there to be an undefined value (or
        // otherwise)..? That's strange!
        if (v !== null) {
          console.warn('Unset ' + k + '?', dict)
        }

        return false
      }

      return true
    })

    // fix-whitespace is broken??????? yikes.jpg
    // .map(([ k, v ]) => fixWS`
    //   <meta name='${k}' content="${
    //     v.replace(/"/g, '&quot;').replace(/\n/g, '__-\n-__')
    //   }">
    // `)

    .map(([ k, v ]) => (
      `<meta name='${k}' content="${v.replace(/"/g, '&quot;')}">`
    ))
    .join('\n')
}

const generateArchivePage = posts => (
  generateArchiveCategoryPage(
    '', // just use the default title, Archive (not "Archive - Archive"!)
    fixWS`
      A quick (read: long) table of all of the posts I've published here.
      See also the <a href='archive.html'>category-based archive</a>.
    `,
    posts
  )
)

const generateArchiveCategoriesPage = (categoryData) => {
  const description = (
    "A list of categories the posts on the blog are organized into."
  )

  return generateSitePage(
    fixWS`
      <title>Archive</title>
      ${generateMetaHead({
        'Description': description,
        'twitter:card': 'summary',
        'twitter:site': '@towerofnix',
        'twitter:title': 'Archive',
        'twitter:description': description
      })}
    `,

    fixWS`
      <h1>Archive</h1>
      <p>A list of the categories the posts on the blog are organized
      into. See also the <a href='archive/all.html'>archive of all
      posts</a>.</p>

      ${generateCategoryList(categoryData)}
    `
  )
}

const writeCategoryPages = (posts, categoryData) => (
  Object.entries(categoryData).map(
    ([id, cat]) => writeFile(
      'site/' + getCategoryPath(id),
      generateArchiveCategoryPage(
        cat.title, cat.description,
        posts.filter(post => post.config.categories.includes(id))
      )
    )
  )
)

const generateArchiveCategoryPage = (title, description, posts) => {
  const fullTitle = 'Archive' + (title ? ` - ${title}` : '')

  return generateSitePage(
    fixWS`
      <title>${fullTitle}</title>
      ${generateMetaHead({
        'Description': getHTMLDescription(description),
        'twitter:card': 'summary',
        'twitter:site': '@towerofnix',
        'twitter:title': fullTitle,
        'twitter:description': getHTMLDescription(description)
      })}
    `,

    fixWS`
      <h1>${title || 'Archive'}</h1>
      <p>${description}</p>

      ${generateArchiveTable(posts.sort((a, b) => getDate(a) - getDate(b)))}
    `
  )
}

const generateArchiveTable = posts => (
  fixWS`
    <table>
      <colgroup>
        <col>
        <col class="date-col">
      </colgroup>
      <tbody>
        ${
          posts.map(
            post => {
              const link = getPostPath(post)

              return fixWS`
                <tr>
                  <td><a href='${link}'>${post.config.title}</a></td>
                  <td>${getTimeElement(post)}</td>
                </tr>
              `
            }
          ).join('\n')
        }
      </tbody>
    </table>
  `
)

const generateCategoryList = (categoryData) => (
  fixWS`
    <ul>
      ${
        Object.entries(categoryData).map(
        ([id, category]) => fixWS`
          <li>
            <a href='archive/${id}.html'>${category.title}:</a>
            ${category.description}
          </li>
        `
        ).join('\n')
      }
    </ul>
  `
)

const generateDisqusEmbedScript = (identifier, permalink) => (
  (getSiteOrigin().indexOf('localhost') === -1)
  ? (
    fixWS`
      <script>
        function disqus_config() {
          console.log(this)
          this.page.url = '${permalink}'
          this.page.identifier = '${permalink}'
        }

        (function() {
          var d = document, s = d.createElement('script')
          s.src = 'https://another-blog-test.disqus.com/embed.js'
          s.setAttribute('data-timestamp', +new Date())
          var e = (d.head || d.body)
          e.appendChild(s)
        })()
      </script>
    `
  ) : (
    fixWS`
      <hr>
      <p>(This is a local build of the site - comments will appear here
      when on a published build.)</p>
    `
  )
)

const parsePostText = async (text) => {
  // Parses the text contents of a post .md file.
  //
  // YAML configuration is stored before a '---' separator. Markdown content
  // comes after the separator.
  //
  // It's recommended to indent the configuration code before '---' as a code
  // block, so that it's valid Markdown code.

  const separator = '\n---\n'

  const separatorIndex = text.indexOf(separator)
  const code = text.slice(0, separatorIndex)
  const markdown = text.slice(separatorIndex + separator.length)

  let config

  try {
    config = yaml.safeLoad(code)
  } catch (err) {
    throw new Error('Invalid YAML: ' + err.message)
  }

  // We SHOULD use a custom Marked renderer, but MathJax runs asynchronously,
  // while marked expects a synchronous value. To be fair you could hack around
  // that (e.g. by storing a key to each math element, and then rendering those
  // after running marked), but that's a little yucky, and we can get inline
  // math if we deal with MathJax and Marked separately.

  let processedMarkdown = markdown

  processedMarkdown = await processMarkdown(processedMarkdown,
    /<pre class='math'>([\s\S]+?)<\/pre>/g,

    match => {
      const mathText = match[1]

      return mathjaxTypeset(mathText, 'TeX')
        .then(math => `<p class='math'>${math}</p>`)
    }
  )

  processedMarkdown = await processMarkdown(processedMarkdown,
    /<code class='math'>([\s\S]+?)<\/code>/g,

    match => {
      const mathText = match[1]

      return mathjaxTypeset(mathText, 'inline-TeX')
        // Nobody knows why, but adding whitespace between the <span> and
        // ${math} magically makes inline TeX work..
        .then(math => fixWS`
          <span class='inline-math'>
            ${math}</span>
        `)
    }
  )

  return {
    config: yaml.safeLoad(code),
    html: marked(processedMarkdown),
    markdown: markdown // Explicit is usually better than implicit
    // (The meaning of the above comment is implied)
  }
}

const getPostPath = post => (
  `posts/${post.config.permalink}.html`
)

const getPostPermalink = post => (
  getSiteOrigin() + getPostPath(post)
)

const getPostDescription = post => {
  if (post.config.description) {
    return post.config.description
  }

  return getHTMLDescription(post.html)
}

const getHTMLDescription = html => {
  const $ = cheerio.load(html)

  // Some paragraphs can only include images; we don't want to use those for
  // getting the description text.
  for (let p of $('p').get()) {
    const text = $(p).text()

    if (text) {
      return text
    }
  }

  return $.root().text()
}

const getCategoryPath = id => (
  `archive/${id}.html`
)

const getCategoryData = () => (
  readFile('categories.yaml', 'utf-8')
    .then(text => yaml.safeLoad(text))
    .then(
      yamlObj => {
        const ret = {}

        for (let entry of yamlObj.categories) {
          ret[entry.id] = entry
        }

        return ret
      },
      err => {
        throw new Error("YAML Error: " + err.message, err)
      }
    )
)

const getLatestPost = posts => {
  let latestPost = posts[0]
  let latestDate = 0

  for (let curPost of posts) {
    const curDate = getDate(curPost)
    if (curDate > latestDate) {
      latestPost = curPost
      latestDate = curDate
    }
  }

  return latestPost
}

const getDate = post => {
  if (!('date' in post.config)) {
    console.warn(`Post ${post.config.title} has no date!`)
    return null
  }

  const { y, m, d } = post.config.date

  return new Date(y, m, d)
}

const getTimeElement = post => {
  const date = getDate(post)

  const datetime = !date ? '' : asDatetime(date)

  const humanDatetime = (
    !date ? '(No date)' : asHumanReadableDate(date)
  )

  return `<time datetime='${datetime}'>${humanDatetime}</time>`
}

const asDatetime = date => (
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
)

const asHumanReadableDate = date => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ]

  const monthName = months[date.getMonth() - 1]

  return `${monthName} ${date.getDate()}, ${date.getFullYear()}`
}

const getSiteOrigin = () => SITE_ORIGIN

const descriptionMeta = text => {
  const escapedText = text.replace(/"/g, '&quot;')
  const firstLine = escapedText.split('\n')[0] // Line breaks are BAD!

  return fixWS`
    <meta name='Description' content="${firstLine}">
  `
}

const processMarkdown = async (markdown, regex, matchFunction) => {
  let processedMarkdown = ''
  let lastIndex = 0

  while (true) {
    const match = regex.exec(markdown)

    if (match) {
      processedMarkdown += markdown.slice(lastIndex, match.index)
      processedMarkdown += await matchFunction(match)
      lastIndex = regex.lastIndex
    } else {
      break
    }
  }

  processedMarkdown += markdown.slice(lastIndex)

  return processedMarkdown
}

build()
  .catch(error => console.error(
    `${error.name} - ${error.reason}\n${error.stack}`
  ))
