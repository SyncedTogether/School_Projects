

function handleWheel(event) {
  const mouseX = event.clientX - canvas.offsetLeft;
  const mouseY = event.clientY - canvas.offsetTop;
  const oldZoom = zoom;
  zoom += event.deltaY / 1000;
  if (zoom < 0.1) zoom = 0.1;
  if (zoom > 10) zoom = 10;
  const zoomRatio = zoom / oldZoom;
  offsetX = (mouseX - (mouseX - offsetX) * zoomRatio);
  offsetY = (mouseY - (mouseY - offsetY) * zoomRatio);
  drawGrid();
}


function handleMove(event) {
  if (event.buttons !== 1) {
    return;
  }
  offsetX -= event.movementX / zoom;
  offsetY -= event.movementY / zoom;
  drawGrid();
}

canvas.addEventListener("wheel", handleWheel);
canvas.addEventListener("mousemove", handleMove);


