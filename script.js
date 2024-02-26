// TODO The id's for = & . are not valid id names.  Find another?
const calculator = {
    firstNumber: null,
    secondNumber: null,
    operatorType: "",
}


document.addEventListener("keydown", (event) => {
    if (/^\d$/.test(event.key)) {
        if (calculator.operatorType === "=") {
            return
        } else {
            addDigits(+event.key);
            handleDigitKeyDown(event);
        };
    } else if (["+", "-", "*", "/"].includes(event.key)) {
        handleOperatorClick(event.key); 
    } else if (event.key === "=") {
        equalCalculate();
    } else if (event.key === "Backspace") {
        noEqualBackspace();  
    } else if (event.key === "Escape") {
        clearCalculator();
    } else if (event.key === "." ) {
        checkIfDecimal();
    }
}
)

document.addEventListener("keyup", (event) => {
    handleDigitKeyUp(event);
    
})

function handleDigitKeyUp(event) {
    const keyboard = event.key;

    if (/^\d$/.test(keyboard)) {
        let keyboardToButton = document.getElementById(keyboard);
        if (keyboardToButton === null) {
            return
        }
        keyboardToButton.style.backgroundColor = "";
    } else {
        return;
    }
}

function handleDigitKeyDown(event) {
    const keyboard = event.key;
    let keyboardToButton = document.getElementById(keyboard);
    if (keyboardToButton === null) {
        return
    } else {
        keyboardToButton.style.backgroundColor = "pink";
    }
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

//Backspace button
const backspace = document.querySelector("#Backspace");
backspace.addEventListener("click", () => {
    noEqualBackspace();
})

//Function to simplify the Backspace and make sure it doesn't activate when operatorType is "="
function noEqualBackspace() {
    if (calculator.operatorType === "=") {
        return
    } else {
        deleteOneNumber();
    }
}

//Function used in noEqualBackspace() function to delete 1 number
function deleteOneNumber() {
    displayArray.pop();
    updateDisplay();
}

//Array that remembers all numbers pressed before an operator is pressed
let displayArray = [];

//Block allowing numbers to populate "displayArray" and "display" variables
const buttonDigits = document.querySelectorAll(".digit");
buttonDigits.forEach(button => {
    button.addEventListener("click", () => {
        if (calculator.operatorType === "=") {
            return
        } else {
            addDigits(button.textContent);
        }
    })
});


/* 
Used for buttonDigits and "keydown" eventListener.  Checks if "displayArray" array is less than 20 items.
If Yes, adds number that's pressed to displayArray.
If No, ignores pressed number and doesn't do anything
*/ 
function addDigits(number) {

    if(displayArray.indexOf(0, 0) === 0) {
        displayArray.pop();
    }
    if (displayArray.length < 12) {
        displayArray.push(number);
        updateDisplay();
    } else {
        return
    }
}

if(displayArray.indexOf("0", 0) === 0) {
    displayArray.pop();
}

//Block for decimal to be used.  Restricting only 1 decimal in a number
const decimalPoint = document.querySelector("#\\.");
decimalPoint.addEventListener("click", () => {
    checkIfDecimal();
})

//Function to check if display already has a decimal point or not.  If it does, it does nothing.
function checkIfDecimal () {
    let hasDecimal = displayArray.includes(".");
    console.log(hasDecimal);
    if (hasDecimal === true) {
        return
    } else {
        if (calculator.operatorType === "=" || /\d/.test(display.textContent) === false ) {
            displayArray.push("0");
            displayArray.push(".");
            updateDisplay();
        } else {
            displayArray.push(".");
            updateDisplay();
        }
    }
}

//Clears "display" element and "displayArray" variable.  Erasing all info on calculator
const clearButton = document.querySelector("#Escape");
clearButton.addEventListener("click", () => {
    clearCalculator();
})

//Makes the number on the display a negative number by adding "-" to the front of it
const negativeButton = document.querySelector("#n");
negativeButton.addEventListener("click", () => {
    negative();
})

document.addEventListener("keydown", (event) => {
    if (event.key === "n") {
        negative();
    }
})

function negative() {
    let arrayHasNegative = displayArray.includes("-");
    if (arrayHasNegative === true) {
       let hasNeg = displayArray.findIndex(number => number === "-");
       console.log(hasNeg);
       displayArray.splice(hasNeg, 1);
       updateDisplay();
    } else {
        displayArray.unshift("-");
        updateDisplay();
    }
}
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
const equalButton = document.querySelector("#\\=");
equalButton.addEventListener("click", () => {
    equalCalculate(); 
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
    if (calculator.operatorType === "=") {
        calculator.operatorType = operator;
        lookForNumbers();
    } else {
       lookForNumbers();
    if (calculator.secondNumber !== null) {
        calculateResult();
    } 
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
    displayArray = [result];
}

//Calculates when equal button is pressed.  Does nothing if operatorType is "" or "=";
function equalCalculate() {
    if (calculator.operatorType === "") {
        return;
    } else if (calculator.operatorType === "=") {
        return
    }   else {
        calculator.secondNumber = +displayArray.join("");
        calculateResult();
        calculator.operatorType = "=";
    }
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

const test = document.getElementsByClassName("operator");
// TODO Make CLEAR Button + Backspace button have animation or color change when pressed
const escapeButton = document.getElementById("Escape");
const BackspaceButton = document.getElementById("Backspace");

document.addEventListener("keydown", (event) => {
    for (i = 0; i < test.length; i++) {
        if (test[i].innerHTML === event.key) {
            test[i].style.backgroundColor = "red";
        };
    }
})

document.addEventListener("keyup", (event) => {
    for (i = 0; i < test.length; i++) {
        if (test[i].innerHTML === event.key) {
            test[i].style.backgroundColor = "";
        };
    }
})

const backSpace = document.getElementById("Backspace");
const resetButton = document.getElementById("Escape");
const decimalButton = document.getElementById(".");
const equalsButton = document.getElementById("="); 
const negButton = document.getElementById("n")


animationChange(resetButton);
animationChange(backSpace);
animationChange(decimalButton);
animationChange(equalsButton);
animationChange(negButton);

function animationChange(element) {
    const idString = element.id;

    document.addEventListener("keydown", (event) => {
        if (event.key === idString) {
            element.style.backgroundColor = "red"
        }
    })

    document.addEventListener("keyup", (event) => {
        if (event.key === idString) {
            element.style.backgroundColor = "";
        }
    })
    
}