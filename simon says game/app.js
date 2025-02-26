let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let popup = document.getElementById("gameOverPopup");
let popupMessage = document.getElementById("popupMessage");
let restartBtn = document.getElementById("restartBtn");

// Start game on keypress only if it hasn't started
document.addEventListener("keypress", function () {
    if (started==false) {
        started = true;
        reset(); // Reset before starting a new game
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] !== gameSeq[idx]) {
        showPopup(level);  // Show game over popup
        document.body.style.setProperty("background", "red", "important");

        setTimeout(() => {
            document.body.style.setProperty("background", "white", "important");
        }, 1000);

        return;
    }

    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", btnPress);
});

function reset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
    popup.style.display = "none"; // Hide popup
    h2.innerText = "Press any key to start the game"; // ✅ Set h2 back to default
}

function showPopup(score) {
    popupMessage.innerHTML = `Game Over! Your score was <b>${score}</b>`;
    popup.style.display = "flex"; // Show popup
    started = false;  // Prevent game from continuing
}

// Restart game when button is clicked
restartBtn.addEventListener("click", function () {
    reset();
});
// Open the Game Description popup
document.getElementById("gameDescriptionBtn").addEventListener("click", function (event) {
    event.preventDefault();
    document.body.style.overflow = "hidden";
    document.getElementById("gameDescriptionPopup").style.display = "block";
});

// Close the popup when clicking the Close button
document.querySelector(".game-close-btn").addEventListener("click", function (event) {
    event.preventDefault(); // to prevent from jumps when we click
    document.body.style.overflow = "hidden";
    document.getElementById("gameDescriptionPopup").style.display = "none";
});
