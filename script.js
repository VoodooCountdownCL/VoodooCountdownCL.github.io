// =========================================
// VOODOO COUNTDOWN
// SCRIPT LIMPIO Y UNIFICADO
// =========================================


// =========================================
// CONFIGURACIÓN
// =========================================

// 7 de diciembre de 2026 - 21:00 Chile
const concertDate =
    new Date(2026, 11, 7, 21, 0, 0).getTime();


// =========================================
// FONDOS DEL HERO
// =========================================

const backgroundLayer =
    document.getElementById("backgroundLayer");


const images = [

    "assets/images/kidd1.jpg",
    "assets/images/kidd2.jpg",
    "assets/images/kidd3.jpg",
    "assets/images/kidd4.jpg",
    "assets/images/kidd5.jpg",
    "assets/images/kidd6.jpg"

];


let currentImage = 0;


// Precargar imágenes
images.forEach(src => {

    const img = new Image();

    img.src = src;

});


// =========================================
// CAMBIAR FONDO
// =========================================

function changeBackground() {

    if (!backgroundLayer) {
        return;
    }


    backgroundLayer.classList.add("fade");


    setTimeout(() => {

        currentImage++;


        if (currentImage >= images.length) {

            currentImage = 0;

        }


        backgroundLayer.style.backgroundImage =
            `url("${images[currentImage]}")`;


        backgroundLayer.classList.remove("fade");

    }, 1200);

}


setInterval(
    changeBackground,
    6000
);


// =========================================
// FORMATO DE NÚMEROS
// =========================================

function formatNumber(number) {

    return number < 10
        ? "0" + number
        : String(number);

}


// =========================================
// ANIMACIÓN DEL CONTADOR
// =========================================
//
// El número actual sale hacia arriba.
// El nuevo número entra desde abajo.
//
// Además la casilla hace un pequeño
// destello azul al cambiar.
// =========================================

function animateCounterNumber(
    element,
    newValue,
    type
) {

    if (!element) {
        return;
    }


    const newText =
        String(newValue);


    const oldText =
        element.textContent;


    // Si no cambió, no hacemos nada
    if (oldText === newText) {
        return;
    }


    // Evitar acumulación de animaciones
    if (element._counterAnimation) {

        element._counterAnimation.cancel();

    }


    const box =
        element.closest(".time-box");


    const settings = {

        days: {
            duration: 750,
            distance: 42,
            scale: 1.08,
            glow: "0 0 42px rgba(0, 150, 255, 0.9)"
        },

        hours: {
            duration: 620,
            distance: 38,
            scale: 1.07,
            glow: "0 0 36px rgba(0, 150, 255, 0.82)"
        },

        minutes: {
            duration: 480,
            distance: 30,
            scale: 1.05,
            glow: "0 0 30px rgba(0, 150, 255, 0.72)"
        },

        seconds: {
            duration: 300,
            distance: 20,
            scale: 1.035,
            glow: "0 0 23px rgba(0, 150, 255, 0.65)"
        }

    };


    const config =
        settings[type] || settings.seconds;


    // =====================================
    // SALIDA DEL NÚMERO ACTUAL
    // =====================================

    const exitAnimation =
        element.animate(

            [
                {
                    transform:
                        "translateY(0) scale(1)",

                    opacity: 1,

                    filter:
                        "blur(0px)"
                },

                {
                    transform:
                        `translateY(-${config.distance}px) scale(0.94)`,

                    opacity: 0,

                    filter:
                        "blur(4px)"
                }

            ],

            {
                duration:
                    config.duration * 0.42,

                easing:
                    "cubic-bezier(.65,0,.84,.25)",

                fill:
                    "forwards"
            }

        );


    // =====================================
    // BRILLO DE LA CASILLA
    // =====================================

    if (box) {

        box.animate(

            [

                {
                    transform:
                        "scale(1)",

                    boxShadow:
                        "0 12px 35px rgba(0, 0, 0, 0.35)"
                },

                {
                    transform:
                        `scale(${config.scale})`,

                    boxShadow:
                        `${config.glow}, inset 0 0 18px rgba(0, 150, 255, 0.12)`
                },

                {
                    transform:
                        "scale(1)",

                    boxShadow:
                        "0 12px 35px rgba(0, 0, 0, 0.35)"
                }

            ],

            {

                duration:
                    config.duration,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"

            }

        );

    }


    // =====================================
    // CUANDO SALE EL ANTIGUO
    // ENTRA EL NUEVO
    // =====================================

    exitAnimation.finished
        .then(() => {

            element.textContent =
                newText;


            // Posición inicial del nuevo
            element.style.opacity = "0";


            element.style.transform =
                `translateY(${config.distance}px) scale(0.94)`;


            element.style.filter =
                "blur(4px)";


            // =================================
            // ENTRADA DEL NUEVO
            // =================================

            const enterAnimation =
                element.animate(

                    [

                        {
                            transform:
                                `translateY(${config.distance}px) scale(0.94)`,

                            opacity: 0,

                            filter:
                                "blur(4px)"
                        },

                        {
                            transform:
                                "translateY(-4px) scale(1.05)",

                            opacity: 1,

                            filter:
                                "blur(0px)"
                        },

                        {
                            transform:
                                "translateY(0) scale(1)",

                            opacity: 1,

                            filter:
                                "blur(0px)"
                        }

                    ],

                    {

                        duration:
                            config.duration * 0.58,

                        easing:
                            "cubic-bezier(.2,.8,.2,1)",

                        fill:
                            "forwards"

                    }

                );


            element._counterAnimation =
                enterAnimation;


            enterAnimation.finished
                .then(() => {

                    element.style.opacity = "";
                    element.style.transform = "";
                    element.style.filter = "";

                    element._counterAnimation =
                        null;

                })
                .catch(() => {});

        })
        .catch(() => {});

}


// =========================================
// CONTADOR PRINCIPAL
// =========================================

function updateCountdown() {

    const now =
        new Date().getTime();


    const distance = concertDate - now;

    // =====================================
    // ELEMENTOS PRINCIPALES
    // =====================================

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    // =====================================
    // ELEMENTOS FLOTANTES
    // =====================================

    const floatDays =
        document.getElementById("floatDays");

    const floatHours =
        document.getElementById("floatHours");

    const floatMinutes =
        document.getElementById("floatMinutes");

    const floatSeconds =
        document.getElementById("floatSeconds");


    // =====================================
    // SI YA LLEGÓ EL CONCIERTO
    // =====================================

   if (distance <= 0) {
    if (daysElement) daysElement.textContent = "00";
    if (hoursElement) hoursElement.textContent = "00";
    if (minutesElement) minutesElement.textContent = "00";
    if (secondsElement) secondsElement.textContent = "00";

    if (floatDays) floatDays.textContent = "00";
    if (floatHours) floatHours.textContent = "00";
    if (floatMinutes) floatMinutes.textContent = "00";
    if (floatSeconds) floatSeconds.textContent = "00";

    const countdown = document.querySelector(".countdown");

    if (countdown) {
        countdown.classList.add("post-concert-countdown");
    }

    const countdownCaption =
    document.querySelector(".countdown-caption");

if (countdownCaption) {
    countdownCaption.style.display = "none";
}

    const postConcertMessage =
        document.getElementById("postConcertMessage");

    if (postConcertMessage) {
        postConcertMessage.classList.add("active");
    }

    return;
}

    // =====================================
    // CALCULAR TIEMPO
    // =====================================

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    // =====================================
    // ACTUALIZAR CONTADOR PRINCIPAL
    // =====================================

    animateCounterNumber(
        daysElement,
        days,
        "days"
    );


    animateCounterNumber(
        hoursElement,
        formatNumber(hours),
        "hours"
    );


    animateCounterNumber(
        minutesElement,
        formatNumber(minutes),
        "minutes"
    );


    animateCounterNumber(
        secondsElement,
        formatNumber(seconds),
        "seconds"
    );


    // =====================================
    // CONTADOR FLOTANTE
    // =====================================

    if (floatDays) {

        floatDays.textContent =
            days;

    }


    if (floatHours) {

        floatHours.textContent =
            formatNumber(hours);

    }


    if (floatMinutes) {

        floatMinutes.textContent =
            formatNumber(minutes);

    }


    if (floatSeconds) {

        floatSeconds.textContent =
            formatNumber(seconds);

    }

}


// =========================================
// CONTADOR FLOTANTE
// =========================================

const floatingCountdown =
    document.getElementById(
        "floatingCountdown"
    );


function updateFloatingCountdown() {

    if (!floatingCountdown) {
        return;
    }


    const scrollY =
        window.scrollY;


    if (
        scrollY >
        window.innerHeight * 0.65
    ) {

        floatingCountdown.classList.add(
            "visible"
        );

    } else {

        floatingCountdown.classList.remove(
            "visible"
        );

    }

}


window.addEventListener(
    "scroll",
    updateFloatingCountdown,
    { passive: true }
);


// =========================================
// ANIMACIONES AL HACER SCROLL
// =========================================

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


const revealSections =
    document.querySelectorAll(
        ".reveal-section"
    );


revealSections.forEach(section => {

    observer.observe(section);

});


const revealItems =
    document.querySelectorAll(
        ".reveal-item"
    );


revealItems.forEach(item => {

    observer.observe(item);

});


// =========================================
// BIOGRAFÍA — GALERÍA
// =========================================

const bioImages =
    document.querySelectorAll(
        ".bio-image"
    );


const dots =
    document.querySelectorAll(
        ".dot"
    );


let bioIndex = 0;


function changeBioImage() {

    if (!bioImages.length) {
        return;
    }


    bioImages.forEach(image => {

        image.classList.remove(
            "active"
        );

    });


    dots.forEach(dot => {

        dot.classList.remove(
            "active"
        );

    });


    bioIndex++;


    if (
        bioIndex >=
        bioImages.length
    ) {

        bioIndex = 0;

    }


    bioImages[bioIndex]
        .classList.add(
            "active"
        );


    if (dots[bioIndex]) {

        dots[bioIndex]
            .classList.add(
                "active"
            );

    }

}


if (bioImages.length > 1) {

    setInterval(
        changeBioImage,
        4500
    );

}


// =========================================
// INICIO
// =========================================

updateCountdown();

updateFloatingCountdown();


setInterval(
    updateCountdown,
    1000
);


// =========================================
// EXPERIENCIA MUSICAL
// =========================================
// Se mantiene por compatibilidad con tu HTML
// antiguo. Como el CSS la oculta, no afecta
// al resto de la página.
// =========================================

const experienceButton =
    document.getElementById(
        "experienceButton"
    );


const experienceStop =
    document.getElementById(
        "experienceStop"
    );


const experienceHint =
    document.getElementById(
        "experienceHint"
    );


const spotifySection =
    document.querySelector(
        ".spotify-section"
    );


const experienceBefore =
    document.getElementById(
        "experienceBefore"
    );


const experienceAfter =
    document.getElementById(
        "experienceAfter"
    );


if (
    experienceButton &&
    experienceStop &&
    spotifySection
) {

    experienceButton.addEventListener(
        "click",
        () => {

            const alreadyWarned =
                experienceButton.dataset.warned === "true";


            // Primera pulsación
            if (!alreadyWarned) {

                experienceButton.dataset.warned =
                    "true";


                if (experienceHint) {

                    experienceHint.textContent =
                        "🎵 Dale play a Spotify y vuelve a tocar el botón.";

                }


                if (experienceBefore) {

                    experienceBefore.classList.remove(
                        "warning"
                    );


                    void experienceBefore.offsetWidth;


                    experienceBefore.classList.add(
                        "warning"
                    );

                }

                return;
            }


            // Activar experiencia antigua
            spotifySection.classList.add(
                "experience-active"
            );


            experienceButton.textContent =
                "⚡ EXPERIENCIA ACTIVADA";

        }
    );


    experienceStop.addEventListener(
        "click",
        () => {

            spotifySection.classList.remove(
                "experience-active"
            );


            if (experienceHint) {

                experienceHint.textContent =
                    "Dale play a Spotify y activa la experiencia.";

            }


            experienceButton.textContent =
                "🎧 ACTIVAR LA EXPERIENCIA";


            experienceButton.dataset.warned =
                "true";

        }
    );

}
// =========================================
// MINI SPOTIFY — CERRAR EN CELULAR
// =========================================

const miniSpotify =
    document.querySelector(".mini-spotify");

const closeMiniSpotify =
    document.getElementById("closeMiniSpotify");


if (miniSpotify && closeMiniSpotify) {

    closeMiniSpotify.addEventListener(
        "click",
        () => {

            miniSpotify.style.display = "none";

        }
    );

}
