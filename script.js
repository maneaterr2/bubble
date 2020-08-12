const canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  greenColorPallete = ["#9EEF6E","#9eef6e","#8ed763"],
  colorPallete = ["#c45b9a", "#c96ba4", "#cf7bae", "#c45b9a", "#d58cb8", "#b0518a"];

var width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight,
  src = {
    x: width / 2,
    y: height / 2
  },
  green_circles = [],
  circles = [];

window.onresize = function() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  src.x= width / 2;
  src.y= height / 2;
}
const greenMountainWidth = 440;

function drawRing(){
    const radiusBig = 250;
    context.strokeStyle = "#c45b9a";
    context.strokeWidth = 50;
    context.fillStyle = '#2257a5';
    context.lineWidth = 30;
    context.beginPath();
    context.arc(src.x, (src.y-80), radiusBig, 0, 2 * Math.PI, false);
    
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
    context.beginPath();
    context.lineWidth = 20;
    context.strokeStyle = "#9EEF6E";
    let startX = src.x - (greenMountainWidth/2)
    context.rect(startX, (src.y+170), greenMountainWidth, 10);
    context.fill();
    context.stroke();
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

        this.r = getRandomArbitrary(5,21)

        this.color = colorPallete[Math.floor(Math.random() * colorPallete.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.r -= .01;
    }
}
class GreenCircle {
    constructor() {
        this.x = getRandomArbitrary((src.x - (greenMountainWidth/2)),(src.x + (greenMountainWidth/2)))
        this.y = src.y + 160;
        // this.angle = Math.PI * 2 * Math.random();
        var speed=1 + Math.random();
        // this.vx = speed;
        this.vy = speed;

        this.r = getRandomArbitrary(5,13)

        this.color = greenColorPallete[Math.floor(Math.random() * greenColorPallete.length)];
    }

    update() {
        // this.x += this.vx;
        this.y += this.vy;
        // this.r -= .01;
    }
}

function removeCircles() {
    for (var i = 0; i < circles.length; i++) {
        var b = circles[i];
        if ( b.x + b.r < -200 || b.x - b.r > (width+200) || b.y + b.r < -200 ||  b.y - b.r > (height+200) || b.r < 0  ) {
        circles.splice(i, 1);
        }
    }
}
function removeGreenCircles() {
    for (var i = 0; i < green_circles.length; i++) {
        var b = green_circles[i];
        if ( b.y + b.r > (height+200)  || b.r < 0  ) {
            green_circles.splice(i, 1);
        }
    }
}

function renderCircles() {
    context.clearRect(0, 0, width, height);

    if (Math.random() > .7){
        circles.push(new Circle());
    }
    if (Math.random() > .9){
        green_circles.push(new GreenCircle());
        // console.log(green_circles);
    }

    for (let c = 0; c < circles.length; c++) {
        let b = circles[c];
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
            context.fill();
            b.update();
        }
    }

    for (let c = 0; c < green_circles.length; c++) {
        let b = green_circles[c];
        if(b.r>0){
            context.fillStyle = b.color;
            context.beginPath();
            for(let i=1;i<8;i++){
                let k = i+2;
                let z = i*0.7;
                if((b.r-k)>0){
                    context.arc(b.x, b.y-(b.r*z*b.vy), (b.r-k), 0, Math.PI * 2, false);
                }
            }
            context.fill();
            b.update();
        }
    }

    drawRing();
    removeCircles();
    removeGreenCircles();
    requestAnimationFrame(renderCircles);
}
    
renderCircles();
