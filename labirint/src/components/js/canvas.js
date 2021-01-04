import '../css/canvas.css';

let canvas = null;

function draw () {
  const ctx = canvas.getContext('2d');
  ctx.font = "30px Arial";
  ctx.fillText("Hello World", 10, 50); 

  ctx.beginPath();
  ctx.moveTo(30, 100);
  ctx.bezierCurveTo(110, 0, 190, 200, 270, 100);
  ctx.closePath();
  ctx.stroke();
}

window.addEventListener('DOMContentLoaded', function() {
  canvas = document.querySelector('#myCanvas');
  console.log(canvas);

  draw();
})