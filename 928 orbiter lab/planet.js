var Planet = function (x, y, r) {
    this.loc = new JSVector(x, y);
    this.r = r;
    this.speedfactor = 3;
    this.speed = randomNumber(-this.speedfactor, this.speedfactor);
    this.vel = new JSVector(this.speed, this.speed);

    this.orbiters = [];
    this.orbiterAmount = randomNumber(1, 20);
    for (let i = 0; i < this.orbiterAmount; i++) {
        this.rad = 5;
        this.amt = this.orbiterAmount;
        this.orbiters[i] = new Orbiter(this.loc.x, this.loc.y, this.rad, i, this.amt);
    }
};

Planet.prototype.udpate = function (x, y, dx, dy) {
    this.loc.add(this.vel);

    for (let i = 0; i < this.orbiters.length; i++) {
        this.orbiters[i].run(this.loc.x, this.loc.y);
    }
};

Planet.prototype.render = function() {
    context.save();
    context.beginPath();
    context.rect(this.loc.x - (this.r/2), this.loc.y - (this.r/2), this.r, this.r);
    context.fillStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();
    context.restore();
}

Planet.prototype.checkEdges = function() {
    if (this.loc.x > (canvas.width - this.r/2) || this.loc.x < this.r/2) {
        this.vel.x = -this.vel.x;
    }
    if (this.loc.y > (canvas.height - this.r/2) || this.loc.y < this.r/2) {
        this.vel.y = -this.vel.y;
    }
}

Planet.prototype.run = function() {
    this.udpate();
    this.checkEdges();
    this.render();
}
