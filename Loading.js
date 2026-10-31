/* ======================================
   LOADING SCREEN
   ====================================== */

function hideLoadingScreen() {
    const loader = document.getElementById("loading-screen");

    if (!loader || loader.classList.contains("hidden")) {
        return;
    }

    loader.classList.add("hidden");

    setTimeout(() => {
        loader.remove();
    }, 300);
}

// Wait for the full page and images to load
if (document.readyState === "complete") {
    hideLoadingScreen();
} else {
    window.addEventListener("load", hideLoadingScreen);
}