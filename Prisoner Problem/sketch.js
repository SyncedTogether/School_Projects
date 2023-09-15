let prisonerNumbers = [];
let grid;
let gridSpacing = 20;
let resetPn;
let currentPrisoner;
let loopPath = [];
let opacity = 255;
let start = false;
let runButton, incremementButton, slider, amount;
let w;
let h;

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight - 70);
  w = cnv.width;
  h = cnv.height;

  let startamt = 100;
  cnv.position(0, 70);
  background(20, 20, 20);
  loadPrisonerNumbers(startamt);

  grid = createGrid(prisonerNumbers.length);
  drawGrid();

  slider = createSlider(1, 100, 1);
  slider.position(10, 25);
  slider.style("width", "100px");

  amount = createSlider(10, 1000, startamt);
  amount.position(120, 25);
  amount.style("width", "100px");

  runButton = createButton("Update Grid");
  runButton.position(120, 45);
  runButton.mousePressed(function () {
    loadPrisonerNumbers(amount.value());
    grid = createGrid(prisonerNumbers.length);
    drawGrid();
  });

  cnv.mouseClicked(function () {
    let row = floor(mouseY / gridSpacing);
    let col = floor(mouseX / gridSpacing);
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      console.log("Out of bounds.");
    } else {
      let squareNumber = row * grid[0].length + col + 1;
      run(squareNumber);
    }
  });
}




function run(setNumber) {
  let pn = floor(random(prisonerNumbers.length));
  pn = setNumber;
  currentPrisoner = pn;
  resetPn = pn;
  console.log("Random Prisoner Number:" + pn + " -> " + getLoopLength(pn));
  console.log("All loops:");
  console.log(findLoops());
  loopPath = [];
  start = true;
  frameCount = 0;
}

function draw() {
  if (frameCount % slider.value() == 0) {
    updatePrisoner();
    drawGrid();
  }
}

function createGrid(numPrisoners) {
  let numColumns = ceil(sqrt(numPrisoners));
  let numRows = ceil(numPrisoners / numColumns);
  let grid = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    grid[i] = new Array(numColumns).fill(-1);
  }
  return grid;
}

function drawGrid() {
  let canvasWidth = width;
  let canvasHeight = height - 70;
  let maxGridSize = max(grid.length, grid[0].length);
  let gridWidth = gridSpacing * grid[0].length;
  let gridHeight = gridSpacing * grid.length;

  if (canvasWidth / canvasHeight > gridWidth / gridHeight) {
    gridSpacing = canvasHeight / maxGridSize;
  } else {
    gridSpacing = canvasWidth / maxGridSize;
  }

  background(20, 20, 20);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let x = j * gridSpacing;
      let y = i * gridSpacing;
      fill(0);
      stroke(255);
      strokeWeight(1);
      rect(x, y, gridSpacing, gridSpacing);
    }
  }

  noStroke();
  opacity = 255;
  for (let i = 0; i < loopPath.length; i++) {
    let row = floor((loopPath[i] - 1) / grid[0].length);
    let col = (loopPath[i] - 1) % grid[0].length;
    let x = col * gridSpacing;
    let y = row * gridSpacing;
    opacity = (i / loopPath.length) * 255;
    fill(255, 0, 0, opacity);
    rect(x, y, gridSpacing, gridSpacing);
    fill(255, 255, 255);
    textSize(10);
    text(loopPath[i], x + gridSpacing / 2, y + gridSpacing / 2);
    textSize(gridSpacing / 3);
    fill(255, 255, 255, opacity);
    text(prisonerNumbers[loopPath[i]], x, y + gridSpacing);
  }

  stroke(0, 255, 0, 50);
  strokeWeight(3);
  for (let i = 1; i < loopPath.length - 1; i++) {
    let currRow = floor((loopPath[i] - 1) / grid[0].length);
    let currCol = (loopPath[i] - 1) % grid[0].length;
    let nextRow = floor((loopPath[i + 1] - 1) / grid[0].length);
    let nextCol = (loopPath[i + 1] - 1) % grid[0].length;
    let startX = currCol * gridSpacing + gridSpacing / 2;
    let startY = currRow * gridSpacing + gridSpacing / 2;
    let endX = nextCol * gridSpacing + gridSpacing / 2;
    let endY = nextRow * gridSpacing + gridSpacing / 2;
    line(startX, startY, endX, endY);
  }




  let angle = 360 / loopPath.length;
  let radius = 280;
  let trig = [];
  for (let i = 0; i < loopPath.length; i++) {
    trig.push({
      cos: cos(radians(i * angle)),
      sin: sin(radians(i * angle))
    });
  }
  textSize(1000 / loopPath.length);
  for (let i = 0; i < loopPath.length; i++) {
    let t = trig[i];
    let x = t.cos * radius;
    let y = t.sin * radius;
    text(loopPath[i], grid.length * gridSpacing + x + 300, y + radius + 80);
  }
  pop();

  push();
  textSize(600 / loopPath.length);
  let radius2 = 300;
  for (let i = 0; i < loopPath.length; i++) {
    let t = trig[i];
    let x = t.cos * radius2;
    let y = t.sin * radius2;
    text(prisonerNumbers[loopPath[loopPath.length - 1 - i]], grid.length * gridSpacing + x + 300, y + radius2 + 60);
  }
  pop();
}

function updatePrisoner() {
  if (resetPn != currentPrisoner || start) {
    start = false;
    loopPath.push(currentPrisoner);

    let nextPrisoner = prisonerNumbers[currentPrisoner];


    grid[currentPrisoner % grid.length][floor(currentPrisoner / grid.length)] =
      -1;

    grid[nextPrisoner % grid.length][floor(nextPrisoner / grid.length)] =
      currentPrisoner;

    currentPrisoner = nextPrisoner;
  }
}

function loadPrisonerNumbers(n) {
  prisonerNumbers.splice(0, prisonerNumbers.length);
  let temp = [];
  for (let i = 0; i < n; i++) {
    temp[i] = i;
  }
  for (let i = 0; i < n; i++) {
    let tempIndex = floor(random(temp.length));
    prisonerNumbers.push(temp.splice(tempIndex, 1)[0]);
  }
}


function getLoopLength(prisonerNumber) {
  let originalPrisonerNumber = prisonerNumber;
  for (let count = 1; ; count++) {
    prisonerNumber = prisonerNumbers[prisonerNumber];
    if (prisonerNumber == originalPrisonerNumber) return count;
  }
}

function findLoops() {
  let visited = new Array(prisonerNumbers.length).fill(false);
  let loops = [];
  for (let i = 0; i < prisonerNumbers.length; i++) {
    if (!visited[i]) {
      let loop = [];
      let currentNode = i;
      while (!visited[currentNode]) {
        visited[currentNode] = true;
        loop.push({ index: currentNode, value: prisonerNumbers[currentNode] });
        currentNode = prisonerNumbers[currentNode];
      }
      if (loop.length > 1) loops.push(loop);
    }
  }
  return loops;
}
