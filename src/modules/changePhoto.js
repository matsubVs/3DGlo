const changePhoto = () => {
    const commandBlock = document.querySelector('.command'),
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

export default changePhoto;
