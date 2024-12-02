#!/usr/bin/bash

function green() {
  echo "\033[0;32m$1\033[0m"
}

function red() {
  echo "\033[0;31m$1\033[0m"
}

AOC_SESSION_COOKIE=$(cat aoc-session-cookie.txt)

if [ -z "$1" ]; then
  year=$(date +%Y)
else
  year=$1
fi
if [ -z "$2" ]; then
  dayOfMonth=$(date +%-d)
else
  dayOfMonth=$2
fi
today=$(date +%m)

if [ "$today" -ne 12 ]; then
  echo "It's not yet December, the month of AoC."
  # exit 1
fi

dayDir="$dayOfMonth"

if [ ! -d "$dayDir" ]; then
  echo -e "create missing directory for AoC day $(green $dayOfMonth) ..."
  mkdir "$dayOfMonth"
  echo -e "initializing day $(green $dayOfMonth) with template ..."
  cp -r template/* "$dayOfMonth"
else
  echo -e "directory for day $(red $dayDir) already exists"
fi
echo -e "fetching data of day $(green $dayOfMonth) ..."
curl -o "$dayOfMonth/data/data.txt" "https://adventofcode.com/$year/day/$dayOfMonth/input" --cookie "$AOC_SESSION_COOKIE"
