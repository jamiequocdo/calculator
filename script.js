

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

//TOP DISPLAY of numbers being entered into calculator
const display = document.querySelector("#display");

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", () => {
    displayArray.pop();
    updateDisplay();
})

//Array that remembers all numbers pressed before an operator is pressed
let displayArray = [];

//Block allowing numbers to populate "displayArray" and "display" variables
const buttonDigits = document.querySelectorAll(".digit");
buttonDigits.forEach(button => {
    button.addEventListener("click", () => {
        displayArray.push(button.textContent);
        updateDisplay();
    })
});

//Block for decimal to be used.  Restricting only 1 decimal in a number
const decimalPoint = document.querySelector("#decimal");
decimalPoint.addEventListener("click", () => {
    let hasDecimal = displayArray.includes(".");
    if (hasDecimal === true) {
        return
    } else {
        displayArray.push(decimalPoint.textContent);
        updateDisplay();
    }
})



//Clears "display" element and "displayArray" variable.  Erasing all info on calculator
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

// Calculates values of calculator.firstNumber & calculator.secondNumber.  First, checks if there is anything in 
// calculator.operatorType.  If nothing, it will do nothing
const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", () => {
    if (calculator.operatorType === "") {
        return;
    } else {
        calculator.secondNumber = +displayArray.join("");
        calculateResult();
        calculator.operatorType = "";
    }
    
})

// This function finds if Variable firstNumber has any value other than "".
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

//A Function used with operatorButtons variable.  Calculates when there is calculator.secondNumber and another operator is pressed
function handleOperatorClick(operator) {
    lookForNumbers();
    if (calculator.secondNumber !== null) {
        calculateResult();
    }
    
    calculator.operatorType = operator;
    display.textContent = calculator.firstNumber;
}

//Function creates object "result" that has function "operate(a, b, operator)".  Uses that info to update
// "display"
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

//Function used in clearButton element to erase all info.
function clearCalculator() {
    display.textContent = "";
    displayArray = [];
    calculator.firstNumber = null;
    calculator.secondNumber = null;
    calculator.operatorType = "";
}

//Function to join displayArray and adds it as value to variable "string". Uses that to 
function updateDisplay() {
    let string = displayArray.join("");
    display.textContent = string;
}