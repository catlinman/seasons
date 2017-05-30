// All variables are instantiated in the setup function.

// Store the canvas variable for easy access.
var canvas;

// Scene definitions.
var sceneWidth;
var sceneHeight;

// Color definitions.
var colorBackground;

// Cursor definitions.
var cursorVector; // Positional vector of the cursor.
var cursorSize; // Current radius value of the cursor.
var cursorSizeDefault; // Default radius value of hte cursor.

// Draw a circle at the mouse cursor.
function drawCursor() {
    // Slowly decrease cursor size until it is not visible.
    cursorSize = cursorSize + (-cursorSize) * 0.025;

    // Interpolate the cursor to the actual position.
    cursorVector = cursorVector.lerp(mouseX, mouseY, 0, 0.20);

    // Draw an ellipse at the cursor vector position.
    ellipse(cursorVector.x, cursorVector.y, cursorSize);
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

    // Set variables for the scene.
    sceneWidth = 640;
    sceneHeight = 640;

    // Set the default mouse position to the center of the drawing scene.
    mouseX = width / 2;
    mouseY = sceneHeight / 2;

    // Set the mouse cursor vector to the current mouse position.
    cursorVector = createVector(width / 2, sceneHeight / 2);

    // Set the correct values for the cursor size.
    cursorSizeDefault = 16;
    cursorSize = cursorSizeDefault;

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

// Called each frame.
function draw() {
    background(colorBackground); // Reset the background color.

    // Draw the cursor.
    drawCursor();

    // Draw a circle in the middle of the screen as a placeholder.
    fill(255, 255, 255);
    ellipse(width / 2, sceneHeight / 2, 86 + sin(frameCount / 100) * 32);
}
