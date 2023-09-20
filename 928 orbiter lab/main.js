window.addEventListener("load", init);

var canvas, context;
var planets=[];

function init(){
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");
    let planetAmount = randomNumber(3, 50);
    CreatePlanets(planetAmount);
    animate(); 
}

function CreatePlanets(PA) {
    for (let i = 0; i < PA; i++) {
        let rmin = 10;
        let rmax = 20;
        let cw = randomNumber(rmax, canvas.width - rmax);
        let ch = randomNumber(rmax, canvas.height - rmax);
        let r = randomNumber(rmin, rmax);
        planets[i] = new Planet(cw, ch, r);
    }
}


function animate() {
    context.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < planets.length; i++) {
        planets[i].run();
    }
    requestAnimationFrame(animate);
}

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 