export BLOG_ORIGIN='https://liam4.github.io/blog/'
node build.js

echo '-- Publish:'
echo '-- git subtree push --prefix site origin gh-pages'
