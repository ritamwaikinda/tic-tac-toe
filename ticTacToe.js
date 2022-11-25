//Game state
/* It's creating a constant variable called players and assigning it to an array of strings. */
const players = ["O", "X"];
/* It's creating a constant variable called gameBoard and assigning it to an array of strings. */
const gameBoard = ["", "", "", "", "", "", "", "", ""];
/* It's creating two variables called currentPlayer and gameBoardElement and assigning them to
undefined. */
let currentPlayer;
let gameBoardElement;

/**
 * This function creates an h1 element, sets its text content to the title argument, and appends it to
 * the body.
 * @param title - The title of the game.
 */
const gameTitle = (title) => {
	const titleElement = document.createElement("h1");
	titleElement.textContent = title;
	document.body.appendChild(titleElement);
};

/**
 * This function creates a div element with the class of game-board and returns it.
 * @returns A div element with the class "game-board"
 */
const makeGameBoardElement = () => {
	const gameBoardElement = document.createElement("div");
	gameBoardElement.classList.add("game-board");
	return gameBoardElement;
};

/**
 * We're creating a function that creates a div element, adds a class to it, and adds an event listener
 * to it that changes the text content of the div to the current player, updates the gameboard array,
 * checks if anyone has won, and switches players.
 * @param squareNumber - the number of the square that's being created.
 * @returns The gameSquare element.
 */
const makeSquareElements = (squareNumber) => {
	/* It's creating a div element and adding a class to it. */
	const gameSquare = document.createElement("div");
	gameSquare.classList.add("square");

	//through this event listener, we have access to the event that's fired as a variable object.
	gameSquare.addEventListener(
		"click",
		(event) => {
			//the event object has 'target' which is the html element that's being pressed, so we're destructuring it.
			/* It's destructuring the event object. */
			const { target } = event;
			/* It's changing the text content of the target to the current player. */
			target.textContent = currentPlayer;
			//Now we want to let our js gameboard know which piece has been selected/updated.
			/* It's updating the gameBoard array with the current player. */
			gameBoard[squareNumber] = currentPlayer;
			//has anyone won?
			/* It's checking the gameBoard array to see if anyone has won. */
			checkBoard();
			//we also want to switch players
			/* It's switching the current player. */
			switchPlayer();
		},
		//feature of event listener - square can only be clicked once (before implementing this, you could click on a square 1000 times and it would just keep changing from X to O to X to O)
		/* It's a feature of the event listener that allows the square to only be clicked once. */
		{ once: true }
	);

	return gameSquare;
};

const checkBoard = () => {
	/* It's creating a constant variable called winningStates and assigning it to an array of arrays. */
	const winningStates = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	/* It's checking the gameBoard array to see if anyone has won. */
	for (let winState of winningStates) {
		const [positionOne, positionTwo, positionThree] = winState;

		if (
			gameBoard[positionOne] !== "" &&
			gameBoard[positionOne] === gameBoard[positionTwo] &&
			gameBoard[positionOne] === gameBoard[positionThree]
		) {
			completeGame(`${gameBoard[positionOne]} wins!`);
			return;
		}
	}

	/* It's checking the gameBoard array to see if all of the squares have been used. */
	const allSquaresUsed = gameBoard.every((square) => square !== "");
	if (allSquaresUsed) {
		alert(`It's a draw!`);
	}
};

/**
 * If the current player is player 1, then make the current player player 2, otherwise make the current
 * player player 1
 */
const switchPlayer = () => {
	if (currentPlayer === players[0]) {
		currentPlayer = players[1];
	} else {
		currentPlayer = players[0];
	}
};

/**
 * It creates an overlay element, adds a message and a restart button to it, and then appends it to the
 * body
 * @param message - The message to display in the overlay.
 */
const completeGame = (message) => {
	const overlayElement = document.createElement("div");
	overlayElement.style.position = "fixed";
	overlayElement.style.top = "0";
	overlayElement.style.left = "0";
	overlayElement.style.right = "0";
	overlayElement.style.bottom = "0";
	overlayElement.style.backgroundColor = "rgba(0,0,0,0.8)";
	overlayElement.style.display = "flex";
	overlayElement.style.flexDirection = "column";
	overlayElement.style.justifyContent = "center";
	overlayElement.style.alignItems = "center";
	overlayElement.style.textAlign = "center";

	const messageElement = document.createElement("h2");
	messageElement.textContent = message;
	messageElement.style.color = "white";
	messageElement.style.fontSize = "100px";

	/* It's appending the messageElement to the overlayElement. */
	overlayElement.appendChild(messageElement);

	const restartButtonElement = document.createElement("button");
	restartButtonElement.textContent = "Restart";
	restartButtonElement.style.backgroundColor = "transparent";
	restartButtonElement.style.color = "white";
	restartButtonElement.style.border = "1px solid white";
	restartButtonElement.style.padding = "10px 30px";
	restartButtonElement.style.fontSize = "20px";

	/* It's adding an event listener to the restartButtonElement that resets the game and removes the
overlayElement from the body. */
	restartButtonElement.addEventListener("click", () => {
		resetGame();
		document.body.removeChild(overlayElement);
	});

	/* It's appending the restartButtonElement to the overlayElement. */
	overlayElement.appendChild(restartButtonElement);

	document.body.appendChild(overlayElement);
};

/**
 * Reset the game by creating a new game board element, creating new square elements, and appending
 * them to the game board element, and then appending the game board element to the body.
 */
function resetGame() {
	if (gameBoardElement) {
		document.body.removeChild(gameBoardElement);
	}

	gameBoardElement = makeGameBoardElement();
	for (let i = 0; i < 9; i++) {
		gameBoardElement.appendChild(makeSquareElements(i));
	}

	currentPlayer = players[0];
	gameBoard.fill("");
	document.body.appendChild(gameBoardElement);
}

/* It's creating an h1 element, setting its text content to the title argument, and appending it to the
body. */
gameTitle("Tic-tac-toe");
/* It's creating a new game board element, creating new square elements, and appending them to the game
board element, and then appending the game board element to the body. */
resetGame();
