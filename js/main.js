"use strict"

let operatorList = [];
let numberList = [];
let opSequence = [];
const calcDisplay = document.querySelector(".calcdisplay");
const calcButtons = document.querySelectorAll("button");

function clearDisabledButtons() {
    calcButtons.forEach(opbtn => opbtn.removeAttribute("disabled"));
}

function clickedOperator(btn) {
    clearDisabledButtons();
    if (numberList.length > 0) {
        opSequence.push(Number(numberList.join("")));
        numberList = [];
    }
    if (btn.target.value === "/") {

    }
    if (btn.target.value !== "=") {
        btn.target.setAttribute("disabled", true);
        operatorList.push(btn.target.value)
    }
}

function clickedNumber(btn) {
    if (operatorList.length > 0) {
        clearDisabledButtons();
        opSequence.push(operatorList.pop());
        operatorList = [];
        calcDisplay.innerHTML = "";
    }
    if (numberList.includes(".") && btn.target.value === ".")  {
        return;
    }
    numberList.push(btn.target.value);
    if (calcDisplay.innerHTML === "0") {
        calcDisplay.innerHTML = btn.target.value;
    } else {
        calcDisplay.innerHTML += btn.target.value;
    }
}

function specButton(btn) {
    // This is a bit ugly
    switch(btn.target.value) {
        case "AC":
            operatorList = [];
            numberList = [];
            opSequence = []; 
            calcDisplay.innerHTML = "0";
            clearDisabledButtons();
            break;
        case "pm":
            if (numberList[0] === "-") {
                numberList.shift();
            } else {
                numberList.unshift("-")
            }
            calcDisplay.innerHTML = numberList.join("");
            break;
        case "%":
            let tempnum = Number(numberList.join(""));
            if (tempnum > 1e-6) {
                tempnum /= 100;
                tempnum = parseFloat(tempnum.toFixed(8))
            } 
            if (tempnum < 1e-6) {
                btn.target.setAttribute("disabled", true);
                let numBtns = document.querySelectorAll(".numberbutton");
                numBtns.forEach(btn => {
                    btn.setAttribute("disabled", true);
                });
                console.log("Stop it, you have a sickness.");
            }
            calcDisplay.innerHTML = tempnum.toString();
            numberList = tempnum.toString().split("");
            break;
    }
}

function checkOpSequence() {
    let stillGood = true;
    for (let i = 0; i < opSequence.length; i += 2) {
        if (typeof opSequence[i] !== "number") {
            stillGood = false;
            if ((i + 1) < opSequence.length ) {
                if (typeof opSequence[i+1] === "string") {
                    stillGood = false;
                }
            }
        }
    }
    return stillGood;
}

function completeSequence() {
    let firstNum = opSequence.shift();
    let operator = opSequence.shift();
    let secondNum = opSequence.shift();

    switch(operator) {
        case "+":
            firstNum = firstNum + secondNum;
            break;
        case "-":
            firstNum = firstNum - secondNum;
            break;
        case "x":
            firstNum = firstNum * secondNum;
            break;
        case "/":
            firstNum = firstNum / secondNum;
            break;
    }
    opSequence.unshift(firstNum);

    if (opSequence.length > 1) {
        completeSequence();
    }
    if (opSequence.length === 0) {
        opSequence[0] = firstNum;
    }
    calcDisplay.innerHTML = opSequence[0];
}

function equalsButton() {
    clearDisabledButtons();
    if (numberList.length > 0) {
        opSequence.push(Number(numberList.join("")));
        numberList = [];
    }
    if (typeof opSequence[opSequence.length-1] === "string") {
        opSequence.pop();
    }
    if (checkOpSequence()) {
        completeSequence();
    }
}

function clickHandler(btn) {
    if (btn.target.classList.contains("operatorbutton")) {
        clickedOperator(btn);
    }
    if (btn.target.classList.contains("numberbutton")) {
        clickedNumber(btn);
    }
    if (btn.target.classList.contains("specbutton")) {
        specButton(btn);
    }
    if (btn.target.classList.contains("equalsbutton")) {
        equalsButton(btn);
    }
}

calcButtons.forEach(btn => {
    btn.addEventListener("click", clickHandler);
});
