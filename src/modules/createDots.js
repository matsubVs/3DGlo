const createDots = () => {
    const dotParent = document.querySelector('.portfolio-dots'),
        slideCount = document.querySelectorAll('.portfolio-item').length;

    for (let i = 0; i < slideCount; i++) {
        const li = document.createElement('li');
        li.classList.add('dot');
        if (i === 0) {
            li.classList.add('dot-active');
        }

        dotParent.appendChild(li);
    }
};


export default createDots;
