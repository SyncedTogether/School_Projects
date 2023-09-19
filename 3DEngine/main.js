window.addEventListener("load", init);

var canvas, context, engine;


function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    animate();
    engine = new Engine();
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
}
