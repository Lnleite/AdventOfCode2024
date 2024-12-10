const { kMaxLength } = require("buffer");
const fs = require("fs");

function formatData(data) {
  const formattedData = data.split("\n").map((equation) => {
    const [total, equationNums] = equation.split(": ");
    const equationNumsArray = equationNums.split(" ").map((num) => Number(num));
    return [Number(total), equationNumsArray];
  });

  return formattedData;
}

function canNumsEqualTotal(currentIndex, currentTotal, needTotal, equationNum) {
  if (currentTotal === needTotal && currentIndex === equationNum.length) {
    return true;
  }

  if (currentTotal > needTotal) {
    return false;
  }

  if (currentIndex === equationNum.length) return false;

  return (
    canNumsEqualTotal(
      currentIndex + 1,
      currentTotal + equationNum[currentIndex],
      needTotal,
      equationNum
    ) ||
    canNumsEqualTotal(
      currentIndex + 1,
      currentTotal * equationNum[currentIndex],
      needTotal,
      equationNum
    )
  );
}

function correctEquations(data) {
  const formattedData = formatData(data);
  let equationTotals = 0;

  formattedData.forEach((equation) => {
    const [total, equationNum] = equation;
    const canEqualTotal = canNumsEqualTotal(
      1,
      equationNum[0],
      total,
      equationNum
    );

    if (canEqualTotal) {
      equationTotals += total;
    }
  });

  return equationTotals;
}

function main() {
  const readFile = fs.readFileSync("./input.txt", "utf8");
  //   const readFile = `190: 10 19
  // 3267: 81 40 27
  // 83: 17 5
  // 156: 15 6
  // 7290: 6 8 6 15
  // 161011: 16 10 13
  // 192: 17 8 14
  // 21037: 9 7 18 13
  // 292: 11 6 16 20`;

  console.log(correctEquations(readFile));
}

main();
