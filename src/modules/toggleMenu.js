const toggleMenu = () => {

    const menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItemLink = document.querySelectorAll('ul>li>a'),
        mainSlideAnchorBtn = document.querySelector('main>a'),
        mainSlideImg = document.querySelector('main>a>img'),
        body = document.querySelector('body'),

        menuHandler = () => {
            menu.classList.toggle('active-menu');
        };

    body.addEventListener('click', event => {
        const target = event.target;
        if (target.closest(".menu")) {
            menuHandler();
        }  else if (menu.matches('.active-menu') && !target.matches('menu') && !target.matches('a') && 
                    !target.matches('li')) {
            menuHandler();
        } else if (target === closeBtn) {
            menuHandler();
        } else if (target === mainSlideImg) {
            event.preventDefault();
            const anchor = document.querySelector(mainSlideAnchorBtn.getAttribute('href'));
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
                    document.querySelector(blockID).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
};

export default toggleMenu;
