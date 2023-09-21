function Vertex() {
    //angle from X-axis to vector
    this.theta = getRandomArbitrary(0, TWO_PI);
    // angle from +Y-axis to vector's orthogonal projection onto YZ
    this.phi = getRandomArbitrary(0, PI);
    // 3Dimensional definitions
    // this.x = 0;
    // this.y = 0;
    // this.z = 0;
    this.x = getRandomInt(100, cnv_width-100);
    this.y = getRandomInt(100, cnv_height-100);
    this.z = getRandomInt(100, depth);
    // 2Dimensional definitions
    this.xProj = 0;
    this.yProj = 0;
    this.zCalc = 0;
    
    // vertex visualizer and debugger (representation of infinitly small point in 3D space)
    this.rad = 3;
    
    this.clr = randomRBG();
}

Vertex.prototype.update = function() {
    this.zCalc = depth / (depth + this.z);

    this.xProj = (this.x * this.zCalc);
    this.yProj = (this.y * this.zCalc)
}

Vertex.prototype.render = function() {
    console.log(this.rad);
    let point = new Circle(this.xProj, this.yProj, this.rad, "black", "blue");
    point.render();
}

Vertex.prototype.run = function() {
    Vertex.prototype.update();
    Vertex.prototype.render();
}