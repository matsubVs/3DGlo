const countTimer = deadline => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);

        return {
            timeRemaining,
            hours,
            minutes,
            seconds
        };
    }

    function checkTime(time) {
        time = String(time);
        if (time.length < 2) {
            return "0" + time;
        } else {
            return time;
        }
    }

    // eslint-disable-next-line prefer-const
    let intervalId;
    function updateTime() {
        const timer = getTimeRemaining();

        timerHours.textContent = checkTime(timer.hours);
        timerMinutes.textContent = checkTime(timer.minutes);
        timerSeconds.textContent = checkTime(timer.seconds);

        if (timer.timeRemaining < 0) {
            clearInterval(intervalId);
            timerHours.textContent = "00";
            timerMinutes.textContent = "00";
            timerSeconds.textContent = "00";
        }
    }

    intervalId = setInterval(updateTime, 1000);
    updateTime();
};

export default countTimer;
