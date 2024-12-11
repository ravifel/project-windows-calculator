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
        // Check if the current operation already has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }

    // Process all calculator operations
    processOperation(operation) {
        // Check if current is empty
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // Change operation
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // Get current and previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualsOperator();
                break;
            default:
                return;
        }
    }

    // Change values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        console.log(operationValue, operation, current, previous)
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Check if the value is zero, if so, just add the current value
            if (previous === 0) {
                operationValue = current;
            }
            // Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    // Change Math Operation
    changeOperation(operation) {
        const mathOperation = ["/", "*", "-", "+"];
        if (!mathOperation.includes(operation)) {
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // Clear Current Operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // Clear All Operation
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Process an Operator
    processEqualsOperator() {
        const operation = previousOperationText.innerHTML.split(" ")[1];
        this.processOperation(operation);
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
            calc.processOperation(value);
        }
    })
})