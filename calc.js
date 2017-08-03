
var numArray = [];
var finalArray = [];
var numHolder = 0;
var symbol = '';

var displayBox = document.getElementById('display');
var calculator = document.getElementById('calc-bod');

calculator.addEventListener('click', function(event) {
    processEvent(event);
});
window.addEventListener('keydown', function(event) {
    processEvent(event);
});

function processEvent (event) {
    var keySelected = '';
    var digit = /[0-9.]/;
    var operator = /[\*\x\/\+\-]/;

    if (event.key) {
        keySelected = event.key;
    }
    else {
        keySelected = event.target.textContent;
    }

    if (digit.test(keySelected)) {
        numArray.push(keySelected);
        displayBox.textContent = numArray.join('');
        numHolder = parseFloat(displayBox.textContent);
    }
    if (operator.test(keySelected)) {
        numArray = [];
        finalArray.push(numHolder);
        symbol = keySelected;
        finalArray.push(symbol);
        numHolder = 0;
    }
    if (keySelected === 'Enter' || keySelected === '=') {
        finalArray.push(numHolder);
        displayBox.textContent = executeMath(finalArray[0], finalArray[1], finalArray[2]);
        finalArray = [];
    }
    if (keySelected === 'Backspace' || keySelected === 'CE') {
        numArray.splice(-1, 1);
        displayBox.textContent = numArray.join('');
        numHolder = parseFloat(displayBox.textContent);
    }
    if (keySelected === 'Escape' || keySelected === 'AC') {
        numArray = [];
        finalArray = [];
        displayBox.textContent = 0;
    }
}

function executeMath (num1, oper, num2) {
    var result = 0;

    switch (oper) {
        case 'x':
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
    }
    result = Math.round(result * 10000) / 10000;
    return result;
}


