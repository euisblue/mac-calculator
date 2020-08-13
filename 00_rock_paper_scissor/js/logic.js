"use strict"

let running = true;
let gameCount = 0;
let timer = undefined;

const btnRock = document.getElementById('btn-rock')
const btnPaper = document.getElementById('btn-paper')
const btnScissor = document.getElementById('btn-scissor')
const computerScreen = document.getElementById('computer-selection');
let img = computerScreen.children[0];
let resultArea = document.getElementById('result')

function getComputerSelection() {
	let hand = ['rock', 'paper', 'scissor'];
	return hand[Math.floor(Math.random()*3)];
}

async function playRound(str) {
	btnRock.disabled = btnPaper.disabled = btnScissor.disabled = true;
	gameCount += 1;
	let computer = getComputerSelection();
	let c = computer[0];
	let p = str[0];
	let result = '';

	img.src = '../assets/' + computer + '.png';
	running = false;

	if(p=='r' && c=='r') {
		result = "引き分け";
	} else if(p=='p' && c=='p') {
		result = "引き分け";
	} else if(p=='s' && c=='s') {
		result = "引き分け";
	} else if(p=='r' && c=='p') {
		result = "相手の勝ち";
	} else if(p=='r' && c=='s') {
		result = "プレイヤーの勝ち";
	} else if(p=='p' && c=='r') {
		result = "プレイヤーの勝ち";
	} else if(p=='p' && c=='s') {
		result = "相手の勝ち";
	} else if(p=='s' && c=='r') {
		result = "相手の勝ち";
	} else {
		result = "プレイヤーの勝ち";
	}

	let div = document.createElement('div');
	div.textContent = result;
	resultArea.children[0].append(div)

	sleep(2000).then(() => {
		running = true;
		computerImageRandom();
		btnRock.disabled = btnPaper.disabled = btnScissor.disabled = false;
	});
}

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}

function computerImageRandom() {
	if(running) {
		let hand = ['rock', 'paper', 'scissor'];
		img.src = '../assets/' + hand[Math.floor(Math.random()*3)] + '.png';
		timer = setTimeout(play, 200);
	}
}

function play() {
	if(gameCount > 4) {
		running = false;
		btnRock.disabled = btnPaper.disabled = btnScissor.disabled = true;
		clearTimeout(timer);
	}
	else {
		computerImageRandom();
	}
}

play();
