export BLOG_ORIGIN='https://florrie.ed1.club/'
node build.js

echo '-- Publish:'
echo '-- rsync -a --info=progress2 site/ florrie@ed1.club:/home/florrie/public_html'
