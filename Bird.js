
/* ======================================
   VARIABLES
   ====================================== */

let trees = [];
let bird;

let boxes = [];
let spawnTimer = 0;

let hitCount = 0;
let gameWon = false;


/* ======================================
   SETUP
   ====================================== */

function setup() {

    const container = document.getElementById("game-container");

    const canvas = createCanvas(
        container.clientWidth,
        container.clientHeight
    );

    canvas.parent("game-container");

    bird = new Bird();

    for (let i = 0; i < 50; i++) {
        trees.push(new Tree());
    }

}


/* ======================================
   DRAW
   ====================================== */

function draw() {

    background(0);

    // Moving trees
    for (let t of trees) {
        t.update();
        t.display();
    }

    // Bird movement
    if (!gameWon) {
        controlBirdByMouse();
    }

    bird.update();
    bird.display();

    if (!gameWon) {

        // Generate random squares
        spawnTimer++;

        if (spawnTimer > 100) {
            boxes.push(new Box());
            spawnTimer = 0;
        }

        // Draw squares and check collisions
        for (let i = boxes.length - 1; i >= 0; i--) {

            let b = boxes[i];

            b.display();

            let closestX = constrain(
                bird.x,
                b.x,
                b.x + b.w
            );

            let closestY = constrain(
                bird.y,
                b.y,
                b.y + b.h
            );

            let collision = dist(
                bird.x,
                bird.y,
                closestX,
                closestY
            ) <= 10;

            if (collision) {

                hitCount++;
                boxes.splice(i, 1);

                if (hitCount >= 5) {
                    gameWon = true;
                }

                continue;
            }

            // Remove squares after 4 seconds
            if (millis() - b.spawnTime > 4000) {
                boxes.splice(i, 1);
            }

        }

    }

    drawHUD();

    if (gameWon) {
        drawWinScreen();
    }

}


/* ======================================
   MOUSE CONTROL
   ====================================== */

function controlBirdByMouse() {

    const targetX = constrain(mouseX, 0, width);
    const targetY = constrain(mouseY, 0, height);

    bird.x = lerp(bird.x, targetX, 0.2);
    bird.y = lerp(bird.y, targetY, 0.2);

}


/* ======================================
   HUD
   ====================================== */

function drawHUD() {

    fill(255);
    noStroke();

    textSize(20);
    textAlign(LEFT);

    text("Squares Collected: " + hitCount, 20, 35);

    textSize(10);

    text(
        "Collect 5 red squares!",
        20,
        65
    );

}


/* ======================================
   BIRD
   ====================================== */

class Bird {

    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.wingAngle = 0;
    }

    update() {
        this.wingAngle += 0.2;
    }

    display() {

        push();

        translate(this.x, this.y);

        stroke(255);
        noFill();
        strokeWeight(3);

        let flap = sin(this.wingAngle) * 8;

        arc(-10, 0, 40, 20 + flap, PI, TWO_PI);
        arc(10, 0, 40, 20 + flap, PI, TWO_PI);

        pop();

    }

}


/* ======================================
   MOVING TREES
   ====================================== */

class Tree {

    constructor() {
        this.reset();
    }

    reset() {
        this.x = random(-width, width);
        this.y = random(-height / 2, height / 2);
        this.z = random(100, 2000);
    }

    update() {

        this.z -= 10;

        if (this.z < 1) {
            this.reset();
            this.z = random(1500, 2000);
        }

    }

    display() {

        let sx = map(this.x / this.z, -1, 1, 0, width);
        let sy = map(this.y / this.z, -1, 1, 0, height);
        let r = map(this.z, 0, 2000, 40, 2);

        stroke(255);
        noFill();

        line(sx, sy, sx, sy + r * 2);
        ellipse(sx, sy, r, r);

    }

}


/* ======================================
   RED SQUARES
   ====================================== */

class Box {

    constructor() {

        this.x = random(0, width - 30);
        this.y = random(20, height - 100);

        this.w = 15;
        this.h = 15;

        this.spawnTime = millis();

    }

    display() {

        push();

        fill(255, 100, 100);
        noStroke();

        rect(this.x, this.y, this.w, this.h);

        pop();

    }

}


/* ======================================
   WIN SCREEN
   ====================================== */

function drawWinScreen() {

    fill(0, 200);
    noStroke();

    rect(0, 0, width, height);

    fill(255);
    textAlign(CENTER, CENTER);

    textSize(48);

    text(
        "You Win!",
        width / 2,
        height / 2 - 30
    );

    textSize(20);

    text(
        "Click anywhere to restart",
        width / 2,
        height / 2 + 30
    );

}


/* ======================================
   RESTART
   ====================================== */

function mousePressed() {

    if (gameWon) {

        hitCount = 0;
        spawnTimer = 0;
        boxes = [];
        gameWon = false;

    }

}


/* ======================================
   WINDOW RESIZE
   ====================================== */

function windowResized() {

    const container = document.getElementById("game-container");

    resizeCanvas(
        container.clientWidth,
        container.clientHeight
    );

}
