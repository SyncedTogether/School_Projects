function Vector2D(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

Vector2D.prototype.setMagnitude = function (mag) {
  var dir = this.getDirection();
  this.x = mag * Math.cos(dir);
  this.y = mag * Math.sin(dir);
}

Vector2D.prototype.getMagnitude = function () {
  return (Math.sqrt(this.x * this.x + this.y * this.y));
}

Vector2D.prototype.setDirection = function (angle) {
  var mag = this.getMagnitude();
  this.x = Math.cos(angle) * mag;
  this.y = Math.sin(angle) * mag;
}

Vector2D.prototype.getDirection = function () {
  return (Math.atan2(this.y, this.x));
}

Vector2D.prototype.add = function (v2) {
  this.x = this.x + v2.x;
  this.y = this.y + v2.y;
}

Vector2D.prototype.sub = function (v2) {
  this.x = this.x - v2.x;
  this.y = this.y - v2.y;
}

Vector2D.addGetNew = function (v1, v2) {
  return (new Vector2D(v1.x + v2.x, v1.y + v2.y));
}

Vector2D.subGetNew = function (v1, v2) {
  return (new Vector2D(v1.x - v2.x, v1.y - v2.y));
}

Vector2D.prototype.multiply = function (scalar) {
  this.x = this.x * scalar;
  this.y = this.y * scalar;
}

Vector2D.prototype.divide = function (scalar) {
  this.x = this.x / scalar;
  this.y = this.y / scalar;
}

Vector2D.prototype.normalize = function () {
  this.setMagnitude(1);
}

Vector2D.prototype.limit = function (lim) {
  if (this.getMagnitude() > lim) {
    this.setMagnitude(lim);
  }
}

Vector2D.prototype.distance = function (v2) {
  return (Math.sqrt((v2.x - this.x) * (v2.x - this.x) + (v2.y - this.y) * (v2.y - this.y)));
}

Vector2D.prototype.distanceSquared = function (v2) {
  return ((v2.x - this.x) * (v2.x - this.x) + (v2.y - this.y) * (v2.y - this.y));
}

Vector2D.prototype.rotate = function (angle) {
  let x = this.x, y = this.y;
  let cos = Math.cos(angle);
  let sin = Math.sin(angle);
  this.x = x * cos - y * sin;
  this.y = x * sin + y * cos;
}

Vector2D.prototype.angleBetween = function (v2) {
  return (Math.abs(this.getDirection() - v2.getDirection()));
}

Vector2D.prototype.copy = function () {
  return (new Vector2D(this.x, this.y));
}

Vector2D.prototype.toString = function () {
  let x = this.x.toFixed(2);
  let y = this.y.toFixed(2);
  let mag = this.getMagnitude().toFixed(2);
  let dir = this.getDirection().toFixed(2);
  return ("x: " + x + "y: " + y + "mag: " + mag + "dir: " + dir);
}
