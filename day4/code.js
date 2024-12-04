const fs = require("fs");

function formatData(data) {
  return data.split("\n");
}

function recursePuzzle(
  currColumnIndex,
  currRowIndex,
  goLeft,
  goUp,
  currString,
  word,
  nextLetterIndex,
  puzzle
) {
  if (currString === word) {
    return 1;
  }
  // console.log("column", currColumnIndex, puzzle[0].length);
  // console.log("row", currRowIndex, puzzle.length);

  if (
    currColumnIndex >= puzzle[0].length ||
    currColumnIndex < 0 ||
    currRowIndex >= puzzle.length ||
    currRowIndex < 0
  ) {
    return 0;
  }
  const currPuzzleLetter = puzzle[currRowIndex][currColumnIndex];
  // console.log(currPuzzleLetter);

  if (currPuzzleLetter !== word[nextLetterIndex]) {
    return 0;
  }

  currString += currPuzzleLetter;

  return (
    recursePuzzle(
      currColumnIndex + goLeft,
      currRowIndex + goUp,
      goLeft,
      goUp,
      currString,
      word,
      nextLetterIndex + 1,
      puzzle
    ) + 0
  );
}

function crosswordPuzzle(word, data) {
  const formatToArray = formatData(data);
  let totalWordsInPuzzle = 0;
  for (let i = 0; i < formatToArray.length; i++) {
    for (let j = 0; j < formatToArray[0].length; j++) {
      if (formatToArray[i][j] === word[0]) {
        const left = recursePuzzle(j, i, 1, 0, "", word, 0, formatToArray);
        const right = recursePuzzle(j, i, -1, 0, "", word, 0, formatToArray);
        const down = recursePuzzle(j, i, 0, -1, "", word, 0, formatToArray);
        const up = recursePuzzle(j, i, 0, 1, "", word, 0, formatToArray);
        const leftUpDiag = recursePuzzle(
          j,
          i,
          1,
          1,
          "",
          word,
          0,
          formatToArray
        );
        const leftDownDiag = recursePuzzle(
          j,
          i,
          1,
          -1,
          "",
          word,
          0,
          formatToArray
        );
        const rightUpDiag = recursePuzzle(
          j,
          i,
          -1,
          1,
          "",
          word,
          0,
          formatToArray
        );
        const rightDownDiag = recursePuzzle(
          j,
          i,
          -1,
          -1,
          "",
          word,
          0,
          formatToArray
        );

        totalWordsInPuzzle +=
          left +
          right +
          down +
          up +
          leftUpDiag +
          leftDownDiag +
          rightUpDiag +
          rightDownDiag;
      }
    }
  }
  return totalWordsInPuzzle;
}

function main() {
  const readFile = fs.readFileSync("./input.txt", "utf8");
  //   const readFile = `MMMSXXMASM
  // MSAMXMSMSA
  // AMXSXMAAMM
  // MSAMASMSMX
  // XMASAMXAMM
  // XXAMMXXAMA
  // SMSMSASXSS
  // SAXAMASAAA
  // MAMMMXMMMM
  // MXMXAXMASX`;

  console.log(crosswordPuzzle("XMAS", readFile));
}

main();
