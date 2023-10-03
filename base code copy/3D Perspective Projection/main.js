const mathjs = require('mathjs')
const test = mathjs.matrix([1, 1], [1, 1])
console.log(test)
window.addEventListener("load", init);

// Constants
const debug_vertices = true;
const debug_radius = 10;
const depth = 1000;
const GLOBE_RADIUS = 0;

// Globals
var canvas, context;
var xCenter, yCenter;
var vertices = [];

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");

    xCenter = canvas.width / 2;
    yCenter = canvas.height / 2;

    createPoints(1);

    animate();
}

function createPoints(num) {
    for (let i = 0; i < num; i++) {
        vertices[i] = new Vertex();
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    vertices.sort((point1, point2) => {
        return point1.scaleProjected - point2.scaleProjected;
    });

    for (let i = 0; i < vertices.length; i++) {
        vertices[i].run();
    }

    requestAnimationFrame(animate);
}
