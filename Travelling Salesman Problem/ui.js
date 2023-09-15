function populateCityList() {
  const cityList = document.querySelector("#city-list ul");
  cityList.innerHTML = "";
  cities.forEach((city, index) => {
    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      cities.splice(index, 1);
      animateTour(cities);
      populateCityList();
    });
    listItem.innerText = `Point ${index + 1} (${city.x}, ${city.y})`;
    listItem.appendChild(deleteButton);
    cityList.appendChild(listItem);
  });
}

function deleteAllPoints() {
  cities = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  populateCityList();
  drawCities();
  animateTour(cities);
}

speedSlider.addEventListener("input", function () {
  const speed = speedSlider.value;
  timeStep = speed;
  animateTour(cities);
});
