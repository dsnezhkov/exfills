const robot = require("robotjs");
const sleep = require('sleep');
const fs    = require('fs');
const btoa  = require('btoa');
const commandLineArgs = require('command-line-args')


function getMouseCoords(){
    var mousecoords = [];
    mouseCoordObj = robot.getMousePos()
    mousecoords.push(mouseCoordObj.x);
    mousecoords.push(mouseCoordObj.y);
    return mousecoords;
}

function getPixelColor(x,y){
	return robot.getPixelColor(x,y);
}

function recordPixel(hexcolor, x, y){

    if ( (Hexcolor['current'] != hexcolor) && (hexcolor != fenceControl)){

        Hexcolor['current']=hexcolor;
        console.log("Recording New Data #" + hexcolor + " at x:" + x + " y:" + y);

        // Skip Start/Stop markers
        if ( hexcolor != startControl && hexcolor !=stopControl ){
            var rgB = hexcolor.slice(-2); // last two hex
            var rgB64=String.fromCharCode(parseInt(rgB,16)); // convert to B64 ASCII
            //fs.appendFileSync('log.txt', hexcolor + '\n');
            fs.appendFile(log, rgB64, function(err) {
                if (err) throw err;
            });
        }else{
            console.log("Start/Stop #" + hexcolor);
        }

    }else{
        if (hexcolor == fenceControl) {
            Hexcolor['current']='ffffff'; // guard reset
            //console.log("Fence #" + hexcolor);
        }

    }

}

function readPixel(polldelay, coords){
    let x = coords[0];
    let y = coords[1];


    console.log("Will Poll on coordinates =>  x:" + x + " y:" + y +
                " with delay of " + polldelay);

    console.log("Creating Log: " + log)
    fs.closeSync(fs.openSync(log, 'w'));

    let startTrigger=false
    let stopTrigger=false

    while(1){

        // Exit polling
        if (stopTrigger == true) {return}

        sleep.msleep(polldelay);

        let hexcolor = getPixelColor(x,y);

        // Start polling
        if (hexcolor == startControl){
            startTrigger = true
        }

        if( startTrigger == true){
            recordPixel(hexcolor, x, y);
        }

        // Stop polling
        if (hexcolor == stopControl){
            startTrigger=false
            stopTrigger=true
            recordPixel(hexcolor, x, y);
            console.log("Done");
        }
    }

}

function convertFile(){

    fs.readFile(log, 'ascii', function (err,b64data) {
        if (err) {
            return console.log(err);
        }

        data = new Buffer(b64data, 'base64');
        fs.writeFile(out, data, (err) => {
            if (err) throw err;
            console.log('The file has been converted.');
        });
    });
}

/*
 Examples:
 // Calibrate: get exact pixel location under mouse
 node color.js  -c
 // Poll from specific coordinates without use of a mouse
 node color.js  -m coords  -x 1179 -y 248
 // Poll from specific coordinates without use of a mouse, and specify poll delay (ms)
 node color.js  -m coords  -x 1179 -y 248 -p 50
 // Poll from coordinates with use of a mouse
 node color.js  -m mouse
 // Poll from coordinates with use of a mouse, and specify poll delay (ms)
 node color.js  -m mouse -p 50
 // Poll and save B64 into log.txt, and then convert into binary into hello.recv
 node color.js  -m coords -x 978 -y 228 -p 10 -l ./log.txt -o hello.recv
 */
const optionDefinitions = [
    { name: 'calibrate', alias: 'c', type: Boolean },
    { name: 'method', alias: 'm', type: String, multiple: false },
    { name: 'lat', alias: 'x', type: Number },
    { name: 'long', alias: 'y', type: Number },
    { name: 'polldelay', alias: 'p', type: Number },
    { name: 'log', alias: 'l', type: String, multiple: false },
    { name: 'out', alias: 'o', type: String, multiple: false }
]

const options = commandLineArgs(optionDefinitions)

var Hexcolor = {};
var stopControl='00ff00';
var startControl='ff0000';
var fenceControl='ff00ff';
let polldelay=20 // default poll delay
let log='./log.txt' // default log file
let out='./a.out' // default output file

if ( options.calibrate === true) {
    while(1) {
        let coords = getMouseCoords();
        console.log("MC:    -x " + coords[0] + " -y " + coords[1]);
        sleep.msleep(100);
    }
    return
}
if ( 'polldelay' in options ){
   polldelay=options.polldelay;
}
if ( 'out' in options ){ out = options.out }
if ( 'log' in options ){ log = options.log }

switch(options.method) {
    case 'mouse':
        readPixel(polldelay,getMouseCoords())
        break;
    case 'coords':
        if (( 'long' in options)  && ('lat' in options )){
            readPixel(polldelay,[options.lat, options.long])
            convertFile();
        }else{
            console.log("Logitude and Lattitude need to be specified");
        }
        break;
    default:
        console.log('Methods: <<mouse|coords>>');
        return
}


