$(document).ready(function() {
	// global variables
	var xPos = 0;
	var yPos = 0;
	
	var gameTime = 0;
	var boxTime = 0;

	var boxHeight = 0;
	var boxWidth = 0;
	
	var r = 0;
	var g = 0;
	var b = 0;

	var easy = true;
	var hard = false;

	//define canvas
	var canvas = $("#canvas");
	var ctx = canvas[0].getContext("2d");
	canvas.width = 800;
	canvas.height = 400;


	$('#starteasy').on('click', function(){
		// Hide the start buttons
		$(this).hide();
		$('#starthard').hide();
		//Set game difficulty
		easy = true;
		hard = false;
		gameSetup(easy,hard);
	});
	// Start Hard game not yet implemented
	$('#starthard').on('click', function(){
		$(this).hide();
		$('#starteasy').hide();
		easy = false;
		hard = true;
		gameSetup(easy,hard);
	});

	function gameSetup(easy,hard){

		// Check if there is a custom game time
		if ($('#gameTime').val()){
			gameTime = $('#gameTime').val();
		}
		else {
			gameTime = 45;
		}

		$('#timer').text(gameTime);

		// Check if there is a custom box duration time
		if ($('#boxTime').val()) {
			boxTime = $('#boxTime').val()*1000;
		}
		else {
			boxTime = 2000;
		}

		// Make sure score is definitely zero
		score = 0;
		$('#score').text(score);

		// Make sure the canvas is clear
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	
		// Set up the timer interval
		var timer = setInterval(function(){
			// Need a clear canvas each time a new box is drawn
			// Need to look at a different way of doing this so that multiple
			// boxes can exist at once
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			// Add a click event listener on the whole canvas to run the updateScore function
			canvas[0].addEventListener('click', updateScore, true);

			// Start drawing
			ctx.beginPath();
			if (easy == true && hard == false) {
				var drawnSquare = drawsquare(easy);
			}
			//else {
			//	drawsquare(hard);
			//}
		}, boxTime);

		// Start the clock function counting
		startclock(gameTime);

		// Ends game timer interval and removed the updateScore click event
		setTimeout(function() {
			clearInterval(timer); 
			canvas[0].removeEventListener('click', updateScore, true);
		}, gameTime*1000);
	}
	
	function startclock() {
		// starts counter
		var countdown = setInterval(function(){
			gameTime--; 
			$('#timer').text(gameTime); 
		}, 1000);

		// Ends counter
		setTimeout(function() { 
			clearInterval(countdown); 
			$('#starteasy').show();
			$('#starthard').show();
		}, gameTime*1000);
		// Timer sometimes ends on -1 not 0
	}

	function drawsquare(difficulty){
		// get random rgb color
		randomColor();
		// get random box size
		randomSize();
		// get a random x and y position
		randomPos();

		ctx.fillStyle = "rgba("+r+","+g+","+b+",1)"; 
		ctx.fillRect(xPos,yPos,boxWidth,boxHeight);
		ctx.stroke();

		//if (difficulty == hard) {
		//	moveSquare();
		//}
	}

	function randomPos(){
		// get random position between 20 (padding) and the canvas width and height
		xPos = Math.floor(Math.random() * canvas.width) + 20;
    	yPos = Math.floor(Math.random() * canvas.height) + 20;

    	// Makes sure the box will never draw over the edge of the canvas
    	if (xPos >= canvas.width - boxWidth)
    	{
    		xPos = xPos - boxWidth;
    	}
    	if (yPos >= canvas.height - boxHeight)
    	{
    		yPos = yPos - boxHeight;
    	}
	}

	function randomColor(){
		// Get a random number up to 255.
		// Make sure the number is lowered to zero decimal places
		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);
	}

	function randomSize() {
		// Random number between 30 and 200
		boxHeight = Math.floor(Math.random() * 200) + 30;
		boxWidth = Math.floor(Math.random() * 200) + 30;
	}

	function moveSquare(){
		//animate square
	}

	var scoreLabel = $('#score');

	function updateScore() {
		var x = event.pageX - 20;
		var y = event.pageY - 20;
		// Check if click is within bounds of the drawn element
		if (x >= xPos && x <= xPos+boxWidth && y >= yPos && y <= yPos+boxHeight){
			score ++;
			// Stops extra points from spam clicks
			canvas[0].removeEventListener('click', updateScore, true);
		}
		else {
			// If you want to lose extra points from spam clicks, be my guest
			score --;
		}
		
		scoreLabel.text(score);
	}
})
