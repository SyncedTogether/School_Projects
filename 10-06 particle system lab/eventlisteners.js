window.addEventListener("keypress", function (event) {
    switch (event.code) {
      case "KeyW":
        if (world.cnvMainLoc.y + 100 > (world.dims.top + world.cnvMini.height/2))
          world.cnvMainLoc.y -= 10;
          document.getElementById("posDisplay").innerHTML = world.cnvMainLoc;
        break;
      case "KeyS":
        if (world.cnvMainLoc.y + world.cnvMain.height - 100 < (world.dims.bottom - world.cnvMini.height/2))
          world.cnvMainLoc.y += 10;
          document.getElementById("posDisplay").innerHTML = world.cnvMainLoc;
        break;
      case "KeyA":
        if (world.cnvMainLoc.x + 100 > (world.dims.left - world.dims.left/20))
          world.cnvMainLoc.x -= 10;
          document.getElementById("posDisplay").innerHTML = world.cnvMainLoc;
        break;
      case "KeyD":
        if (world.cnvMainLoc.x + world.cnvMain.width - 100 < (world.dims.right - world.dims.right/20))
          world.cnvMainLoc.x += 10;
          document.getElementById("posDisplay").innerHTML = world.cnvMainLoc;
        break;
      case "KeyL":
        world.cnvMainLoc.x -= 5;
        world.cnvMain.width += 10;
        world.cnvMainLoc.y -= 5;
        world.cnvMain.height += 10;
        break;
      case "KeyK":
        world.cnvMainLoc.x += 5;
        world.cnvMain.width -= 10;
        world.cnvMainLoc.y += 5;
        world.cnvMain.height -= 10;
        break;
      break;
    }
}, false);



window.addEventListener("mousedown", function(e) {
    
});

