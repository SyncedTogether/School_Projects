
window.addEventListener("load", init);

var canvas, context;

function init(){
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    animate();
}

function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(animate); 
}
