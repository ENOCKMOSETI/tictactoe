import { Component, OnInit } from '@angular/core';
import { InWinningPatternPipe } from 'src/app/pipes/in-winning-pattern.pipe';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  squares!: any[];
  xIsNext!: boolean;
  winner!: string | null;
  turnCount!: number;
  hasWon: boolean = false;
  winningPattern: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.newGame()
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = null;
    this.turnCount = 0;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(index: number) {
    if (this.hasWon) {
      return
    }
    if (!this.squares[index]) {
      this.squares.splice(index, 1, this.player);
      this.xIsNext = !this.xIsNext;
      this.turnCount++;
    }
    this.winner = this.calculateWinner();
    
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.hasWon = true;
        console.log(lines[i]);
        
        this.winningPattern = lines[i];
        return this.squares[a];
      }
    }
    return null;
  }

  get gameOver(): boolean {
    return this.turnCount > 8 || this.winner ? true : false
  }

  get drawGame(): boolean {
    this.gameOver == true;
    return this.turnCount == 9 && !this.winner ? true : false;
  }
}
