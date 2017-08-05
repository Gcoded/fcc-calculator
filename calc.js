
var numArray = [];
var finalArray = [];
var numHolder = 0;

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
    else if (event.target.tagName === "BUTTON") {
        keySelected = event.target.textContent;
    }

    if (digit.test(keySelected)) {
        numArray.push(keySelected);
        displayBox.textContent = numArray.join('');
        numHolder = parseFloat(displayBox.textContent);
    }
    if (operator.test(keySelected)) {
        numArray = [];
        finalArray.push(numHolder, keySelected);
        numHolder = 0;
    }
    if (keySelected === 'Enter' || keySelected === '=') {
        finalArray.push(numHolder);
        displayBox.textContent = executeMath(finalArray);
        numHolder = parseFloat(displayBox.textContent);
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

function executeMath (mathArray) {
    var result = 0, num1 = 0, num2 = 0;
    var oper = '';

    for (var i = 0; i < mathArray.length - 1; i += 2) {
        if (i === 0) {
            num1 = mathArray[i];
        }
        else {
            num1 = result;
        }
        oper = mathArray[i+1];
        num2 = mathArray[i+2];

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
    }

    result = Math.round(result * 10000) / 10000;
    return result;
}


