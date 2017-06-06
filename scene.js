// All variables are instantiated in the setup function.

// Store the canvas variable for easy access.
var canvas;

// Scene definitions.
var sceneWidth;
var sceneHeight;
var sceneReveal;

// Color definitions.
var colorBackground;

// Cursor definitions.
var cursorVector; // Positional vector of the cursor.
var cursorSize; // Current radius value of the cursor.
var cursorSizeDefault; // Default radius value of the cursor.

// Preload assets. These are instantiated in the preload function.
var imageTree;
var imageGround;
var imageGrass1;
var imageGrass2;

// Particle array.
var particles = [];

var debug = false;

// Inserts a new vector into the particle array.
function createParticles(n) {
    // Create particles objects;
    for (var i = 0; i < n; i++) {
        particles[i] = createVector(random(width), random(sceneHeight));
    }
}

// Particle creation function. Iterates over particles in the array, moves and draws them.
function drawParticles() {
    if(debug == true) stroke(255, 255, 255);

    for (var i = 0; i < particles.length; i++) {
        // Move the x and y values and clip them around the scene and window size.
        particles[i].x = (particles[i].x + random(0, 0.5)) % sceneWidth;
        particles[i].y = (particles[i].y + 5.5) % sceneHeight;

        // Draw the particle.
        ellipse(particles[i].x + (windowWidth / 2) - (sceneWidth / 2), particles[i].y, 1, 10);
    }
}

// Draw a circle at the mouse cursor.
function drawCursor() {
    // Slowly decrease cursor size until it is not visible.
    cursorSize = cursorSize + (-cursorSize) * 0.025;

    // Interpolate the cursor to the actual position.
    cursorVector = cursorVector.lerp(mouseX, mouseY, 0, 0.20);

    // Draw an ellipse at the cursor vector position.
    ellipse(cursorVector.x, cursorVector.y, cursorSize);
}

// Draws a cloud.
function drawCloud(x, y, r, n) {
    ellipse(x, y, r);

    r = r / 2;
    d = r;

    for (var i = 0; i < n; i++) {
        ellipse(x + d, y, r);
        ellipse(x - d, y, r);

        d = d + r / 2;
        r = r / 2;
    }
}

// Draw a grass tuft.
function drawGrass(x, y, w, h, o, s) {
    image(imageGrass1, x + sin(o + frameCount * s) * 2.5, y, w * 16, h * 16);
}

// Draw a sun.
function drawSun(x, y, r, num, c) {
    // Separate color channels for easier use.
    var cr = red(c);
    var cg = green(c);
    var cb = blue(c);

    // Draw iterations of ellipses with different opacity.
    for (var i = 0; i < num + 1; i++) {
        // Set the fill color for the given ellipse.
        fill(
            cr,
            cg,
            cb,
            255 - (255 / num) * i
        );

        // Draw the actual ellipse and animate its radius.
        ellipse(
            x,
            y,
            ((r / num) * i) + sin(frameCount / 150) * r / (num * 2)
        );
    }
}

// Preload assets before the scene starts.
function preload() {
    imageTree = loadImage("assets/tree.png");
    imageGround = loadImage("assets/ground.png");
    imageGrass1 = loadImage("assets/grass1.png");
    imageGrass2 = loadImage("assets/grass2.png");
}

// Program entry point.
function setup() {
    // Create the canvas in the base page.
    canvas = createCanvas(windowWidth, windowHeight);

    // Get the correct parent by its ID.
    canvas.parent("canvas");

    // Set the right settings.
    frameRate(60); // Set a constant framerate.
    noStroke(); // Disable strokes by default.
    noCursor(); // Disable the default mouse cursor.

    // Make sure that images are drawn from their center origin.
    imageMode(CENTER);

    // Set variables for the scene.
    sceneWidth = 640;
    sceneHeight = 640;
    sceneReveal = 255;

    // Set the default mouse position to the center of the drawing scene.
    mouseX = width / 2;
    mouseY = sceneHeight / 2;

    // Set the mouse cursor vector to the current mouse position.
    cursorVector = createVector(width / 2, sceneHeight / 2);

    // Set the correct values for the cursor size.
    cursorSizeDefault = 16;
    cursorSize = 0;

    // Set color variables.
    colorBackground = color(48, 35, 69);

    // Create particles.
    createParticles(50);
}

// Called each frame.
function draw() {
    background(colorBackground); // Reset the background color.

    // Draw a sun in the center of the scene.
    stroke(255, 255, 255);
    drawSun(width / 2, sceneHeight / 2, 640, 8, color(255, 245, 3));

    // Reset stroke.
    noStroke();

    // Draw main scene elements here.
    tint(48, 35, 69, 255);
    fill(48, 35, 69, 255);

    // Draw the tree.
    tint(48, 35, 69, 255);
    image(imageTree, width / 2, sceneHeight / 2 + 45, 256, 256);

    // Draw the ground image.
    image(imageGround, width / 2, sceneHeight / 2 + 150, 512, 512);

    // Draw grass tufts.
    drawGrass(width / 2 + 25, sceneHeight / 2 + 155, 1, 1, 0, 0.02);
    drawGrass(width / 2 + 125, sceneHeight / 2 + 170, 1, 1, 0, 0.02);
    drawGrass(width / 2 - 50, sceneHeight / 2 + 165, 1, 1, 1, 0.02);

    // Draw particles.
    drawParticles();
    drawCloud(windowWidth / 2 - 200, sceneHeight / 2 - 150, 128, 4);
    drawCloud(windowWidth / 2 + 230, sceneHeight / 2 - 90, 140, 4);

    // Draw the cursor.
    fill(255, 255, 255);
    drawCursor();

    // Draw a veil above everything.
    fill(48, 35, 69, sceneReveal);
    rect(0, 0, width, height);

    // Remove opacity.
    sceneReveal--;
}

// Called when the window resizes.
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Called when the mouse cursor is moved.
function mouseMoved() {
    // Scale the cursor to its default size if it's being moved.
    cursorSize = cursorSize + (cursorSizeDefault - cursorSize) * 0.1;
}

// Called when the mouse cursor is pressed.
function mousePressed() {
    cursorSize = cursorSizeDefault * 4;

    // Prevent default behavior.
    return false;
}
