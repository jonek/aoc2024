# AoC 2024
Advent of Code (AoC)
https://adventofcode.com/2024

## Timeing

A new puzzel appears for me at [6:00h in the morning](https://www.timeanddate.de/zeitzonen/zeitzonenrechner?iso=20241201T050000&p1=3919&p2=37) here in Germany.

Puzzels start on December the 1st 2024.

## Template

The directory `template`contains the template for a new day/puzzle.

The template contains:
- A `data` directory containing a `data.txt` file with puzzle input.
  This file is replaced with the actual puzzle data for a new day when
  the template is instanciated with the `new-day.sh` script. See section "Starting a new day".
- A `test.ts` file with some Deno tests that load the `data.txt` file and
  perform some sanity checks against it.

The template structure is intended to allow for a quick start with the new daily puzzle.

## Starting a new day

To start a new day of AoC, execute `./new-day.sh`.
The script prepares a new directory wit a test file and a `data` directory.

The puzzle input file from the AoC website will be downloaded into `data/data.txt`.
This download requires your AoC session cookie in the file `aoc-session-cookie.txt`.
You can find your AoC session cookie in any back end request made by the AoC website.
Just take a look at the requests in the browser's dev tools.
The session cookie has a very long expiration time so you only need to retrieve it once for a new season.
