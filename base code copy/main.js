
window.addEventListener("load", init);

var canvas, context;
const canvasWidth = 1000;
const canvasHeight = 1000;

let zoom = 1;
let offsetX = 0;
let offsetY = 0;

let ground;
let box;

const gridSize = 10000;


function init(){
    canvas = document.getElementById("gridCanvas");
    context = canvas.getContext("2d");
    ground = new Ground(canvas.width/2, canvas.height - 50, canvas.width, 100);
    box = new RigidBody(canvas.width/2, canvas.height/2 - 200, 50, 50);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    animate();
}

function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);
    box.update();
    if (box.y + box.height/2 >= ground.y - ground.height/2) {
        box.y = ground.y - ground.height/2 - box.height/2;
        box.vy = 0;
    }
    ground.draw(context, offsetX, offsetY, zoom);
    box.draw(context, offsetX, offsetY, zoom);
    drawGrid();
    requestAnimationFrame(animate); 
}


function drawGrid() {
    let ctx = context;
    ctx.beginPath();
    for (let x = 0; x <= gridSize; x += 10) {
      ctx.moveTo((x - offsetX) * zoom, -offsetY * zoom);
      ctx.lineTo((x - offsetX) * zoom, (gridSize - offsetY) * zoom);
    }
    for (let y = 0; y <= gridSize; y += 10) {
      ctx.moveTo(-offsetX * zoom, (y - offsetY) * zoom);
      ctx.lineTo((gridSize - offsetX) * zoom, (y - offsetY) * zoom);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

window.addEventListener("wheel", handleWheel);
window.addEventListener("mousemove", handleMove);


function handleMove(event) {
    if (event.buttons !== 1) {
      return;
    }
    offsetX -= event.movementX / zoom;
    offsetY -= event.movementY / zoom;
}


function handleWheel(event) {
    zoom += event.deltaY / 1000;
    if (zoom < 0.1) zoom = 0.1;
    if (zoom > 10) zoom = 10;
}




