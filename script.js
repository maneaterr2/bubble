(()=>{
    const cnv = document.querySelector('canvas');
    const ctx = cnv.getContext('2d');

    function init(){
        cnv.width = innerWidth;
        cnv.height = innerHeight;
    }
    init();


    function updateRings(){
        newBubble();
        drawBubble();
        drawRing();
    }
    let centerX = cnv.width/2;
    let centerY = cnv.height/2;

    let bubble_arr = [
        {x:centerX,y:centerY,radius:40,speedX:2,speedY:1},
    ]

    function getRandomArbitrary(min, max) {
        return (Math.random() * (max - min) + min).toFixed();
      }

    function drawRing(){
        var radiusBig = 300;
        var radiusSmall = 290;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radiusBig, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#c45b9a';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#c45b9a';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX, centerY, radiusSmall, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#222';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#222';
        ctx.stroke();
    }
    function newBubble(){
        let bubble = {
            x:centerX,
            y:centerY,
            radius:getRandomArbitrary(10,40),
            speedX:getRandomArbitrary(-5,5),
            speedY:getRandomArbitrary(-5,5)
        }
        bubble_arr.push(bubble);
        if(bubble_arr.length>150){
            bubble_arr.shift();
        }
        // console.log(bubble_arr)
    }
    function drawBubble(){
        bubble_arr.forEach((el)=>{
            el.x += +el.speedX;
            el.y += +el.speedY;
            ctx.beginPath();
            ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#c45b9a';
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#c45b9a';
            ctx.stroke();
        })
    }
    
    function loop(){
        cnv.width |=0; //ctx.clearRect(0,0, cnv.width,cnv.height)// clear space
        updateRings();
        requestAnimationFrame(loop);
    }
    loop();
    window.addEventListener('resize',init);
   

})();