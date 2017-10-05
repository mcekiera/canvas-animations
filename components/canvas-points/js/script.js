var canvas = document.getElementById('js-canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var points = [];
context.fillStyle = '#000000';
canvas.addEventListener('click', function (e) {
  var point = {
    x: e.clientX,
    y: e.clientY
  };
  if(points.length < 3) {
    for(var i = 0; i < points.length; i += 1) {
      context.moveTo(point.x, point.y);
      context.lineTo(points[i].x, points[i].y);
    }
  } else {
    for(var i = 0; i < points.length; i += 1) {
      context.moveTo(point.x, point.y);
      context.lineTo(points[i].x, points[i].y);
    }
  }

  context.stroke();

  points.push(point);
});