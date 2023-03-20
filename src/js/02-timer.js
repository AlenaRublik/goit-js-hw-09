import flatpickr from "flatpickr";

import Notiflix from 'notiflix';

import "flatpickr/dist/flatpickr.min.css";

require("flatpickr/dist/themes/dark.css");

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('.value[data-days]'),
  dataHours: document.querySelector('.value[data-hours]'),
  dataMinutes: document.querySelector('.value[data-minutes]'),
dataSeconds: document.querySelector('.value[data-seconds]'),
};


let selectedData = null;

let timerId = null;

refs.startBtn.disabled = true;

// console.log(startBtn);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (Date.now() > selectedDates[0]) {
          Notiflix.Notify.warning('Please choose a date in the future');
      } else {
          refs.startBtn.disabled = false;
          selectedData = selectedDates[0];
      }
  },
};

flatpickr("input#datetime-picker", options);

refs.startBtn.addEventListener('click', handleStartTimer);


function handleStartTimer() {

    timerId = setInterval(() => {
        const currentTime = Date.now();
        const timer = selectedData - currentTime;
        const timerComponents = convertMs(timer);
        updateClockFace(timerComponents);
        
        if (timer <= 1000) {
            clearInterval(timerId);
        };
    }, 1000)
}

function updateClockFace({ days, hours, minutes, seconds }) {
    refs.dataDays.textContent = `${days}`;
    refs.dataHours.textContent = `${hours}`;
    refs.dataMinutes.textContent = `${minutes}`;
    refs.dataSeconds.textContent = `${seconds}`;
    
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}