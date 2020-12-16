function animate({ timing, draw, duration }) {

    const start = performance.now();
  
    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        const progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}

window.addEventListener("DOMContentLoaded", () => {
    "use sctric";

    //Timer
    function countTimer(deadline) {
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
    }

    countTimer('17 december 2020');

    // Menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItem = menu.querySelectorAll('ul>li'),
            menuItemLink = menu.querySelectorAll('ul>li>a'),
            mainSlideAnchorBtn = document.querySelector('main>a'),

            menuHandler = () => {
                menu.classList.toggle('active-menu');
            };

        btnMenu.addEventListener('click', menuHandler);

        closeBtn.addEventListener('click', menuHandler);

        menuItem.forEach(item => item.addEventListener('click', menuHandler));

        menuItemLink.forEach(item => item.addEventListener('click', (event) => {
            event.preventDefault()
            
            const blockID = item.getAttribute('href')
            
            console.log(blockID);
            document.querySelector(blockID).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          })
        );

        mainSlideAnchorBtn.addEventListener('click', (event) => {
            event.preventDefault()
            const anchor = document.querySelector(mainSlideAnchorBtn.getAttribute('href'));
            console.log(anchor);
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        })
    };

    toggleMenu();

    //Popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        popupBtn.forEach(item => item.addEventListener('click', () => {
            if (screen.width > 768) {
                popup.style.display = "block";
                animate({
                    duration: 500,
                    timing(timeFraction) {
                        return timeFraction;
                    },
                    draw(progress) {
                        popup.style.opacity = progress;
                    }
                });
            } else {
                popup.style.display = "block";
            }    
        }));

        popupClose.addEventListener('click', () => {
            if (screen.width > 768) {
                animate({
                    duration: 500,
                    timing(timeFraction) {
                        return timeFraction;
                    },
                    draw(progress) {
                        popup.style.opacity = 1 - progress;
                    }
                });
                setTimeout(() => popup.style.display = "none", 600);
            } else {
                popup.style.display = "none";
            }
        });
    };

    togglePopup();
});