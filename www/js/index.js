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
  
  refreshaspectRatio();
  $(window).resize(function () {
    refreshaspectRatio();
  });









// set startGame to false using boolean

var startGame = false;

// startGame boolean is set to true on the touch or press of .button

$(".button").on("touchend click", function () {
    startGame = true;
    $(".button").hide();
    meterTimer();
});






// run the timer and update the .meterTimer div with the time in seconds max time of 60 seconds using innerHTML to update the h4 inside .meterTimer div and set the startGame boolean to true wile the timer is running and false when the timer is not running 

function meterTimer() {
    if (startGame == true) {
        var time = 10;
        var timer = setInterval(function () {
            time--;
            $(".meterTimer").html("<h4>" + time + "s" + "</h4>");
            if (time == 0) {

                clearInterval(timer);
                startGame = false;   
            }
        }, 1000);
    }
}







    function onDeviceReady() {  

  // Cordova is now initialized. Have fun!
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", handleMotion);
  } else {
    alert("sorry not supported");
  }

  var movebox = 10/50;

  function handleMotion(event) {
    // console.log(meterTimer)
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
    box.css("left", currentX + y + movebox - 10);
    box.css("top", currentY + x + movebox - 10);

    


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
  }
}











// reset accelerometer on touch or click of .lives 

$(".lives").on("touchend click", function () {
    window.location.reload();
}); 

