#!/bin/sh

if ! git diff-index --quiet HEAD --; then

# commit
git add -A
git commit -m 'update'
git push origin blog



# generate posts && deploy
hexo g
hexo d
fi
