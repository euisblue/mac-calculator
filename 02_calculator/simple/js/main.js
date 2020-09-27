function operate(val) {
    let temp = result;

    // clear calculation
    if (val === 'C') {
        result = '0';
        op = '';
        return result;
    }

   if (temp === '0') temp = val;
   else {
       switch(val) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                op = val;
                opSelected = true;
                operand1 = temp;
                return '';
            case '=':
                if(operand1 != null && operand2 === null) {
                    if(op==='') return operand1;
                    if(result==='') result = operand1;
                    let expr = result + op + operand1;
                    temp = Function('"use strict"; return (' + expr + ')')();
                } 
                break;
            default:
                temp += val;
       }
   }

   return temp;
}

let op = '';
let opSelected = false;
let result = '0';
let operand1 = null;
let operand2 = null;


const resultPanel = document.querySelector('#result-panel #expr');

let buttons = document.getElementsByTagName('button');
for(let i=0; i<buttons.length; ++i) {
    let button = buttons[i];

    button.onclick =  function()  {
        result = operate(button.value);
        if (result != '') resultPanel.textContent = result;
        console.log("result: " + result);
        console.log("operand1: " + operand1);
        console.log("op:   " + op);
        console.log("operand2: " + operand2);
        console.log("size: " + (result+'').length + ' (' + result +')');
        console.log("---------------");
    };
}
