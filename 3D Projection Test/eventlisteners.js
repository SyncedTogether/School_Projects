window.addEventListener("keypress", function (event) {
    switch (event.code) {
      case "KeyW":
        if (world.cnvMainLoc.y + 100 > (world.dims.top + world.cnvMini.height/2))
          world.cnvMainLoc.y -= 10;
        break;
      case "KeyS":
        if (world.cnvMainLoc.y + world.cnvMain.height - 100 < (world.dims.bottom - world.cnvMini.height/2))
          world.cnvMainLoc.y += 10;
        break;
      case "KeyA":
        if (world.cnvMainLoc.x + 100 > (world.dims.left - world.dims.left/20))
          world.cnvMainLoc.x -= 10;
        break;
      case "KeyD":
        if (world.cnvMainLoc.x + world.cnvMain.width - 100 < (world.dims.right - world.dims.right/20))
          world.cnvMainLoc.x += 10;
        break;
      break;
    }
  }, false);