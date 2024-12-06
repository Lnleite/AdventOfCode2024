const fs = require("fs");

function formatData(data) {
  const [rules, printOrder] = data.split("\n\n");

  const rulesArray = rules.split("\n");
  const printOrderArray = printOrder.split("\n");

  const rulesObject = {};

  rulesArray.forEach((rule) => {
    const [firstRule, secondRule] = rule.split("|");

    if (firstRule in rulesObject && "before" in rulesObject[firstRule]) {
      rulesObject[firstRule].before.add(secondRule);
    } else {
      rulesObject[firstRule] = {
        ...rulesObject[firstRule],
        before: new Set([secondRule]),
      };
    }
  });

  return [rulesObject, printOrderArray];
}

function isCorrectRuleOrder(printOrderArray, rulesObject) {
  let correctOrder = true;

  for (let i = 1; i < printOrderArray.length; i++) {
    const order = printOrderArray[i];
    const rules = rulesObject[order];

    if ("before" in rules) {
      for (let j = i - 1; j >= 0; j--) {
        const currentOrder = printOrderArray[j];
        if (rules.before.has(currentOrder)) {
          i = printOrderArray.length;
          j = -1;
          correctOrder = false;
        }
      }
    }
  }

  return correctOrder;
}

function totalMiddleNumberCorrectPrintQueue(data) {
  const [rulesObject, printOrderArray] = formatData(data);
  let total = 0;

  printOrderArray.forEach((printOrder) => {
    const printOrderArray = printOrder.split(",");
    const isCorrect = isCorrectRuleOrder(printOrderArray, rulesObject);

    if (isCorrect) {
      total += Number(printOrderArray[Math.floor(printOrderArray.length / 2)]);
    }
  });

  return total;
}

function main() {
  const readFile = fs.readFileSync("./input.txt", "utf8");
  //   const readFile = `47|53
  // 97|13
  // 97|61
  // 97|47
  // 75|29
  // 61|13
  // 75|53
  // 29|13
  // 97|29
  // 53|29
  // 61|53
  // 97|53
  // 61|29
  // 47|13
  // 75|47
  // 97|75
  // 47|61
  // 75|61
  // 47|29
  // 75|13
  // 53|13

  // 75,47,61,53,29
  // 97,61,53,29,13
  // 75,29,13
  // 75,97,47,61,53
  // 61,13,29
  // 97,13,75,29,47`;

  console.log(totalMiddleNumberCorrectPrintQueue(readFile));
}

main();
