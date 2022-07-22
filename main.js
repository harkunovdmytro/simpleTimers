let alarm = new Audio("./alarm.mp3");
alarm.volume = 0.05;
document.body.append(alarm);

class Timer {
  static field = document.getElementById("timers");
  static ids = 0;
  static clearField() {
    this.field.innerHTML = "";
  }
  static getRightTime(timeLeft) {
    let mind = timeLeft % (60 * 60);
    let minutes = Math.floor(mind / 60);

    let secd = mind % 60;
    let seconds = Math.ceil(secd);

    return `${minutes > 9 ? minutes : "0" + minutes}:${
      seconds > 9 ? seconds : "0" + seconds
    }`;
  }
  static getRandomColor() {
    function randomHex() {
      return Number((Math.random() * 255).toFixed(0)).toString(16);
    }
    return `#${randomHex()}${randomHex()}${randomHex()}`;
  }

  render(element, timeLeft) {
    element.innerText = `${Timer.getRightTime(timeLeft)}`;
  }

  constructor(time) {
    let div = document.createElement("div");
    div.innerText = `${Timer.getRightTime(time)}`;
    div.id = `timer${Timer.ids++}`;
    div.classList.add("timer");
    let color = Timer.getRandomColor();
    div.style.borderColor = color;
    div.style.color = color;
    div.isGoing = false;
    div.onclick = () => {
      if (!div.isGoing) {
        div.isGoing = true;
        let i = 1;
        let interval = setInterval(() => {
          this.render(div, time - i);
          i++;
        }, 1000);

        setTimeout(() => {
          clearInterval(interval);
          div.isGoing = false;
          alarm.play();

          let done = setInterval(() => div.classList.toggle("done"), 300);
          setTimeout(() => {
            clearInterval(done);
            div.classList.remove("done");
            this.render(div, time);
          }, 3000);
        }, time * 1000);
      } else {
        alert("TIMER IS ON GOING");
      }
    };
    Timer.field.append(div);
  }
}
const createTimerBtn = document.getElementById("createTimerBtn"),
  clearTimersBtn = document.getElementById("clearTimersBtn"),
  input = document.getElementById("createTimerInput");

createTimerBtn.onclick = function createTimer() {
  if (+input.value || +input.value === 0) {
    Timer.clearField();
    const savedTimers = JSON.parse(localStorage.getItem("timers"));
    if (savedTimers === "") {
      alert("Пустой savedTimers");
      return;
    }
    const timers = [...savedTimers, +input.value];
    // return new Timer(input.value);
    for (let timer of timers) {
      new Timer(timer);
    }
    localStorage.setItem("timers", JSON.stringify(timers));
  }
};

clearTimersBtn.onclick = function createTimer() {
  localStorage.setItem("timers", "[]");
  Timer.clearField();
};

const savedTimers = JSON.parse(localStorage.getItem("timers"));
if (savedTimers === "" || savedTimers.length === 0) {
  Timer.field.innerHTML = "<h2>Нет сохраненных таймеров.</h2>";
} else {
  for (let timer of savedTimers) {
    new Timer(timer);
  }
}
