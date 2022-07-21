let alarm = new Audio("./alarm.mp3");
alarm.volume = 0.05;
document.body.append(alarm);

class Timer {
    static field = document.getElementById("timers");
    static ids = 0;
    static getRightTime(timeLeft) {
        let mind = timeLeft % (60 * 60);
        let minutes = Math.floor(mind / 60);

        let secd = mind % 60;
        let seconds = Math.ceil(secd);

        return `${minutes>9?minutes:'0'+minutes}:${seconds>9?seconds:'0'+seconds}`
    }
	static getRandomColor() {
    function randomHex() { return Number((Math.random() * 255).toFixed(0)).toString(16) }
    return `#${randomHex()}${randomHex()}${randomHex()}`
}


    render(div, timeLeft) {
        div.innerText = `${Timer.getRightTime(timeLeft)}`;
    }

    constructor(time) {
        let div = document.createElement("div");
        div.innerText = `${Timer.getRightTime(time)}`;
        div.id = `timer${Timer.ids++}`;
        div.classList.add("timer");
		let color = Timer.getRandomColor()
		div.style.borderColor=color;
		div.style.color=color;
        div.isGoing = false;
        div.onclick = () => {
            if (!div.isGoing) {
                div.isGoing = true;
                let i = 1;
                let interval = setInterval(() => {
                    // console.log(div.id, `${i}sec`);
                    this.render(div, time - i);
                    i++;
                }, 1000);

                setTimeout(() => {
                    clearInterval(interval);
                    div.isGoing = false;
                    alarm.play();

                    let done = setInterval(() => div.classList.toggle('done'), 300)
                    setTimeout(() => {
                        clearInterval(done);
                        div.classList.remove('done')
                        this.render(div, time);
                    }, 3000)

                }, time * 1000);
            } else {
                alert("TIMER IS ON GOING");
            }
        };
        Timer.field.append(div);
    }
}

let timer1 = new Timer(60);
let timer2 = new Timer(150);

let btn = document.getElementById("createTimerBtn");
let input = document.getElementById("createTimerInput");

btn.onclick = function createTimer() {
    return new Timer(input.value);
};