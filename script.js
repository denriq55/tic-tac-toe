
const game = {
    winner: false,
    arrayCells: [],
    score: 0,
    rematchDialog: document.querySelector("#rematch"),
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
                marker: "X" ,
                score: ""
            },
            {
                name: playerTwoName, 
                marker:  "O",
                score: ""
            }
        ];

        //show players info on screen
        const player1Box = document.querySelector(".player1display")
        const player2Box = document.querySelector(".player2display")
            
        
        player1Box.textContent = "Player 1 " + playerOneName.toUpperCase() + " (X)"
        player2Box.textContent = "Player 2 " + playerTwoName.toUpperCase() + " (O)".toUpperCase()
      
        
        this.activePlayer = this.players[0]
        
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


    switchPlayer () {
        if (this.activePlayer === this.players[0]) {
            this.activePlayer = this.players[1]
          } else {
            this.activePlayer = this.players[0]
            }
                  
    },

    checkWinner() {
        
        for (let i = 0; i < this.winningCombination.length; i++) {
            const [a, b, c] = this.winningCombination[i];

            for (const player of this.players) {
                if (this.arrayCells[a].textContent === player.marker && 
                    this.arrayCells[a].textContent === this.arrayCells[b].textContent &&
                    this.arrayCells[a].textContent === this.arrayCells[c].textContent)
                    
                    { 
                    
                    this.winner = true;
                
                   const declareWinner = document.querySelector(".declare-winner");
                  declareWinner.textContent = `${player.name} is the winner!`
                  this.rematchDialog.showModal()
                  this.playAgain();
                   return
                    };

                    
                };
        };
        
    },   
    

       playAgain() {
        const rematchButton = document.querySelector(".rematch-button")
            rematchButton.addEventListener("click", () => {
            this.arrayCells.forEach((cell) => cell.textContent = "");
            this.rematchDialog.close()

        })
    }
    
        

    }


    /*restartGame() {
        if (this.winner) {
            this.arrayCells.forEach(cell => {
                cell.textContent = '';
            });
        }
           
        },
    */


game.startGame()