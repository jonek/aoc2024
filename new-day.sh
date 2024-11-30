#!/usr/bin/bash

AOC_SESSION_COOKIE=$(cat aoc-session-cookie.txt)

# year=$(date +%Y)
year=2023
today=$(date +%m)
# dayOfMonth=$(date +%d)
dayOfMonth=1

if [ "$today" -ne 12 ]; then
  echo "It's not yet December, the month of AoC."
  # exit 1
fi

dayDir="$dayOfMonth"

if [ ! -d "$dayDir" ]; then
  echo "create missing directory for AoC day $dayOfMonth..."
  mkdir "$dayOfMonth"
  echo "initializing day $dayOfMonth with template..."
  cp -r template/* "$dayOfMonth"
  echo "fetching data of day $dayOfMonth..."
  curl -o "$dayOfMonth/data/data.txt" "https://adventofcode.com/$year/day/$dayOfMonth/input" --cookie "$AOC_SESSION_COOKIE"
else
  echo "directory for day $dayDir already exists"
fi
