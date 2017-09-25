
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

function renderMap() {
	incoming.value=transitionalDataBag.join("");
}
function pushMap(area) {
   //console.log(area.title);
	transitionalDataBag.push(area.title);	
}
function clearResults() {
	incoming.value = '';
	original.value = '';
}
function decodeMap() {
	decodedData = atob(transitionalDataBag.join(""));
	original.value = decodedData;
	console.log(decodedData);
}

var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (byteData, dtype, fileName) {
            var blob = new Blob([byteData], {type: dtype}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

// Human Redable
function saveFileA(){

   fileName = makeFName(8) + ".txt";

	saveData(decodedData, "text/plain", fileName);
}

// Binary
function saveFileB(){

   fileName = makeFName(8) + ".bin";

   var byteDataNumbers = new Array(decodedData.length);
	for (var i = 0; i < decodedData.length; i++) {
   	byteDataNumbers[i] = decodedData.charCodeAt(i);
	}
   var byteDataBin = new Uint8Array(byteDataNumbers);
	saveData(byteDataBin, "application/octet-stream", fileName);
}

function makeFName(len) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


// Main
var incoming = document.getElementById('incoming');
var original = document.getElementById('original');
incoming.scrollTop = incoming.scrollHeight;
var map = document.getElementById("map"); 
var dbutton = document.getElementById("dbutton"); 
var sbutton = document.getElementById("sbutton"); 
var abutton = document.getElementById("abutton"); 
var cbutton = document.getElementById("cbutton"); 
var decodedData;
var transitionalDataBag = [];

// Event Listeners
map.addEventListener("click", function(e) { 
    pushMap(e.target);
});
rbutton.addEventListener("click", function(e) { 
    renderMap(e.target);
});
dbutton.addEventListener("click", function(e) { 
    decodeMap(e.target);
});
sbutton.addEventListener("click", function(e) { 
    saveFileB(e.target);
});
abutton.addEventListener("click", function(e) { 
    saveFileA(e.target);
});
cbutton.addEventListener("click", function(e) { 
    clearResults(e.target);
});




