
/* ======================================
   CURATION BOOK PAGES
   ====================================== */

const spreads = [

    // Spread 1: Two separate pages
    {
        double: "images/curation/page1.jpg"
    },

    {
        double: "images/curation/page2.jpg"
    },
    
    {
        double: "images/curation/page3.jpg"
    },

    {
        double: "images/curation/page4.jpg"
    },

    {
        double: "images/curation/page5.jpg"
    },

    {
        double: "images/curation/page6.jpg"
    },

    {
        double: "images/curation/page7.jpg"
    },

    {
        double: "images/curation/page8.jpg"
    },

    {
        double: "images/curation/page9.jpg"
    },

    {
        double: "images/curation/page10.jpg"
    },

    {
        double: "images/curation/page11.jpg"
    },

    {
        double: "images/curation/page12.jpg"
    },
    {
        left: "images/curation/page13.jpg",
        right: "images/curation/page14.jpg"
     },
    {
        left: "images/curation/page15.jpg"
     }

];


/* ======================================
   VARIABLES
   ====================================== */

let currentSpread = 0;
let isTurning = false;
let turnTimer = null;

const openBook = document.getElementById("open-book");

const leftPage = document.getElementById("left-page");
const rightPage = document.getElementById("right-page");

const pageCounter = document.getElementById("page-counter");

const prevButton = document.getElementById("page-prev");
const nextButton = document.getElementById("page-next");
const closeButton = document.getElementById("close-reader");


/* ======================================
   UPDATE PAGES
   ====================================== */

function updatePages() {

    const spread = spreads[currentSpread];

    if (!spread) return;

    openBook.classList.toggle(
        "double-page",
        Boolean(spread.double)
    );

    openBook.style.backgroundImage = spread.double
        ? `url("${spread.double}")`
        : "none";

    leftPage.removeAttribute("src");
    rightPage.removeAttribute("src");

    leftPage.style.visibility = spread.left
        ? "visible"
        : "hidden";

    rightPage.style.visibility = spread.right
        ? "visible"
        : "hidden";

    if (spread.left) {
        leftPage.src = spread.left;
    }

    if (spread.right) {
        rightPage.src = spread.right;
    }

    pageCounter.textContent =
        `${currentSpread + 1} / ${spreads.length}`;

    prevButton.disabled = currentSpread === 0;
    nextButton.disabled = currentSpread === spreads.length - 1;

}


/* ======================================
   FLIP PAGES
   ====================================== */

function turnPage(direction) {

    if (isTurning) return;

    const next = currentSpread + direction;

    if (next < 0 || next >= spreads.length) {
        return;
    }

    isTurning = true;
    openBook.classList.add("turning");

    clearTimeout(turnTimer);

    turnTimer = setTimeout(() => {

        currentSpread = next;

        updatePages();

        openBook.classList.remove("turning");

        isTurning = false;
        turnTimer = null;

    }, 350);

}


/* ======================================
   PAGE ARROWS
   ====================================== */

prevButton.addEventListener("click", () => {
    turnPage(-1);
});

nextButton.addEventListener("click", () => {
    turnPage(1);
});


/* ======================================
   CLOSE AND GO BACK
   ====================================== */

function goBack() {

    // Return to the previous webpage
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Fallback if opened directly
        window.location.href = "About.html";
    }

}

closeButton.addEventListener("click", goBack);


/* ======================================
   KEYBOARD CONTROLS
   ====================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        goBack();
    }

    if (event.key === "ArrowLeft") {
        turnPage(-1);
    }

    if (event.key === "ArrowRight") {
        turnPage(1);
    }

});


/* ======================================
   INITIALIZE
   ====================================== */

updatePages();
