const fs = require("fs");

function formatData(data) {}

function crosswordPuzzle(word, data) {
  console.log(word, data);
}

function main() {
  // const readFile = fs.readFileSync("./input.txt", "utf8");
  const readFile = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

  console.log(crosswordPuzzle("XMAS", readFile));
}

main();
