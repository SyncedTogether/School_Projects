class RigidBody {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.vx = 0;
      this.vy = 0;
      this.ax = 0;
      this.ay = 0.98;
      this.color = 'blue';
    }
  
    update() {
      this.vx += this.ax;
      this.vy += this.ay;
      this.x += this.vx;
      this.y += this.vy;
      console.log(this.vy)
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

    checkCollision(a, b) {
        // Get the axes to check
        const axes = [
          { x: 1, y: 0 },
          { x: 0, y: 1 },
        ];
      
        // Add the normal vectors of the edges of a
        for (let i = 0; i < 2; i++) {
          const edgeX = Math.cos(i * Math.PI/2);
          const edgeY = Math.sin(i * Math.PI/2);
          axes.push({ x: edgeX, y: edgeY });
        }
      
        // Add the normal vectors of the edges of b
        for (let i = 0; i < 2; i++) {
          const edgeX = Math.cos(i * Math.PI/2);
          const edgeY = Math.sin(i * Math.PI/2);
          axes.push({ x: edgeX, y: edgeY });
        }
      
        // Loop through the axes and project each rectangle
        let overlap = Infinity;
        let smallestAxis = null;
        for (const axis of axes) {
          const intervalA = projectInterval(a, axis);
          const intervalB = projectInterval(b, axis);
      
          // Check for overlap
          const o = getOverlap(intervalA, intervalB);
          if (o === 0) {
            // No overlap, so the rectangles do not collide
            return null;
          } else {
            // Update overlap and MTV
            if (o < overlap) {
              overlap = o;
              smallestAxis = axis;
            }
          }
        }
      
        // Return the MTV
        return smallestAxis ? { x: smallestAxis.x * overlap, y: smallestAxis.y * overlap } : null;
      }
      
       projectInterval(rect, axis) {
        const p1 = dot(rect.x - rect.width/2, rect.y - rect.height/2, axis);
        const p2 = dot(rect.x + rect.width/2, rect.y + rect.height/2, axis);
        const p3 = dot(rect.x - rect.width/2, rect.y + rect.height/2, axis);
        const p4 = dot(rect.x + rect.width/2, rect.y - rect.height/2, axis);
        return { min: Math.min(p1, p2, p3, p4), max: Math.max(p1, p2, p3, p4) };
      }
      
       getOverlap(intervalA, intervalB) {
        const overlap = Math.min(intervalA.max, intervalB.max) - Math.max(intervalA.min, intervalB.min);
        return overlap > 0 ? overlap : 0;
      }
      
       dot(x, y, axis) {
        return x * axis.x + y * axis.y;
      }
}
