const fs = require("fs");

function formatData(data) {
  return data;
}

function main() {
  const readFile = fs.readFileSync("./input.txt", "utf8");
  console.log(readFile);
}

main();
