const fsp = require('fs-promise')
const yaml = require('js-yaml')
const marked = require('marked')
const promisify = require('promisify-native')
const fixWS = require('fix-whitespace')
const ncp = promisify(require('ncp').ncp)

const SITE_ORIGIN = (process.env.BLOG_ORIGIN || 'http://localhost:8000/')

const build = () => (
  fsp.readdir('posts')
    .then(postFiles => Promise.all(postFiles.map(
      f => fsp.readFile('posts/' + f, 'utf-8')
    )))
    .then(contents => contents.map(parsePostText))
    .then(posts => Promise.all([
      fsp.writeFile('site/about.html', generateAboutPage()),

      fsp.writeFile(
        'site/archive/all.html',
        generateArchivePage(posts),
        'utf-8'
      ),

      getCategoryData()
        .then(categoryData => Promise.all([
          fsp.writeFile(
            'site/archive.html',
            generateArchiveCategoriesPage(categoryData)
          ),

          fsp.writeFile(
            'site/index.html',
            generatePostPage(getLatestPost(posts), categoryData)
          ),

          ...posts.map(
            post => fsp.writeFile(
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

const generateAboutPage = () => (
  generateSitePage(
    fixWS`
      <title>Blog</title>
      ${descriptionMeta(
        "The (slightly) extended description of towerofnix's blog."
      )}
    `,

    fixWS`
      <h1>towerofnix's Blog Site</h1>

      <p>
        Welcome to the site! It's pretty blank right now, but it'll hopefully
        work well enough as a basic blog. It's been <a href='posts/2-rewriting-it-again.html'>rewritten again</a>
        to be better in general, so now you should be able to browse the site on all your
        <a href='https://en.wikipedia.org/wiki/Comparison_of_web_browsers#JavaScript_support'>stupid browsers</a>.
      </p>

      <p>It'd probably be best to start at the
      <a href='archive.html'>archive</a>.</p>
    `
  )
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
    `<title>${post.config.title}</title>`,
    // No description-meta here.. yet. In theory there should be, but Google
    // does a pretty good job at guessing descriptions from the content of
    // the post.

    fixWS`
      ${post.html}
      <p class='post-meta'>
        (-towerofnix,
          <a href='${getPostPermalink(post)}'>${getTimeElement(post)}</a>;
          ${categoryLinkText})
      </p>
      <div id='disqus_thread'></div>
      ${generateDisqusEmbedScript(post.config.permalink, getPostPermalink(post))}
    `
  )
}

const generateSitePage = (head, body) => (
  fixWS`
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
)

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

const generateArchiveCategoriesPage = (categoryData) => (
  generateSitePage(
    fixWS`
      <title>Archive</title>
      ${descriptionMeta(
        "A list of categories the posts on the blog are organized into."
      )}
    `,

    fixWS`
      <h1>Archive</h1>
      <p>A list of the categories the posts on the blog are organized
      into. See also the <a href='archive/all.html'>archive of all
      posts</a>.</p>

      ${generateCategoryList(categoryData)}
    `
  )
)

const writeCategoryPages = (posts, categoryData) => (
  Object.entries(categoryData).map(
    ([id, cat]) => fsp.writeFile(
      'site/' + getCategoryPath(id),
      generateArchiveCategoryPage(
        cat.title, cat.description,
        posts.filter(post => post.config.categories.includes(id))
      )
    )
  )
)

const generateArchiveCategoryPage = (title, description, posts) => (
  generateSitePage(
    fixWS`
      <title>Archive${title ? ` - ${title}` : ''}</title>
      ${descriptionMeta(description)}
    `,

    fixWS`
      <h1>${title || 'Archive'}</h1>
      <p>${description}</p>

      ${generateArchiveTable(posts.sort((a, b) => getDate(a) - getDate(b)))}
    `
  )
)

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

const parsePostText = text => {
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

  return {
    config: yaml.safeLoad(code),
    html: marked(markdown)
  }
}

const getPostPath = post => (
  `posts/${post.config.permalink}.html`
)

const getPostPermalink = post => (
  getSiteOrigin() + getPostPath(post)
)

const getCategoryPath = id => (
  `archive/${id}.html`
)

const getCategoryData = () => (
  fsp.readFile('categories.yaml', 'utf-8')
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

build()
  .catch(error => console.error(
    `${error.name} - ${error.reason}\n${error.stack}`
  ))
