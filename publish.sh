export BLOG_ORIGIN='https://florrie.ed1.club/'
node build.js

echo '-- Publish:'
echo '-- rsync -a site/ florrie@ed1.club:/home/florrie/public_html'
