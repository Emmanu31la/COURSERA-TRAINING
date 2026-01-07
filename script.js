// 1. State Variables
let isMuted = false;
let is2Hour = true; 

// 2. Theme Data Object
const themes = {
    pink: {
        '--bg-color': '#ffdae9',
        '--dot-color': '#ffb6c1',
        '--container-bg': '#ff1493',
        '--button-bg': '#ff69b4',
        '--text-color': '#ffffff',
        '--mute-bg-color': '#ff69b4',
        '--mute-btn-hover-bg': '#ff1493',
        '--format-btn-bg': '#ff69b4',
        '--format-btn-hover-bg': '#ff1389'
    },
    blue: {
        '--bg-color': '#e0f7fa',
        '--dot-color': '#b2ebf2',
        '--container-bg': '#00bcd4',
        '--button-bg': '#4dd0e1',
        '--text-color': '#ffffff',
        '--mute-bg-color': '#4dd0e1',
        '--mute-btn-hover-bg': '#0793a5',
        '--format-btn-bg': '#4dd0e1',
        '--format-btn-hover-bg': '#0793a5'
    },
    black: {
        '--bg-color': '#1a1a1a',
        '--dot-color': '#333333',
        '--container-bg': '#000000',
        '--button-bg': '#444444',
        '--text-color': '#ebebeb',
        '--mute-bg-color': '#444444',
        '--mute-btn-hover-bg': '#222222',
        '--format-btn-bg': '#444444',
        '--format-btn-hover-bg': '#222222'
    },
    red: {
        '--bg-color': '#fd415d',
        '--dot-color': '#c5081b',
        '--container-bg': '#d32f2f',
        '--button-bg': '#f44336',
        '--text-color': '#ffc3c3',
        '--mute-bg-color': '#f44336',
        '--mute-btn-hover-bg': '#b71c1c',
        '--format-btn-bg': '#f44336',
        '--format-btn-hover-bg': '#b91e1e'
    },
    purple: {
        '--bg-color': '#e984f8',
        '--dot-color': '#873196',
        '--container-bg': '#6a1b9a',
        '--button-bg': '#9c27b0',
        '--text-color': '#d2bbfd',
        '--mute-bg-color': '#9c27b0',
        '--mute-btn-hover-bg': '#4a148c',
        '--format-btn-bg': '#9c27b0',
        '--format-btn-hover-bg': '#6a1b9a'
    }
};

// 3. Element Selectors
const muteBtn = document.getElementById("mute-btn");
const formatBtn = document.getElementById("format-btn");
const themeSelect = document.getElementById('theme-select');
const tick = document.getElementById("tick-sound");

// 4. Helper Function: Apply Theme
// We put this here so both the dropdown and the page-load can use it
function applyTheme(themeName) {
    const colors = themes[themeName];
    if (colors) {
        for (const variable in colors) {
            document.documentElement.style.setProperty(variable, colors[variable]);
        }
    }
}

// 5. Main Clock Logic
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = "";

    if (!is2Hour) {
        ampm = hours >= 12 ? " PM" : " AM";
        hours = hours % 12 || 12; 
    }

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("clock-display").innerText = `${hours}:${minutes}:${seconds}${ampm}`;

    if (!isMuted) {
        tick.currentTime = 0;
        tick.play().catch(() => {});
    }
}

// 6. Event Listeners
muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    muteBtn.innerText = isMuted ? "🔇 Muted" : "🔊 Sound On";
});

formatBtn.addEventListener("click", () => {
    is2Hour = !is2Hour;
    formatBtn.innerText = is2Hour ? "Switch to 12H Format" : "Switch to 24H Format";
});

themeSelect.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    applyTheme(selectedTheme);
    localStorage.setItem('user-theme', selectedTheme);
});

// 7. Initialization (Run when page opens)
setInterval(updateClock, 1000);
updateClock();

// THE LOCALSTORAGE CHECK:
const savedTheme = localStorage.getItem('user-theme');
if (savedTheme) {
    applyTheme(savedTheme);
    themeSelect.value = savedTheme;
}