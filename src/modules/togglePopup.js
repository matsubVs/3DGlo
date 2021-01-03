import animate from './animate';

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

export default togglePopup;
