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

[
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
