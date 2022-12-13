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

// using function called decreseMeter .meterBar div decreases as the time decreases smoothly one % at a time and stops when the time is 0 and the startGame boolean is set to false.


function decreseMeter() {
  if (startGame == true) {

    // checkIfTouching();

    var time = 10;
    var timer = setInterval(function () {
      time--;
      var width = time * 10;
      $(".meterBar").animate(
        {
          width: width + "%",
        },
        {
          duration: 1000/4,
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





function checkIfTouching() {
  // Select the target element and the other element
  const box = document.querySelector('.box');
  const hole = document.querySelector('.Hole');
  
  // Get the bounding client rects of both elements
  const boxRect = box.getBoundingClientRect();
  const holeRect = hole.getBoundingClientRect();
  
  // Check if the rects intersect
  if (boxRect.x < holeRect.x + holeRect.width &&
  boxRect.x + boxRect.width > holeRect.x &&
  boxRect.y < holeRect.y + holeRect.height &&
  boxRect.height + boxRect.y > holeRect.y) {
    // If the rects intersect, log a message and call HoleSucking()
    console.log('intersecting');
    HoleSucking();
  } else {
    // If the rects do not intersect, log a message
    console.log('not intersecting');
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

      function animateBall() {
        var box = $(".box");
        var currentX = parseInt(box.css("left"));
        var currentY = parseInt(box.css("top"));
        box.css("left", currentX + y + movebox - 10);
        box.css("top", currentY + x + movebox - 10);

        checkIfTouching();
      }

      requestAnimationFrame(animateBall);

      // Update the x and y position of the .box element by adding
      // the x and y values from the accelerometer data
      

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
