
let hours = 0;
let minutes = 0;
let seconds = 0;
let intervalId = null;
let lapCount = 0;
let lapList = document.getElementById('lap-list');
let halfCircle = document.getElementById('half-circle');

document.getElementById('start-btn').addEventListener('click', startStopwatch);
document.getElementById('pause-btn').addEventListener('click', pauseStopwatch);
document.getElementById('reset-btn').addEventListener('click', resetStopwatch);
document.getElementById('lap-btn').addEventListener('click', addLap);

function startStopwatch() {
    intervalId = setInterval(() => {
        seconds++;
        if (seconds >= 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes >= 60) {
            hours++;
            minutes = 0;
        }
        updateDisplay();
        updateHalfCircle();
    }, 1000);
    document.getElementById('start-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;
}

function pauseStopwatch() {
    clearInterval(intervalId);
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
}

function resetStopwatch() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    lapCount = 0;
    lapList.innerHTML = '';
    updateDisplay();
    pauseStopwatch();
    halfCircle.style.transform = 'rotate(180deg)';
}

function addLap() {
    const lapTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const lapListItem = document.createElement('li');
    lapListItem.textContent = `Lap ${lapCount + 1}: ${lapTime}`;
    lapList.appendChild(lapListItem);
    lapCount++;
}

function updateDisplay() {
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

function updateHalfCircle() {
    const progress = (seconds / 60) * 180;
    halfCircle.style.transform = `rotate(${180 + progress}deg)`;
}