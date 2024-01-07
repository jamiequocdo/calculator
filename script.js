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

let firstNumber
let operatorType = "operator";
let secondNumber = 0;

function operate() {
    if (operatorType === "+") {
        return addNumbers(firstNumber, secondNumber);
    } else if (operatorType === "-") {
        return subtractNumbers(firstNumber, secondNumber);
    } else if (operatorType === "*") {
        return multiplyNumbers(firstNumber,secondNumber);
    } else if (operatorType === "/") {
        return divideNumbers(firstNumber, secondNumber);
    } else {
        console.log("Incorrect Input");
    }
}

const buttonDigits = document.querySelectorAll(".digit")
const display = document.querySelector("#display");

let displayArray = [];

buttonDigits.forEach(button => {
    button.addEventListener("click", () => {
        displayArray.push(+button.textContent);
        let string = displayArray.join("")
        display.textContent = +string;
    })
});


//This button clears the display element and displayArray.  Restarting the use of the calculator.
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    display.textContent = "";
    displayArray.splice(0, displayArray.length);
    firstNumber
    secondNumber
})

//Clicking "add" button copies displayArray to firstNumber;
//TODO Make the Add button work
const addButton = document.querySelector("#add");
addButton.addEventListener("click", () => {
    operatorType = "+";
    lookForNumbers();
})

const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", () => {
    secondNumber = +displayArray.join("");
    display.textContent = operate();
    
})

function lookForNumbers() {
    if (firstNumber !== undefined && firstNumber !== null) {
        secondNumber = +displayArray.join("")
        displayArray = [];
    } else {
        firstNumber = +displayArray.join("")
        displayArray = [];
    }

}
