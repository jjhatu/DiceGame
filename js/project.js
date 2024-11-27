class DiceGame {
    constructor() {
      this.playerScore = 0;
      this.computerScore = 0;
      this.roundsPlayed = 0;
      this.maxRounds = 3;
    }
  
    rollDice() {
      return [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)];
    }
  
    calculateScore(dice) {
      const [die1, die2] = dice;
      if (die1 === 1 || die2 === 1) return 0;
      if (die1 === die2) return (die1 + die2) * 2;
      return die1 + die2;
    }
  
    updateDiceImages(dice, containerId) {
      const diceContainer = document.getElementById(containerId);
      const diceImages = diceContainer.querySelectorAll(".dice");
      diceImages[0].src = `images/dice${dice[0]}.png`;
      diceImages[1].src = `images/dice${dice[1]}.png`;
      diceImages.forEach((img) => {
        img.style.transform = "rotate(360deg)";
        setTimeout(() => (img.style.transform = ""), 300);
      });
    }
  
    playRound() {
      if (this.roundsPlayed >= this.maxRounds) return;
  
      const playerDice = this.rollDice();
      const computerDice = this.rollDice();
  
      const playerRoundScore = this.calculateScore(playerDice);
      const computerRoundScore = this.calculateScore(computerDice);
  
      this.playerScore += playerRoundScore;
      this.computerScore += computerRoundScore;
  
      this.roundsPlayed++;
  
      this.updateDiceImages(playerDice, "player-dice");
      this.updateDiceImages(computerDice, "computer-dice");
  
      document.getElementById("player-round-score").textContent = playerRoundScore;
      document.getElementById("computer-round-score").textContent = computerRoundScore;
  
      document.getElementById("player-total-score").textContent = this.playerScore;
      document.getElementById("computer-total-score").textContent = this.computerScore;
  
      if (this.roundsPlayed === this.maxRounds) {
        this.declareWinner();
      }
    }
  
    declareWinner() {
      const winnerMessage = document.getElementById("winner-message");
      if (this.playerScore > this.computerScore) {
        winnerMessage.textContent = "Player Wins!";
      } else if (this.computerScore > this.playerScore) {
        winnerMessage.textContent = "Computer Wins!";
      } else {
        winnerMessage.textContent = "It's a Tie!";
      }
    }
  
    resetGame() {
      this.playerScore = 0;
      this.computerScore = 0;
      this.roundsPlayed = 0;
  
      document.getElementById("player-round-score").textContent = "0";
      document.getElementById("computer-round-score").textContent = "0";
  
      document.getElementById("player-total-score").textContent = "0";
      document.getElementById("computer-total-score").textContent = "0";
  
      document.getElementById("winner-message").textContent = "";
  
      this.updateDiceImages([1, 1], "player-dice");
      this.updateDiceImages([1, 1], "computer-dice");
    }
  }
  
  const game = new DiceGame();
  
  document.getElementById("roll-dice").addEventListener("click", () => game.playRound());
  document.getElementById("reset-game").addEventListener("click", () => game.resetGame());