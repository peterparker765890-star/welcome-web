/* =========================================
   LUMINA
   A Little World For A Little While
   Created by Sabarish.P
========================================= */

const screens = document.querySelectorAll(".screen");

let userName = "";
let selectedMood = "";

function showScreen(id) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
        setTimeout(() => {
            target.classList.add("active");
        }, 80);
    }
}

function cleanName(name) {
    return name
        .trim()
        .replace(/\s+/g, " ")
        .replace(/[<>]/g, "")
        .slice(0, 24);
}

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
    }, 1200);

});


/* =========================================
   STAR CANVAS
========================================= */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let width;
let height;

function resizeCanvas() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    stars = [];

    const count = Math.min(
        180,
        Math.floor((width * height) / 9000)
    );

    for (let i = 0; i < count; i++) {

        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.2,
            alpha: Math.random(),
            speed: Math.random() * 0.015 + 0.005
        });

    }
}

function drawStars() {

    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {

        star.alpha += star.speed;

        if (star.alpha >= 1 || star.alpha <= 0) {
            star.speed *= -1;
        }

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${Math.max(
            .15,
            star.alpha
        )})`;

        ctx.fill();

    });

    requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();

window.addEventListener("resize", resizeCanvas);


/* =========================================
   INTRO
========================================= */

document.getElementById("beginBtn").addEventListener("click", () => {
    showScreen("nameScreen");

    setTimeout(() => {
        document.getElementById("nameInput").focus();
    }, 500);
});


/* =========================================
   NAME
========================================= */

const nameInput = document.getElementById("nameInput");
const nameError = document.getElementById("nameError");

function enterWorld() {

    userName = cleanName(nameInput.value);

    if (!userName) {

        nameError.textContent =
            "Tell me your name first ✨";

        nameInput.focus();

        return;
    }

    nameError.textContent = "";

    document.getElementById("welcomeName").textContent = userName;
    document.getElementById("gardenName").textContent = userName;
    document.getElementById("finalName").textContent = userName;

    showScreen("welcome");
}

document.getElementById("enterBtn")
    .addEventListener("click", enterWorld);

nameInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        enterWorld();
    }

});


/* =========================================
   WELCOME
========================================= */

document.getElementById("exploreBtn")
    .addEventListener("click", () => {

        showScreen("garden");

    });


/* =========================================
   GARDEN FLOWERS
========================================= */

const flowers = document.querySelectorAll(".flower");
const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("messageText");

flowers.forEach(flower => {

    flower.addEventListener("click", () => {

        messageText.textContent =
            flower.dataset.message;

        messageBox.classList.add("show");

    });

});

document.getElementById("closeMessage")
    .addEventListener("click", () => {

        messageBox.classList.remove("show");

    });


/* =========================================
   BUTTERFLY
========================================= */

document.getElementById("butterfly")
    .addEventListener("click", event => {

        event.currentTarget.style.transform =
            "scale(1.5) rotate(15deg)";

        showToast("You found a little friend 🦋");

        setTimeout(() => {

            event.currentTarget.style.transform = "";

        }, 700);

    });


/* =========================================
   GARDEN CONTINUE
========================================= */

document.getElementById("gardenContinue")
    .addEventListener("click", () => {

        messageBox.classList.remove("show");

        showScreen("mood");

    });


/* =========================================
   MOOD
========================================= */

const moodCards = document.querySelectorAll(".mood-card");
const moodResult = document.getElementById("moodResult");

const moodMessages = {

    Dreamer:
        "A little dreamy. A little mysterious. A beautiful combination.",

    Explorer:
        "You probably find something interesting wherever you go.",

    Sunshine:
        "You have the kind of energy that can brighten an ordinary day.",

    Midnight:
        "Quiet minds often notice the most beautiful things."

};

moodCards.forEach(card => {

    card.addEventListener("click", () => {

        selectedMood = card.dataset.mood;

        moodResult.textContent =
            moodMessages[selectedMood];

        moodCards.forEach(item => {
            item.style.transform = "";
        });

        card.style.transform = "translateY(-7px)";

        setTimeout(() => {

            showScreen("wish");

        }, 1600);

    });

});


/* =========================================
   WISH
========================================= */

document.getElementById("wishBtn")
    .addEventListener("click", () => {

        const wish =
            document.getElementById("wishInput")
                .value.trim();

        if (!wish) {

            showToast("Make a little wish first ✨");

            return;
        }

        createWishStar();

        showToast("Your wish is now a star ✨");

        setTimeout(() => {

            showScreen("final");

        }, 1800);

    });


function createWishStar() {

    const star = document.createElement("div");

    star.textContent = "✦";

    star.style.position = "fixed";
    star.style.left = "50%";
    star.style.top = "50%";
    star.style.zIndex = "80";
    star.style.color = "#fff";
    star.style.fontSize = "25px";
    star.style.textShadow =
        "0 0 30px #c4a9ff, 0 0 70px #8c68ff";
    star.style.transition =
        "all 1.7s cubic-bezier(.2,.8,.2,1)";

    document.body.appendChild(star);

    requestAnimationFrame(() => {

        star.style.left =
            `${Math.random() * 80 + 10}%`;

        star.style.top =
            `${Math.random() * 35 + 5}%`;

        star.style.transform =
            "scale(2.5)";

        star.style.opacity = "0";

    });

    setTimeout(() => {

        star.remove();

    }, 1900);

}


/* =========================================
   RESTART
========================================= */

document.getElementById("restartBtn")
    .addEventListener("click", () => {

        nameInput.value = "";
        document.getElementById("wishInput").value = "";

        moodResult.textContent = "";

        messageBox.classList.remove("show");

        userName = "";
        selectedMood = "";

        showScreen("intro");

    });


/* =========================================
   MOUSE / TOUCH PARALLAX
========================================= */

let pointerX = 0;
let pointerY = 0;

window.addEventListener("pointermove", event => {

    pointerX =
        (event.clientX / window.innerWidth - .5) * 2;

    pointerY =
        (event.clientY / window.innerHeight - .5) * 2;

    const moon = document.querySelector(".moon");

    if (moon) {

        moon.style.transform =
            `translate(${pointerX * 10}px,
                       ${pointerY * 10}px)`;

    }

});


/* =========================================
   PREVENT ACCIDENTAL FORM RELOAD
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        const activeScreen =
            document.querySelector(".screen.active");

        if (
            activeScreen &&
            activeScreen.id === "wish"
        ) {
            document.getElementById("wishBtn").click();
        }

    }

});