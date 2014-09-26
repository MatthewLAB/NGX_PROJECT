var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'jade');

app.get('/c/:siteID', function(req, res){
	 res.render('controller', { siteID: req.params.siteID});
});

var devices = [];  
var sites = [];  

io.on('connection', function(client) {
	client.on("join", function(type,siteID) {
		
		if(type == "site"){
			sites.push(client);
			client.emit('join ok',client.id);
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
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});