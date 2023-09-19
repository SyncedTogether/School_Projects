function World() {
  this.cnvMain = document.getElementById('cnv1');
  this.ctxMain = this.cnvMain.getContext('2d');
  this.cnvMini = document.getElementById('cnv2');
  this.ctxMini = this.cnvMini.getContext('2d');
  this.dims = {
    top: -1500,
    left: -2000,
    bottom: 1500,
    right: 2000,
    width: 4000,
    height: 3000
  }
  this.movers = [];
  this.loadMovers(500);
  this.scaleX = this.cnvMini.width / this.dims.width;
  this.scaleY = this.cnvMini.height / this.dims.height;
  this.cnvMainLoc = new JSVector(0, 0);
}


World.prototype.run = function () {
  this.ctxMain.clearRect(0, 0, this.cnvMain.width, this.cnvMain.height);
  this.ctxMini.clearRect(0, 0, this.cnvMini.width, this.cnvMini.height);
  this.ctxMain.save();
  this.ctxMini.save();
  this.ctxMain.translate(-this.cnvMainLoc.x, -this.cnvMainLoc.y);
  this.ctxMini.translate(this.cnvMini.width / 2, this.cnvMini.height / 2);
  let ctx = this.ctxMain;

  ctx.beginPath();
  ctx.moveTo(0, this.dims.top);
  ctx.lineTo(0, this.dims.bottom);
  ctx.closePath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(this.dims.left, 0);
  ctx.lineTo(this.dims.right, 0);
  ctx.closePath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";
  ctx.stroke();
  
  this.ctxMini.scale(this.scaleX, this.scaleY);
  for (let i = 0; i < this.movers.length; i++) {
    this.movers[i].run();
  }

  this.ctxMain.restore();
  let ctx2 = this.ctxMini;
  ctx2.beginPath();
  ctx2.moveTo(0, this.dims.top);
  ctx2.lineTo(0, this.dims.bottom);
  ctx2.closePath();
  ctx2.lineWidth = 5;
  ctx2.strokeStyle = "red";
  ctx2.stroke();

  ctx2.beginPath();
  ctx2.moveTo(this.dims.left, 0);
  ctx2.lineTo(this.dims.right, 0);
  ctx2.closePath();
  ctx2.lineWidth = 5;
  ctx2.strokeStyle = "red";
  ctx2.stroke();

  ctx2.beginPath();
  ctx2.rect(this.cnvMainLoc.x, this.cnvMainLoc.y, this.cnvMain.width, this.cnvMain.height);
  ctx2.strokeStyle = "blue";
  ctx2.stroke();

  this.ctxMini.restore();
  document.getElementById("posDisplay").innerHTML = world.cnvMainLoc;
}


World.prototype.loadMovers = function (n) {
  for (let i = 0; i < n; i++) {
    this.movers[i] = new Mover(Math.random() * this.dims.width - this.dims.width / 2, Math.random() * this.dims.height - this.dims.height / 2, 21, this.getRandomColor(), this.ctxMain, this.ctxMini);
  }
}

World.prototype.getRandomColor = function () {
  let r = Math.floor(randomNumber(0,255));
  let g = Math.floor(randomNumber(0,255));
  let b = Math.floor(randomNumber(0,255));
  let color = RGBToHex(r, g, b);
  return color;
}

