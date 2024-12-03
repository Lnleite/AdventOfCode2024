const fs = require("fs");

function formatData(data) {
  const decipheredArray = data.match(/mul\(\d+,\d+\)/g);
  return decipheredArray;
}

function multiplication(num1, num2) {
  return num1 * num2;
}

function uncorruptedMultiplier() {
  const readFile = fs.readFileSync("./input.txt", "utf8");
  // const readFile =
  //   "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
  const decipheredArray = formatData(readFile);

  return decipheredArray.reduce((total, mul) => {
    const [num1, num2] = mul.match(/\d+/g);
    return (total += multiplication(num1, num2));
  }, 0);
}

function main() {
  console.log(uncorruptedMultiplier());
}

main();
