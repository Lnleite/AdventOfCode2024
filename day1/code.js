const fs = require("fs");

function formatData(data) {
  const locations = {
    location1: [],
    location2: {},
  };

  const lines = data.split("\n");
  lines.forEach((line) => {
    const [location1, location2] = line.split(/\s+/);
    locations.location1.push(location1);

    if (location2 in locations.location2) {
      locations.location2[location2] += 1;
    } else {
      locations.location2[location2] = 1;
    }
  });

  return locations;
}

function findTheDistanceForLocations() {
  const data = fs.readFileSync("./input.txt", "utf8");
  const locationsData = formatData(data);
  let similarityDifference = 0;
  locationsData.location1.forEach((location1) => {
    const location2Amount = locationsData.location2[location1];
    if (location2Amount === undefined) return;
    similarityDifference += Number(location1) * location2Amount;
  });

  return similarityDifference;
}

function main() {
  const day1 = findTheDistanceForLocations();

  console.log(day1);
}

main();
