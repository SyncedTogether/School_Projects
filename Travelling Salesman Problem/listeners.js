let isDragging = false;

canvas.addEventListener("mousedown", (event) => {
  isDragging = true;
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(event.clientX - rect.left);
  const y = Math.floor(event.clientY - rect.top);
  const city = { x, y };

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cities.push(city);
  populateCityList();
  drawCities();
});

canvas.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);
    const lastCity = cities[cities.length - 1];
    const distance = Math.sqrt((x - lastCity.x) ** 2 + (y - lastCity.y) ** 2);
    if (distance >= 20) {
      const city = { x, y };
      cities.push(city);
      populateCityList();
      drawCities();
    }
  }
});

canvas.addEventListener("mouseup", (event) => {
  isDragging = false;
  animateTour(shortestTour());
});
