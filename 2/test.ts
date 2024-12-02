import { assert } from "jsr:@std/assert@^0.221.0/assert";

const dataFile = `${import.meta.dirname}/data/data.txt`;

Deno.test("read and print data", () => {
  const dataLines = Deno.readTextFileSync(dataFile);
  console.log(dataLines);

  assert(dataLines.length > 0);
});

function isReportSafe(report: number[]) {
  let inc: boolean = true;
  let directionFound = false;
  for (let i = 0; i < report.length - 1; i++) {
    const cur = report[i];
    const nex = report[i + 1];
    if (!directionFound) {
      if (cur < nex) {
        inc = true;
        directionFound = true;
      } else if (cur > nex) {
        inc = false;
        directionFound = true;
      } else {
        return false; // report is not safe
      }
    }
    if (directionFound) {
      if (inc && (nex - cur > 3 || nex - cur < 1)) {
        return false; // report is not safe
      }
      if (!inc && (cur - nex > 3 || cur - nex < 1)) {
        return false; // report is not safe
      }
    }
  }
  return true;
}

Deno.test("is safe report", () => {
  const result = isReportSafe([5, 7, 9, 12, 14, 17, 18, 20]);
  assert(result);
});

Deno.test("is unsafe report", () => {
  const result = isReportSafe([47, 46, 48, 51, 54, 57, 54, 58]);
  assert(!result);
});

Deno.test("find safe reports", () => {
  const dataLines = Deno.readTextFileSync(dataFile).split("\n");
  const reports: number[][] = [];
  dataLines.forEach((line) => {
    if (line !== "") {
      reports.push(line.split(" ").map((value) => Number.parseInt(value)));
    }
  });

  const safeReports: number[][] = [];
  reports.forEach((report) => {
    if (isReportSafe(report)) {
      safeReports.push(report);
      const diffs = [];
      for (let i = 0; i < report.length - 1; i++) {
        diffs.push(report[i] - report[i + 1]);
      }
      console.log(diffs.join(" "));
    }
  });

  assert(safeReports.length > 0);
  console.log("number of safe reports:", safeReports.length);
});

Deno.test("find safe reports with problem dampener", () => {
  const dataLines = Deno.readTextFileSync(dataFile).split("\n");
  const reports: number[][] = [];
  dataLines.forEach((line) => {
    if (line !== "") {
      reports.push(line.split(" ").map((value) => Number.parseInt(value)));
    }
  });

  const unsafeReports = reports.filter((report) => !isReportSafe(report));

  assert(unsafeReports.length > 0);
  console.log("number of unsafe reports:", unsafeReports.length);

  let unsafeReportsMadeSafe = 0;
  unsafeReports.forEach((unsafeReport) => {
    for (let i = 0; i < unsafeReport.length; i++) {
      const report = unsafeReport.slice();
      report.splice(i, 1);
      if (isReportSafe(report)) {
        console.log(unsafeReport.join(" "), "made safe by removing", i);
        unsafeReportsMadeSafe++;
        return;
      }
    }
    console.log(unsafeReport.join(" "), "still unsafe");
  });
  console.log("report made safe with problem dampener", unsafeReportsMadeSafe);
  const numberOfOriginalSafeReport = 1000 - unsafeReports.length;
  const totalSafeReports = numberOfOriginalSafeReport + unsafeReportsMadeSafe;
  console.log(numberOfOriginalSafeReport, "+", unsafeReportsMadeSafe, "=", totalSafeReports);
});
