const fsp = require('fs-promise')
const yaml = require('js-yaml')
const marked = require('marked')
const promisify = require('promisify-native')
const fixWS = require('fix-whitespace')
const ncp = promisify(require('ncp').ncp)

const SITE_ORIGIN = (process.env.BLOG_ORIGIN || 'http://localhost:8000')

const build = () => (
  fsp.readdir('posts')
    .then(postFiles => Promise.all(postFiles.map(
      f => fsp.readFile('posts/' + f, 'utf-8')
    )))
    .then(contents => contents.map(parsePostText))
    .then(posts => Promise.all([
      fsp.writeFile('site/index.html', generateIndexPage()),

      fsp.writeFile(
        'site/archive/all.html',
        generateArchivePage(posts),
        'utf-8'
      ),

      ...posts.map(
        post => fsp.writeFile(
          'site/' + getPermalink(post),
          generatePostPage(post)
        )
      ),

      getCategoryData()
        .then(categoryData => (
          fsp.writeFile(
            'site/archive.html',
            generateArchiveCategoriesPage(categoryData),
            'utf-8'
          )
        )),

      writeCategoryPages(posts),

      ncp('static', 'site/static')
    ]))
    .then(() => console.log('Built. Site origin: ' + getSiteOrigin()))
)

const generateIndexPage = () => (
  generateSitePage(
    `<title>Index</title>`,

    fixWS`
      <h1>Index</h1>

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

const generatePostPage = post => (
  generateSitePage(
    `<title>${post.config.title}</title>`,

    post.html + `\n` +
    `<div id='disqus_thread'></div>\n` +
    generateDisqusEmbedScript(post.config.permalink, getPermalink(post))
  )
)

const generateSitePage = (head, body) => (
  fixWS`
    <!DOCTYPE html>
    <html>
      <head>
        <base href='${getSiteOrigin()}'>
        ${head}
        <link rel='stylesheet' href='static/site.css'>
      </head>
      <body>
        <div id='main'>
          <div id='nav'>
            <a href='index.html'>(Index.)</a>
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
    `<title>Archive</title>`,

    fixWS`
      <h1>Archive</h1>
      <p>A list of the categories the posts on the blog are organized
      into. See also the <a href='archive/all.html'>archive of all
      posts</a>.</p>

      ${generateCategoryList(categoryData)}
    `
  )
)

const writeCategoryPages = posts => (
  getCategoryData()
    .then(categories => Object.entries(categories).map(
      ([id, cat]) => fsp.writeFile(
        `site/archive/${id}.html`,
        generateArchiveCategoryPage(
          cat.title, cat.description,
          posts.filter(post => post.config.categories.includes(id))
        )
      )
    ))
)

const generateArchiveCategoryPage = (title, description, posts) => (
  generateSitePage(
    `<title>Archive${title ? ` - ${title}` : ''}</title>`,

    fixWS`
      <h1>${title || 'Archive'}</h1>
      <p>${description}</p>

      ${generateArchiveTable(posts)}
    `
  )
)

const generateArchiveTable = posts => (
  fixWS`
    <table>
      <tbody>
        ${
          posts.map(
            post => {
              const link = getPermalink(post)

              return fixWS`
                <tr>
                  <td><a href='${link}'>${post.config.title}</a></td>
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
          this.page.url = '${getSiteOrigin() + permalink}'
          this.page.identifier  = '${permalink}'
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

  return {
    config: yaml.safeLoad(code),
    html: marked(markdown)
  }
}

const getPermalink = post => (
  `posts/${post.config.permalink}.html`
)

const getCategoryData = () => (
  fsp.readFile('categories.json', 'utf-8')
    .then(JSON.parse)
)

const getSiteOrigin = () => SITE_ORIGIN

build()
  .catch(error => console.error(
    `${error.name} - ${error.reason}\n${error.stack}`
  ))
