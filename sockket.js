/* Sockket.js

Stuff to handle WebSocket communication 

*/

var ws = new WebSocket("ws://127.0.0.1:9999");

ws.onopen = function() {
    var data = ["CONNECTED", {}];
    ws.send(JSON.stringify(data));

    console.log("Connected");
};

ws.onmessage = function (evt) {
    console.log('Got message: ' + evt.data);
    parseMessage(evt.data);
};

ws.onclose = function(evt) {
    console.log("Connection closed.");
};

function sendSize(width, height) {
    var data = ["setSize", {width: width, height: height}];
    ws.send(JSON.stringify(data));
}

function parseMessage(message) {
    var message_json = JSON.parse(message);
    var func = message_json[0];
    var params = message_json[1];
    eval(func)(params);
}

function errorMsg(message) {
    ws.send('["ERROR", '+ message +']');
}

function logMessage() {
    console.log('logMessage: ' + JSON.stringify(arguments[0]['message']));
}

function getUpdate() {
    /* Don't ask for update if server hasn't set the id yet */
    if (myid) {
	var data = ["giev update", getMyData()];
	ws.send(JSON.stringify(data));
    }
}


function reboot() {
    var data = ['reboot', {}];
    clearInterval(sockettimerid);
    ws.send(JSON.stringify(data));
}


sockettimerid = setInterval(getUpdate, 50);
rendertimerid = setInterval(render, 1);
