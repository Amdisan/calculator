"use strict";

const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

//calc depend on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => {
    console.log(firstNumber, secondNumber);
    return secondNumber;
  },
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    if (calculatorDisplay.textContent === "0") {
      calculatorDisplay.textContent = number;
    } else {
      calculatorDisplay.insertAdjacentText("beforeend", number);
    }
  }
}

function addDecimal() {
  //prevent decimal after operator
  if (awaitingNextValue) return;

  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);

  //prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //store operator - ready for the next value
  awaitingNextValue = true;
  //must be here -> calculation uses previous operator
  operatorValue = operator;
}

//reset display
function resetAll() {
  calculatorDisplay.textContent = "0";
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
}

//events
inputBtns.forEach((btn) => {
  if (btn.classList.length === 0) {
    btn.addEventListener("click", () => sendNumberValue(btn.value));
    return;
  }
  if (btn.classList.contains("operator")) {
    btn.addEventListener("click", () => useOperator(btn.value));
    return;
  }
  if (btn.classList.contains("decimal")) {
    btn.addEventListener("click", addDecimal);
    return;
  }
});

clearBtn.addEventListener("click", resetAll);
