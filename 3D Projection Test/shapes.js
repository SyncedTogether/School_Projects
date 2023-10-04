// Circle

function Circle(x, y, r, fillclr, strokeclr) {
    this.loc = new JSVector(x, y);
    this.r = r;
    this.fillclr = fillclr;
    this.strokeclr = strokeclr;
}

Circle.prototype.render = function() {
    context.beginPath();
    context.arc(this.loc.x, this.loc.y, this.r, 0, 2 * Math.PI);
    context.strokeStyle = this.strokeclr;
    context.fillclr = this.fillclr;
    context.fill();
    context.stroke();
}

Circle.prototype.run = function() {
    this.render();
}

//line

function Line(startpoint, endpoint, thickness, strokeclr) {
    this.start = startpoint;
    this.end = endpoint;
    this.width = thickness;
    this.clr = strokeclr;
}

Line.prototype.render = function(){
    context.beginPath();
    context.moveTo(this.start[0], this.start[1]);
    context.lineTo(this.end[0], this.end[1]);
    context.strokeStyle = this.clr;
    context.stroke();
}