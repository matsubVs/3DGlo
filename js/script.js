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

    countTimer('18 december 2020');

    // Create Dots
    const dotParent = document.querySelector('.portfolio-dots'),
        slideCount = document.querySelectorAll('.portfolio-item').length;


    const createDots = (count, parent) => {
        for (let i = 0; i < count; i++) {
            const li = document.createElement('li');
            li.classList.add('dot');
            if (i === 0) {
                li.classList.add('dot-active');
            }

            parent.appendChild(li);
        }
    };

    createDots(slideCount, dotParent);

    // Menu
    const toggleMenu = () => {

        const menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItemLink = menu.querySelectorAll('ul>li>a'),
            mainSlideAnchorBtn = document.querySelector('main>a'),
            mainSlideImg = document.querySelector('main>a>img'),
            body = document.querySelector('body'),

            menuHandler = () => {
                menu.classList.toggle('active-menu');
            };
	
        body.addEventListener('click', event => {
            let target = event.target;
            if (target.closest(".menu")) {
                menuHandler();
            }  else if (menu.matches('.active-menu') && !target.matches('menu') && !target.matches('a')) {
                menuHandler();
            } else if (target === closeBtn) {
                menuHandler();
            } else if (target === mainSlideImg) {
                event.preventDefault()
                const anchor = document.querySelector(mainSlideAnchorBtn.getAttribute('href'));
                anchor.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                })
            } else {
                menuItemLink.forEach(item => {
                    if (target === item) {
                        menuHandler();
                        event.preventDefault()
            
                        const blockID = item.getAttribute('href')
                        document.querySelector(blockID).scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        })
                    }
                });
            }
        });
    }

    toggleMenu();

    //Popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

        const animateClosePopup = () => {
            if (screen.width > 768) {
                animate({
                    duration: 150,
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
        };

        popupBtn.forEach(item => item.addEventListener('click', () => {
            if (screen.width > 768) {
                popup.style.display = "block";
                animate({
                    duration: 150,
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

        popup.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                animateClosePopup();
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    animateClosePopup();
                }
            }
        });
    };

      // tabs 
      const tabs = () => {
        const tabHeader = document.querySelector(".service-header"),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove("d-none");
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add("d-none");
                }
            }
        };
        
        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest(".service-header-tab");

            if (target) {
                tab.forEach((item, index) => {
                    if (item === target) {
                        toggleTabContent(index);
                    }
                });
            }
        
        });
    };

    tabs();

    togglePopup();

    //slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, srtClass) => {
            elem[index].classList.remove(srtClass);
        };

        const nextSlide = (elem, index, srtClass) => {
            elem[index].classList.add(srtClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            // eslint-disable-next-line prefer-const
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((item, index) => {
                    if (item === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn, .dot')) {
                stopSlide();
            }
        });

        
        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn, .dot')) {
                startSlide();
            }
        });

        startSlide();
    };

    slider();
    
});