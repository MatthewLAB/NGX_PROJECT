# ngx-qrctl.js
#### NGX QR Controller is the world's first remote web controller via user's mobile device
============

##Usage

###(Setup to using server on Matthew LAB)

1. You need to lasjng(http://larsjung.de)'s jquery qrcode plugin.
- Download http://larsjung.de/jquery-qrcode/ and move into plugin folder

2. Add to below script code end of body tag
```javascript
</body>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
<script src="plugin/jquery.qrcode-0.11.0.min.js"></script>
<script src="plugin/ngx-qrctl.js"></script>
```
3. Make default NGX QR Control Selector
```javascript
example) <body id="ngx_area">
```
4. Initialize to NGX QR Ctl plugin
```javascript
$( "#ngx_area" ).ngxQrCtl({
    'position':'top',
    'width':10,
    'height':10
});
```
5. Now you can using user's remote control action via event handler
##### example) if user touch their ngx controller, the 'move' action will be happened. (the other event will be attached)
```javascript
$('#ngx_area').bind('move',function(event,x,y){
    $.moveCircle(x,y);
});
```

###Event Trigger List
#####Event will be added more :)

| Event Name | Argument | Description |
| --------- | ------- | ------- |
| move  | e=(x,y) | User's touching X,Y coordinate |
| btnDown  | e=('W' or 'S' or 'A' or 'D') | WSAD Button |
| swipeleft  | Null | Is left swiped |
| swiperight  | Null | Is right swiped |

###(Setup to using your own server)

1. You need to install socket.io and node.js on your server

(How to install socket.io and node.js will be attached!)

2. The other step is same as usage on matthewlab server(step 1~3 are same)

3. Initialize to NGX QR ctl plugin via your own server
```javascript
$( "#ngx_area" ).ngxQrCtl({
    'position':'top',
    'width':10,
    'height':10,
    surl:'{your_socket.io_server_url}'
});
```
