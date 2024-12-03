const fs = require("fs");

function formatData(data) {
  const decipheredArray = data.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);
  return decipheredArray;
}

function multiplication(num1, num2) {
  return num1 * num2;
}

function uncorruptedMultiplier() {
  const readFile = fs.readFileSync("./input.txt", "utf8");
  // const readFile =
  //   "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
  const decipheredArray = formatData(readFile);
  let shouldMultiply = true;

  return decipheredArray.reduce((total, mul) => {
    if (mul === "do()") {
      shouldMultiply = true;
      return total;
    } else if (mul === "don't()") {
      shouldMultiply = false;
      return total;
    }

    if (!shouldMultiply) return total;
    const [num1, num2] = mul.match(/\d+/g);
    return (total += multiplication(num1, num2));
  }, 0);
}

function main() {
  console.log(uncorruptedMultiplier());
}

main();
