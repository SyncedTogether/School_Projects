class Mesh {
    constructor(vertices, edges, x, y, z, rotationX, rotationY, rotationZ, scale) {
        this.vertices = vertices;
        this.edges = edges;
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotationX = rotationX;
        this.rotationY = rotationY;
        this.rotationZ = rotationZ;
        this.scale = scale;
        this.dots = [];
        this.edges = [];
    }
    projection(x, y, z) {
        let px = (((x * Math.cos(this.rotationZ) - Math.sin(this.rotationZ) * y) * Math.cos(this.rotationY) - z * Math.sin(this.rotationY)) * (200 / ((((z * Math.cos(this.rotationY) + (x * Math.cos(this.rotationZ) - Math.sin(this.rotationZ) * y) * Math.sin(this.rotationY)) * Math.cos(this.rotationX) + (y * Math.cos(this.rotationZ) + x * Math.sin(this.rotationZ)) * Math.sin(this.rotationX)) + 5) + this.z))) * this.scale + this.x;
        let py = (((y * Math.cos(this.rotationZ) + x * Math.sin(this.rotationZ)) * Math.cos(this.rotationX) - (z * Math.cos(this.rotationY) + (x * Math.cos(this.rotationZ) - Math.sin(this.rotationZ) * y) * Math.sin(this.rotationY)) * Math.sin(this.rotationX)) * (200 / ((((z * Math.cos(this.rotationY) + (x * Math.cos(this.rotationZ) - Math.sin(this.rotationZ) * y) * Math.sin(this.rotationY)) * Math.cos(this.rotationX) + (y * Math.cos(this.rotationZ) + x * Math.sin(this.rotationZ)) * Math.sin(this.rotationX)) + 5) + this.z))) * this.scale + this.y;
        let intpx = parseInt(px), intpy = parseInt(py);
        return { intpx, intpy };
    }
    //render
    render() {
        //create vertices
        this.vertices.forEach((vertice, index) => {
            let pointcords = this.projection(vertice[0], vertice[1], vertice[2]);
            let point = new JSVector(pointcords.intpx, pointcords.intpy);
            this.dots[index] = new Circle(point.x, point.y, 3, "black", "lightblue");
        });

        //draw vertices
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].run();
            
        }
        

        //draw lines attaching all vertices
        for (let i = 0; i < this.dots.length; i++) {
            for (let j = 0; j < this.dots.length; j++) {
                if (j == i) {
                    
                } else {
                    this.edges[j] = new Line([this.dots[j].loc.x, this.dots[j].loc.y], [this.dots[i].loc.x, this.dots[i].loc.y], 2, "black");
                    this.edges[j].render();
                }
            }
        }
    }

    rotate() {
        this.rotationX += 0.001
        this.rotationY += 0.01
        this.rotationZ += 0.001
        console.log(Math.sin(frame/100) * 100);
        this.render();
    }

}




