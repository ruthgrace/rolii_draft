// Set the board dimensions over here BEFORE creating a new simple board
// Don't worry about window resize events for now. That's handled by PhysicsJS.
$('#simple-board').width(window.innerWidth);
$('#simple-board').height(window.innerHeight);

var simpleBoard = new DrawingBoard.Board('simple-board', {
	controls: false,
	webStorage: false
});