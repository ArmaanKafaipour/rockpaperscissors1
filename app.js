const game = () => {
  let pScore = 0;
  let cScore = 0;
  // let targetScoreSet = 0;

  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    //Fades out intro screen when play button is clicked
    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };

  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        //Assigns computer with a random selection from 0 - 2
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        //Updates score after animation is complete
        setTimeout(() => {
          //Call compareHands
          compareHands(this.textContent, computerChoice);

          //Update images
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 1000);

        //Animation
        playerHand.style.animation = "shakePlayer 1s ease";
        computerHand.style.animation = "shakeComputer 1s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  const resetScore = () => {
    pScore = 0;
    cScore = 0;
    updateScore();
  };

  const compareHands = (playerChoice, computerChoice) => {
    //Update text
    const winner = document.querySelector(".winner");
    const targetScore = document.getElementById("targetScore").value;

    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "Tie";
      return;
    }
    //Checking for rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      }
    }
    //Checking for paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      }
    }
    //Checking for scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins!";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins!";
        pScore++;
        updateScore();
        return;
      }
    }

    if (pScore === targetScore) {
      winner.textContent = "Player is the winner!!! Resetting...";
      resetScore();
    }
    if (cScore === targetScore) {
      winner.textContent = "Computer is the winner!!! Resetting...";
      resetScore();
    }
  };

  //Call all the inner functions
  startGame();
  playMatch();
};

//start the game function
game();
