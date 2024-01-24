const calculator = {
    firstNumber: null,
    secondNumber: null,
    operatorType: "",
}

//Switch Statement.  Easier to read than if/else statement.
function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            //Must make Error message for dealing with dividing by Zero
            return b !== 0 ? a / b : "Error";
            //Default switch statement to handle incorrect input
        default:
            console.log("incorrect Input");
            return null;
    }
}

const buttonDigits = document.querySelectorAll(".digit");
const display = document.querySelector("#display");
let displayArray = [];

buttonDigits.forEach(button => {
    button.addEventListener("click", () => {
        displayArray.push(+button.textContent);
        updateDisplay();
    })
});


//This button clears the display element and displayArray.  Restarting the use of the calculator.
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    clearCalculator();
})
/*
    This eventListener affects +, -, /, * buttons.  Variable operatorType becomes gains value 
    of the button that is pressed.
*/
let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleOperatorClick(button.textContent);
    })
})

const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", () => {
    console.log(calculator.secondNumber);
    console.log(displayArray);
    calculator.secondNumber = +displayArray.join("");
    console.log(calculator.secondNumber);
    calculateResult();
    operatorType = "";
})

/*
    This function finds if Variable firstNumber has any value other than "".
*/
function lookForNumbers() {
    //If firstNumber has value, give secondNumber value of displayArray but in datatype: number, and array joined together
    if (calculator.firstNumber !== null) {
        calculator.secondNumber = +displayArray.join("");
        displayArray = [];
    } else {
        calculator.firstNumber = +displayArray.join("");
        displayArray = [];
    }
}

function handleOperatorClick(operator) {
    lookForNumbers();
    if (calculator.secondNumber !== null) {
        calculateResult();
    }
    
    calculator.operatorType = operator;
    display.textContent = calculator.firstNumber;
}

function calculateResult() {
    let result = operate(
        calculator.firstNumber,
        calculator.secondNumber,
        calculator.operatorType,
    )
    display.textContent = result;
    calculator.firstNumber = result;
    calculator.secondNumber = null;
    displayArray = [];
}

function clearCalculator() {
    display.textContent = "";
    displayArray = [];
    calculator.firstNumber = null;
    calculator.secondNumber = null;
    calculator.operatorType = "";
}

function updateDisplay() {
    let string = displayArray.join("");
    display.textContent = +string;
}

// function calculateResult() {
//     // calculator.secondNumber = +displayArray.join("");
//     let result = operate(
//         calculator.firstNumber,
//         calculator.secondNumber,
//         calculator.operatorType,
//     );
//     display.textContent = result;
//     calculator.firstNumber = result;
//     calculator.secondNumber = null;
//     // displayArray = [];
// }