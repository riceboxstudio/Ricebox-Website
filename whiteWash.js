var isDrawing, lastPoint;
var canvas = document.getElementById("js-canvas");
var ctx = canvas.getContext("2d");
var image = new Image();
var brush = new Image();

//var canvasHeight = 
//var widthRatio = 1.52;
//var canvasWidth = canvas.height * widthRatio;
canvas.width = window.innerWidth*0.955;
canvas.height = canvas.width * 0.66;


// base64 Workaround because Same-Origin-Policy
image.src = "/prepared/Work/whitewash_lie.jpg";
image.onload = function() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // image on top
    //Show the form when Image is loaded.
};

//format of the brush -> if change the image then the entire thing changes //
brush.src =
"/prepared/Work/whitewash_brush.png";

canvas.addEventListener("mousedown", handleMouseDown, false);
canvas.addEventListener("mousemove", handleMouseMove, false);
canvas.addEventListener("mouseup", handleMouseUp, false);
canvas.addEventListener("touchstart", handleMouseDown, false);
canvas.addEventListener("touchmove", handleMouseMove, false);
canvas.addEventListener("touchend", handleMouseUp, false);

// Only test every `stride` pixel. `stride`x faster, but might lead to inaccuracy
function getFilledInPixels(stride) {
    if (!stride || stride < 1) {
        stride = 1;
    }

    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height),
    pdata = pixels.data,
    l = pdata.length,
    total = l / stride,
    count = 0;

    // Iterate over all pixels
    for (var i = (count = 0); i < l; i += stride) {
        if (parseInt(pdata[i]) === 0) {
            count++;
        }   
    }

    return Math.round(count / total * 100);
}

// amount of fill until it clears the image
function handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;
    console.log(filledInPixels + "%");
    if (filledInPixels > 30) {
        canvas.parentNode.removeChild(canvas);
    }
}

function refreshPage(){
  window.location.reload();
}

function handleMouseDown(e) {
    isDrawing = true;
    lastPoint = getMouse(e, canvas);
}

function handleMouseUp(e) {
    isDrawing = false; // false allows you un-click, true doesn't allow you to lift the hand from the cleaning
}

function getMouse(e, canvas) {
    var offsetX = 0;
    var offsetY = 0;
    var mX, mY;

    if (canvas.offsetParent !== undefined) {
        do {
            offsetX += canvas.offsetLeft;
            offsetY += canvas.offsetTop;
        } while ((canvas = canvas.offsetParent));
    }

    mX = (e.pageX || e.touches[0].clientX) - offsetX;
    mY = (e.pageY || e.touches[0].clientY) - offsetY;

    return { x: mX, y: mY };
}

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) 
                     + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

// THIS FUNCTION!!!
function handleMouseMove(e) {
    if (!isDrawing) {
        return;
    }

    e.preventDefault();

    var currentPoint = getMouse(e, canvas);
    var dist = distanceBetween(lastPoint, currentPoint);
    var angle = angleBetween(lastPoint, currentPoint);
    
    // MOUSE OFFSET
    for (var i = 0; i < dist; i++) {
        x = lastPoint.x + Math.sin(angle) * i;
        y = lastPoint.y + Math.cos(angle) * i;
        ctx.globalCompositeOperation = "destination-out"; // allows to use the image as painting colour 
        ctx.drawImage(brush, x, y); //this allows for the actual painting
    }

    console.log("x is " + x);
    
    lastPoint = currentPoint;
    handlePercentage(getFilledInPixels(70));
}

 

