//all js code just draw circles ,svg filter is important code 

const canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  colorPallete = ["#c45b9a", "#c96ba4", "#cf7bae", "#c45b9a", "#d58cb8", "#b0518a"];

var width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight,
  src = {
    x: width / 2,
    y: height / 2
  },
  circles = [];

window.onresize = function() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  src.x= width / 2;
  src.y= height / 2;
}
function drawRing(){
    var radiusBig = 300;
    var radiusSmall = 260;


    

    context.strokeStyle = "#c45b9a";
    context.strokeWidth = 50;
    context.fillStyle = '#2257a5';
    context.lineWidth = 30;
    context.beginPath();
    context.arc(src.x, src.y, radiusBig, 0, 2 * Math.PI, false);
    
    context.closePath();
    context.fill();
    context.stroke();
   
    // context.beginPath();
    // context.arc(src.x, src.y, radiusSmall, 0, 2 * Math.PI, false);
    // context.fillStyle = '#222';
    // context.fill();
    // context.lineWidth = 5;
    // context.strokeStyle = '#222';
    // context.stroke();

}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

class Circle {
  constructor() {
    this.x = src.x;
    this.y = src.y;
    this.angle = Math.PI * 2 * Math.random();
    var speed=1 + Math.random();
    this.vx = speed* Math.cos(this.angle);
    this.vy = speed* Math.sin(this.angle);

    // this.xr = 6 + 10 * Math.random();
    // this.yr = 2 + 10 * Math.random();
    this.r = getRandomArbitrary(5,21)

    this.color = colorPallete[Math.floor(Math.random() * colorPallete.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // this.xr-= .01;
    // this.yr -= .01;
    // this.r=Math.min(this.yr,this.xr);
    this.r -= .01;

  }
}

function removeCircles() {
  for (var i = 0; i < circles.length; i++) {
    var b = circles[i];
    if ( b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 ||  b.y - b.r > height || b.r < 0  ) {
      circles.splice(i, 1);
    }
  }
}

function renderCircles() {
  context.clearRect(0, 0, width, height);

  if (Math.random() > .7)
    circles.push(new Circle());

  for (var i = 0; i < circles.length; i++) {
    
    var b = circles[i];
    if(b.r>0){
        context.fillStyle = b.color;
        context.beginPath();
        for(let i=1;i<8;i++){
            let k = i+2;
            let z = i*0.7;
            if((b.r-k)>0){
                context.arc(b.x-(b.r*z*b.vx), b.y-(b.r*z*b.vy), (b.r-k), 0, Math.PI * 2, false);
            }
            
        }
        // context.ellipse(b.x, b.y, b.xr, b.yr, b.angle, 0, 2 * Math.PI);

        context.fill();
        b.update();
    }
  }

// context.drawImage(img,50,38);
  removeCircles();
  drawRing()
  requestAnimationFrame(renderCircles);
}
    
renderCircles();
              


// https://codepen.io/mnmxmx/pen/VjjvEq
