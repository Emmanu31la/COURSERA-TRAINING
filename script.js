let isMuted = false;
const muteBtn = document.getElementById("mute-btn");
muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    muteBtn.innerText = isMuted ? "🔇 Muted" : "🔊 Soung On";
});

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10? "0" + minutes : minutes;
    seconds = seconds < 10? "0" + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds}`;

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

