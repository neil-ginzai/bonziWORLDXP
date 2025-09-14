// ========================================================================
// Server init
// ========================================================================

const fs = require('fs-extra');

try {
	stats = fs.lstatSync('settings.json');
} catch (e) {
	if (e.code == "ENOENT") {
		try {
			fs.copySync(
				'settings.example.json',
				'settings.json'
			);
			console.log("Created new settings file.");
		} catch(e) {
			console.log(e);
			throw "Could not create new settings file.";
		}
	} else {
		console.log(e);
		throw "Could not read 'settings.json'.";
	}
}




const settings = require("./settings.json");

var express = require('express');
var app = express();
if (settings.express.serveStatic)
	app.use(express.static('./build/www'));
var server = require('http').createServer(app);

var io = require('socket.io')(server);
var port = settings.port;

exports.io = io;

var sanitize = require('sanitize-html');

const Log = require('./log.js');
Log.init();
const log = Log.log;

server.listen(port, function () {
	console.log(
		" Welcome to BonziWORLD!\n",
		"----------------------\n",
		"Server listening at port " + port
	);
});
app.use(express.static(__dirname + '/public'));


const Utils = require("./utils.js")

// ========================================================================
// The Beef(TM)
// ========================================================================
const Meat = require("./meat.js");
Meat.beat();

