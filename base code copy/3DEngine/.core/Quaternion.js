function Quaternion(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
}

Quaternion.prototype.getMagnitude = function () {
    return (Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w));
}

Quaternion.prototype.normalize = function () {
    this.x /= this.getMagnitude();
    this.y /= this.getMagnitude();
    this.z /= this.getMagnitude();
    this.w /= this.getMagnitude();
}

Quaternion.prototype.conjugate = function () {
    return (new Quaternion(-this.x, -this.y, -this.z, w));
}

Quaternion.prototype.conjugate = function () {
    return (new Quaternion(-this.x, -this.y, -this.z, w));
}

Quaternion.prototype.multiply = function (r) {
    r.w = this.w * r.w - this.x * r.x - this.y * r.y - this.z * r.z;
    r.x = this.x * r.w + this.w * r.x + this.y * r.z - this.z * r.y;
    r.y = this.y * r.w + this.w * r.y + this.z * r.x - this.x * r.z;
    r.z = this.z * r.w + this.w * r.z + this.x * r.y - this.y * r.x;
    return (new Quaternion(r.x, r.y, r.z, r.w));
}

Quaternion.prototype.mulVector3D = function (r) {
    r.w = -this.x * r.x - this.y * r.y - this.z * r.z;
    r.x = this.w * r.x + this.y * r.z - this.z * r.y;
    r.y = this.w * r.y + this.z * r.x - this.x * r.z;
    r.z = this.w * r.z + this.x * r.y - this.y * r.x;
    return (new Quaternion(r.x, r.y, r.z, r.w));
}