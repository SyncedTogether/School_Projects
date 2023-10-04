window.addEventListener("load", init);

var canvas, context, frame;
var cubes = []

function init(){
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    frame = 0;
    createCube();
    animate(); 
}

function createCube() {
    let v = [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0], [0, 0, -1], [0, 1, -1], [1, 1, -1], [1, 0, -1]];
    let e = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    for( let i = 0; i < 10; i++){
        cubes[i] = new Mesh(v, e, 100 * i, 250, 5, 0, 0, 0, 5);
    }
    
}

function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);
    for( let i = 0; i < 10; i++){
        cubes[i].rotate();
    }
    
    frame++;
    requestAnimationFrame(animate);
}
