#!/usr/bin/env bash
set -o errexit

npm install

STORAGE_DIR=/opt/render/project/.render

if [[ ! -d $STORAGE_DIR/chrome ]]; then
  echo "...Downloading Chrome"
  mkdir -p $STORAGE_DIR/chrome
  npx puppeteer browsers install chrome --path $STORAGE_DIR/chrome
else
  echo "...Using Chrome from cache"
fi