
var charsetTbl = [
	['A','B','C','D','E','F','G','H'],
	['I','J','K','L','M','N','O','P'],
	['Q','R','S','T','U','V','W','X'],
	['Y','Z','a','b','c','d','e','f'],
	['g','h','i','j','k','l','m','n'],
	['o','p','q','r','s','t','u','v'],
	['w','x','y','z','0','1','2','3'],
	['4','5','6','7','8','9','+','/'],
	['=']
];

var charsetMap = [
	[0,1,2,3,4,5,6,7],
	[10,11,12,13,14,15,16,17],
	[20,21,22,23,24,25,26,27],
	[30,31,32,33,34,35,36,37],
	[40,41,42,43,44,45,46,47],
	[50,51,52,53,54,55,56,57],
	[60,61,62,63,64,65,66,67],
	[70,71,72,73,74,75,76,77],
	[80,81,82,83,84,85,86,87],
	[90]
];


function printMousePos(event) {

	var div = document.getElementById('incoming');
	div.innerHTML += "X: " + event.clientX + " - Y: " + event.clientY + "\n";
}

function pushMap(area) {
	incoming.innerHTML += area.title
   console.log(area.title);
}
function decodeMap() {
	var decodedData = atob(incoming.value);
	original.value = decodedData;
	console.log(decodedData);
}

// Main
var incoming = document.getElementById('incoming');
var original = document.getElementById('original');
incoming.scrollTop = incoming.scrollHeight;
var map = document.getElementById("map"); 
var dbutton = document.getElementById("dbutton"); 

// Event Listeners
// document.addEventListener("click", printMousePos); // for mouse position
map.addEventListener("click", function(e) { 
    pushMap(e.target);
});
dbutton.addEventListener("click", function(e) { 
    decodeMap(e.target);
});




