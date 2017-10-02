var canvas = document.getElementById('js-canvas');
var canvasWidth = window.innerWidth;
var canvasHeight = 300;
var linesQuantity = 40;
var lineHeight = 5;
var part = canvasHeight / linesQuantity;
var rangeLimit = 50;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var positions = {};
var colors = ['#CFCF2C', '#2B92BE', '#9FA8B2'];

var canvasContext = canvas.getContext('2d');
var lines = [];

function generateLine(i, w, wmin, h, op) {
  var objW = Math.random() * w + wmin;
  var objH = h;
  var objX = (Math.random() * canvasWidth) - canvasWidth;
  var objY = (Math.random() * part + ((i + 1) * (part + objH))) - objH;
  var objColor = colors[parseInt(Math.random() * colors.length)] + op;
  var objSpeed = parseInt(Math.random() * 10);
  var objRange = parseInt(Math.random() * canvasWidth);
  return new Line(objX, objY, objW, objH, objColor, objSpeed, objRange, canvasContext);
}

function Line(x, y, w, h, c, s, t, context) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = c;
  this.speed = s;
  this.currentSpeed = 0;
  this.target = t;
  this.range = 200;
  this.update = function () {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
    context.fill();
  }
}

for (var i = 0; i < 10; i++) {
  var line = generateLine(i, 220, 40, 25, "33");
  line.update();
  lines.push(line);
}


for (var i = 0; i < linesQuantity; i++) {
  var line = generateLine(i, 120, 10, 5, "");
  line.update();
  lines.push(line);
}

for (var i = 0; i < 40; i++) {
  var line = generateLine(i, 20, 5, 1, "66");
  line.update();
  lines.push(line);
}

function animate() {
  canvasContext.clearRect(100, 0, canvasWidth, canvasHeight);

  for(var i = 0; i < lines.length; i++) {

    if(lines[i].currentSpeed < lines[i].speed && lines[i].speed > 0) {
      lines[i].currentSpeed += (lines[i].speed / 10);
    } else if(lines[i].currentSpeed > lines[i].speed && lines[i].speed < 0) {
      lines[i].currentSpeed += (lines[i].speed / 10);
    }

    lines[i].x += lines[i].currentSpeed;
    lines[i].update();

    if(lines[i].x > (lines[i].target + lines[i].range)  && lines[i].speed > 0 && lines[i].range !== 0) {
      lines[i].speed = -1 * (lines[i].speed / 2);
      lines[i].range -= rangeLimit;
    } else if(lines[i].x < (lines[i].target - lines[i].range) && lines[i].speed < 0 && lines[i].range !== 0) {
      lines[i].speed = -1 * (lines[i].speed / 2);
      lines[i].range -= rangeLimit;
    } else if (lines[i].range === 0) {
      lines[i].speed = 0;
      lines[i].currentSpeed = 0;
    }
  }
  canvasWidth = window.innerWidth;
  window.requestAnimationFrame(animate);
}

animate();