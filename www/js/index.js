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
// basically some sorta of start button

$(".button").on("touchend click", function () {
  startGame = true;
  $(".button h5").hide();
  $(".button").animate(
    {
      width: 0,
      height: 0,
      opacity: 0,
    },
    100,
    "linear"
  );
  meterTimer();


});



// run the timer and update the .meterTimer div with the time in seconds max time of 60 seconds using innerHTML to update the h4 inside .meterTimer div and set the startGame boolean to true wile the timer is running and false when the timer is not running

function meterTimer() {
  if (startGame == true) {
    rotateHole();
    decreseMeter();
    collision();
  
    var time = 10;
    var timer = setInterval(function () {
      time--;
      $(".meterTimer").html("<h4>" + time + "s" + "</h4>");
      // $(".meterBar").css("width", time * 10 + "%");
      if (time == 0) {
        clearInterval(timer);
        startGame = false;
      }
    }, 1000);
  }
}

// using function called decreseMeter, map the Meter timer interval to the width of the .meterBar div so that the width of the .meterBar div decreases as the time decreases smoothly one px at a time and stops when the time is 0 and the startGame boolean is set to false.

// function decreseMeter() {
//     if (startGame == true) {
//         var time = 10;
//         var timer = setInterval(function () {
//             time--;
//             $(".meterBar").css("width", time * 10 + "%");
//             if (time == 0) {
//                 clearInterval(timer);
//                 startGame = false;
//             }
//         }, 1000);
//     }
// }

// above code did not have smooth linear animation so i did some more research and put to gether the following version of the decreseMeter function which uses the animate function to animate the width of the .meterBar div smoothly one px at a time and stops when the time is 0 and the startGame boolean is set to false.

function decreseMeter() {
  if (startGame == true) {
    var time = 10;
    var timer = setInterval(function () {
      time--;
      var width = time * 10;
      $(".meterBar").animate(
        {
          width: width + "%",
        },
        {
          duration: 1000,
          easing: "linear",
        }
      );

      if (time == 0) {
        clearInterval(timer);
        startGame = false;
        gameOver();
      }
    }, 1000);
  }
}

/// display "Timeout" by replacing .meterBar with a new div with the class GameOver that has the text "Timeout" using h4, make the h3 font-size scale from 0rem to .8rem with smooth linear animation using the animate function and the css transform property scales the h3 font-size from 0rem to .8rem

function gameOver() {
  if (startGame == false) {
    $(".meterBar").replaceWith("<div class='GameOver'><h3>TIMEOUT</h3></div>");
    $(".GameOver").fadeOut(0);
    $(".GameOver").fadeIn(1000, "cubic-bezier(0.68, -0.55, 0.265, 1.55)");
    $(".GameOver h3").animate({ fontSize: "1rem" }, 200);
    $(".GameOver").addClass("shake");

    $(".Hole").css("animation-name", "none");

    clearInterval(accelerometerInterval); // stop the accelerometerInterval
  }
}

// rotatehole

function rotateHole() {
  if (startGame == true) {
    var hole = $(".Hole");
    var centerX = hole.width() / 2;
    var centerY = hole.height() / 2;

    hole.css({
      "transform-origin": centerX + "px " + centerY + "px",
      "animation-name": "rotate",
      "animation-duration": "2s",
      "animation-iteration-count": "infinite",
      "animation-timing-function": "linear",
    });

    var style = $("<style>").text(
      "@keyframes rotate { 100% { transform: rotate(360deg); } }"
    );
    $("head").append(style);
  }
}

// create a pulsing animation around .Hole it fades in over a period of 500 milliseconds and grows outward from the center of the Hole element until it reaches a maximum size and then fades out. This animation continues to run as long as the startGame variable is true. When startGame becomes false, the animation stops and any remaining pulses are removed from the page.

function HoleSucking() {
  if (startGame ) {
    var hole = $(".Hole");
    var centerX = hole.width() / 2;
    var centerY = hole.height() / 2;

    function createPulse() {
      var pulse = $("<div>")
        .addClass("pulse")
        .css({
          position: "absolute",
          top: centerY - 25,
          left: centerX - 25,
          width: 50,
          height: 50,
          "border-radius": "50%",
          border: "1px solid rgb(176 145 211 / 80%)",
          background: "none",
          "transform-origin": "50% 50%",
          transform: "scale(1)",
        });

      pulse.css({
        opacity: "-1",
      });

      pulse.animate(
        {
          opacity: "1",
        },
        {
          duration: 500,
          easing: "linear",
        }
      );

      hole.append(pulse);

      var scale = 11;
      var interval = setInterval(function () {
        scale -= 0.35;
        pulse.css("transform", "scale(" + scale + ")");
        pulse.css("transform", "scale(" + scale + ")");

        if (scale <= 0) {
          clearInterval(interval);
          pulse.remove();
          if (startGame) {
            createPulse();
          }
        }
      }, 20);
    }
    createPulse();
  }
}

// call the HoleSucking when .box wis colliding with .Hole


function collision() {
  const $box = $('.box');
  const $hole = $('.Hole');

  const $intersectingElements = $box.filter(function() {
    return $(this).is($hole);
  });

  if ($intersectingElements.length > 0) {
    console.log('Intersection detected');
  }
}
























var startTilt = false;

function onDeviceReady() {

  // if .button is pressed or touched startTilt is set to true and the deviceorientation event listener is added to the window object and the handleMotion function is called


  $(".button").on("touchend click", function () {
    startTilt = true;
    // Cordova is now initialized. Have fun!
    if (window.DeviceOrientationEvent && startTilt == true) {
      window.addEventListener("deviceorientation", handleMotion);
    } else {
      alert("sorry not supported");
    }
  });

  var movebox = 10 / 50;

  function handleMotion(event) {
    if (startGame === true) {
      // Your code to handle the accelerometer data here

      // console.log(meterTimer)
      var z = event.alpha;
      var x = event.beta;
      var y = event.gamma;

      $("#z").text("z: " + z);
      $("#x").text("x: " + x);
      $("#y").text("y: " + y);

      movebox += x / 50;

      function rotateBox() {
        $(".box").css(
          "transform",
          "rotateX(" + y * 2 + "deg) rotateY(" + x * 2 + "deg)",
          "rotate(" + (x, y, z) * 10 + "deg)"
        );
      }

      rotateBox();
      // wrap the above code as anonymous function

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
}

// reset accelerometer on touch or click of .lives

$(".lives").on("touchend click", function () {
  window.location.reload();
});
