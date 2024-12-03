const fs = require("fs");

function formatData(data) {
  const reportLines = data.split("\n");
  const reports = reportLines.map((report) => report.split(/\s+/));
  return reports;
}

function isMostlyIncreasing(report) {
  let increasingCount = 0;
  let decreasingCount = 0;

  for (let i = 1; i < report.length; i++) {
    const position1 = Number(report[i - 1]);
    const position2 = Number(report[i]);

    if (position1 < position2) {
      increasingCount++;
    } else if (position1 > position2) {
      decreasingCount++;
    }
  }

  return increasingCount > decreasingCount;
}

function isReportSafeCheck(report, isIncreasing) {
  for (let i = 1; i < report.length; i++) {
    const position1 = Number(report[i - 1]);
    const position2 = Number(report[i]);

    if (
      (isIncreasing && position1 >= position2) ||
      (!isIncreasing && position1 <= position2)
    ) {
      return i - 1;
    } else if (
      (isIncreasing && position1 + 3 < position2) ||
      (!isIncreasing && position1 - 3 > position2)
    ) {
      return i - 1;
    }
  }

  return true;
}

function isReportSafe(report) {
  let isIncreasing = isMostlyIncreasing(report);
  const isNotSafeIndex = isReportSafeCheck(report, isIncreasing);

  if (isNotSafeIndex === true) {
    return true;
  } else {
    const pos1Change =
      isReportSafeCheck(
        [
          ...report.slice(0, isNotSafeIndex),
          ...report.slice(isNotSafeIndex + 1),
        ],
        isIncreasing
      ) === true
        ? true
        : false;
    const pos2Change =
      isReportSafeCheck(
        [
          ...report.slice(0, isNotSafeIndex + 1),
          ...report.slice(isNotSafeIndex + 2),
        ],
        isIncreasing
      ) === true
        ? true
        : false;

    return pos1Change || pos2Change;
  }
}

function totalReportsSafe() {
  const data = fs.readFileSync("./input.txt", "utf8");
  // const data = `57 57 55 56 53`;

  const formattedData = formatData(data);

  let reportsSafe = 0;

  formattedData.forEach((report) => {
    const isSafe = isReportSafe(report);
    reportsSafe += isSafe ? 1 : 0;
  });

  return reportsSafe;
}

function main() {
  const reportsSafe = totalReportsSafe();

  console.log(reportsSafe);
}

main();
