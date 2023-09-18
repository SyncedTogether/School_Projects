function Mover (loc) {
    this.loc = loc;
    let dx = Math.random() * 2 - 1;
    let dy = Math.random() * 2 - 1;
    this.vel = new JSVector(dx, dy);
}

Mover.prototype.run = function () {
    this.update();
    this.checkEdges();
    this.render();
}

Mover.prototype.update = function (){
    this.loc.add(this.vel);
} 

Mover.prototype.checkEdges = function () {
    if(this.loc.x > world.canvas.width) this.loc.x = 0;
    if(this.loc.x < 0) this.loc.x = world.canvas.width;
    if(this.loc.y > world.canvas.height) this.loc.y = 0;
    if(this.loc.y < 0) this.loc.y = world.canvas.height;
}

Mover.prototype.render = function () {
    let context = world.ctx;
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, 5, 0, 2 * Math.PI);
    context.fillStyle = "blue";
    context.fill();
}