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
   SCENE TRANSITION
========================================================= */

function goToScene(index) {

    if (
        index < 0 ||
        index >= scenes.length
    ) {
        return;
    }


    if (
        index === currentScene ||
        changingScene
    ) {
        return;
    }


    changingScene = true;


    if (scenes[currentScene]) {

        scenes[currentScene]
            .classList
            .remove("active");

    }


    setTimeout(() => {

        currentScene = index;


        if (scenes[currentScene]) {

            scenes[currentScene]
                .classList
                .add("active");

        }


        changingScene = false;

    }, 350);

}



/* =========================================================
   PARTICLE SYSTEM
========================================================= */

const particleContainer =
    document.getElementById("particles");



/* =========================================================
   BACKGROUND PARTICLES
========================================================= */

function createBackgroundParticles() {

    if (!particleContainer) {
        return;
    }


    const amount =
        window.innerWidth < 600
            ? 38
            : 65;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("div");


        particle.className =
            "particle";


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.top =
            Math.random() * 100 + "%";


        const size =
            1 +
            Math.random() * 3;


        particle.style.width =
            size + "px";


        particle.style.height =
            size + "px";


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
   ✨ CINEMATIC PARTICLE BURST
========================================================= */

function createParticleBurst(
    x,
    y,
    amount = 50,
    options = {}
) {

    const colors = options.colors || [

        "#ffffff",
        "#fff2c7",
        "#eadcff",
        "#d9c9ff",
        "#ffe3a7"

    ];


    const spread =
        options.spread || 220;


    const durationMin =
        options.durationMin || 700;


    const durationMax =
        options.durationMax || 1500;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("div");


        const color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        const size =
            2 +
            Math.random() * 4;


        particle.style.position =
            "fixed";


        particle.style.left =
            x + "px";


        particle.style.top =
            y + "px";


        particle.style.width =
            size + "px";


        particle.style.height =
            size + "px";


        particle.style.borderRadius =
            "50%";


        particle.style.background =
            color;


        particle.style.boxShadow = `

            0 0 8px ${color},

            0 0 18px ${color},

            0 0 35px rgba(210,190,255,.7)

        `;


        particle.style.pointerEvents =
            "none";


        particle.style.zIndex =
            "9999";


        document.body.appendChild(
            particle
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            45 +
            Math.random() *
            spread;


        const dx =
            Math.cos(angle) *
            distance;


        const dy =
            Math.sin(angle) *
            distance;


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
                        durationMin +
                        Math.random() *
                        (
                            durationMax -
                            durationMin
                        ),

                    easing:
                        "cubic-bezier(.15,.75,.25,1)",

                    fill:
                        "forwards"

                }

            );


        animation.onfinish = () => {

            particle.remove();

        };

    }

}



/* =========================================================
   GET CENTER OF ELEMENT
========================================================= */

function getElementCenter(element) {

    if (!element) {

        return {

            x:
                window.innerWidth / 2,

            y:
                window.innerHeight / 2

        };

    }


    const rect =
        element.getBoundingClientRect();


    return {

        x:
            rect.left +
            rect.width / 2,

        y:
            rect.top +
            rect.height / 2

    };

}



/* =========================================================
   SCENE 1 → 2
========================================================= */

const beginButton =
    document.getElementById("beginButton");


if (beginButton) {

    beginButton.addEventListener(
        "click",
        () => {

            createParticleBurst(

                window.innerWidth / 2,

                window.innerHeight / 2,

                35

            );


            goToScene(1);

        }
    );

}



/* =========================================================
   SCENE 2 → 3
========================================================= */

const journeyButton =
    document.getElementById("journeyButton");


if (journeyButton) {

    journeyButton.addEventListener(
        "click",
        () => {

            createParticleBurst(

                window.innerWidth / 2,

                window.innerHeight / 2,

                35

            );


            goToScene(2);

        }
    );

}



/* =========================================================
   ✦ MAGIC STAR
========================================================= */

const magicStar =
    document.getElementById("magicStar");


let starUsed = false;


function activateMagicStar() {

    if (
        !magicStar ||
        starUsed
    ) {
        return;
    }


    starUsed = true;


    const position =
        getElementCenter(
            magicStar
        );


    createParticleBurst(

        position.x,

        position.y,

        90,

        {

            spread:
                240,

            durationMin:
                700,

            durationMax:
                1400

        }

    );


    magicStar.classList.add(
        "used"
    );


    magicStar.style.transform =
        "scale(1.8) rotate(180deg)";


    magicStar.style.textShadow = `

        0 0 15px white,

        0 0 35px white,

        0 0 70px #c9b7ff,

        0 0 120px #9d82ff

    `;


    setTimeout(() => {

        magicStar.style.transform =
            "scale(0) rotate(360deg)";

        magicStar.style.opacity =
            "0";

    }, 500);


    setTimeout(() => {

        goToScene(3);

    }, 1000);

}


if (magicStar) {

    magicStar.addEventListener(
        "click",
        activateMagicStar
    );


    magicStar.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                activateMagicStar();

            }

        }
    );

}



/* =========================================================
   🎁 LITTLE GIFT
========================================================= */

const littleGift =
    document.getElementById("littleGift");


let giftOpened = false;



/* ---------------------------------------------------------
   GIFT PARTICLE EXPLOSION
--------------------------------------------------------- */

function giftBurst(
    amount,
    spread
) {

    if (!littleGift) {
        return;
    }


    const position =
        getElementCenter(
            littleGift
        );


    createParticleBurst(

        position.x,

        position.y,

        amount,

        {

            spread:
                spread,

            colors: [

                "#ffffff",
                "#fff3c4",
                "#eadcff",
                "#d7c5ff",
                "#ffe1a3"

            ],

            durationMin:
                650,

            durationMax:
                1450

        }

    );

}



/* ---------------------------------------------------------
   OPEN GIFT
--------------------------------------------------------- */

function openLittleGift() {

    if (
        !littleGift ||
        giftOpened
    ) {
        return;
    }


    giftOpened = true;


    littleGift.setAttribute(
        "aria-disabled",
        "true"
    );


    littleGift.classList.add(
        "opening"
    );


    /* -----------------------------------------
       FIRST BURST
    ----------------------------------------- */

    setTimeout(() => {

        giftBurst(
            120,
            210
        );

    }, 170);



    /* -----------------------------------------
       SECOND BURST
    ----------------------------------------- */

    setTimeout(() => {

        giftBurst(
            85,
            180
        );

    }, 390);



    /* -----------------------------------------
       THIRD — VERTICAL MAGIC
    ----------------------------------------- */

    setTimeout(() => {

        if (!littleGift) {
            return;
        }


        const position =
            getElementCenter(
                littleGift
            );


        createParticleBurst(

            position.x,

            position.y - 55,

            55,

            {

                spread:
                    145,

                colors: [

                    "#ffffff",
                    "#fff5d0",
                    "#dfc8ff"

                ],

                durationMin:
                    800,

                durationMax:
                    1600

            }

        );

    }, 610);



    /* -----------------------------------------
       FINAL FLASH
    ----------------------------------------- */

    setTimeout(() => {

        giftBurst(
            35,
            120
        );

    }, 820);



    /* -----------------------------------------
       GO TO ENVELOPE
    ----------------------------------------- */

    setTimeout(() => {

        goToScene(4);

    }, 1550);

}



/* ---------------------------------------------------------
   MOUSE + TOUCH
--------------------------------------------------------- */

if (littleGift) {

    littleGift.addEventListener(
        "click",
        openLittleGift
    );


    /* -----------------------------------------
       ENTER / SPACE
    ----------------------------------------- */

    littleGift.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openLittleGift();

            }

        }
    );

}



/* =========================================================
   💌 ENVELOPE
========================================================= */

const letterButton =
    document.getElementById("letterButton");


const envelope =
    document.getElementById("luxuryEnvelope");


let envelopeOpened = false;


function openEnvelope() {

    if (
        !envelope ||
        envelopeOpened
    ) {
        return;
    }


    envelopeOpened = true;


    envelope.classList.add(
        "opening"
    );


    const position =
        getElementCenter(
            envelope
        );


    createParticleBurst(

        position.x,

        position.y,

        60,

        {

            spread:
                190

        }

    );


    setTimeout(() => {

        goToScene(5);

    }, 1100);

}


if (
    letterButton &&
    envelope
) {

    letterButton.addEventListener(
        "click",
        openEnvelope
    );

}



/* =========================================================
   💌 LETTER → FINAL
========================================================= */

const finalButton =
    document.getElementById("finalButton");


if (finalButton) {

    finalButton.addEventListener(
        "click",
        () => {

            goToScene(6);


            setTimeout(() => {

                launchFireworks();

            }, 700);


            setTimeout(() => {

                createParticleBurst(

                    window.innerWidth / 2,

                    window.innerHeight / 2,

                    120,

                    {

                        spread:
                            320

                    }

                );

            }, 1000);

        }
    );

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


            /* Scene */

            if (scenes[currentScene]) {

                scenes[currentScene]
                    .classList
                    .remove("active");

            }


            currentScene = 0;


            if (scenes[0]) {

                scenes[0]
                    .classList
                    .add("active");

            }


            changingScene = false;



            /* Gift */

            if (littleGift) {

                littleGift.classList.remove(
                    "opening"
                );


                littleGift.removeAttribute(
                    "aria-disabled"
                );

            }


            giftOpened = false;



            /* Star */

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


            starUsed = false;



            /* Envelope */

            if (envelope) {

                envelope.classList.remove(
                    "opening"
                );

            }


            envelopeOpened = false;



            /* Fireworks */

            fireworks.length = 0;


            if (
                ctx &&
                canvas
            ) {

                ctx.clearRect(

                    0,

                    0,

                    canvas.width,

                    canvas.height

                );

            }

        }
    );

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


    const ratio =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvas.width =
        window.innerWidth *
        ratio;


    canvas.height =
        window.innerHeight *
        ratio;


    canvas.style.width =
        window.innerWidth + "px";


    canvas.style.height =
        window.innerHeight + "px";


    if (ctx) {

        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );

    }

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


    const particleCount =
        window.innerWidth < 600
            ? 45
            : 65;


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
            Math.random() * 5;


        particles.push({

            x:
                x,

            y:
                y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:
                60 +
                Math.random() * 45,

            size:
                1 +
                Math.random() * 2

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

    if (
        !ctx ||
        !canvas
    ) {
        return;
    }


    ctx.clearRect(

        0,

        0,

        window.innerWidth,

        window.innerHeight

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


                    particle.x +=
                        particle.vx;


                    particle.y +=
                        particle.vy;


                    particle.vy +=
                        .035;


                    particle.vx *=
                        .99;


                    particle.life--;


                    const opacity =
                        Math.max(
                            0,
                            particle.life / 105
                        );


                    ctx.beginPath();


                    ctx.arc(

                        particle.x,

                        particle.y,

                        particle.size,

                        0,

                        Math.PI * 2

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


    const numberOfFireworks =
        window.innerWidth < 600
            ? 7
            : 10;


    for (
        let i = 0;
        i < numberOfFireworks;
        i++
    ) {

        setTimeout(
            () => {

                const horizontalPadding =
                    window.innerWidth < 600
                        ? 40
                        : 80;


                createFirework(

                    horizontalPadding +
                    Math.random() *
                    (
                        window.innerWidth -
                        horizontalPadding * 2
                    ),


                    70 +
                    Math.random() *
                    (
                        window.innerHeight *
                        .55
                    )

                );

            },

            i * 450

        );

    }

}



/* =========================================================
   ✨ FINAL SCENE AMBIENCE
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

                3,

                {

                    spread:
                        80,

                    durationMin:
                        900,

                    durationMax:
                        1500

                }

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
    event => {


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
   🖱️ BACKGROUND SPARKLE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.closest(
                "button, .little-gift, .magic-star, .luxury-envelope"
            )
        ) {

            return;

        }


        if (
            Math.random() > .65
        ) {

            createParticleBurst(

                event.clientX,

                event.clientY,

                5,

                {

                    spread:
                        60,

                    durationMin:
                        500,

                    durationMax:
                        900

                }

            );

        }

    }
);



/* =========================================================
   READY
========================================================= */

console.log(
    "🌙 A Little Universe — cinematic birthday experience ready."
);

console.log(
    "🎁 Gift interaction loaded."
);

console.log(
    "💌 Envelope interaction loaded."
);

console.log(
    "🎆 Fireworks loaded."
);
