// Circle
function Circle(ctx, x, y, radius, alpha, fillclr) {
    this.ctx = ctx;
    this.loc = new JSVector(x, y);
    this.rad = radius;
    this.opacity = alpha;
    this.fillclr = fillclr;
}

Circle.prototype.render = function () {
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = this.fillclr;
    this.ctx.beginPath();
    this.ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI * 2);
    this.ctx.fill();
}