function Vertex() {
    this.theta = randomBetween(0, Math.PI * 2);
    this.phi = randomBetween(0, Math.PI);
    this.x = 0;
    this.y = 0;
    this.z = 0;

    if (debug_vertices) {
        this.radius = debug_radius;
    }

    this.opacity = 1;
    this.zProj = 0;
    this.xProj = 0;
    this.yProj = 0;
    this.color = randomRGBlimited(100, 255);
}

Vertex.prototype.update = function () {
    this.x = GLOBE_RADIUS * Math.sin(this.phi) * Math.cos(this.theta);
    this.y = GLOBE_RADIUS * Math.cos(this.phi);
    this.z = GLOBE_RADIUS * Math.sin(this.phi) * Math.sin(this.theta) + GLOBE_RADIUS;

    this.zProj = depth / (depth + this.z);
    this.xProj = (this.x * this.zProj) + xCenter;
    this.yProj = (this.y * this.zProj) + yCenter;

    this.radius = map(this.z, 0, depth, debug_radius, 0);
    this.opacity = map(this.z, 0, depth, 1, 0);

    let r = map(this.z, 0, depth, 1, 0) * 255;
    let g = 255 - (map(this.z, 0, depth, 1, 0) * 255);
    this.color = rgbToHex(parseInt(r), parseInt(g), 0);

    this.theta += 0.001;
    console.log(test);
}

Vertex.prototype.render = function () {
    if (document.getElementById('showVertices').checked) {
        var circle = new Circle(context, this.xProj, this.yProj, this.radius, this.opacity, this.color);
        circle.render();
    }
}

Vertex.prototype.run = function () {
    this.update();
    this.render();
}