var Orbiter = function (x, y, r, i, orbiterAmount) {
    this.planetloc = new JSVector(x, y);
    this.loc = this.planetloc;
    this.r = r;
    this.orbitalDistance = 30;
    this.angleVelocity = 0.1;
    this.orbiterAmount = orbiterAmount;
    this.increment = i + 1;
    this.angle = this.increment * (Math.PI*2/this.orbiterAmount);
}

Orbiter.prototype.update = function (x, y) {
    this.planetloc.x = x;
    this.planetloc.y = y;
    this.angle += this.angleVelocity;
    this.loc.x = this.planetloc.x + (this.orbitalDistance * Math.cos(this.angle));
    this.loc.y = this.planetloc.y + (this.orbitalDistance * Math.sin(this.angle));
};

Orbiter.prototype.render = function() {
    context.beginPath(); 
    context.arc(this.loc.x, this.loc.y, this.r, 0, 2 * Math.PI);
    context.strokeStyle = "black";
    context.fillStyle = "red";
    context.fill();
}

Orbiter.prototype.run = function(x, y) {
    this.update(x, y);
    this.render();
}