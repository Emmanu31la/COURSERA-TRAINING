let isMuted = false;
let is2Hour = true; //Default Time Format

const muteBtn = document.getElementById("mute-btn");
const formatBtn = document.getElementById("format-btn");


muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    muteBtn.innerText = isMuted ? "🔇 Muted" : "🔊 Sound On";
});

formatBtn.addEventListener("click", () => {
    is2Hour = !is2Hour;
    formatBtn.innerText = is2Hour ? "Switch to 12H Format" : "Switch to 24H Format";
});

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = ""; //Hold Am or Pm

    if (!is2Hour) {
        ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
    }

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10? "0" + minutes : minutes;
    seconds = seconds < 10? "0" + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds}${ampm}`;

    document.getElementById("clock-display").innerText = timeString;
    const tick = document.getElementById("tick-sound");
    if (!isMuted) {
    tick.currentTime = 0;
    tick.play().catch(error => {
        console.log("Waiting for thr user to click the page to enable sound...");
    });
    }
}

setInterval(updateClock, 1000);
updateClock();

const themeSelect = document.getElementById('theme-select');

//this object stores al color math for each theme
const themes = {
    pink: {
        '--bg-color': '#ffdae9',
        '--dot-color': '#ffb6c1',
        '--container-bg': '#ff1493',
        '--button-bg': '#ff69b4'
    },
    blue: {
        '--bg-color': '#e0f7fa',
        '--dot-color': '#b2ebf2',
        '--container-bg': '#00bcd4',
        '--button-bg': '#4dd0e1'
    },
    black: {
        '--bg-color': '#1a1a1a',
        '--dot-color': '#333333',
        '--container-bg': '#000000',
        '--button-bg': '#444444'
    },
    red: {
        '--bg-color': '#fd415dff',
        '--dot-color': '#c5081bff',
        '--container-bg': '#d32f2f',
        '--button-bg': '#f44336'
    },
    purple: {
        '--bg-color': '#f3e5f5',
        '--dot-color': '#e1bee7',
        '--container-bg': '#6a1b9a',
        '--button-bg': '#9c27b0'
    },
};

themeSelect.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    const colors = themes[selectedTheme];

    // Loop through each color in the theme and update the CSS Variables
    for (const variable in colors) {
        document.documentElement.style.setProperty(variable, colors[variable]);
    }
});