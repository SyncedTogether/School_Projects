function Vector3D(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector3D.prototype.getMagnitude = function () {
    return (Math.sqrt(this.x * this.x + this.y * this.y + z * z));
}

Vector3D.prototype.dot = function (r) {
    return (x * r.x + y * r.y + z * r.z);
}

Vector3D.prototype.cross = function (r) {
    let x = this.y * r.z - z * r.y();
    let y = this.z * r.x - x * r.z();
    let z = this.x * r.y - y * r.x();
    return (new Vector3D(x, y, z));
}


Vector3D.prototype.normalize = function () {
    let mag = this.getMagnitude();
    this.x /= mag;
    this.y /= mag;
    this.z /= mag;
}

Vector3D.prototype.rotate = function () {

}

Vector3D.prototype.add = function (v2) {
    this.x = this.x + v2.x;
    this.y = this.y + v2.y;
    this.z = this.z + v2.z;
}

Vector3D.prototype.sub = function (v2) {
    this.x = this.x - v2.x;
    this.y = this.y - v2.y;
    this.z = this.z - v2.z;
}

Vector3D.addGetNew = function (v1, v2) {
    return (new Vector3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z));
}

Vector3D.subGetNew = function (v1, v2) {
    return (new Vector3D(v1.x - v2.x, v1.y - v2.y, v1.z + v2.z));
}

Vector3D.prototype.multiply = function (scalar) {
    this.x = this.x * scalar;
    this.y = this.y * scalar;
    this.z = this.z * scalar;
}

Vector3D.prototype.divide = function (scalar) {
    this.x = this.x / scalar;
    this.y = this.y / scalar;
    this.z = this.z / scalar;
}