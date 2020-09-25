function operate(val) {
    let temp = result;

    if (val === 'C') {
        num = result = '0';
        operation = '';
        return result;
    }
   if (temp === '0') temp = val;
   else temp += val;

   return temp;
}

let num = '0';
let operation = '';
let result = '0';

const resultPanel = document.querySelector('#result-panel #expr');

let buttons = document.getElementsByTagName('button');
for(let i=0; i<buttons.length; ++i) {
    let button = buttons[i];

    button.onclick =  function()  {
        result = operate(button.value);
        resultPanel.textContent = result;
    };
}
