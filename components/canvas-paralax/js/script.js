var canvas = document.getElementById('js-canvas');
var context = canvas.getContext('2d');

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
canvas.width = 600;
canvas.height = 400;

var raindrops = [[], [], [], [], []];
var images = [];

var changeX = -2;
var changeY = 15;
var colors = ['#eeeeee66', '#cccccc66', '#aaaaaa66', '#99999966', '#66666666'];
var isOn = false;

var pug = null;
var hills = null;
var grass = null;
var grass2 = null;
var sky = null;
var z = 0;

canvas.addEventListener('mouseenter', function (e) {
  isOn = true;
});

canvas.addEventListener('mouseleave', function (e) {
  isOn = false;
});

function Raindrop(x1, y1, x2, y2, color, width) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.color = color;
  this.width = width + 1;
  this.update = function () {
    // context.save();
    context.strokeStyle = this.color;
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.lineWidth = this.width;
    // context.restore();
    context.stroke();
  }
}

function createRaindrop(heightCorrection, width, color) {
  var randX = Math.random() * (canvas.width + (canvas.height / changeY) * -changeX);
  var randY = Math.random() * canvas.height - heightCorrection;
  return new Raindrop(randX, randY, randX + changeX, randY + changeY, color, width);
}

for(var lvl = 0; lvl < 5; lvl += 1) {
  if(lvl === 0 ) {
    sky = new Image(canvas.width,canvas.height);
    sky.src = 'img/sky.jpg';
    sky.onload = function(){
      context.drawImage(sky, 0, 0, canvas.width,canvas.height);
    };
    images.push(sky);
  }

  if(lvl === 1 ) {
    hills = new Image(canvas.width,canvas.height);
    hills.src = 'img/hills.png';
    hills.onload = function(){
      context.drawImage(hills, 0, 0, canvas.width,canvas.height);
    };
    images.push(hills);
  }
  if(lvl === 2 ) {
    grass = new Image();
    grass.src = 'img/grass.png';
    grass.onload = function(){
      context.drawImage(grass, 0, 0);
    };
    images.push(grass);
  }
  if(lvl === 3 ) {
    grass2 = new Image();
    grass2.src = 'img/grass2.png';
    grass2.onload = function(){
      context.drawImage(grass2, 0, 0);
    };
    images.push(grass2);
  }
  if(lvl === 4 ) {
    pug = new Image(290, 316);
    pug.src = 'img/pug.png';
    pug.onload = function(){
      context.drawImage(pug, 300, 200);
    };
    images.push(pug);
  }

  for (var i = 0; i < 10 + (Math.pow(5 - lvl, 5)); i++) {
    var drop = createRaindrop(0, lvl, colors[lvl]);
    drop.update();
    raindrops[lvl].push(drop);
  }
}

function animate() {
  if(isOn) {
    if(z < 50) {
      z += 1;
    }
  } else {
    if(z > 0) {
      z -= 1;
    }
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < raindrops.length; i += 1) {
    if(i === 0) {
      context.drawImage(sky, 0 - (z * i + 1), 0, canvas.width * 2,canvas.height);
    }
    if(i === 1) {
      context.drawImage(hills, -100 - (z * i + 1), 0, canvas.width * 2,canvas.height);
    }
    if(i === 2) {
      context.drawImage(grass, 0 - (z * i + 1), 0, canvas.width * 1.2,canvas.height);
    }
    if(i === 3) {
      context.drawImage(grass2, 0 - (z * (i - 1)), 0, canvas.width * 1.2,canvas.height);
    }
    if(i === 4) {
      context.drawImage(pug, 300 - (z * i + 1), 200);
    }

    for(var k = 0; k < raindrops[i].length; k += 1) {
      if (raindrops[i][k].y1 < canvas.height) {
        raindrops[i][k].x1 += changeX;
        raindrops[i][k].y1 += changeY;
        raindrops[i][k].x2 += changeX;
        raindrops[i][k].y2 += changeY;
        raindrops[i][k].update();
      } else {
        var drop = createRaindrop(canvas.height, i, colors[i]);
        drop.update();
        raindrops[i].splice(k, 1);
        raindrops[i].push(drop);
        k -= 1;
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();