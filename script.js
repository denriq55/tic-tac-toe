
const game = {
    winner: false,
    arrayCells: [],
    player1Box: document.querySelector(".player-one-name"),
    player2Box: document.querySelector(".player-two-name"),
    player1ScoreBoard: document.querySelector(".scoreboard1"),
    player2ScoreBoard: document.querySelector(".scoreboard2"),
    player1Timer: document.querySelector(".timer1"),
    player2Timer: document.querySelector(".timer2"),
    rematchDialog: document.querySelector("#rematch"),
    declareWinner: document.querySelector(".declare-winner"),
    turnIndicatorBox1: document.querySelector(".turn-indicator1"),
    turnIndicatorBox2: document.querySelector(".turn-indicator2"),
    confetti1: document.querySelector(".confetti1"),
    confetti2: document.querySelector(".confetti2"),

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

         this.players = [
            {
                name: playerOneName,
                marker: "X",
                score: 0,
                timer: 6,
                color: "#663165"
              
                
            },
            {
                name: playerTwoName, 
                marker:  "O",
                score: 0,
                timer: 6,
                color: "#000080"
                
               
            }
        ];

        //show players info on screen
        this.player1Box.textContent = playerOneName.toUpperCase() + " (X)";
        this.player1Box.classList.add("p1")
        this.player1Box.style.color = this.players[0].color;

        this.player2Box.textContent = playerTwoName.toUpperCase() + " (O)";
        this.player2Box.classList.add("p2")
        this.player2Box.style.color = this.players[1].color;
      
        // set current player as player 1
        this.activePlayer = this.players[0]
        
        
        
    },
        
        

    createGameBoard() {
        
        //create board
        const board = document.querySelector(".board");
        for (let i = 0; i < 9; i++) {
            

            const cell = document.createElement("button");
            cell.classList.add("cells");
            board.appendChild(cell);
            
            this.arrayCells.push(cell);

            //draw markers on each cell 
            cell.addEventListener("click", (e) => {
                if (e.target.textContent === "") {
                e.target.textContent = this.activePlayer.marker
                cell.style.color = this.activePlayer.color
                this.switchPlayer();

                
                
                } else if (e.target.textContent === "X" || 
                e.target.textContent === "O")
                { alert ("Sorry! This spot is taken. Please choose another spot.")}

                //check for winner
                this.checkWinner();
                
                
                })
                
        }
        
    },


//switch players
    switchPlayer() {
     // const turnIndicatorBox1 = document.querySelector(".turn-indicator1")
     // const turnIndicatorBox2 = document.querySelector(".turn-indicator2")

        if (this.activePlayer === this.players[0]) {
            this.activePlayer = this.players[1]
            this.turnIndicatorBox2.innerHTML = '<img src="icons/arrow-circle.svg" alt="Turn Indicator">';
            this.turnIndicatorBox1.innerHTML = "";
          
            

            
           
          } else {
            this.activePlayer = this.players[0]
            this.turnIndicatorBox1.innerHTML = '<img src="icons/arrow-circle.svg" alt="Turn Indicator">'
            this.turnIndicatorBox2.innerHTML = "";
          
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
    
    //Update the correct scoreboard
    updateScore() {
        
        this.winner.score++;

        if (this.winner === this.players[0]) {
            console.log(this.players[0].score)
            this.player1ScoreBoard.textContent = "🏆".repeat(this.winner.score)
            this.activePlayer = this.players[0]
            this.confetti1.innerHTML = '<img src="images/confetti.gif" alt="Confetti">'
            this.turnIndicatorBox2.innerHTML = ""
            

        } else if (this.winner === this.players[1]) {
            console.log(this.players[1].score);
            this.player2ScoreBoard.textContent = "🏆".repeat(this.winner.score)
            this.activePlayer = this.players[1]
            this.confetti2.innerHTML = '<img src="images/confetti.gif" alt="Confetti">'
            this.turnIndicatorBox1 .innerHTML = ""
        }
    },
    

    
    //rematch
    playAgain() {
        const rematchButton = document.querySelector(".rematch-button")
        rematchButton.addEventListener("click", ()  => {
        this.arrayCells.forEach((cell) => cell.textContent = "");
        this.winner = false;
        this.rematchDialog.close();
        this.confetti1.innerHTML = ''
        this.confetti2.innerHTML = ''
        
        
    })
    },
        

    
    //reset and create new game
        newGame() {
            const newGameButton = document.querySelector(".new-game");
            newGameButton.addEventListener("click", () => {
            window.location.reload();
        })
            }
        
    }



       
game.startGame();




