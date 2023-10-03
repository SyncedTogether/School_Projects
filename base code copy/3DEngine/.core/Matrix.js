function Matrix() {
    this.m = new Array(4);
    this.init();
}

Matrix.prototype.init = function () {
    for (let i = 0; i < this.m.length; i++) {
        this.m[i] = new Array(4);
    }
    for (let i = 0; i < this.m.length; i++) {
        for (let k = 0; k < this.m[i].length; k++) {
            this.m[i][k] = 0;
        }
    }
}

Matrix.prototype.multiply = function (r) {
    let res = new Matrix();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            res[i][j] =
                this.m[i][0] * res[0][j] +
                this.m[i][1] * res[1][j] +
                this.m[i][2] * res[2][j] +
                this.m[i][3] * res[3][j];
        }
    }
    return res;
}

Matrix.prototype.reset = function () {
    this.init();
}
