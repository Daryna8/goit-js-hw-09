const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    bodyElem: document.querySelector('body')
};

    refs.startBtn.addEventListener('click', onStartBtnClick);
    refs.stopBtn.addEventListener('click', onStopBtnClick);
    
  function onStartBtnClick(event) {
      colorSwitcher.start();
}
  function onStopBtnClick(event) {
    colorSwitcher.stop();
}

const colorSwitcher = {
    setIntervalId: null,

    start() {
        refs.startBtn.disabled = true;
        refs.stopBtn.disabled = false;

        this.setIntervalId = setInterval(() => {
      this.change();
    }, 1000);
    },

    stop() {
        clearInterval(this.setIntervalId);
        refs.stopBtn.disabled = true;
        refs.startBtn.disabled = false;
    },

    change() {
        refs.bodyElem.style.backgroundColor = getRandomHexColor();
    }
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}