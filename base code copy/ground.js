class Ground {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = 'brown';
    }

    draw(context, offsetX, offsetY, zoom) {
        context.fillStyle = this.color;
        context.fillRect(
            (this.x - this.width/2 - offsetX) * zoom,
            (this.y - this.height/2 - offsetY) * zoom,
            this.width * zoom,
            this.height * zoom
        );
    }
}