function addNumbers(a, b) {
    return a + b;
}

function subtractNumbers(a, b) {
    return a - b;
}

function multiplyNumbers(a, b) {
    return a * b;
}

function divideNumbers(a, b) {
    return a / b;
}

function operate(operator) {
    if (operator === "+") {
        addNumbers(a, b)
    }
}

let firstNumber = +numberOne;
let operator = "operator";
let secondNumber = +numberTwo;

function operate() {
    if (operator === "+") {
        addNumbers(firstNumber, secondNumber);
    } else if (operator === "-") {
        subtractNumbers(firstNumber, secondNumber);
    } else if (operator === "*") {
        multiplyNumbers(firstNumber,secondNumber);
    } else if (operator === "/") {
        divideNumbers(firstNumber, secondNumber);
    } else {
        console.log("Incorrect Input");
    }
}

console.log(addNumbers(3, 3));
console.log(subtractNumbers(10, 5));
console.log(multiplyNumbers(3, 3));
console.log(divideNumbers(50, 5));