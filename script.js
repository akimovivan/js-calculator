"use strict";

const buttons = document.getElementById("buttons");
const display = document.getElementById("display");

buttons.addEventListener("click", event => {
    event.preventDefault();
    switch(event.target.classList[0]) {
        case 'number':
            if (display.textContent === '0') display.textContent = '';
            display.textContent += event.target.textContent;
            break;
        case 'action':
            switch(event.target.textContent) {
                case 'A/C':
                    console.log("A/C");
                    break;
                case '*':
                    console.log("*");
                    break;
                case '/':
                    console.log('/');
                    break;
                case '+': 
                    console.log('+');
                    break;
                case '-':
                    console.log('-');
                    break;
                case '%':
                    console.log('%');
                    break;
                case '+/-':
                    console.log('+/-');
                    break;
                default:
                    alert("What is this?");
            }
    }
});