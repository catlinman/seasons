// All variables are instantiated in the setup function.

// Store the canvas variable for easy access.
var canvas;

// Color definitions.
var colorBackground;

// Program entry point.
function setup() {
    // Create the canvas in the base page.
    canvas = createCanvas(640, 640);

    // Get the correct parent by its ID.
    canvas.parent("canvas");

    colorBackground = color(48, 35, 69);
}

// Called each frame.
function draw() {
    background(colorBackground); // Reset the background color.

    fill(255, 255, 255);
    ellipse(width / 2, height / 2, 86 + sin(frameCount / 100) * 32);
}
