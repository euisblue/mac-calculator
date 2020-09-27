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

   if (temp === '0') return operand1;
   else {
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
                    let expr = operand1 + op + operand2;
                    operand1 = Function('"use strict"; return (' + expr + ')')();
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
                let expr = operand1 + op + operand2;
                temp = Function('"use strict"; return (' + expr + ')')();
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

let buttons = document.getElementsByTagName('button');
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
