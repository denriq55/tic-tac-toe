
const game = {
    winner: false,
    arrayCells: [],
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
        const playerOneName = document.querySelector("#p1name").value
        const playerTwoName = document.querySelector("#p2name").value
        
        this.getPlayers( playerOneName, playerTwoName );
        this.createGameBoard();

        startDialog.close()
        });

    },
    

    getPlayers(playerOneName, playerTwoName ) {
         this.players = [
            {
                name: playerOneName,
                marker: "X" 
            },
            {
                name: playerTwoName, 
                marker:  "O"
            }
        ];
        
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

            if (this.arrayCells[a].textContent !== '' && 
                this.arrayCells[a].textContent === this.arrayCells[b].textContent &&
                this.arrayCells[a].textContent === this.arrayCells[c].textContent) 
                {
                this.winner = true
                console.log(`${this.activePlayer.name} is the winner!`)
                setTimeout(()=> {
                    this.restartGame();
                }, 1000)
                
                return
                } 
            
        }
        
        
    },

    restartGame() {
        if (this.winner) {
            this.arrayCells.forEach(cell => {
                cell.textContent = '';
            });
        }
            
        }
}


game.startGame()