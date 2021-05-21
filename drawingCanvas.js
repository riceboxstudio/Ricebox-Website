var colors;

function setup() {

    let canvas = createCanvas(displayWidth, displayHeight);
    canvas.position(0, 0, "fixed");
    canvas.style("z-index: -10");
    noStroke();

    // Define Colors
    colors = [color(137, 172, 51), color(251, 197, 64), color(226, 1, 126), color(255, 102, 51)];

}

function mouseDragged() {
    
    if (displayWidth >= 500) {
        push();
        colorMode(RGB);
        fill(random(colors));
        ellipse(mouseX, mouseY, 10, 10);
        pop();
    }

}