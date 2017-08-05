export BLOG_ORIGIN='https://towerofnix.github.io/blog/'
node build.js

echo '-- Publish:'
echo '-- git subtree push --prefix site origin gh-pages'
