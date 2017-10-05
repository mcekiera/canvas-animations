var canvas = document.getElementById('js-canvas');
canvas.width = window.innerWidth * .8;
canvas.height = window.innerHeight* .8;
var context = canvas.getContext('2d');

var palletWidth = 100;
var palletHeight = 10;
var speed = 15;
context.fillStyle = "#000000";

var points = [];

var ballMove = new Event('ballMove');

function Pallet(x, y, w, h, v) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.v = v;
  this.update = function () {
    context.fillRect(this.x, this.y, this.w, this.h);
    context.fill();
  };
  this.moveLeft = function () {
    if(this.x - this.v >= 0) {
      this.x -= this.v;
    }
  };
  this.moveRight = function () {
    if(this.x + this.v + this.w <= canvas.width) {
      this.x += this.v;
    }
  };
}

function hasCollidedX(obj1, obj2) {
  if(obj1.x >= obj2.x && obj1.x <= obj2.x + obj2.w) {
    return true;
  }
}

function hasCollidedY(obj1, obj2) {
  if(obj1.y >= obj2.y && obj1.y <= obj2.y + obj2.h) {
    return true;
  }
}

function Point(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.update = function () {
    context.fillRect(this.x, this.y, this.w, this.h);
    context.fill();
  }
}

function Ball(x, y, w, h, pallete, points) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.dirX = 3;
  this.dirY = 3;
  this.update = function () {
    if(this.x + this.dirX <= 0 || this.x + this.dirX >= canvas.width) {
      this.dirX *= -1;
    }

    if(this.y + this.dirY <= 0) {
      this.dirY *= -1;
    }

    if(this.x > pallete.x && this.x < pallete.x + pallete.w && this.y + this.h === pallete.y) {
      this.dirY *= -1;
    }

    for(var i = 0; i < points.length; i += 1) {
      if(hasCollidedX(ball, points[i])) {
        // this.dirX *= -1;
        this.dirY *= -1;
      } else if(hasCollidedY(ball, points[i])) {
        // this.dirY *= -1;
        this.dirX *= -1;
      }
    }

    this.x += this.dirX;
    this.y += this.dirY;
    context.fillRect(this.x, this.y, this.w, this.h);
    context.fill();
  };
}

for(var i = 0; i < 1000; i += 1) {
  var px = 5 + ((i % 100) + 1) * (canvas.width / 102);
  var py = 100 + (15 * parseInt(i / 100));

  var p = new Point(px, py, 5, 5);
  points.push(p);
  p.update();
}

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function refill() {
  pallet.update();
  ball.update();
  for(var i = 0; i < points.length; i += 1) {
    points[i].update();
  }
}

var pallet = new Pallet(100, canvas.height - palletHeight - 10, palletWidth, palletHeight, speed);
pallet.update();

var ball = new Ball(147.5, canvas.height - palletHeight - 15, 5, 5, pallet, points);
ball.update();

window.addEventListener('keydown', function(e) {
  e = e || window.event;
  if (e.keyCode === 37) {
    // console.log("left");
    pallet.moveLeft();
  } else if(e.keyCode === 38) {
    // console.log("up");
  } else if(e.keyCode === 39) {
    // console.log("right");
    pallet.moveRight();
  } else if(e.keyCode === 40) {
    // console.log("down");
  }
  clear();
  refill();
});

function animate() {
  clear();
  refill();
  window.requestAnimationFrame(animate);
}

animate();
