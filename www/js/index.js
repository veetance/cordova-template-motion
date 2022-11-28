
document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    if(window.DeviceOrientationEvent){
        window.addEventListener("deviceorientation", handleMotion)

    }else{
        alert("sorry not supported")
    }

    var movebox = 0;

    function handleMotion(event){
        // console.log(event)
        var z = event.alpha;
        var x = event.beta;
        var y = event.gamma;

        $("#z").text("z: " + z)
        $("#x").text("x: " + x)
        $("#y").text("y: " + y)

        movebox += x / 2

        $(".box").css("transform", "rotateZ(" + z + "deg) rotateX(" + x + "deg) rotateY("+ y + "deg)")

        Number.prototype.map = function (in_min, in_max, out_min, out_max) {
            return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
          }

        var r = z.map(0,360,0,255)
        var g = x.map(-180,180,0,255)
        var b = y.map(-90, 90, 0, 255)

        $("body").css("background", "rgb(" + r + "," + g + "," + b + ")")

    }

}
