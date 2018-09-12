// All variables are instantiated in the setup function.

// Store the canvas variable for easy access.
var canvas;

// Store a debugging value for further use.
const DEBUG = false;

// Store frame and update timing variables.
const DRAWRATE = 60;
const UPDATERATE = 60;

// Scene definitions.
let sceneWidth;
let sceneHeight;
let sceneReveal;

// Color definitions.
let colorBackground;

// Cursor placeholder.
let cursor;

// Custom cursor object.
class VirtualCursor {
    constructor(x, y, scale, speed) {
        this.position = createVector(x, y); // Positional vector of the cursor.
        this.scale = scale; // Origin radius value of the cursor.

        this.speed = speed;

        this.positionLerp = this.position; // Smoothed position of the cursor.
        this.scaleLerp = this.scale; // Smoothed radius value of the cursor.
        this.speedLerp = this.speed; // Smoothed radius value of the cursor.
    }

    // -------------------------------------------------------------------- //

    // TODO: Instead of creating methods that expose position and scale the
    // cursor should be manipulated through "move" and "click" methods.

    setPosition(x, y, snap) {
        this.position.set(x, y);

        // Whether the animation should instantly update.
        if(snap === true) this.positionLerp.set(this.position);
    }

    setScale(s, snap) {
        this.scale = s;

        // Whether the animation should instantly update.
        if(snap === true) this.scaleLerp = s;
    }

    // -------------------------------------------------------------------- //

    update() {
        // Scale the cursor to correspond with the destination value.
        this.scaleLerp = lerp(this.scaleLerp, this.scale, this.speed / 10);

        // Interpolate the lerped position towards the destination actual position.
        this.positionLerp = this.positionLerp.lerp(this.position, this.speed);

        // Reset the cursor so it disappears over time.
        this.scale = 0;
    }

    draw() {
        fill(255, 255, 255);

        ellipse(this.positionLerp.x, this.positionLerp.y, this.scaleLerp);
    }
}

class GrassBlade {
    constructor() {
        // TODO: Add functionality. Blade of grass that moves from touching.
        // Has a start and end point and uses a math function for its shape.
    }
}

// Preload assets before the scene starts.
function preload() {}

// Program entry point.
function setup() {
    // Create the canvas in the base page.
    canvas = createCanvas(windowWidth, windowHeight);

    // Get the correct parent by its ID.
    canvas.parent("canvas");

    // Set the right settings.
    frameRate(DRAWRATE); // Set a constant framerate.
    noStroke(); // Disable strokes by default.
    noCursor(); // Disable the default mouse cursor.

    // Make sure that images are drawn from their center origin.
    imageMode(CENTER);

    // Set variables for the scene.
    sceneWidth = 640;
    sceneHeight = 640;
    sceneReveal = 255;

    // Set the default mouse position to the center of the drawing scene.
    cursor = new VirtualCursor(width / 2, sceneHeight / 2, 16, 0.25);

    // Set color variables.
    colorBackground = color(48, 35, 69);
}

// Custom update loop that runs a different frame amount from the draw loop.
function update(dt) {
    cursor.update(dt);
}

// Called each frame.
function draw() {
    // Update depending on how many extra frames are required to compensate.
    // This method allows lower frame rate drawing but high frame rate processing.
    for(let i = 0; i < ceil(UPDATERATE / DRAWRATE); i++)
        update(window.performance.now() - canvas._pInst._lastFrameTime);

    background(colorBackground); // Reset the background color.

    // Draw a sun in the center of the scene.
    stroke(255, 255, 255);

    // Reset stroke.
    noStroke();

    // Draw main scene elements here.
    tint(48, 35, 69, 255);
    fill(48, 35, 69, 255);

    // Draw a veil above everything.
    fill(48, 35, 69, sceneReveal);
    rect(0, 0, width, height);

    cursor.draw();

    // Remove opacity.
    sceneReveal--;
}

// Called when the window resizes.
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Called when the mouse cursor is moved.
function mouseMoved() {
    // Update the cursor position if moved.
    cursor.setPosition(mouseX, mouseY);

    // Scale the cursor to its default size if it's being moved.
    cursor.setScale(16);
}

// Called when the mouse cursor is pressed.
function mousePressed() {
    cursor.setScale(32, true);

    // Prevent default behavior.
    return false;
}
