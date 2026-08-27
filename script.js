/* =========================================================
   🌙 A LITTLE UNIVERSE
   Cinematic Birthday Story
========================================================= */


/* =========================================================
   SCENE SYSTEM
========================================================= */

const scenes = [
    document.getElementById("scene1"),
    document.getElementById("scene2"),
    document.getElementById("scene3"),
    document.getElementById("scene4"),
    document.getElementById("scene5"),
    document.getElementById("scene6"),
    document.getElementById("scene7")
];

let currentScene = 0;
let changingScene = false;


/* =========================================================
   CHANGE SCENE
========================================================= */

function goToScene(index) {

    if (index < 0 || index >= scenes.length) {
        return;
    }

    if (index === currentScene) {
        return;
    }

    if (changingScene) {
        return;
    }

    changingScene = true;


    /* Fade current scene */

    scenes[currentScene].classList.remove("active");


    setTimeout(() => {

        currentScene = index;

        scenes[currentScene].classList.add("active");

        changingScene = false;

    }, 250);
}


/* =========================================================
   SCENE 1 → SCENE 2
========================================================= */

const beginButton =
    document.getElementById("beginButton");

if (beginButton) {

    beginButton.addEventListener("click", () => {

        createParticleBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            35
        );

        goToScene(1);

    });

}


/* =========================================================
   SCENE 2 → SCENE 3
========================================================= */

const journeyButton =
    document.getElementById("journeyButton");

if (journeyButton) {

    journeyButton.addEventListener("click", () => {

        createParticleBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            35
        );

        goToScene(2);

    });

}


/* =========================================================
   ✦ MAGIC STAR
========================================================= */

const magicStar =
    document.getElementById("magicStar");


if (magicStar) {

    magicStar.addEventListener("click", () => {

        if (magicStar.classList.contains("used")) {
            return;
        }

        magicStar.classList.add("used");


        /* Get star position */

        const rect =
            magicStar.getBoundingClientRect();

        const x =
            rect.left + rect.width / 2;

        const y =
            rect.top + rect.height / 2;


        /* Magical particle explosion */

        createParticleBurst(
            x,
            y,
            90
        );


        /* Star grows */

        magicStar.style.transform =
            "scale(1.8) rotate(180deg)";

        magicStar.style.textShadow = `
            0 0 15px white,
            0 0 35px white,
            0 0 70px #c9b7ff,
            0 0 120px #9d82ff
        `;


        /* Fade star */

        setTimeout(() => {

            magicStar.style.transform =
                "scale(0) rotate(360deg)";

            magicStar.style.opacity =
                "0";

        }, 500);


        /* Continue */

        setTimeout(() => {

            goToScene(3);

        }, 1000);

    });

}


/* =========================================================
   🎁 LITTLE GIFT
========================================================= */

const littleGift =
    document.getElementById("littleGift");

let giftOpened = false;


if (littleGift) {

    littleGift.addEventListener("click", () => {

        if (giftOpened) {
            return;
        }

        giftOpened = true;


        /* ---------------------------------------------
           Open gift
        --------------------------------------------- */

        littleGift.classList.add(
            "opening"
        );


        /* ---------------------------------------------
           First magical burst
        --------------------------------------------- */

        setTimeout(() => {

            createParticleBurst(

                window.innerWidth / 2,

                window.innerHeight / 2,

                100

            );

        }, 200);


        /* ---------------------------------------------
           Second burst from the gift
        --------------------------------------------- */

        setTimeout(() => {

            createParticleBurst(

                window.innerWidth / 2,

                window.innerHeight / 2 - 45,

                60

            );

        }, 450);


        /* ---------------------------------------------
           Third tiny sparkle burst
        --------------------------------------------- */

        setTimeout(() => {

            createParticleBurst(

                window.innerWidth / 2,

                window.innerHeight / 2 - 80,

                25

            );

        }, 700);


        /* ---------------------------------------------
           Move to envelope
        --------------------------------------------- */

        setTimeout(() => {

            goToScene(4);

        }, 1450);

    });

}


/* =========================================================
   💌 ENVELOPE
========================================================= */

const letterButton =
    document.getElementById("letterButton");

const envelope =
    document.getElementById("luxuryEnvelope");


if (letterButton && envelope) {

    letterButton.addEventListener("click", () => {

        /* Envelope animation */

        envelope.classList.add(
            "opening"
        );


        /* Magical particles */

        createParticleBurst(

            window.innerWidth / 2,

            window.innerHeight / 2,

            55

        );


        /* Open letter */

        setTimeout(() => {

            goToScene(5);

        }, 1100);

    });

}


/* =========================================================
   💌 LETTER → FINAL
========================================================= */

const finalButton =
    document.getElementById("finalButton");


if (finalButton) {

    finalButton.addEventListener("click", () => {

        goToScene(6);


        /* Start fireworks */

        setTimeout(() => {

            launchFireworks();

        }, 700);


        /* Celebration particles */

        setTimeout(() => {

            createParticleBurst(

                window.innerWidth / 2,

                window.innerHeight / 2,

                120

            );

        }, 1000);

    });

}


/* =========================================================
   🔄 RESTART
========================================================= */

const restartButton =
    document.getElementById("restartButton");


if (restartButton) {

    restartButton.addEventListener(
        "click",
        () => {

            /* -----------------------------------------
               Reset scene
            ----------------------------------------- */

            scenes[currentScene]
                .classList
                .remove("active");

            currentScene = 0;

            scenes[0]
                .classList
                .add("active");


            /* -----------------------------------------
               Reset gift
            ----------------------------------------- */

            if (littleGift) {

                littleGift.classList.remove(
                    "opening"
                );

                giftOpened = false;

            }


            /* -----------------------------------------
               Reset magic star
            ----------------------------------------- */

            if (magicStar) {

                magicStar.classList.remove(
                    "used"
                );

                magicStar.style.transform =
                    "";

                magicStar.style.opacity =
                    "";

                magicStar.style.textShadow =
                    "";

            }


            /* -----------------------------------------
               Reset envelope
            ----------------------------------------- */

            if (envelope) {

                envelope.classList.remove(
                    "opening"
                );

            }


            /* -----------------------------------------
               Clear fireworks
            ----------------------------------------- */

            fireworks.length = 0;

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

        }
    );

}


/* =========================================================
   ✨ BACKGROUND PARTICLES
========================================================= */

const particleContainer =
    document.getElementById("particles");


function createBackgroundParticles() {

    if (!particleContainer) {
        return;
    }


    const amount = 55;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("div");


        particle.className =
            "particle";


        /* Random position */

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";


        /* Random size */

        const size =
            1 +
            Math.random() * 3;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";


        /* Random animation */

        particle.style.setProperty(
            "--duration",
            5 +
            Math.random() * 10 +
            "s"
        );


        particle.style.setProperty(
            "--drift",
            -70 +
            Math.random() * 140 +
            "px"
        );


        particle.style.animationDelay =
            -Math.random() * 12 +
            "s";


        particleContainer.appendChild(
            particle
        );

    }

}


createBackgroundParticles();


/* =========================================================
   ✨ PARTICLE BURST
========================================================= */

function createParticleBurst(
    x,
    y,
    amount = 50
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("div");


        /* Position */

        particle.style.position =
            "fixed";

        particle.style.left =
            x + "px";

        particle.style.top =
            y + "px";


        /* Size */

        const size =
            2 +
            Math.random() * 4;


        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";


        particle.style.borderRadius =
            "50%";


        /* Appearance */

        particle.style.background =
            "white";

        particle.style.boxShadow = `
            0 0 8px white,
            0 0 20px rgba(210,190,255,.9)
        `;


        particle.style.pointerEvents =
            "none";

        particle.style.zIndex =
            "999";


        document.body.appendChild(
            particle
        );


        /* Direction */

        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            50 +
            Math.random() *
            210;


        const dx =
            Math.cos(angle) *
            distance;


        const dy =
            Math.sin(angle) *
            distance;


        /* Animation */

        const animation =
            particle.animate(

                [

                    {
                        transform:
                            "translate(-50%, -50%) scale(1)",

                        opacity:
                            1
                    },

                    {

                        transform:
                            `
                            translate(
                                calc(-50% + ${dx}px),
                                calc(-50% + ${dy}px)
                            )
                            scale(0)
                            `,

                        opacity:
                            0

                    }

                ],

                {

                    duration:
                        700 +
                        Math.random() * 800,

                    easing:
                        "cubic-bezier(.15,.75,.25,1)"

                }

            );


        animation.onfinish = () => {

            particle.remove();

        };

    }

}


/* =========================================================
   🎆 FIREWORK CANVAS
========================================================= */

const canvas =
    document.getElementById("fireworks");

const ctx =
    canvas
        ? canvas.getContext("2d")
        : null;


function resizeCanvas() {

    if (!canvas) {
        return;
    }

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   FIREWORK DATA
========================================================= */

let fireworks = [];


/* =========================================================
   CREATE FIREWORK
========================================================= */

function createFirework(
    x,
    y
) {

    if (!ctx) {
        return;
    }


    const particles = [];


    const particleCount = 65;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            1.5 +
            Math.random() *
            5;


        particles.push({

            x: x,

            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:
                60 +
                Math.random() *
                45,

            size:
                1 +
                Math.random() *
                2

        });

    }


    fireworks.push(
        particles
    );

}


/* =========================================================
   FIREWORK ANIMATION
========================================================= */

function animateFireworks() {

    if (!ctx || !canvas) {
        return;
    }


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    fireworks.forEach(
        (
            firework,
            fireworkIndex
        ) => {


            firework.forEach(
                (
                    particle,
                    particleIndex
                ) => {


                    /* Movement */

                    particle.x +=
                        particle.vx;

                    particle.y +=
                        particle.vy;


                    /* Gravity */

                    particle.vy +=
                        0.035;


                    /* Air resistance */

                    particle.vx *=
                        0.99;


                    particle.life--;


                    /* Draw */

                    ctx.beginPath();


                    ctx.arc(

                        particle.x,

                        particle.y,

                        particle.size,

                        0,

                        Math.PI * 2

                    );


                    const opacity =
                        Math.max(
                            0,
                            particle.life / 105
                        );


                    ctx.fillStyle =
                        `rgba(
                            255,
                            255,
                            255,
                            ${opacity}
                        )`;


                    ctx.shadowBlur =
                        12;

                    ctx.shadowColor =
                        "white";


                    ctx.fill();


                    /* Remove dead particle */

                    if (
                        particle.life <= 0
                    ) {

                        firework.splice(
                            particleIndex,
                            1
                        );

                    }

                }
            );


            /* Remove empty firework */

            if (
                firework.length === 0
            ) {

                fireworks.splice(
                    fireworkIndex,
                    1
                );

            }

        }
    );


    requestAnimationFrame(
        animateFireworks
    );

}


animateFireworks();


/* =========================================================
   🎆 FIREWORK SHOW
========================================================= */

function launchFireworks() {

    if (!canvas) {
        return;
    }


    const numberOfFireworks = 10;


    for (
        let i = 0;
        i < numberOfFireworks;
        i++
    ) {

        setTimeout(
            () => {

                createFirework(

                    80 +
                    Math.random() *
                    (
                        window.innerWidth - 160
                    ),

                    80 +
                    Math.random() *
                    (
                        window.innerHeight * .55
                    )

                );

            },

            i * 450

        );

    }

}


/* =========================================================
   ✦ FINAL SCENE AMBIENCE
========================================================= */

setInterval(
    () => {

        if (
            currentScene === 6
        ) {

            createParticleBurst(

                Math.random() *
                window.innerWidth,

                Math.random() *
                window.innerHeight,

                3

            );

        }

    },

    800
);


/* =========================================================
   ⌨️ KEYBOARD NAVIGATION
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {


        /* Right arrow */

        if (
            event.key === "ArrowRight"
        ) {

            if (
                currentScene <
                scenes.length - 1
            ) {

                goToScene(
                    currentScene + 1
                );

            }

        }


        /* Left arrow */

        if (
            event.key === "ArrowLeft"
        ) {

            if (
                currentScene > 0
            ) {

                goToScene(
                    currentScene - 1
                );

            }

        }

    }
);


/* =========================================================
   🖱️ OPTIONAL: CLICK BACKGROUND FOR TINY SPARKLE
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        /*
         * Don't create extra particles when
         * clicking buttons or interactive elements.
         */

        if (
            event.target.closest(
                "button, .little-gift, .magic-star, .luxury-envelope"
            )
        ) {
            return;
        }


        /* Very subtle */

        if (
            Math.random() > .65
        ) {

            createParticleBurst(
                event.clientX,
                event.clientY,
                5
            );

        }

    }
);