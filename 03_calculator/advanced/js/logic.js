'use strict';

const normalKeys = document.querySelectorAll('#normal-keys button');
const fnKeys = document.querySelectorAll('#fn-keys button');
const displayArea = document.getElementById('display');
const baseOptionInputs = document.querySelectorAll('div#base-option input');
const baseOptionLabels = document.querySelectorAll('div#base-option label');

let numberEntered = false;
let expr = '';
let val = '';
let memory = '0';

const baseOptions = [baseOptionInputs[0], baseOptionInputs[1], baseOptionInputs[2], baseOptionInputs[3]];
const baseNumbers = [baseOptionInputs[4], baseOptionInputs[5], baseOptionInputs[6], baseOptionInputs[7]];
baseOptions.forEach(base => {
	base.addEventListener('click', () => {
		if(base.value === 'dec') base10Keys();
		else if (base.value === 'hex') base16Keys();
		else if (base.value === 'oct') base8Keys();
		else if (base.value === 'bin') base2Keys();
	});
});

baseOptionLabels.forEach(label => {
	label.addEventListener('click', () => {
		if(label.textContent === 'Hex') {
			base16Keys();
			baseOptions[0].checked = true;
			label.style.borderBottom = '1px solid #7bceff';
			for(let i=1; i<4; ++i) baseOptionLabels[i].style.border = 'none';
		} else if(label.textContent === 'Dec') {
			base10Keys();
			baseOptions[1].checked = true;
			label.style.borderBottom = '1px solid #7bceff';
			baseOptionLabels[0].style.border = 'none';
			baseOptionLabels[2].style.border = 'none';
			baseOptionLabels[3].style.border = 'none';
		} else if(label.textContent === 'Oct') {
			base8Keys();
			baseOptions[2].checked = true;
			label.style.borderBottom = '1px solid #7bceff';
			baseOptionLabels[0].style.border = 'none';
			baseOptionLabels[1].style.border = 'none';
			baseOptionLabels[3].style.border = 'none';
		}	else if(label.textContent === 'Bin') {
			base2Keys();
			baseOptions[3].checked = true;
			label.style.borderBottom = '1px solid #7bceff';
			for(let i=0; i<3; ++i) baseOptionLabels[i].style.border = 'none';
		}
	});
});

function evaluate(expr) {
	return Function('"use strict"; return (' + expr + ')')();
}

function base16Keys() {
	console.log('hexa keys');
	document.getElementById('btn-A').disabled = false;
	document.getElementById('btn-B').disabled = false;
	document.getElementById('btn-C').disabled = false;
	document.getElementById('btn-D').disabled = false;
	document.getElementById('btn-E').disabled = false;
	document.getElementById('btn-F').disabled = false;
	for(let i=0; i<10; ++i)
		document.getElementById('btn-'+i).disabled = false;

	document.getElementById('btn-xto10y').disabled = true;
	document.getElementById('btn-dot').disabled = true;
}

function base10Keys() {
	for(let i=0; i<10; ++i)
		document.getElementById('btn-'+i).disabled = false;
	document.getElementById('btn-dot').disabled = false;
	document.getElementById('btn-xto10y').disabled = false;

	document.getElementById('btn-A').disabled = true;
	document.getElementById('btn-B').disabled = true;
	document.getElementById('btn-C').disabled = true;
	document.getElementById('btn-D').disabled = true;
	document.getElementById('btn-E').disabled = true;
	document.getElementById('btn-F').disabled = true;
}

function base8Keys() {
	for(let i=0; i<8; ++i)
		document.getElementById('btn-'+i).disabled = false;

	document.getElementById('btn-dot').disabled = true;
	document.getElementById('btn-A').disabled = true;
	document.getElementById('btn-B').disabled = true;
	document.getElementById('btn-C').disabled = true;
	document.getElementById('btn-D').disabled = true;
	document.getElementById('btn-E').disabled = true;
	document.getElementById('btn-F').disabled = true;
	document.getElementById('btn-xto10y').disabled = true;
	document.getElementById('btn-8').disabled = true;
	document.getElementById('btn-9').disabled = true;
}

function base2Keys() {
	for(let i=2; i<10; ++i)
		document.getElementById('btn-'+i).disabled = true;
	document.getElementById('btn-dot').disabled = true;
	document.getElementById('btn-xto10y').disabled = true;
	document.getElementById('btn-A').disabled = true;
	document.getElementById('btn-B').disabled = true;
	document.getElementById('btn-C').disabled = true;
	document.getElementById('btn-D').disabled = true;
	document.getElementById('btn-E').disabled = true;
	document.getElementById('btn-F').disabled = true;
}

normalKeys.forEach(key => {
	key.addEventListener('click', () => {

		if(key.value === '=') {
			if(expr === '') return;
			expr += val
			val = '';
			let answer = evaluate(expr);
			displayArea.children[0].value = answer;
			expr = answer;
			answer = Math.floor(answer);
			baseNumbers[0].value = Number(answer).toString(16);
			baseNumbers[1].value = answer;
			baseNumbers[2].value = Number(answer).toString(8);
			baseNumbers[3].value = (answer>>>0).toString(2);;
		} else {
			let t = displayArea.children[0];

			if (Number(key.value) >= 0 && Number(key.value) <= 9) {
				if(numberEntered == false || t.value==='0'){
					t.value = key.value
					val += key.value;
					numberEntered = true;
				} else {
					t.value += key.value
					val += key.value;
				}
				baseNumbers[0].value = Number(val).toString(16);
				baseNumbers[1].value = val;
				baseNumbers[2].value = Number(val).toString(8);
				baseNumbers[3].value = (val>>>0).toString(2);;
			} else {
				numberEntered = false;
				expr += (val + key.value);
				val = '';
			}
		}
		console.log("val: " + val + "   expr: " + expr);
	});
});

fnKeys.forEach(key => {
	key.addEventListener('click', () => {
		let t = displayArea.children[0];
		if(key.value === "C") {
			t.value = '0';
			val = '';
			baseNumbers[0].value = '0';
			baseNumbers[1].value = '0';
			baseNumbers[2].value = '0';
			baseNumbers[3].value = '0';
		} else if (key.value === "AC") {
			displayArea.children[0].value = 0;
			expr = ''
			val = '';
			baseNumbers[0].value = '0';
			baseNumbers[1].value = '0';
			baseNumbers[2].value = '0';
			baseNumbers[3].value = '0';
		} else if (key.value === '(' || key.value === ')') {
			val += key.value;
		} else if (key.value === "+-") {
			if(Number(val) > 0) {
				val = '-' + val;
			} else {
				val = val.split('-')[1];
			}
			t.value = val;
		} else if (key.value === 'backspace') {
			val = val.slice(0, -1);
			t.value = val;
		} else if (key.value == 'MS' ) {
			memory = t.value;
		} else if (key.value == 'MC' ) {
			memory = '';
		} else if (key.value == 'MR') {
			t.value = memory;
			val = memory;
		} else if (key.value == 'M+') {
			memory = evaluate(memory + '+' + t.value);		
		}
		console.log("val: " + val + "   expr: " + expr + '    memory: ' + memory);

		if(memory === '0' || memory === '') {
			document.getElementById('btn-mr').disabled = true;
		} else {
			document.getElementById('btn-mr').disabled = false;
		}
	});
});

window.onload = base10Keys();
