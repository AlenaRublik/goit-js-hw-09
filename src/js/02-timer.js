import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('.value[data-days]'),
  dataHours: document.querySelector('.value[data-hours]'),
  dataMinutes: document.querySelector('.value[data-minutes]'),
dataSeconds: document.querySelector('.value[data-seconds]'),
};


let selectedData = null;

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
          window.alert("Please choose a date in the future");
      } else {
          refs.startBtn.disabled = false;
          selectedData = selectedDates[0];
      }
  },
};

flatpickr("input#datetime-picker", options);

refs.startBtn.addEventListener('click', handleStartTimer);

// console.log(flatpickr);




function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}