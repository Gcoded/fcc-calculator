
var displayBox = document.getElementById('display');

var numArray = [];
var finalArray = [];
var numHolder = 0;
var symbol = '';

function setupEventListener () {
    var calculator = document.getElementById('calc-bod');
    calculator.addEventListener('click', function(event) {
        var btnClicked = event.target;
        if (btnClicked.className === 'btn number') {
            numArray.push(btnClicked.textContent);
            displayBox.textContent = numArray.join('');
            numHolder = parseFloat(displayBox.textContent);
        }
        if (btnClicked.className === 'btn operation') {
            numArray = [];
            finalArray.push(numHolder);
            symbol = btnClicked.textContent;
            finalArray.push(symbol);
            numHolder = 0;
        }
        if (btnClicked.id === 'equal') {
            finalArray.push(numHolder);
            displayBox.textContent = executeMath(finalArray[0], finalArray[1], finalArray[2]);
            finalArray = [];
        }
        if (btnClicked.id === 'ce') {
            numArray = [];
            displayBox.textContent = 0;
        }
        if (btnClicked.id === 'ac') {
            numArray = [];
            finalArray = [];
            displayBox.textContent = 0;
        }

    });

    window.addEventListener('keydown', function(event) {
        var digit = /[0-9.]/;
        var operator = /[\*\/\+\-]/;
        var keyPressed = event.key;
        if (digit.test(keyPressed)) {
            numArray.push(keyPressed);
            displayBox.textContent = numArray.join('');
            numHolder = parseFloat(displayBox.textContent);
        }
        if (operator.test(keyPressed)) {
            numArray = [];
            finalArray.push(numHolder);
            symbol = keyPressed;
            finalArray.push(symbol);
            numHolder = 0;
        }
        if (keyPressed === 'Enter' || keyPressed === '=') {
            finalArray.push(numHolder);
            displayBox.textContent = executeMath(finalArray[0], finalArray[1], finalArray[2]);
            finalArray = [];
        }
        if (keyPressed === 'Backspace') {
            numArray.splice(-1, 1);
            displayBox.textContent = numArray.join('');
            numHolder = parseFloat(displayBox.textContent);
        }
        if (keyPressed === 'Escape') {
            numArray = [];
            finalArray = [];
            displayBox.textContent = 0;
        }
    });
}

setupEventListener();

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


