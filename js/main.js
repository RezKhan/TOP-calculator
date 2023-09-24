"use strict"

const calcState = {
    hasEnteredNumber: false,
    hasEnteredDot: false,
    hasEnteredOperator: false,
    hasEnteredEquals: false,
};

let operatorList = [];
let numberList = [];
let opSequence = [];


function clearOperationButtons() {
    let opbtns = document.querySelectorAll("button.operatorbutton");
    opbtns.forEach(opbtn => opbtn.removeAttribute("disabled"));
}

function clickedOperator(btn) {
    clearOperationButtons();
    if (numberList.length > 0) {
        opSequence.push(Number(numberList.join("")));
        numberList = [];
    }
    console.log(opSequence);
    if (btn.target.value !== "=") {
        btn.target.setAttribute("disabled", true);
        operatorList.push(btn.target.value)
    }
    // console.log(operatorList);
}

function clickedNumber(btn) {
    if (operatorList.length > 0) {
        clearOperationButtons();
        opSequence.push(operatorList.pop());
        operatorList = [];
    }
    numberList.push(btn.target.value);
    console.log(numberList);
}

function specButten(btn) {
//TODO
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

let calcButtons = document.querySelectorAll("button");
calcButtons.forEach(btn => {
    btn.addEventListener("click", clickHandler);
});

