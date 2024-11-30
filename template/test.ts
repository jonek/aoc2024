import { assert } from "jsr:@std/assert@^0.221.0/assert";

const dataFile = `${import.meta.dirname}/data/data.txt`;

Deno.test("read and print data", () => {
  const dataLines = Deno.readTextFileSync(dataFile);
  console.log(dataLines);

  assert(dataLines.length > 0);
});

Deno.test("data contains bar", () => {
  const dataLines = Deno.readTextFileSync(dataFile).split("\n");

  assert(dataLines.some((line) => line.includes("bar")));
});

Deno.test("data contains two lines", () => {
  const dataLines = Deno.readTextFileSync(dataFile).split("\n");

  assert(dataLines.length === 2);
});
