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
var treeImage;
var bushImage;
var bushImage2;
var groundImage;

var particles = [];

function createParticles(n) {
    // Create particles objects;
    for (var i = 0; i < n; i++) {
        particles[i] = createVector(random(windowWidth), random(sceneHeight));
    }
}

// Particle creation function. Uses window size for particle count.
function drawParticles() {
    // Iterate over our particle range and start adding data to the particle array.
    for (var i = 0; i < particles.length; i++) {
        particles[i].x = (particles[i].x + 0.5) % windowWidth;
        ellipse(particles[i].x, particles[i].y, 2);
    }
}

// Draw a circle at the mouse cursor.
function drawCursor() {
    // Slowly decrease cursor size until it is not visible.
    cursorSize = cursorSize + (-cursorSize) * 0.025;

    // Interpolate the cursor to the actual position.
    cursorVector = cursorVector.lerp(mouseX, mouseY, 0, 0.20);

    // Draw an ellipse at the cursor vector position.
    fill(255, 255, 255);
    ellipse(cursorVector.x, cursorVector.y, cursorSize);
}

function drawGrass(x, y, w, h, o, s) {
    image(grassImage1, x + sin(o + frameCount * s) * 2.5, y, w * 16, h * 16);
}

function drawSun(x, y, r, num, c) {
    // Separate color channels for easier use.
    var cr = red(c);
    var cg = green(c);
    var cb = blue(c);

    // Draw iterations of ellipses with different opacity.
    for (i = 1; i < num + 1; i++) {
        // Set the fill color for the given ellipse.
        fill(
            cr,
            cg,
            cb,
            255 - (255 / num) * i - 1
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
    treeImage = loadImage("assets/tree.png");
    groundImage = loadImage("assets/ground.png");
    grassImage1 = loadImage("assets/grass1.png");
    grassImage2 = loadImage("assets/grass2.png");
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

    createParticles(50);
}

// Called each frame.
function draw() {
    background(colorBackground); // Reset the background color.

    // Draw a sun in the center of the scene.
    drawSun(width / 2, sceneHeight / 2, 512, 8, color(255, 245, 3));

    // Tint foreground images.
    tint(48, 35, 69, 235);
    // Draw foreground elements here.

    // Draw main scene elements here.
    tint(48, 35, 69, 255);
    image(treeImage, width / 2 + 25, sceneHeight / 2 + 40, 200, 256);
    image(groundImage, width / 2, sceneHeight / 2 + 150, 512, 512);
    drawGrass(width / 2 + 20, sceneHeight / 2 + 155, 1, 1, 0, 0.02);

    drawGrass(width / 2 - 50, sceneHeight / 2 + 165, 1, 1, 1, 0.02);

    // Set the fill for drawn elements.
    fill(48, 35, 69, 255);
    drawParticles();

    ellipse(width / 3.2, sceneHeight / 3, 100);
    ellipse(width / 3.6, sceneHeight / 2.3, 100);

    // Draw the cursor.
    drawCursor();

    // Draw a veil above everything.
    fill(48, 35, 69, sceneReveal);
    //rect(0, 0, windowWidth, windowHeight);

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
