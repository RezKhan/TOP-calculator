"use strict"

const calcState = {
    hasEnteredNumber: false,
    hasEnteredDot: false,
    hasEnteredOperator: false,
    hasEnteredEquals: false,
};

function clickHandler(btn) {
    console.log(typeof btn, btn.target.value);
}

let calcButtons = document.querySelectorAll("button");
calcButtons.forEach(btn => {
    btn.addEventListener("click", clickHandler);
});

