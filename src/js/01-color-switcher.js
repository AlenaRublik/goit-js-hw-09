function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startBtn = document.querySelector('button[data-start]');
stopBtn = document.querySelector('button[data-stop]');

let startColor = null;

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);


function start() {
startColor = setInterval(() => {
  const tempColor = getRandomHexColor();
  document.body.style.background = tempColor;
}, 1000);
startBtn.disabled = true;
}

function stop() {
clearInterval(startColor);
startBtn.disabled = false;
}