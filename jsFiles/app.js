/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- An input field to the HTML where players can set the winning score, so that they can change the predefined score
- There are two dices now. The player looses his current score when one of them is a 1.
*/


var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

// rolling the dice
document.querySelector('.btn-roll').addEventListener('click', function() {

    if(gamePlaying) {
        // create a random number
        var diceOne = Math.floor((Math.random() * 6) + 1);
        var diceTwo = Math.floor((Math.random() * 6) + 1);
        
        // display the result
        document.getElementById('diceOne').style.display = 'block';
        document.getElementById('diceTwo').style.display = 'block';

        document.getElementById('diceOne').src = 'dice-'+diceOne+'.png';
        document.getElementById('diceTwo').src = 'dice-'+diceTwo+'.png';

        // update round score IF rolled number is NOT 1 and consecutive rolls are not 6
        // if(dice === 6 && lastDice === 6) {
        //     //player losses all score
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score'+activePlayer).textContent = 0;
        //     nextPlayer();
        // } else if(dice !== 1) {
        //     // add score
        //     roundScore += dice;
        //     document.querySelector('#current'+activePlayer).textContent = roundScore;
        // } else {
        //     // next player
        //     nextPlayer();
        // }

        if(diceOne !== 1 && diceTwo !== 1) {
            // add score
            roundScore += diceOne + diceTwo;
            document.querySelector('#current'+activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();
        }

        //lastDice = dice;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying) {
        var currentPlayer;

        // add current score to global score
        if(activePlayer == 'One') {
            currentPlayer = 0;
        } else {
            currentPlayer = 1;
        }

        scores[currentPlayer] += roundScore;

        // update the UI
        document.querySelector('#score'+activePlayer).textContent = scores[currentPlayer];

        var input = document.querySelector('.finalScore').value;
        var winningScore;

        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //check if player won the game
        if(scores[currentPlayer] >= winningScore) {
            document.querySelector('#name'+activePlayer).textContent = 'Winner!';
            document.getElementById('diceOne').style.display = 'none';
            document.getElementById('diceTwo').style.display = 'none';
            document.querySelector('.player'+activePlayer+'Panel').classList.add('winner');
            document.querySelector('.player'+activePlayer+'Panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // next player
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 'One';
    gamePlaying = true;

    document.getElementById('diceOne').style.display = 'none';
    document.getElementById('diceTwo').style.display = 'none';

    document.getElementById('scoreOne').textContent = '0';
    document.getElementById('scoreTwo').textContent = '0';

    document.getElementById('currentOne').textContent = '0';
    document.getElementById('currentTwo').textContent = '0';

    document.getElementById('nameOne').textContent = 'Player 1';
    document.getElementById('nameTwo').textContent = 'Player 2';

    document.querySelector('.playerOnePanel').classList.remove('winner');
    document.querySelector('.playerTwoPanel').classList.remove('winner');
    
    document.querySelector('.playerTwoPanel').classList.remove('active');
    document.querySelector('.playerOnePanel').classList.remove('active');
    document.querySelector('.playerOnePanel').classList.add('active');
}

function nextPlayer() {
    // next player
    activePlayer === 'One' ? activePlayer = 'Two' : activePlayer = 'One';
    roundScore = 0;

    document.getElementById('currentOne').textContent = '0';
    document.getElementById('currentTwo').textContent = '0';

    document.querySelector('.playerOnePanel').classList.toggle('active');
    document.querySelector('.playerTwoPanel').classList.toggle('active');

    document.getElementById('diceOne').style.display = 'none';
    document.getElementById('diceTwo').style.display = 'none';
}