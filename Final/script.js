document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const restartButton = document.getElementById('restartButton');
    const squares = [];

    // Function to create the game board
    function createBoard() {
        for (let i = 0; i < 25; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.addEventListener('click', () => toggleSquare(square));
            board.appendChild(square);
            squares.push(square);
        }
    }

    // Function to toggle a square and its adjacent squares
    function toggleSquare(square) {
        square.classList.toggle('active');
        toggleAdjacentSquares(square);
        checkWin();
    }

    // Function to toggle adjacent squares based on a given square
    function toggleAdjacentSquares(square) {
        const index = squares.indexOf(square);
        const row = Math.floor(index / 5);
        const col = index % 5;

        toggleSquareByIndex(row - 1, col); // Top
        toggleSquareByIndex(row + 1, col); // Bottom
        toggleSquareByIndex(row, col - 1); // Left
        toggleSquareByIndex(row, col + 1); // Right
    }

    // Function to toggle a square based on its row and column index
    function toggleSquareByIndex(row, col) {
        if (row >= 0 && row < 5 && col >= 0 && col < 5) {
            const index = row * 5 + col;
            squares[index].classList.toggle('active');
        }
    }

    // Function to check if the player has won the game
    function checkWin() {
        if (squares.every(square => !square.classList.contains('active'))) {
            setTimeout(() => {
                alert('You win!');
                restartGame();
            }, 200);
        }
    }

    // Function to restart the game
    function restartGame() {
        squares.forEach(square => square.classList.remove('active'));
        shuffleBoard();
    }

    // Function to shuffle the board randomly
    function shuffleBoard() {
        squares.forEach(square => {
            if (Math.random() < 0.5) {
                square.classList.toggle('active');
                toggleAdjacentSquares(square);
            }
        });
    }

    // Initialize the game board and shuffle it initially
    createBoard();
    shuffleBoard();

    // Add event listener to the restart button
    restartButton.addEventListener('click', () => {
        restartGame();
    });

    // Display last modified date in the footer
    var x = document.lastModified;
    document.getElementById('lastModified').textContent = x;
});
