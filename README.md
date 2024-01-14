<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guess the Personality Game</title>
    <style>
        /* Add your CSS styles here */
    </style>
</head>
<body>
    <h1>Guess the Personality Game</h1>
    <p id="question">Who am I thinking of?</p>
    <input type="text" id="guessInput" placeholder="Enter your guess">
    <button onclick="checkGuess()">Submit Guess</button>

    <script>
        // Add your JavaScript code here
        const personalities = ['Personality1', 'Personality2', 'Personality3']; // Add more personalities as needed
        let currentPersonality = getRandomPersonality();

        function getRandomPersonality() {
            return personalities[Math.floor(Math.random() * personalities.length)];
        }

        function checkGuess() {
            const userGuess = document.getElementById('guessInput').value.toLowerCase();

            if (userGuess === currentPersonality.toLowerCase()) {
                alert('Congratulations! You guessed it right!');
                resetGame();
            } else {
                alert('Oops! Try again.');
            }
        }

        function resetGame() {
            currentPersonality = getRandomPersonality();
            document.getElementById('guessInput').value = '';
        }
    </script>
</body>
</html>
