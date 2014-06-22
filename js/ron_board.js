// Set the board dimensions over here BEFORE creating a new simple board
$('#simple-board').width(window.innerWidth);
$('#simple-board').height(window.innerHeight);

var simpleBoard = new DrawingBoard.Board('simple-board', {
	controls: false,
	webStorage: false
});