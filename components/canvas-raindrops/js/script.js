var canvas = document.getElementById("surface");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var w = canvas.width;
var h = canvas.height;
context = canvas.getContext("2d");
var colors = {};
var isOn = false;

canvas.addEventListener('click', function (e) {
    var randR = 30 + Math.random() * 100;
    var randD = 0.5 + (0.25 * (parseInt(Math.random() * 2)));
    raindrops.push(new Raindrop(e.clientX, e.clientY, randR, 3, randD));
});

canvas.addEventListener('mouseenter', function (e) {
    isOn = true;
});

canvas.addEventListener('mouseleave', function (e) {
    isOn = false;
});


function Raindrop(x, y, r, s, dr) {
  this.x = x;
  this.y = y;
  this.targetRadius = r;
  this.currentRadius = 1;
  this.seq = s;
  this.dr = dr;
  this.update = function() {
    if(isOn) {

        context.beginPath();
        context.arc(this.x, this.y, this.currentRadius, 0, 2 * Math.PI);

        var depth = parseInt(100 * this.currentRadius / this.targetRadius);
        if (!colors[depth]) {
            var color = 255 - (100 - depth);
            colors[depth] = "rgba(" + color + "," + color + "," + color + ", .5)";
        }

        context.fillStyle = colors[depth];

        // context.lineWidth = 1;
        context.fill();
        if(this.currentRadius < this.targetRadius) {
            this.currentRadius += this.dr;
        }
    }
  }
}


function getRaindrop() {
  var randX = Math.random() * w;
  var randY = Math.random() * h;
  var randR = 2 * Math.random() * 100;
  var randQ = parseInt(Math.random() * 4);
  var randD = 0.5 + (0.25 * (parseInt(Math.random() * 2)));
  return new Raindrop(randX, randY, randR, randQ, randD);
}

var raindrops = [];
for(var i = 0; i < 10; i += 1) {
  raindrops.push(getRaindrop());
}

var animate = function() {
  if (isOn) {

      context.clearRect(0, 0, w, h);
  }
  if (raindrops.length < 100) {
    raindrops.push(getRaindrop());
  }
  for (var i = 0; i < raindrops.length; i += 1) {
    raindrops[i].update();
    if (raindrops[i].currentRadius === parseInt(raindrops[i].targetRadius * .33) && raindrops[i].seq !== 0) {
      var innerRaindrop = new Raindrop(raindrops[i].x, raindrops[i].y, raindrops[i].targetRadius, raindrops[i].seq - 1, raindrops[i].dr);
      raindrops.push(innerRaindrop);
    } else if (raindrops[i].currentRadius > parseInt(raindrops[i].targetRadius)) {
      raindrops.splice(i, 1);
      i -= 1;
    }
  }
    context.font = "500px Arial";
    context.fillStyle = "#fff";
    context.fillText("rain",100,300);
    window.requestAnimationFrame(animate);
};

animate();