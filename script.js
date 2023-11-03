//variables
const screen = document.querySelector('.screen');
const keys = document.querySelector('.keys');
const numbers = document.querySelectorAll('.nums');
const operators = document.querySelectorAll('.ops');
const clear = document.querySelector('.clear');
const plusOrMinus = document.querySelector('.plusorminus');
const percentage = document.querySelector('.percentage');
const equals = document.querySelector('.equals');
const divide = document.querySelector('.divide');
const multiply = document.querySelector('.times');
const subtract = document.querySelector('.minus');
const add = document.querySelector('.plus');
console.log(subtract.innerText);
console.log(multiply.innerText);
console.log(divide.innerText);


let output = 0;         //used for calculation
let previous = 0;       //used for calculation
let buffer = '';        //holds the value to displayed
let currentOp = null;   //holds an operator


//to calculate mathematical operations
function calculate() {
    if (currentOp === '+') {
        output = previous + output;
    } else if (currentOp === '−') {
        output = previous - output;
    } else if (currentOp === '×') {
        output = previous * output;
    } else if(currentOp === '÷') {
        if(output == 0) {
            output = Infinity;
        } else {
            output = previous / output;
        }
    }
    previous = 0;
    buffer = output;                //output the result
    currentOp = '=';
}

//if the button clicked is an operator
function checkOp(value) {
    if(value === 'C') {                  //to clear the screen
        output = 0;
        buffer = '0';
        currentOp = null; 
    }
    else if(value === '+/-') {          //to change sign
        output = 0 - output;
        buffer = output;
    }
    else if(value === '%') {            //to make percentage
        output /= 100;
        buffer = output;
    }
    else if(value === '=') {            //to calculate
        calculate();
    }
    else {                              //to assign operator
        buffer += value;
        previous = output;
        output = 0;
        currentOp = value;
    }
}

//if the button clicked is a number or a decimal point
function checkNumber(value) {
    if (buffer === '0') {
        buffer = '';
    }
    if(currentOp == null) {
            buffer += value;
            output = parseInt(buffer);
    } else {
            buffer+= value;
            output = output*10 + parseInt(value);
    }
}

function clickButton(value) {
    if(isNaN(value) && value !== '.') {     //checking if the button is an operator or not
        console.log('This is an operator');
        checkOp(value);
    } else {
        console.log('This is a number or a decimal point');
        checkNumber(value);
    }
}

//for testing purpose only
function testing(value) {
    console.log(value);
    console.log(isNaN(value));
    console.log(typeof(value));
}

//main function
function init() {
    keys.addEventListener('click', event => {
        clickButton(event.target.innerText);
        screen.innerText = buffer;
        console.log('buffer: ' + buffer);
        console.log('output: ' + output);
        console.log('previous: ' + previous);
        console.log('currentOp: ' + currentOp);
    });  
}

init();