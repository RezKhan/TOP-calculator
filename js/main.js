"use strict"

let operatorList = [];
let numberList = [];
let opSequence = [];
let calcDisplay = document.querySelector(".calcdisplay");


function clearOperationButtons() {
    let opbtns = document.querySelectorAll("button");
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
}

function clickedNumber(btn) {
    if (operatorList.length > 0) {
        clearOperationButtons();
        opSequence.push(operatorList.pop());
        operatorList = [];
        calcDisplay.innerHTML = "";
    }
    if (typeof opSequence[opSequence.length - 1] === "string") {
        // 
    }
    numberList.push(btn.target.value);
    if (calcDisplay.innerHTML === "0") {
        calcDisplay.innerHTML = btn.target.value;
    } else {
        calcDisplay.innerHTML += btn.target.value;
    }

    console.log(numberList);
}

function specButton(btn) {
    //TODO
    console.log(btn.target.value);
    switch(btn.target.value) {
        case "AC":
            operatorList = [];
            numberList = [];
            opSequence = []; 
            calcDisplay.innerHTML = "0";
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

function equalsButton() {
    // TODO
    
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

