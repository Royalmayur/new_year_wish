


const openCard = () => {
    let openCard = document.querySelector('.openCard');
    let openButton = document.querySelector('.cardBtn');
    let photoCube = document.querySelector('.photoCube');
    let wishes = document.querySelector('.wishes');

    let audioWish = new Audio('/music//hapy_new_year.mp3')

    audioWish.play();

    setTimeout(()=>{
        audioWish.pause();
    },18000)
    openButton.style.display = 'none';
    openCard.classList.add('active');

    setTimeout(() => {
        let typedText = document.getElementById('typedText');
        let typewriter = new Typewriter(typedText, {
            loop: false,

        });
        typewriter.typeString('HAPPY NEW YEAR 2023')
            .pauseFor(1500)
            .deleteChars(2)
            .typeString('<strong>24</strong> ')
            .pauseFor(2500).typeString('<i> RICHELLE</i>').start()
    }, 1000)


    setTimeout(()=>{
    // for cube swiper
    photoCube.classList.add('active');
    wishes.classList.add('active');
    var swiper = new Swiper(".mySwiper", {
        effect: "cube",
        grabCursor: true,
        allowTouchMove: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        autoplay: {
            delay: 4000,

        },

        controller: {
            inverse: true,
        }
    });
    },11700)


    
    



}




// for bg firework 
let canva = document.getElementById("canvas");
let ctx = canva.getContext("2d");
let cwidth, cheight;
let shells = [];
let pass = [];

let colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];
reset();
function reset() {

    cwidth = window.innerWidth;
    cheight = window.innerHeight;
    canva.width = cwidth;
    canva.height = cheight;
}

function newShell() {

    let left = (Math.random() > 0.5);
    let shell = {};
    shell.x = (1 * left);
    shell.y = 1;
    shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
    shell.yoff = 0.01 + Math.random() * 0.007;
    shell.size = Math.random() * 6 + 3;
    shell.color = colors[Math.floor(Math.random() * colors.length)];

    shells.push(shell);
}

function newPass(shell) {

    let pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);

    for (i = 0; i < pasCount; i++) {

        let pas = {};
        pas.x = shell.x * cwidth;
        pas.y = shell.y * cheight;

        let a = Math.random() * 4;
        let s = Math.random() * 10;

        pas.xoff = s * Math.sin((5 - a) * (Math.PI / 2));
        pas.yoff = s * Math.sin(a * (Math.PI / 2));

        pas.color = shell.color;
        pas.size = Math.sqrt(shell.size);

        if (pass.length < 1000) { pass.push(pas); }
    }
}

let lastRun = 0;
fireworkRun();
function fireworkRun() {

    let dt = 1;
    if (lastRun != 0) { dt = Math.min(50, (performance.now() - lastRun)); }
    lastRun = performance.now();

    //ctx.clearRect(0, 0, cwidth, cheight);
    ctx.fillStyle = "#140110";
    ctx.fillRect(0, 0, cwidth, cheight);

    if ((shells.length < 10) && (Math.random() > 0.96)) { newShell(); }

    for (let ix in shells) {

        let shell = shells[ix];

        ctx.beginPath();
        ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
        ctx.fillStyle = shell.color;
        ctx.fill();

        shell.x -= shell.xoff;
        shell.y -= shell.yoff;
        shell.xoff -= (shell.xoff * dt * 0.001);
        shell.yoff -= ((shell.yoff + 0.2) * dt * 0.00005);

        if (shell.yoff < -0.005) {
            newPass(shell);
            shells.splice(ix, 1);
        }
    }

    for (let ix in pass) {

        let pas = pass[ix];

        ctx.beginPath();
        ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
        ctx.fillStyle = pas.color;
        ctx.fill();

        pas.x -= pas.xoff;
        pas.y -= pas.yoff;
        pas.xoff -= (pas.xoff * dt * 0.001);
        pas.yoff -= ((pas.yoff + 5) * dt * 0.0005);
        pas.size -= (dt * 0.002 * Math.random())

        if ((pas.y > cheight) || (pas.y < -50) || (pas.size <= 0)) {
            pass.splice(ix, 1);
        }
    }
    requestAnimationFrame(fireworkRun);
}
