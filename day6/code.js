const { kMaxLength } = require("buffer");
const fs = require("fs");

function formatData(data) {
  const formattedData = data.split("\n");
  const formattedDataArray = formattedData.map((row) => {
    return row.split("");
  });

  return formattedDataArray;
}

function guardMarching(guardPosition, guardPath) {
  let stillMarch = true;
  let count = 1;
  let guardPositionIndex = guardPosition;
  while (stillMarch) {
    const [gpRow, gpColumn] = guardPositionIndex;
    const currentPosition = guardPath[gpRow][gpColumn];
    const nextPosition = [gpRow, gpColumn];

    switch (currentPosition) {
      case "^":
        nextPosition[0] = nextPosition[0] - 1;
        break;
      case "v":
        nextPosition[0] = nextPosition[0] + 1;
        break;
      case ">":
        nextPosition[1] = nextPosition[1] + 1;
        break;
      case "<":
        nextPosition[1] = nextPosition[1] - 1;
        break;
    }

    if (
      nextPosition[0] >= guardPath.length ||
      nextPosition[0] < 0 ||
      nextPosition[1] >= guardPath[0].length ||
      nextPosition[1] < 0
    ) {
      stillMarch = false;
    } else if (guardPath[nextPosition[0]][nextPosition[1]] === "#") {
      switch (currentPosition) {
        case "^":
          guardPath[gpRow][gpColumn] = ">";
          break;
        case "v":
          guardPath[gpRow][gpColumn] = "<";
          break;
        case ">":
          guardPath[gpRow][gpColumn] = "v";
          break;
        case "<":
          guardPath[gpRow][gpColumn] = "^";
          break;
      }
      nextPosition[0] = gpRow;
      nextPosition[1] = gpColumn;
    } else if (
      guardPath[nextPosition[0]][nextPosition[1]] === "." ||
      guardPath[nextPosition[0]][nextPosition[1]] === "X"
    ) {
      if (guardPath[nextPosition[0]][nextPosition[1]] === ".") {
        count += 1;
      }
      switch (currentPosition) {
        case "^":
          guardPath[nextPosition[0]][nextPosition[1]] = "^";
          break;
        case "v":
          guardPath[nextPosition[0]][nextPosition[1]] = "v";
          break;
        case ">":
          guardPath[nextPosition[0]][nextPosition[1]] = ">";
          break;
        case "<":
          guardPath[nextPosition[0]][nextPosition[1]] = "<";
          break;
      }

      guardPath[gpRow][gpColumn] = "X";
    }
    guardPositionIndex = nextPosition;
  }

  return count;
}

function uniqueStepsGuardMarching(data) {
  const formattedData = formatData(data);
  const guardPosition = [0, 0];
  formattedData.some((row, rowIndex) => {
    const guardPositionColumn = row.findIndex((r) => /\^|>|<|v/.test(r));
    if (guardPositionColumn >= 0) {
      guardPosition[0] = rowIndex;
      guardPosition[1] = guardPositionColumn;
      return true;
    }
  });

  return guardMarching(guardPosition, formattedData);
}

function main() {
  const readFile = fs.readFileSync("./input.txt", "utf8");
  //   const readFile = `....#.....
  // .........#
  // ..........
  // ..#.......
  // .......#..
  // ..........
  // .#..^.....
  // ........#.
  // #.........
  // ......#...`;

  console.log(uniqueStepsGuardMarching(readFile));
}

main();
