function calculate() {
    while(operand1.length > 1 && operand1[0] === '0') {
        operand1 = operand1.slice(1);
        console.log("HELLLLLLLL: " + operand1);
    }

    while(operand2.length > 1 && operand2[0] === '0') {
        console.log(operand2);
        operand2 = operand2.slice(1);
    }

    let expr = operand1 + op + operand2;
    return (Function('"use strict"; return (' + expr + ')')())+'';
}

function operate(val) {
    let temp = result;

    // clear calculation
    if (val === 'C') {
        op = '';
        result = '';
        operand1 = '';
        operand2 = '';
        saved = '';
        resultPanel.textContent = '0';
        resultPanel.style.fontSize = '45px';

        return '';
    }

    switch(val) {
        case 'sign':
            temp *= -1;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            reset = false;
            if(operand2 != '') {
                operand1 = calculate();
                operand2 = '';
            } else {
                operand1 = result;
            }
            op = val;
            break;
        case '=':
            if(op==='') break;
            if(operand2 === '') operand2 = saved;
            else if(operand2 === temp*-1) operand2 = temp;
            temp = calculate();
            operand1 = temp;
            operand2 = '';
        
            reset = true;
            break;
        default:
            // temp += val;
            if(op === '') {
                operand1 += val;
                temp = operand1;
                reset = false;
            }  else if (reset) {
                operand1 = val;
                temp = operand1;
                op = '';
            } else { 
                operand2 += val;
                temp = operand2;
                saved = operand2;
            }
    }

   return temp;
}

let op = '';
let result = '';
let operand1 = '';
let operand2 = '';
let saved = '';
let reset = false;

const resultPanel = document.querySelector('#result-panel #expr');

document.querySelector('body').addEventListener('keydown', (e) => {
    console.log(e.key);
    switch(e.key) {
        case '1':
        case '2': 
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
        case 'sign':
            result = operate(e.key);
            break;
        case 'Backspace':
            if(result.length === 1) {
                result = '0';
            } else {
                result = result.slice(0, -1);
            }
            if(operand2 != '') operand2 = result;
            else operand1 = result;
            resultPanel.textContent = result;
            break;
        case 'Enter':
            result = operate('=');
            break;
        default:
    }
    if (result != '') resultPanel.textContent = result;
    if((result+'').length > 17) {
        resultPanel.style.fontSize = '23px';
    } else if((result+'').length > 14) {
        resultPanel.style.fontSize = '29px';
    } else if((result+'').length > 10) {
        resultPanel.style.fontSize = '35px';
    } else if((result+'').length > 0) {
        resultPanel.style.fontSize = '45px';
    }

    console.log("result: " + result);
        console.log("operand1: " + operand1);
        console.log("op:   " + op);
        console.log("operand2: " + operand2);
        console.log("saved: " + saved);
        console.log("size: " + (result+'').length + ' (' + result +')');
        console.log("---------------");
})

let buttons = document.querySelectorAll('#button-panel button');
for(let i=0; i<buttons.length; ++i) {
    let button = buttons[i];
    
    button.onclick =  function()  {
        result = operate(button.value);
        if (result != '') resultPanel.textContent = result;
        if((result+'').length > 17) {
            resultPanel.style.fontSize = '23px';
        } else if((result+'').length > 14) {
            resultPanel.style.fontSize = '29px';
        } else if((result+'').length > 10) {
            resultPanel.style.fontSize = '35px';
        } else if((result+'').length > 0) {
            resultPanel.style.fontSize = '45px';
        } 

        console.log("result: " + result);
        console.log("operand1: " + operand1);
        console.log("op:   " + op);
        console.log("operand2: " + operand2);
        console.log("saved: " + saved);
        console.log("size: " + (result+'').length + ' (' + result +')');
        console.log("---------------");
    };
}
