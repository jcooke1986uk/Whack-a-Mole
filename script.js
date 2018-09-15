$(document).ready(function() {
	// global variables
	var xPos;
	var yPos;
	
	var gameTime;
	var boxTime;

	var height;
	var width;
	
	var r;
	var g;
	var b;

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
	})
	$('#starthard').on('click', function(){
		$(this).hide();
		$('#starteasy').hide();
		easy = false;
		hard = true;
		gameSetup(easy,hard);
	})

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
			// Need a clear canvas each time a new one is drawn
			// Need to look at a different way of doing this so that multiple
			// boxes can exist at once
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			// Add a click event listener on the whole canvas to run the updateScore function
			canvas[0].addEventListener('click', updateScore, true);

			// Start drawing, bitches
			ctx.beginPath();
			if (easy == true && hard == false) {
				drawsquare(easy);
			}
			else {
				drawsquare(hard);
			}
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
		var color = randomColor();
		// get random box size
		var size = randomSize();
		// get a random x and y position
		randomPos();

		ctx.fillStyle = "rgba("+r+","+g+","+b+",1)"; 
		ctx.fillRect(xPos,yPos,size.w,size.h);
		ctx.stroke();

		if (difficulty == hard) {
			moveSquare();
		}
	}

	function randomPos(){
		// get random position between 20 (padding) and the canvas width and height
		xPos = Math.floor(Math.random() * canvas.width) + 20;
    	yPos = Math.floor(Math.random() * canvas.height) + 20;

    	// Makes sure the box will never draw over the edge of the canvas
    	// Shame it doesn't bloody work properly
    	if (xPos >= canvas.width - width)
    	{
    		xPos = xPos - width;
    	}
    	if (yPos >= canvas.height - height)
    	{
    		yPos = yPos - height;
    	}
    	return xPos,yPos;
	}

	function randomColor(){
		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);
		return r,g,b;
	}

	function randomSize() {
		var height = Math.floor(Math.random() * 200) + 30;
		var width = Math.floor(Math.random() * 200) + 30;


		return {w:width, h:height};
	}

	function moveSquare(){
		//animate square

	}

	var scoreLabel = $('#score');

	function updateScore() {
		var x = event.pageX - 20;
		var y = event.pageY - 20;
		
		if (x >= xPos && x <= xPos+width && y >= yPos && y <= yPos+height){
			score ++;
			// Stops extra points from spam clicks
			canvas[0].removeEventListener('click', updateScore, true);
		}
		else {
			score --;
		}
		
		scoreLabel.text(score);
	}
})
