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
            if (display.textContent === '0') { 
                display.textContent = '';
            }
            display.textContent += event.target.textContent;
            if (values[1] === undefined) {
                values[0] = parseInt(display.textContent);
            } else {
                values[2] = parseInt(display.textContent);
            }
            console.log(values);
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
                    display.textContent = mathAction[values[1]](values[0], values[2]);
                    values = new Array(3);
                    values[0] = parseInt(display.textContent);
                    break;
                default:
                    values[1] = event.target.textContent;
                    display.textContent = '0';
            }
            console.log(values);
    }
});

function changeOneValue(action) {
    if (values[0] !== undefined) {
        values[0] = mathAction[action](values[0]);
    } else if (values[2] !== undefined) {
        values[2] = mathAction[action](values[2]);
    } else {
        alert("Mistake occured");
    }
}