import { assert } from "jsr:@std/assert@^0.221.0/assert";

const dataFile = `${import.meta.dirname}/data/data.txt`;

Deno.test("read and print data", () => {
  const dataLines = Deno.readTextFileSync(dataFile);
  console.log(dataLines);

  assert(dataLines.length > 0);
});

Deno.test("data contains mul()", () => {
  const dataLines = Deno.readTextFileSync(dataFile)
    .split("\n")
    .filter((line) => line !== "");

  assert(dataLines.every((line) => line.includes("mul(")));
  assert(dataLines.length === 6);
});

Deno.test("every line matches", () => {
  const dataLines = Deno.readTextFileSync(dataFile)
    .split("\n")
    .filter((line) => line !== "");
  const regex = /mul\(\d*,\d*\)/gm;
  dataLines.forEach((line, index) => {
    const matches = line.match(regex);
    if (matches) {
      assert(matches.length > 0);
    } else {
      throw new Error(`no matches in line: ${index}`);
    }
  });
});

Deno.test("sum", () => {
  const dataLines = Deno.readTextFileSync(dataFile)
    .split("\n")
    .filter((line) => line !== "");
  const regex = /mul\(\d*,\d*\)/gm;
  const matchArrays = dataLines.map((line) => line.match(regex));

  let sum = 0;
  matchArrays.forEach((matches) =>
    matches?.forEach((match) => {
      const factors = match.match(/\((\d*),(\d*)\)/)?.slice(1, 3);
      if (factors?.length === 2) {
        sum += Number.parseInt(factors[0]) * Number.parseInt(factors[1]);
      }
    })
  );
  console.log("sum of all factors:", sum);
});
