
const game = {
    winner: false,
    arrayCells: [],
    player1Box: document.querySelector(".player-one-name"),
    player2Box: document.querySelector(".player-two-name"),
    player1ScoreBoard: document.querySelector(".scoreboard1"),
    player2ScoreBoard: document.querySelector(".scoreboard2"),
    player1Timer: document.querySelector(".timer1"),
    player2Timer: document.querySelector(".timer2"),
    timeLeft: 5,
 
    rematchDialog: document.querySelector("#rematch"),
    declareWinner: document.querySelector(".declare-winner"),
    winningCombination: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        
    
        [0, 4, 8],
        [6, 4, 2]
        ],
    
    startGame() {
        const startDialog = document.querySelector("#start")
        const startButton = document.querySelector("#start-button");

        startDialog.showModal();

        startButton.addEventListener("click", () => {
            
            
            this.getPlayers();
            this.createGameBoard();

            startDialog.close()
        });



    },
    

    getPlayers(playerOneName, playerTwoName ) {
        playerOneName = document.querySelector("#p1name").value;
        playerTwoName = document.querySelector("#p2name").value;

        console.log('Player One Name:', playerOneName);
        console.log('Player Two Name:', playerTwoName);

         this.players = [
            {
                name: playerOneName,
                marker: "X",
                score: 0,
                timer: 7
                
            },
            {
                name: playerTwoName, 
                marker:  "O",
                score: 0,
                timer: 7
               
            }
        ];

        //show players info on screen
        //const player1Box = document.querySelector(".player1display")
        //const player2Box = document.querySelector(".player2display")
            
        
        this.player1Box.textContent = "Player 1 " + playerOneName.toUpperCase() + " (X)"
       this.player2Box.textContent = "Player 2 " + playerTwoName.toUpperCase() + " (O)".toUpperCase()
      
        
        this.activePlayer = this.players[0]
        this.setTimer()
        
    },
        
        

    createGameBoard() {
        
        const board = document.querySelector(".board");
        for (let i = 0; i < 9; i++) {
            

            const cell = document.createElement("button");
            cell.classList.add("cells");
            board.appendChild(cell);
            
            this.arrayCells.push(cell);

            cell.addEventListener("click", (e) => {
                if (e.target.textContent === "") {
                e.target.textContent = this.activePlayer.marker
                this.switchPlayer();

                
                
                } else if (e.target.textContent === "X" || 
                e.target.textContent === "O")
                { console.log("Sorry! This spot is taken. Please choose another spot.")}
                this.checkWinner();
                
                })
                
        }
        
    },

    setTimer() {
        if (!this.winner) {
        setInterval(() => {
            if (this.activePlayer === this.players[0]) {
                this.players[0].timer--;
                this.player1Timer.textContent = this.players[0].timer
                this.players[1].timer = 7

            } else {
                this.players[1].timer--;
                this.player2Timer.textContent = this.players[1].timer
                this.players[0].timer = 7
        
            }

            if (this.activePlayer.timer <= 0 || this.winner) {
                clearInterval(this.activePlayer.timer)
                this.switchPlayer()
            }
        }, 1000
            )
        }



            /*
            this.activePlayer.timer--;

            console.log(this.activePlayer.name + `You have ${this.activePlayer.timer} seconds left!`);

            if (this.activePlayer === this.players[0]) {
                this.player1Timer.textContent = this.activePlayer.timer
            } else {
                this.player2Timer.textContent = this.activePlayer.timer  
            }

            if (this.activePlayer.timer < 0) {
                clearInterval(this.activePlayer.timer);
                console.log("Time's up! You skip a turn")
               
                this.switchPlayer()
            }
    
            }, 1000);

    */



},
    switchPlayer () {
      const turnIndicatorBox1 = document.querySelector(".turn-indicator1")
      const turnIndicatorBox2 = document.querySelector(".turn-indicator2")

        if (this.activePlayer === this.players[0]) {
            this.activePlayer = this.players[1]
            turnIndicatorBox2.innerHTML = '<img src="icons/arrow-up-solid.svg" alt="Turn Indicator">'
            turnIndicatorBox1.innerHTML = ''
            this.player1Timer.textContent = "";

            
           
          } else {
            this.activePlayer = this.players[0]
            turnIndicatorBox1.innerHTML = '<img src="icons/arrow-up-solid.svg" alt="Turn Indicator">'
            turnIndicatorBox2.innerHTML = ''
            this.player2Timer.textContent = "";
            }
                  
    },

    checkWinner() {
        
        //check for winner
        for (let i = 0; i < this.winningCombination.length; i++) {
            const [a, b, c] = this.winningCombination[i];

            for (const player of this.players) {
                if (this.arrayCells[a].textContent === player.marker && 
                    this.arrayCells[a].textContent === this.arrayCells[b].textContent &&
                    this.arrayCells[a].textContent === this.arrayCells[c].textContent)
                    
                { 
                    this.winner = player;
                    this.declareWinner.textContent = `${this.winner.name} is the winner!`;
                    this.updateScore();
                    this.rematchDialog.showModal()
                    this.playAgain();
                    this.newGame()
                    
                    return
                };
            };
        };
        
        //check for a tie
        if (!this.winner &&
            this.arrayCells.every(cell => cell.textContent !== "")) 

            {
            this.declareWinner.textContent = "It's a tie!";
            this.rematchDialog.showModal();
            this.playAgain();   
            this.newGame()
            }
    },   
    
    updateScore() {
        this.winner.score++

        //Update the correct scoreboard
        if (this.winner === this.players[0]) {
            console.log(this.players[0].score)
            this.player1ScoreBoard.textContent = this.winner.score;
            

        } else if (this.winner === this.players[1]) {
            console.log(this.players[1].score);
            this.player2ScoreBoard.textContent = this.winner.score;
            
        }
    },
    
        
    
    

       playAgain() {
        
        const rematchButton = document.querySelector(".rematch-button");
            rematchButton.addEventListener("click", () => {
            this.arrayCells.forEach((cell) => cell.textContent = "");
            this.activePlayer = this.winner;
            this.rematchDialog.close();
        });

       },

       
        newGame() {
        const newGameButton = document.querySelector(".new-game")
        newGameButton.addEventListener("click", () => {
            window.location.reload();
            /*
            this.arrayCells.forEach((cell) => cell.textContent = "");
            
            this.dialogBox.showDialog()
            console.log("New game button clicked");
            this.rematchDialog.close();
            console.log("Dialog closed after newGame");
           */

        
       }  )  
}
}

       
    


       
game.startGame();
      