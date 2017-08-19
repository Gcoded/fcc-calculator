
var digitArray = [];
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
    if (event.target.tagName === "BUTTON") {
        if (event.target.id === 'divide') {
            keySelected = '/';
        }
        else {
            keySelected = event.target.textContent;
        }
    }

    if (digit.test(keySelected)) {
        if (digitArray.length < 10) {
            if (keySelected !== '.' || (keySelected === '.' && digitArray.indexOf('.') === -1)) {
                digitArray.push(keySelected);
                displayBox.textContent = digitArray.join('');
                numHolder = parseFloat(displayBox.textContent);
            }
        }
    }
    if (operator.test(keySelected)) {
        digitArray = [];
        finalArray.push(numHolder, keySelected);
        numHolder = 0;
    }
    if (keySelected === 'Enter' || keySelected === '=') {
        finalArray.push(numHolder);
        displayBox.textContent = getFinalAnswer(finalArray);
        numHolder = parseFloat(displayBox.textContent);
        finalArray = [];
    }
    if (keySelected === 'Backspace' || keySelected === 'CE') {
        digitArray.splice(-1, 1);
        displayBox.textContent = digitArray.join('');
        numHolder = parseFloat(displayBox.textContent);
    }
    if (keySelected === 'Escape' || keySelected === 'AC') {
        digitArray = [];
        finalArray = [];
        displayBox.textContent = 0;
    }
}

function getFinalAnswer (mathArray) {
    var answer = 0, finalAnswer = 0, num1 = 0, num2 = 0;
    var oper = '';
    var multOrDiv = ['x', '*', '/'];

    for (var i = 1; i < mathArray.length; i+=2) {
        if(multOrDiv.indexOf(mathArray[i]) !== -1) {
            num1 = mathArray[i-1];
            oper = mathArray[i];
            num2 = mathArray[i+1];
            answer = executeMath(num1, oper, num2);
            mathArray.splice(i-1, 3, answer);
            i -= 2;
        }
    }

    for (var j = 0; j < mathArray.length - 1; j += 2) {
        if (j === 0) {
            num1 = mathArray[j];
        }
        else {
            num1 = answer;
        }
        oper = mathArray[j+1];
        num2 = mathArray[j+2];

        answer = executeMath(num1, oper, num2);
    }

    finalAnswer = Math.round(answer * 10000000) / 10000000;
    return finalAnswer;
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
    return result;
}


