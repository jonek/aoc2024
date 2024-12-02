import { assert } from "jsr:@std/assert@^0.221.0/assert";

const dataFile = `${import.meta.dirname}/data/data.txt`;

Deno.test("read and print data", () => {
  const dataLines = Deno.readTextFileSync(dataFile);
  console.log(dataLines);

  assert(dataLines.length > 0);
});

Deno.test("parse lists", () => {
  const dataLines = Deno.readTextFileSync(dataFile).split("\n");
  const left = [];
  const right = [];

  dataLines.forEach((line) => {
    const parts = line.split("   ");
    if (parts.length === 2) {
      left.push(parts[0]);
      right.push(parts[1]);
    }
  });

  assert(right.length === left.length);
});

function parse(dataFile: string) {
  const dataLines = Deno.readTextFileSync(dataFile).split("\n");
  const left: number[] = [];
  const right: number[] = [];

  dataLines.forEach((line) => {
    const parts = line.split("   ");
    if (parts.length === 2) {
      left.push(Number.parseInt(parts[0]));
      right.push(Number.parseInt(parts[1]));
    }
  });
  return { left, right };
}

Deno.test("compare lists", () => {
  const { left, right } = parse(dataFile);

  left.sort();
  right.sort();

  const distances = left.map((id, index) => {
    const leftValue = id;
    const rightValue = right[index];
    const distance = Math.abs(leftValue - rightValue);
    console.log(index, leftValue, rightValue, distance);
    return distance;
  });
  assert(distances.length === left.length);

  console.log(
    "(part one solution) sum of differences:",
    distances.reduce((acc, value) => acc + value, 0)
  );
});

Deno.test("compute similarity between lists", () => {
  const { left, right } = parse(dataFile);

  const rightFrequencies = new Map();
  right.sort();
  right.reduce((rightFrequencies, value) => {
    if (rightFrequencies.has(value)) {
      rightFrequencies.set(value, rightFrequencies.get(value) + 1);
    } else {
      rightFrequencies.set(value, 1);
    }
    return rightFrequencies;
  }, rightFrequencies);

  const similarities = left.map((leftValue) => leftValue * rightFrequencies.get(leftValue) || 0);

  assert(similarities.length > 0);
  console.log(similarities.join(" + "));
  console.log(
    "(part two solution) sum of similarities:",
    similarities.reduce((acc, value) => acc + value, 0)
  );
});
