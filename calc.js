
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
            numArray.push(btnClicked.innerText);
            displayBox.innerHTML = numArray.join('');
            numHolder = parseInt(displayBox.innerHTML);
        }
        if (btnClicked.className === 'btn operation') {
            numArray = [];
            finalArray.push(numHolder);
            symbol = btnClicked.innerHTML;
            finalArray.push(symbol);
            numHolder = 0;
        }
        if (btnClicked.id === 'equal') {
            finalArray.push(numHolder);
            displayBox.innerHTML = executeMath(finalArray[0], finalArray[1], finalArray[2]);
            finalArray = [];
        }
        if (btnClicked.id === 'ac') {
            numArray = [];
            finalArray = [];
            displayBox.innerHTML = 0;
        }

    });
}

setupEventListener();

function executeMath (num1, oper, num2) {
    var result = 0;

    switch (oper) {
        case 'x':
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