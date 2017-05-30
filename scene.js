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

// Preload assets before the scene starts.
function preload() {
    treeImage = loadImage("assets/tree.svg");
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

// Called each frame.
function draw() {
    background(colorBackground); // Reset the background color.

    // Draw a sun in the center of the scene.
    drawSun(width / 2, sceneHeight / 2, 312, 8, color(255, 245, 3));

    // Tint foreground images.
    tint(48, 35, 69, 235);
    image(treeImage, width / 2, sceneHeight / 2 + 40, 128, 256);

    // Set the fill for drawn elements.
    fill(48, 35, 69, 235);

    // Start drawing ellipses.
    ellipse(width / 2 + 150, sceneHeight / 2 + 64, 64, 86);
    ellipse(width / 2 - 150, sceneHeight / 2 + 64, 64, 86);
    ellipse(width / 2 - 120, sceneHeight / 2 + 86, 64);
    ellipse(width / 2 + 120, sceneHeight / 2 + 86, 48);

    // Draw the cursor.
    drawCursor();

    // Draw a veil above everything.
    fill(48, 35, 69, sceneReveal);
    rect(0, 0, windowWidth, windowHeight);

    // Remove opacity.
    sceneReveal--;
}
