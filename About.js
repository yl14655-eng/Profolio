
const books = [
    {
        cover: "images/book1/cover.jpg",
        spreads: [
            {
                double: "images/book1/Page (1).jpg"
            },
             {
                double: "images/book1/Page (2).jpg"
            },
             {
                double: "images/book1/Page (3).jpg"
            },
             {
                double: "images/book1/Page (4).jpg"
            },
             {
                double: "images/book1/Page (5).jpg"
            },
             {
                double: "images/book1/Page (6).jpg"
            },
             {
                double: "images/book1/Page (7).jpg"
            },
             {
                double: "images/book1/Page (8).jpg"
            },
             {
                double: "images/book1/Page (9).jpg"
            },
             {
                double: "images/book1/Page (10).jpg"
            },
             {
                double: "images/book1/Page (11).jpg"
            },
             {
                double: "images/book1/Page (12).jpg"
            },
             {
                double: "images/book1/Page (13).jpg"
            },
             {
                double: "images/book1/Page (14).jpg"
            },
             {
                double: "images/book1/Page (15).jpg"
            },
             {
                double: "images/book1/Page (16).jpg"
            },
             {
                double: "images/book1/Page (17).jpg"
            },
             {
                double: "images/book1/Page (18).jpg"
            },
             {
                double: "images/book1/Page (19).jpg"
            },
             {
                double: "images/book1/Page (20).jpg"
            },
             {
                double: "images/book1/Page (21).jpg"
            },
             {
                double: "images/book1/Page (22).jpg"
            },
             {
                double: "images/book1/Page (23).jpg"
            },
        ]
    },
    {
        cover: "images/book2/cover.jpg",
        spreads: [
            {
                left: "images/book2/Page1.jpg",
                right: "images/book2/Page2.jpg"
            },
             {
                double: "images/book2/Page3-4.jpg"
            },
             {
                double: "images/book2/Page5-6.jpg"
            },
            {
                double: "images/book2/Page7-8.jpg"
            },
            {
                double: "images/book2/Page9-10.png"
            },
            {
                left: "images/book2/Page11.jpg",
                right: "images/book2/Page12.jpg"
            },
              {
                double: "images/book2/Page13-14.jpg"
            },
              {
                double: "images/book2/Page15-16.jpg"
            },
            {
                left: "images/book2/Page17.jpg",
                right: "images/book2/Page12.jpg"
            },
        ]
    },
    {
        cover: "images/book3/cover.jpg",
        spreads: [
                          {
                double: "images/book3/Page (1).jpg"
            },
             {
                double: "images/book3/Page (2).jpg"
            },
             {
                double: "images/book3/Page (3).jpg"
            },
             {
                double: "images/book3/Page (4).jpg"
            },
             {
                double: "images/book3/Page (5).jpg"
            },
             {
                double: "images/book3/Page (6).jpg"
            },
             {
                double: "images/book3/Page (7).jpg"
            },
             {
                double: "images/book3/Page (8).jpg"
            },
             {
                double: "images/book3/Page (9).jpg"
            },
             {
                double: "images/book3/Page (10).jpg"
            },
             {
                double: "images/book3/Page (11).jpg"
            },
             {
                double: "images/book3/Page (12).jpg"
            },
             {
                double: "images/book3/Page (13).jpg"
            },
             {
                double: "images/book3/Page (14).jpg"
            },
             {
                double: "images/book3/Page (15).jpg"
            },
             {
                double: "images/book3/Page (16).jpg"
            },
             {
                double: "images/book3/Page (17).jpg"
            },
             {
                double: "images/book3/Page (18).jpg"
            },
             {
                double: "images/book3/Page (19).jpg"
            },
             {
                double: "images/book3/Page (20).jpg"
            },
             {
                double: "images/book3/Page (21).jpg"
            },
             {
                double: "images/book3/Page (22).jpg"
            },
             {
                double: "images/book3/Page (23).jpg"
            },
        ]
    }
];


/* VARIABLES */

let selectedBook = 1;
let currentBook = null;
let currentSpread = 0;
let isTurning = false;
let turnTimer = null;

const bookshelf = document.getElementById("bookshelf");
const reader = document.getElementById("reader");
const openBookElement = document.getElementById("open-book");

const leftPage = document.getElementById("left-page");
const rightPage = document.getElementById("right-page");
const pageCounter = document.getElementById("page-counter");

const closeButton = document.getElementById("close-reader");
const prevButton = document.getElementById("page-prev");
const nextButton = document.getElementById("page-next");
const backdrop = document.getElementById("reader-backdrop");


/* POSITION READER BELOW HEADER */

function positionReader() {
    const nav = document.querySelector("nav");

    reader.style.top = nav
        ? `${nav.getBoundingClientRect().bottom}px`
        : "0px";
}


/* UPDATE SELECTED BOOK */

function updateSelection() {
    const covers = bookshelf.querySelectorAll(".book-cover");

    covers.forEach((cover, index) => {
        cover.classList.toggle(
            "active",
            index === selectedBook
        );

        cover.setAttribute(
            "aria-pressed",
            String(index === selectedBook)
        );
    });
}


/* CREATE GALLERY */

function renderGallery() {
    bookshelf.replaceChildren();

    books.forEach((book, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "book-cover";

        button.setAttribute(
            "aria-label",
            `Select or open pamphlet ${index + 1}`
        );

        const image = document.createElement("img");

        image.src = book.cover;
        image.alt = `Pamphlet ${index + 1} cover`;

        button.appendChild(image);

        button.addEventListener("click", () => {

            if (index !== selectedBook) {
                // First click selects the book
                selectedBook = index;
                updateSelection();

            } else {
                // Second click opens the book
                openBook(index);
            }

        });

        bookshelf.appendChild(button);
    });

    updateSelection();
}


/* UPDATE PAGES */

function updatePages() {
    if (!currentBook) return;

    const spread = currentBook.spreads[currentSpread];

    if (!spread) return;

    openBookElement.classList.toggle(
        "double-page",
        Boolean(spread.double)
    );

    openBookElement.style.backgroundImage = spread.double
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
        `${currentSpread + 1} / ${currentBook.spreads.length}`;

    prevButton.disabled = currentSpread === 0;

    nextButton.disabled =
        currentSpread === currentBook.spreads.length - 1;
}


/* OPEN BOOK */

function openBook(index) {
    clearTimeout(turnTimer);

    turnTimer = null;
    isTurning = false;

    openBookElement.classList.remove("turning");

    currentBook = books[index];
    currentSpread = 0;

    positionReader();
    updatePages();

    reader.classList.add("visible");
    reader.setAttribute("aria-hidden", "false");

    closeButton.focus();
}


/* FLIP PAGES */

function turnPage(direction) {
    if (!currentBook || isTurning) return;

    const next = currentSpread + direction;

    if (
        next < 0 ||
        next >= currentBook.spreads.length
    ) {
        return;
    }

    isTurning = true;
    openBookElement.classList.add("turning");

    turnTimer = setTimeout(() => {
        currentSpread = next;

        updatePages();

        openBookElement.classList.remove("turning");

        isTurning = false;
        turnTimer = null;

    }, 350);
}


/* CLOSE BOOK */

function closeBook() {
    clearTimeout(turnTimer);

    turnTimer = null;
    isTurning = false;

    openBookElement.classList.remove("turning");

    reader.classList.remove("visible");
    reader.setAttribute("aria-hidden", "true");

    currentBook = null;
    currentSpread = 0;

    updateSelection();

    const selected =
        bookshelf.querySelectorAll(".book-cover")[selectedBook];

    if (selected) {
        selected.focus();
    }
}


/* BUTTON EVENTS */

prevButton.addEventListener("click", () => turnPage(-1));

nextButton.addEventListener("click", () => turnPage(1));

closeButton.addEventListener("click", closeBook);

backdrop.addEventListener("click", closeBook);


/* KEEP HEADER POSITION ACCURATE */

window.addEventListener("resize", positionReader);


/* KEYBOARD CONTROLS */

document.addEventListener("keydown", (event) => {
    if (!reader.classList.contains("visible")) return;

    if (event.key === "Escape") {
        closeBook();
    }

    if (event.key === "ArrowLeft") {
        turnPage(-1);
    }

    if (event.key === "ArrowRight") {
        turnPage(1);
    }
});


/* START */

positionReader();
renderGallery();
