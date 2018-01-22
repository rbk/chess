
class Queen {

  constructor(player=1, position={x:0,y:0}) {
    this.name = "Queen";
    this.color = 0;
    this.player = player;
    this.strength = 5;
    this.maxMove = 0;
    this.directions = "all";
    this.display = "Q"; // this can me HTML or SVG later;
    this.inDanger = false;
    this.coor = {x: position.x, y: position.y};
    this.moves = [];
  }

}
