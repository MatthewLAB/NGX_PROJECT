
$(".ngxCtlPanel").height($(document).height()*0.70);
$(".ngxCtlPanel").width($(document).width()*0.90);

$(document).on("pageshow","#ngxSwipeDiv", function() {
	$("body").css({overflow:'hidden'}).unbind('touchmove',$.touchHandler);	
});

$(document).on("pagecreate","#ngxSwipeDiv", function() {

	$("#ngxSwipePanel").bind("swipeleft", function(){
		socket.emit('swipeleft');
	});
	$("#ngxSwipePanel").bind("swiperight", function(){
		socket.emit('swiperight');
	});
	$("#ngxSwipePanel").bind("swipedown", function(){
		socket.emit('swipedown');
	});
	
	$("#ngxSwipePanel").bind("swipeup", function(){
		socket.emit('swipeup');
	});
	    
});

$(document).on("pageshow","#ngxMoveXyDiv", function() {
	$("body").css({overflow:'hidden'}).bind('touchmove', $.touchHandler);
});

$(document).on("pagecreate","#ngxMoveXyDiv", function() {
	
	$("#ngxWsadPanel").bind('touchmove', function(e){
		var event = e.originalEvent;
		var xy = new Array(event.touches[0].screenX, event.touches[0].screenY);
		socket.emit('move control', xy);
		
	});  
});

$(document).on("pagecreate","#ngxWsadDiv", function() {
	$(".btnWsad").click(function(e){
		var text = $(this).prop("value");
		socket.emit('button down', text);
	});  
});

$.touchHandler = function(e){
	e.preventDefault();
}


