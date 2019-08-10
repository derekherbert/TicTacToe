//Global variables
var currentPlayer = 'X';
var boardSize = 3;
var moveNumber = 0; 

//Event listeners
$(window).resize(function() { updateGridDimensions(); });
$(document).ready(function() { setTimeout(function() { updateGridDimensions(); }, 10); setTimeout(function() { $('#grid').removeClass("hidden"); updateGridDimensions(); }, 15);});
$(window).click(function(e) { playerMove(e); });

//Event handler that updates the grid size dynamically
function updateGridDimensions() 
{
	var squareSize = $('.square').css('width');
	$('.square').css('height', squareSize);
	$('.square').css('width', squareSize);
	$('.square').css("font-size", squareSize);
}

function playerMove(e) 
{
	var element = $(e.target).closest('td');

	if(element.length != 0)
	{
		var row = parseInt(element.attr("row"));
		var col = parseInt(element.attr("col"));
		var squarePTag = element.find('p');
		
		if(squarePTag.text().length == 0)
		{
			moveNumber++;
			squarePTag.text(currentPlayer);
			toggleTurn();
			checkForWin();
		}		
	}
}

//Determine if a player has won the game
function checkForWin() 
{
	if(moveNumber == boardSize*boardSize)
	{
		alert("DRAW!!");
		newGame();
	}
	else
	{
		var current;

		//Check each row for a win
		for(var row = 0; row < boardSize; row++) 
		{
			current = $('#s' + row + '0 p').text();

			if(current != '' && current == $('#s' + row + '1 p').text() && current == $('#s' + row + '2 p').text())
			{
				alert("Player " + current + " wins!");
				newGame();
			}
		}
		//Check each col for a win
		for(var col = 0; col < boardSize; col++) 
		{
			current = $('#s0' + col + ' p').text();

			if(current != '' && current == $('#s1' + col + ' p').text() && current == $('#s2' + col + ' p').text())
			{
				alert("Player " + current + " wins!");
				newGame();
			}
		}
		//Check the top-left -> bot-right diagonal for a win
		current = $('#s00 p').text();
		if(current != '' && current == $('#s11 p').text() && current == $('#s22 p').text())
		{
			alert("Player " + current + " wins!");
			newGame();
		}
		//Check the bot-left -> top-right diagonal for a win
		current = $('#s20 p').text();
		if(current != '' && current == $('#s11 p').text() && current == $('#s02 p').text())
		{
			alert("Player " + current + " wins!");
			newGame();
		}
	}
}

//Convenience function to change turns
function toggleTurn() 
{
	if(currentPlayer == 'X')
	{
		currentPlayer = 'O';
	}
	else 
	{
		currentPlayer = 'X';
	}
}

function newGame() 
{
	$('#grid').find('p').text('');
	currentPlayer = 'X';
}