const fs = require("fs");

function formatData(data) {
  const locations = {
    location1: [],
    location2: [],
  };

  const lines = data.split("\n");
  lines.forEach((line) => {
    const [location1, location2] = line.split(/\s+/);
    locations.location1.push(Number(location1));
    locations.location1.sort((a, b) => a - b);
    locations.location2.push(Number(location2));
    locations.location2.sort((a, b) => a - b);
  });

  return locations;
}

function findTheDistanceForLocations() {
  const data = fs.readFileSync("./input.txt", "utf8");
  const locationsData = formatData(data);
  let totalDistance = 0;

  locationsData.location1.forEach((location1, index) => {
    const location2 = locationsData.location2[index];
    totalDistance += Math.abs(location1 - location2);
  });

  return totalDistance;
}

function main() {
  const day1 = findTheDistanceForLocations();

  console.log(day1);
}

main();
