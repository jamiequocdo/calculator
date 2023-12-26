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

let firstNumber = 0;
let operator = "operator";
let secondNumber = 0;

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

const buttonOne = document.querySelector("#one")
buttonOne.addEventListener("click", () => {
    console.log(typeof +buttonOne.textContent);
})
console.log(buttonOne);