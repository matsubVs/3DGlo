import animate from './animate';

const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.querySelector('#total');
    
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
            totalValue.textContent = 0;
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

export default calc;
