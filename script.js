"use strict";

const buttons = document.getElementById("buttons");
const display = document.getElementById("display");
const mathAction = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '%': a => a / 100,
    '+/-': a => -a,
};

let values = new Array(3);

buttons.addEventListener("click", event => {
    event.preventDefault();
    switch (event.target.classList[0]) {
        case 'number':
            clickNumber(event.target.textContent); 
            break;
        case 'action':
            switch (event.target.textContent) {
                case 'A/C':
                    values = values.map(value => undefined);
                    display.textContent = '0';
                    break;
                case '%':
                    display.textContent = mathAction['%'](display.textContent);
                    changeOneValue('%');
                    break;
                case '+/-':
                    display.textContent = mathAction['+/-'](display.textContent);
                    changeOneValue('+/-');
                    break;
                case '=':
                    calculate();
                    break;
                default:
                    doMath(event.target.textContent);
            }
    }
    // console.log(values);
});


window.addEventListener('keydown', event => {
    if (parseInt(event.key) >= 0 && parseInt(event.key) <= 9 || event.key === '.') {
        clickNumber(event.key);
    }
    switch (event.key) {
        case '+':
        case '-':
        case '*':
        case '/':
            doMath(event.key);
            break;
        case '%':
            display.textContent = mathAction['%'](display.textContent);
            changeOneValue('%');
            break;
        case '=':
        case 'Enter':
        case 'numpadEnter':
            calculate();
            break;
        case 'Delete':
        case 'Backspace':
            values = values.map(value => undefined);
            display.textContent = '0';
            break;
    }
    // console.log(values);
    event.preventDefault();
}, true);

function clickNumber(number) {
    if (display.textContent === '0') { 
        display.textContent = '';
    }
    if (number === '.' && display.textContent.includes('.')) {
        return;
    }
    display.textContent += number;
    if (values[1] === undefined) {
        values[0] = parseFloat(display.textContent);
    } else {
        values[2] = parseFloat(display.textContent);
    }
}
function changeOneValue(action) {
    if (values[0] !== undefined) {
        values[0] = mathAction[action](values[0]);
    } else if (values[2] !== undefined) {
        values[2] = mathAction[action](values[2]);
    } else {
        alert("Mistake occured");
    }
}

function calculate() {
    display.textContent = mathAction[values[1]](values[0], values[2]);
    values = new Array(3);
    values[0] = parseFloat(display.textContent);
}

function doMath(action) {
    values[1] = action;
    display.textContent = '0';
}