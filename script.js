document.addEventListener('DOMContentLoaded', () => {

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
        const promiseFunction = () => 
            new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', './cars.json');
                request.setRequestHeader('Content-type', 'application/json');
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) return;

                    if (request.status === 200) {
                        const data = JSON.parse(request.responseText);
                        data.cars.forEach(item => {
                            if (item.brand === select.value) {
                                resolve(item);
                            } else if (item.brand !== select.value) {
                                reject();
                            }
                        });
                    } else {
                        reject();
                    }
                }); 
                request.send();
            }); 
        promiseFunction()
            .then(item => output.innerHTML = `Тачка ${item.brand} ${item.model} <br>
                        Цена: ${item.price}$`)
            .catch(() => output.innerHTML = 'Произошла ошибка');
    });

});
