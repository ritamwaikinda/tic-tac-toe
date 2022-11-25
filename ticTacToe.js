//Game state
const players = ["O", "X"];
const gameBoard = ["", "", "", "", "", "", "", "", ""];
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

const makeSquareElements = (squareNumber) => {
	const gameSquare = document.createElement("div");
	gameSquare.classList.add("square");

	//through this event listener, we have access to the event that's fired as a variable object.
	gameSquare.addEventListener(
		"click",
		(event) => {
			//the event object has 'target' which is the html element that's being pressed, so we're destructuring it.
			const { target } = event;
			target.textContent = currentPlayer;
			//Now we want to let our js gameboard know which piece has been selected/updated.
			gameBoard[squareNumber] = currentPlayer;
			//has anyone won?
			checkBoard();
			//we also want to switch players
			switchPlayer();
		},
		//feature of event listener - square can only be clicked once (before implementing this, you could click on a square 1000 times and it would just keep changing from X to O to X to O)
		{ once: true }
	);

	return gameSquare;
};

const checkBoard = () => {
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

	for (let winState of winningStates) {
		const [positionOne, positionTwo, positionThree] = winState;

		if (
			gameBoard[positionOne] !== "" &&
			gameBoard[positionOne] === gameBoard[positionTwo] &&
			gameBoard[positionOne] === gameBoard[positionThree]
		) {
			alert(`${gameBoard[positionOne]}s win!`);
		}
	}
};

const switchPlayer = () => {
	if (currentPlayer === players[0]) {
		currentPlayer = players[1];
	} else {
		currentPlayer = players[0];
	}
};

const resetGame = () => {
	gameBoardElement = makeGameBoardElement();
	for (let i = 0; i < 9; i++) {
		gameBoardElement.appendChild(makeSquareElements(i));
	}

	currentPlayer = players[0];
	document.body.appendChild(gameBoardElement);
};

gameTitle("Tic-tac-toe");
resetGame();
