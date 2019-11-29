const gridContainer=document.querySelector('#grid-container');
//buttons
const clear=document.querySelector('#clear');
clear.addEventListener('click', clearGrid);
const randomColor=document.querySelector('#random-color');
randomColor.addEventListener('click', defineRandomColor);
const defaultBlack=document.querySelector('#default-black');
defaultBlack.addEventListener('click', defineBlackColor);
const darken=document.querySelector('#darken');
darken.addEventListener('mouseover', defineShadowColor);
const resize=document.querySelector('#resize');
resize.addEventListener('click', resizeGrid);
//end buttons
const gridDivs=document.getElementsByClassName('grid-item');

//hold color while resize
var switchHoldColor = 0;


for (let i = 0; i < 256; i++){
	const gridItem=document.createElement('div');
	gridItem.setAttribute("class", "grid-item");
	gridContainer.appendChild(gridItem);
}


defineBlackColor();


function defineBlackColor(){
	switchHoldColor=0;
	cleanListeners();
	for(let j=0; j<gridDivs.length; j++){
		gridDivs[j].addEventListener('mouseover', setBlackColor);
	}
}

function setBlackColor(){
	this.style.backgroundColor="black";
}


function defineRandomColor(){
	switchHoldColor=1;
	cleanListeners();
	for(let j=0; j<gridDivs.length; j++){	
		gridDivs[j].addEventListener('mouseover', setRandomColor);
	}
}

function setRandomColor(){
	let r=Math.floor(Math.random()*256);
	let g=Math.floor(Math.random()*256);
	let b=Math.floor(Math.random()*256);
	this.style.backgroundColor="rgb("+r+","+g+","+b+")";
}


function defineShadowColor(){
	switchHoldColor=2;
	cleanListeners();
	for(let j=0; j<gridDivs.length; j++){
		gridDivs[j].addEventListener('mouseover', setShadowColor);
	}

}

function setShadowColor(){
	let controlBright=this.style.filter;
	if (controlBright=='') {
		this.style.filter="brightness(90%)";
	}
	if (controlBright=="brightness(90%)") {
		this.style.filter="brightness(80%)";
	}
	if (controlBright=="brightness(80%)") {
		this.style.filter="brightness(70%)";
	}
	if (controlBright=="brightness(70%)") {
		this.style.filter="brightness(60%)";
	}
	if (controlBright=="brightness(60%)") {
		this.style.filter="brightness(50%)";
	}
	if (controlBright=="brightness(50%)") {
		this.style.filter="brightness(40%)";
	}
	if (controlBright=="brightness(40%)") {
		this.style.filter="brightness(30%)";
	}
	if (controlBright=="brightness(30%)") {
		this.style.filter="brightness(20%)";
	}
	if (controlBright=="brightness(20%)") {
		this.style.filter="brightness(10%)";
	}
	if (controlBright=="brightness(10%)") {
		this.style.filter="brightness(0%)";
	}
}

function cleanListeners(){
	for(let j=0; j<gridDivs.length; j++){
		gridDivs[j].removeEventListener('mouseover', setBlackColor);
		gridDivs[j].removeEventListener('mouseover', setRandomColor);
		gridDivs[j].removeEventListener('mouseover', setShadowColor);
	}
}

function clearGrid(){
	for(let j=0; j<gridDivs.length; j++){
	gridDivs[j].style.backgroundColor= "#eff2ef";
	gridDivs[j].style.filter="";
	}
}

function resizeGrid(){
	
	newSize = prompt("Insert a number with the new dimensions for the grid");
	
	if (isNaN(newSize)||newSize=="") {
		alert("The entered value is not a number, please try again and insert a number");
		return;
	}
	if (newSize==null) {
		return;
	}

	gridContainer.style.setProperty("grid-template-columns", "repeat("+newSize+", 1fr)");
	gridContainer.style.setProperty("grid-template-rows", "repeat("+newSize+", 1fr)");
	//remove current divs
	while(gridContainer.hasChildNodes()){
		gridContainer.removeChild(gridContainer.firstChild);
	}
	newSize=newSize*newSize;
	//add new divs
	for (let i = 0; i < newSize; i++){
	const gridItem=document.createElement('div');
	gridItem.setAttribute("class", "grid-item");
	gridContainer.appendChild(gridItem);
	}

	if (switchHoldColor==0) {
		defineBlackColor();	
	}
	if (switchHoldColor==1) {
		defineRandomColor();
	}
	if (switchHoldColor==2) {
		defineShadowColor();
	}
	
}