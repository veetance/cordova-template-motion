document.addEventListener("deviceready", onDeviceReady, false);


// make .leadBoard  and logo width the same as its height/ my fix for the aspect ratio issue//
function refreshaspectRatio() {

var leadBoard = $(".leadBoard");
var leadBoardH = leadBoard.height();
leadBoard.css("width", leadBoardH);

var logo = $(".logo");
var logoH = logo.height();
logo.css("width", logoH);

}

// call refreshaspectRatio function each time the top-nav width changes
refreshaspectRatio();
$(window).resize(function () {  
    refreshaspectRatio();
});






function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", handleMotion);
  } else {
    alert("sorry not supported");
  }

  var movebox = 0;

  function handleMotion(event) {
    // console.log(event)
    var z = event.alpha;
    var x = event.beta;
    var y = event.gamma;

    $("#z").text("z: " + z);
    $("#x").text("x: " + x);
    $("#y").text("y: " + y);

    movebox += x / 50;

    $(".box").css(
      "transform",
      "rotateZ(" + z + "deg) rotateX(" + x + "deg) rotateY(" + y + "deg)"
    );

    // Update the x and y position of the .box element by adding
    // the x and y values from the accelerometer data
    var box = $(".box");
    var currentX = parseInt(box.css("left"));
    var currentY = parseInt(box.css("top"));
    box.css("left", currentX + y + movebox);
    box.css("top", currentY + x + movebox);

    // make .platform act as a portal.
    var pWW = $(".platform").width();
    var pHH = $(".platform").height();

    if (currentX > pWW) {
      box.css("left", 0);
    } else if (currentX < -20) {
      box.css("left", pWW);
    } else if (currentY > pHH) {
      box.css("top", 0);
    } else if (currentY < 0) {
      box.css("top", pHH);
    }

    
    //////////////////////////////////////

  }
  
}

// reset page function rloads the page on the touch or press of .lives

$(".lives").on("touchend click", function () {
  location.reload();
});





