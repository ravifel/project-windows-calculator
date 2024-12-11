// Access HTML elements
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

// Application logic
class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText; // Value displayed on screen
        this.currentOperationText = currentOperationText; // Value displayed on screen
        this.currentOperation = ""; // Value entered by the user
    }

    // Add digit on calculator screen
    addDigit(digit) {
        this.currentOperation = digit;
        this.updateScreen()
    }

    // Change values of the calculator screen
    updateScreen() {
        this.currentOperationText.innerText += this.currentOperation;
    }
}

// Object instantiation
const calc = new Calculator(previousOperationText, currentOperationText);

// Events that will be used for the calculator to work
buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        // Text of the button clicked
        // The methods will be activated according to the button clicked
        const value = event.target.innerText;

        if (+value >= 0 || value === ".") {
            // Try to convert the received value to a number
            console.log(value);
            calc.addDigit(value);

        } else {
            console.log("Operation: " + value);
        }
    })
})