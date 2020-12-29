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

const get = selector => document.querySelector(selector);
const getAll = selector => document.querySelectorAll(selector);

window.addEventListener("DOMContentLoaded", () => {
    "use sctric";

    //Timer
    function countTimer(deadline) {
        const timerHours = get('#timer-hours'),
            timerMinutes = get('#timer-minutes'),
            timerSeconds = get('#timer-seconds');

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

    countTimer('31 december 2020');

    // Create Dots
    const dotParent = get('.portfolio-dots'),
        slideCount = getAll('.portfolio-item').length;

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

        const menu = get('menu'),
            closeBtn = get('.close-btn'),
            menuItemLink = getAll('ul>li>a'),
            mainSlideAnchorBtn = get('main>a'),
            mainSlideImg = get('main>a>img'),
            body = get('body'),

            menuHandler = () => {
                menu.classList.toggle('active-menu');
            };
	
        body.addEventListener('click', event => {
            const target = event.target;
            if (target.closest(".menu")) {
                menuHandler();
            }  else if (menu.matches('.active-menu') && !target.matches('menu') && !target.matches('a')) {
                menuHandler();
            } else if (target === closeBtn) {
                menuHandler();
            } else if (target === mainSlideImg) {
                event.preventDefault();
                const anchor = get(mainSlideAnchorBtn.getAttribute('href'));
                anchor.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            } else {
                menuItemLink.forEach(item => {
                    if (target === item) {
                        menuHandler();
                        event.preventDefault();
            
                        const blockID = item.getAttribute('href');
                        get(blockID).scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            }
        });
    };

    toggleMenu();

    //Popup
    const togglePopup = () => {
        const popup = get('.popup'),
            popupBtn = getAll('.popup-btn');

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
        const tabHeader = get(".service-header"),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = getAll('.service-tab');

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
        const slide = getAll('.portfolio-item'),
            dot = getAll('.dot'),
            slider = get('.portfolio-content');

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

    // change photo
    const changePhoto = () => {
        const commandBlock = get('.command'),
            commandImgs = commandBlock.querySelectorAll('img[data-img]'),
            changeDataset = target => {
                if (!target.dataset.tmp) {
                    target.dataset.tmp = target.src;
                    target.src = target.dataset.img;
                    target.dataset.img = target.dataset.tmp;
                } else {
                    target.dataset.img = target.src;
                    target.src = target.dataset.tmp;
                    target.dataset.tmp = '';
                }
                
            };

        commandBlock.addEventListener('mouseover', event => {
            const target = event.target;
            commandImgs.forEach(item => {
                if (item === target) {
                    changeDataset(target);
                }
            });
        });

        commandBlock.addEventListener('mouseout', event => {
            const target = event.target;
            commandImgs.forEach(item => {
                if (item === target) {
                    changeDataset(target);
                }
            });
        });
    };

    changePhoto();

    // validation
    const inputValidation = () => {
        const tel = getAll('input[type="tel"]');
        tel.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^\d+]/, '');
            });
        });

        const name = getAll('.form-name');
        name.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^а-яё ]/, '');
            });
        });

        const message = get('.mess');
        message.addEventListener('input', event => 
            event.target.value = event.target.value.replace(/[^а-яё ,;:.\d]/, ''));
        const inputBlock = get('.calc-block');

        inputBlock.addEventListener('click', event => {
            const target = event.target;
            if (target.matches('.calc-item') && !target.matches('.calc-type')) {
                target.addEventListener('input', event => {
                    const target = event.target;
                    target.value = target.value.replace(/[^\d]/, '');
                });
            }
        });
    };

    inputValidation();
    
    //calculator
    const calc = (price = 100) => {
        const calcBlock = get('.calc-block'),
            calcType = get('.calc-type'),
            calcSquare = get('.calc-square'),
            calcDay = get('.calc-day'),
            calcCount = get('.calc-count'),
            totalValue = get('#total');
        
        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squreValue = +calcSquare.value;

            if (typeValue === '') {
                calcSquare.value = '';
                calcCount.value = '';
                calcDay.value = '';
                return;
            } 
            
            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squreValue) {
                total = price * typeValue * squreValue * countValue * dayValue;
            }

            animate({
                duration: 1000,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    totalValue.textContent = Math.ceil(progress * total);
                }
            });
        };

        calcBlock.addEventListener('change', event => {
            const target = event.target;
            if (target.matches('.calc-type, .calc-square, .calc-day, .calc-count')) {
                countSum();
            }
        });
    };

    calc();

    const checkFormElements = form => {
        const filterForm = [...form.elements].filter(item => {
            if (item.matches('[type="tel"]')) {
                return /[\d+]{7,13}/.test(item.value);
            } else if (item.matches('[type="email"]')) {
                return /([a-z])|.+@.+\..+/i.test(item.value);
            } else {
                return item;
            }
        });

        if (filterForm.length === [...form.elements].length) {
            return true;
        } else {
            return false;
        }
    };

    //send-ajax-form
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся',
            checkFormMessage = 'Проверьте корректность данных формы';

        const forms = getAll('form');
        const statusMessage = document.createElement('div');
        statusMessage.style.color = 'white';

        const clearForm = () => {
            forms.forEach(item => [...item.elements].forEach(item => item.value = ''));
        };

        const postData = body => 
            new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {
    
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve();
                    } else {
                        reject(request.status);
                    }
    
                    clearForm();
                });
    
                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json');
    
                request.send(JSON.stringify(body));
            });
            
        
        forms.forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault();
                form.appendChild(statusMessage);

                if (!checkFormElements(form)) {
                    console.log(checkFormElements(form));
                    statusMessage.textContent = checkFormMessage;    
                    setTimeout(() => statusMessage.textContent = '', 2000);
                    return;
                }

                statusMessage.textContent = loadMessage;
                

                const formData = new FormData(form);
                const body = {};
                formData.forEach((value, key) => {
                    body[key] = value;
                });
                postData(body)
                    .then(() => {
                        statusMessage.textContent = successMessage;
                    })
                    .catch(error => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    })
                    .finally(() => {
                        if (event.target.closest('.popup')) {
                            setTimeout(() => {
                                const popupClose = get('.popup-close');
                                statusMessage.textContent = '';
                                popupClose.click();
                            }, 2000);
                        } else {
                            setTimeout(() => statusMessage.textContent = '', 2000);
                        }
                    });
            });
        });
        
    };

    sendForm();
});

