import React, { Component } from 'react';
import './App.css';
import Board from './Components/board.js';


class App extends Component {

  sample = [
    ["Q","-","-","-","-","-","-","-"],
    ["-","-","-","-","-","-","-","-"],
    ["-","-","-","-","-","-","-","-"],
    ["-","-","-","-","-","-","-","-"],
    ["-","-","K2","-","-","-","-","-"],
    ["-","P2","-","-","-","-","-","-"],
    ["P1","-","P1","-","-","-","-","-"],
    ["-","-","-","-","-","-","-","-"],
  ]

  game = {
    turn: "team1",
    players: ["team1"],
    time_played: 0,
  }

  team1 = {
    name: "Richard",
    score: 0,
    captures: [],
    in_check: false,
    existing_army: [
      {
        name: "pawn1",
        advanced: false,
        direction: "-",
        position: {x:0,y:6},
        moves: [], //See sample below
      },
      {
        name: "pawn2",
        advanced: false,
        direction: "-",
        position: {x:1,y:6},
        moves: [], //See sample below
      }
    ],
    army_lost: [],
  }

  u1_pawn0 = {
    advanced: true, // Has the piece ever moved
    direction: "-", // - up, + down, * any
    position: {x:0,y:6},
    how_this_peice_works: [
      "+1",
      "+2",
      "Diagonal_Strike"
    ],
    calculate_moves: function() {
      let result = []
      // Calculate moves based on current position
      // Set the moved to the moved array here
      result = this.how_this_peice_works.map((item) => {
        if (item == "+1") {
          return {
            coordinates: [-1,0],
          }
          // check board +1 of my position
          //
        }
      })
      console.log(result)
    },
    moves: [
      {
        coordinates: [-1,0], // FACT
        capture: false, // FACT
        in_danger: false, // FACT
        place_opponent_in_check: false, // FACT
        protected: false, // FACT
        strength: 0,
        chance_of_survival: 100,
        defence_score: 0,
      },
      {
        coordinates: [-2,0],
        strength: 0,
        capture: false,
        in_danger: false,
        chance_of_survival: 100,
        place_opponent_in_check: false,
        defence_score: 0,
      },
      {
        coordinates: [-1,1], // where the piece can move
        strength: 1, // number representing the move strength based on factors below
        capture: true, // will moving here capture and opponent
        in_danger: true, // will this put your piece in danger
        chance_of_survival: 35, // Percentage of pieces that could possible advance here from opponent
        place_opponent_in_check: true, // Will move put oppenent in check
        defence_score: 1, // number of pieces defending this position if you advance
      }
    ]
  }

  u1_knight1 = {
    calculate_moves: [
      "+1 +2",
      "+2 + 1",
      "..."
    ]
  }

  u1_queen = {
    calculate_moves: [
      "Up *",
      "Right *",
      "Left *",
      "Down *",
      "Diagonal Right/Down *",
      "Diagonal Right/Up *",
      "Diagonal Left/Down *",
      "Diagonal Left/Up *",
    ]
  }

  poss() {
    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        if (this.sample[y][x] == "R") {
          this.rooksMoves(y,x)
        }
        if (this.sample[y][x] == "Q") {
          this.queensMoves(y,x)
        }
      }
    }

    this.sample.map((arr) => console.log(arr) )
  }

  queensMoves(startY,startX) {

    let moves = []

    // Up
    let positionY = startY-1;
    let positionX = startX;
    while (this.positionValid(positionY, positionX)) {
      this.sample[positionY][positionX] = "0";
      moves.push([positionY, positionX])
      positionY--;
    }

    // Down
    positionY = startY+1;
    positionX = startX;
    while (this.positionValid(positionY, positionX)) {
      this.sample[positionY][positionX] = "0";
      moves.push([positionY, positionX])
      positionY++;
    }

    // right/down (diagonal)
    positionY = startY+1;
    positionX = startX+1;
    while (this.positionValid(positionY, positionX)) {
      this.sample[positionY][positionX] = "0";
      moves.push([positionY, positionX])
      positionY++;
      positionX++;
    }

    // left/up (diagonal)
    positionY = startY-1;
    positionX = startX-1;
    while (this.positionValid(positionY, positionX)) {
      this.sample[positionY][positionX] = "0";
      moves.push([positionY, positionX])
      positionY--;
      positionX--;
    }

    // right/up (diagonal)
    positionY = startY-1;
    positionX = startX+1;
    while (this.positionValid(positionY, positionX)) {
      this.sample[positionY][positionX] = "0";
      moves.push([positionY, positionX])
      positionY--;
      positionX++;
    }

    // left/down (diagonal)
    positionY = startY+1;
    positionX = startX-1;
    while (this.positionValid(positionY, positionX)) {
      this.sample[positionY][positionX] = "0";
      moves.push([positionY, positionX])
      positionY++;
      positionX--;
    }

    // Left
    positionY = startY;
    positionX = startX-1;
    while (this.positionValid(positionY, positionX)) {
      this.sample[positionY][positionX] = "0";
      moves.push([positionY, positionX])
      positionX--;
    }

    // Right
    positionY = startY;
    positionX = startX+1;
    while (this.positionValid(positionY, positionX)) {
      this.sample[positionY][positionX] = "0";
      moves.push([positionY, positionX])
      positionX++;
    }

    console.log(moves)
    // from the queen,
    // walk each path again?
    // Can she go

  }

  positionValid(x,y) {
    if (this.sample[y] && this.sample[y][x]) {
      return true;
    }
    return false;
  }

  rooksMoves(y,x) {
    if (this.sample[y-2] && this.sample[y-2][x+1]) {
      this.sample[y-2][x+1] = "P"
    }

    if (this.sample[y-1] && this.sample[y-1][x+2]) {
      this.sample[y-1][x+2] = "P"
    }

    if (this.sample[y+1] && this.sample[y+1][x+2]) {
      this.sample[y+1][x+2] = "P"
    }

    if (this.sample[y+2] && this.sample[y+2][x+1]) {
      this.sample[y+2][x+1] = "P"
    }

    if (this.sample[y+2] && this.sample[y+2][x-1]) {
      this.sample[y+2][x-1] = "P"
    }

    if (this.sample[y+1] && this.sample[y+1][x-2]) {
      this.sample[y+1][x-2] = "P"
    }

    if (this.sample[y-1] && this.sample[y-1][x-2]) {
      this.sample[y-1][x-2] = "P"
    }

    if (this.sample[y-2] && this.sample[y-2][x-1]) {
      this.sample[y-2][x-1] = "P"
    }
  }

  render() {
    this.poss()
    let board = this.sample
    return (
      <div className="App">
        {board}
        <Board />
      </div>
    );
  }
}

export default App;
