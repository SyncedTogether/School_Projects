window.addEventListener("load", init);

//globals
var canvas, context, cnv_width, cnv_height;

//constants
const PI = Math.PI;
const TWO_PI = PI * 2;
const depth = 800;

//variables
var points = new Array(100);

function init(){
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");

    cnv_width = canvas.width;
    cnv_height = canvas.height;

    initPoints();
    animate();
}

function animate() {
    //refresh canvas
    context.clearRect(0,0,canvas.width,canvas.height);

    renderPoints(context);


    requestAnimationFrame(animate); 
}

function initPoints() {
    for(let point = 0; point < points.length; point++) {
        points[point] = new Vertex();
    }
}

function renderPoints(context) {
    for(let point = 0; point < points.length; point++) {
        points[point].run();
    }
}