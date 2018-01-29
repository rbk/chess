# Chess

The game of chess.. actually nothing yet.

## AI notes

- DANGER move puts piece in danger (-2)
- COST move captures a lower valued piece (-1)
- PROTECTION move provides protection (+2)
- COST+PROTECTION Captures lower piece, but provides protection (+3)
- HIGH VALUE - High value pieces like Queen and King take less risks
- IN DANGER - is the piece currently in danger and if so, what is the value of that piece


## Resources

- https://lichess.org/video/GMgIKo2GM6M

## Todo

- RULES
  - Need to account for being in "check"
  - Need to determine winner if checkmate

- AI
  - Create algorithm to calculate "strength" of each possible move

    - DANGE move puts piece in danger (-2)
    - COST move captures a lower valued piece (-1)
    - PROTECTION move provides protection (+2)
    - COST+PROTECTION Captures lower piece, but provides protection (+3)
    - HIGH VALUE - High value pieces like Queen and King take less risks
    - IN DANGER - is the piece currently in danger and if so, what is the value of that piece


  - Tell computer to make move base on score

- visual: use pieces variable to display the board and provide an interface
  - this ui can interact with Chess to modify the state and update the ui
- chess: inner workings of Chess
  - what pieces are on the board and where
  - possible moves
  - state of board
- ai: how the computer uses knowledge of board to make decisions
  - interacts with board state
  - calculate best move based on state and history
