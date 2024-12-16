
const game = {
    
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
    
  

    getPlayers(playerOneName, playerTwoName) {
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
                e.target.textContent = this.activePlayer.marker;
                
                this.checkWinner();
                this.switchPlayer();
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
        let winner;
        for (let i = 0; i < this.winningCombination.length; i++) {
            const [a, b, c] = this.winningCombination[i];

            if (this.arrayCells[a].textContent !== '' && 
                this.arrayCells[a].textContent === this.arrayCells[b].textContent &&
                this.arrayCells[a].textContent === this.arrayCells[c].textContent) 
                {
                alert(`${this.activePlayer.name} is the winner!`)
                this.restartGame()
                return
                } 
            
        }
        
    },

    restartGame() {
       
            this.arrayCells.forEach(cell => {
                cell.textContent = '';
            });

            
        }
}




game.getPlayers("Iris", "Dyan")
game.createGameBoard()



/*

function getPlayers() {
    return players = [
        {
            name: "Dyan",
            marker: "X"
        },

        {
            name: "Iris",
            marker: "O"
        }
]

}

getPlayers();



const board = document.querySelector(".board")
const arrayCells = [];
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    

    [0, 4, 8],
    [6, 4, 2]
]

function createGameboard()  {
        
        for (let i = 0; i < 9; i++) {
            
            const cell = document.createElement("button");
            cell.classList.add("cells");
            board.appendChild(cell);
            
            arrayCells.push(cell);

            cell.addEventListener("click", (e) => {
                e.target.textContent = activePlayer.marker
                switchPlayer();
                checkWinner();
                })

            const checkWinner = () => {
                for (let i = 0; i < winningCombination.length; i++) {
                    const [a, b, c] = winningCombination[i];

                    if (arrayCells[a].textContent !== '' && 
                        arrayCells[a].textContent === arrayCells[b].textContent &&
                        arrayCells[a].textContent === arrayCells[c].textContent
                      ) {
                        console.log(` is the winner!`) 
                      }
                }
            }

                
            }

        let activePlayer = players[0];

        const switchPlayer = () => {
          if (activePlayer === players[0]) {
                activePlayer = players[1]
            } else {
                    activePlayer = players[0]
                    }
                    console.log(activePlayer); 
            }

        
        
}

        
        
     

    createGameboard();
*/