var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.sendFile('/prj/NGX_SERVER/index.html');
});

app.get('/c/:siteID', function(req, res){
	 res.render('controller', { siteID: req.params.siteID});
});

app.get('/game', function(req, res){
  res.sendFile('/prj/NGX_SERVER/game.html');
});

var devices = [];  
var sites = [];  
var clients = [];

io.on('connection', function(client) {
	client.on("join", function(type,siteID) {
		
		if(type == "site"){
			sites.push(client);
			client.emit('join ok',client.id);
			console.log(client.id);
		}
		if(type == "device") {
			for(var i in sites){
				if(sites[i].id == siteID){
					var tdevice = {"site":sites[i], "client":client};
					devices.push(tdevice);
					break;					
				}
			}
		}
	});
	
	client.on("exit", function(type,siteID) {
		
		if(type == "site"){
			sites.push(client);
			for(var i in sites) {
				if(siteID == sites[i].id){
					sites.splice(i, i);
					break;
				}
			}
		}
		if(type == "device") {
			for(var i in devices){
				if(devices[i].client.id == client.id){
					devices.splice(i, i);
					break;
				}
			}
		}
	});
	
	// Simple Moving
	client.on('move control', function(event) {
		for(var i in devices) {
			if(devices[i].client.id == client.id){
				devices[i].site.emit('move', event);
			}
		}
	});
	
	// Button Down
	client.on('button down', function(event) {

		for(var i in devices) {
			if(devices[i].client.id == client.id){
					console.log(event);
				devices[i].site.emit('btnDown', event);
			}
		}
	});
	
	// SWipe Left
	client.on('swipeleft', function() {
		console.log("swipeleft");
		for(var i in devices) {
			if(devices[i].client.id == client.id){
				devices[i].site.emit('swipeleft');
			}
		}
	});
	
	// SWipe Right
	client.on('swiperight', function() {
		console.log("swiperight");
		for(var i in devices) {
			if(devices[i].client.id == client.id){
				devices[i].site.emit('swiperight');
			}
		}
	});
	
	// SWipe Up
	client.on('swipeup', function() {
		console.log("swipeup");
		for(var i in devices) {
			if(devices[i].client.id == client.id){
				devices[i].site.emit('swipeup');
			}
		}
	});
	
	// SWipe Down
	client.on('swipedown', function() {
		console.log("swipedown");
		for(var i in devices) {
			if(devices[i].client.id == client.id){
				devices[i].site.emit('swipedown');
			}
		}
	});
	
	// Gyro Moving 우선 제거.
	client.on('gyro control', function(event) {
		for(var i in devices) {
			if(devices[i].client.id == client.id){
				devices[i].site.emit('gyro move', event);
			}
		}
	});

});

http.listen(3000, function() {
	console.log('listening on *:3000');
});