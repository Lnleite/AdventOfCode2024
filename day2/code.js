const fs = require("fs");

function formatData(data) {
  const reportLines = data.split("\n");
  const reports = reportLines.map((report) => report.split(/\s+/));
  return reports;
}

function isReportSafe(report) {
  let isIncreasing = null;

  for (let i = 1; i < report.length; i++) {
    const position1 = Number(report[i - 1]);
    const position2 = Number(report[i]);

    if (isIncreasing === null) {
      isIncreasing = position1 < position2;
    }

    if (
      (isIncreasing && position1 >= position2) ||
      (!isIncreasing && position1 <= position2)
    ) {
      return false;
    } else if (
      (isIncreasing && position1 + 3 < position2) ||
      (!isIncreasing && position1 - 3 > position2)
    ) {
      return false;
    }
  }

  return true;
}

function totalReportsSafe() {
  const data = fs.readFileSync("./input.txt", "utf8");

  const formattedData = formatData(data);

  let reportsSafe = 0;

  formattedData.forEach((report) => {
    reportsSafe += isReportSafe(report) ? 1 : 0;
  });

  return reportsSafe;
}

function main() {
  const reportsSafe = totalReportsSafe();

  console.log(reportsSafe);
}

main();
