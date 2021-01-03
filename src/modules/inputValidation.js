const inputValidation = () => {
    const tel = document.querySelectorAll('input[type="tel"]');
    tel.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^\d+]/, '').substr(0, 13);
        });
    });

    const name = document.querySelectorAll('.form-name');
    name.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^а-яё ]/i, '');
        });
    });

    const message = document.querySelector('.mess');
    message.addEventListener('input', event => 
        event.target.value = event.target.value.replace(/[^а-яё ,;:.\d?!+-]/i, ''));
    const inputBlock = document.querySelector('.calc-block');

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

export default inputValidation;
