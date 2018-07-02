#!/bin/sh

# commit
git add -A
git commit -m 'update'
git push origin blog

# generate posts && deploy
hexo g
hexo d
