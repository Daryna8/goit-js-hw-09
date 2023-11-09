import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  setIntervalId: null,

  onClose(selectedDates) {
    if (selectedDates.length > 0) {
      const selectedDate = selectedDates[0];

      if (selectedDate < new Date()) {
        Notify.failure('Please choose a date in the future');
        // window.alert('Please choose a date in the future');
      } else {
        refs.startBtn.disabled = false;
        options.stop();
        options.start();
      }
    }
  },

  onChange(selectedDates) {
    if (selectedDates.length > 0 && selectedDates[0] > new Date()) {
      refs.startBtn.disabled = false;
    } else {
      refs.startBtn.disabled = true;
    }
  },

  start() {
    this.setIntervalId = setInterval(() => {
      const currentDate = new Date();
      const selectedDate = flatpickr.parseDate(refs.inputEl.value);
      const msDifference = selectedDate - currentDate;

      if (msDifference <= 0) {
        options.stop();
      } else {
        updateTimerDisplay(msDifference);
      }
    }, 1000);
  },

  stop() {
    clearInterval(this.setIntervalId);
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick(event) {
  options.start();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay(ms) {
  const time = convertMs(ms);

  refs.days.textContent = addLeadingZero(time.days);
  refs.hours.textContent = addLeadingZero(time.hours);
  refs.minutes.textContent = addLeadingZero(time.minutes);
  refs.seconds.textContent = addLeadingZero(time.seconds);
}
