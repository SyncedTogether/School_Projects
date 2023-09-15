// DOM elements
const canvas = document.getElementById("canvas");
const speedSlider = document.getElementById("speedSlider");
const showUnsolved = document.getElementById("showUnsolved");
const colorByDistance = document.getElementById("colorByDistance");

// Canvas context
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

// Global variables
let numCities = Math.floor(Math.random() * 100) + 3;
let cities = generateRandomCities(numCities, canvas.width);
let intervalId = null;
let timeStep = speedSlider.value;

// Functions
function generateRandomCities(numCities, range) {
  const cities = [];
  for (let i = 0; i < numCities; i++) {
    const x = Math.floor(Math.random() * range);
    const y = Math.floor(Math.random() * range);
    cities.push({ x, y });
  }
  return cities;
}

function drawCities() {
  ctx.fillStyle = "black";
  cities.forEach((city) => {
    ctx.beginPath();
    ctx.arc(city.x, city.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function distance(city1, city2) {
  const dx = city1.x - city2.x;
  const dy = city1.y - city2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function nearestNeighbor(city, visited) {
  let nearest = null;
  let minDist = Infinity;
  cities.forEach((neighbor) => {
    if (!visited.includes(neighbor)) {
      const dist = distance(city, neighbor);
      if (dist < minDist) {
        nearest = neighbor;
        minDist = dist;
      }
    }
  });
  return nearest;
}

function tourDistance(tour) {
  let dist = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    const city1 = tour[i];
    const city2 = tour[i + 1];
    dist += distance(city1, city2);
  }
  return dist;
}

function shortestTour() {
  const visited = [cities[0]];
  while (visited.length < cities.length) {
    const lastCity = visited[visited.length - 1];
    const nextCity = nearestNeighbor(lastCity, visited);
    visited.push(nextCity);
  }
  visited.push(cities[0]);
  return visited;
}

function animateTour(tour) {
  try {
    populateCityList();
    clearInterval(intervalId);
    let i = 0;
    let tourDistance = 0;
    intervalId = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (showUnsolved.checked) {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        for (let j = i; j < tour.length - 1; j++) {
          const city1 = tour[j];
          for (let k = j + 1; k < tour.length; k++) {
            const city2 = tour[k];
            ctx.beginPath();
            ctx.moveTo(city1.x, city1.y);
            ctx.lineTo(city2.x, city2.y);
            ctx.stroke();
          }
        }
      }

      drawCities();
      ctx.lineWidth = 2;
      try {
        for (let j = 0; j <= i; j++) {
          const city = tour[j];
          if (j === 0) {
            ctx.beginPath();
            ctx.moveTo(city.x, city.y);
          } else {
            const prevCity = tour[j - 1];
            const distance = Math.sqrt(
              (city.x - prevCity.x) ** 2 + (city.y - prevCity.y) ** 2
            );
            tourDistance += distance;
            let distReference = tourDistance / (tour.length * 10);
            if (colorByDistance.checked) {
              const green = Math.round((1 - distance / distReference) * 255);
              const blue = Math.round((distance / distReference) * 255);
              ctx.strokeStyle = `rgb(0, ${green}, ${blue})`;
            } else {
              ctx.strokeStyle = "black";
            }

            ctx.lineTo(city.x, city.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(city.x, city.y);
          }
        }
      } catch (e) {}

      try {
        const currentCity = tour[i];
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(currentCity.x, currentCity.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText(`Tour distance: ${Math.round(tourDistance)}`, 10, 30);

        i++;
        if (i === tour.length - 1) {
          clearInterval(intervalId);
        }
      } catch (e) {}
    }, timeStep);
  } catch {
    console.log("Error");
  }
}

const tour = shortestTour();
animateTour(tour);
