import checkFormElements from './CheckFormElements';

const sendForm = () => {
    const errorMessage = 'Что-то пошло не так',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся',
        checkFormMessage = 'Проверьте корректность данных формы';

    const forms = document.querySelectorAll('form');
    const statusMessage = document.createElement('div');
    const preloader = document.createElement('div');
    preloader.classList.add('sk-spinner-pulse');
    preloader.classList.add('d-none');
    statusMessage.style.color = 'white';

    const clearForm = () => {
        forms.forEach(item => [...item.elements].forEach(item => item.value = ''));
    };

    const postData = body => 
        fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) 
        });
    
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            form.appendChild(preloader);
            preloader.classList.remove('d-none');
            form.appendChild(statusMessage);

            if (!checkFormElements(form)) {
                statusMessage.textContent = checkFormMessage;    
                preloader.classList.add('d-none');
                setTimeout(() => statusMessage.textContent = '', 2000);
                return;
            }

            const formData = new FormData(form);
            const body = {};
            formData.forEach((value, key) => {
                body[key] = value;
            });
            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('error');
                    }
                    preloader.classList.add('d-none');
                    statusMessage.textContent = successMessage;
                })
                .catch(error => {
                    preloader.classList.add('d-none');
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                })
                .finally(() => {
                    clearForm();
                    if (event.target.closest('.popup')) {
                        setTimeout(() => {
                            const popupClose = document.querySelector('.popup-close');
                            statusMessage.textContent = '';
                            popupClose.click();
                        }, 2000);
                    } else {
                        preloader.classList.add('d-none');
                        setTimeout(() => statusMessage.textContent = '', 2000);
                    }
                });
        });
    });
    
};

export default sendForm;
