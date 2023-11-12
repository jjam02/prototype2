title = "I dont know";

description = ` move mouse
to bottom
then click
`;

characters = [
  `


	ll
	ll
	ll
`,
];

let maze = {
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  ],

  scale: 5,
};

const G = {
  WIDTH: 100,
  HEIGHT: 150,
};

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
  isCapturing: true,
  isCapturingGameCanvasOnly: true,
  captureCanvasScale: 2,
  seed: 1,
  isPlayingBgm: true,
  isReplayEnabled: true,
  theme: "dark",
};

/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

let player;
let width;

options = {};

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
      firingCooldown: G.PLAYER_FIRE_RATE,
      isFiringLeft: true,
    };
  }
  console.log(player.pos);
  drawMaze(maze);

  if (input.isPressed || input.pos.y > 80) {
    // color("black");
    // rect(player.pos.x, 20, G.WIDTH - player.pos.x, G.HEIGHT - 20);
    // rect(0, 20, player.pos.x, G.HEIGHT - 20);
  } else {
    color("black");
    updateRect();
  }

  player.pos = vec(input.pos.x, input.pos.y);
  color("yellow");
  char("a", player.pos);
}

function updateRect() {
  color("black");
  rect(player.pos.x + 3, 20, G.WIDTH - player.pos.x, G.HEIGHT - 20);
  rect(0, 20, player.pos.x - 3, G.HEIGHT - 20);

  rect(player.pos.x - 10, 20, 20, player.pos.y - 23);

  rect(player.pos.x - 10, player.pos.y + 5, 20, G.HEIGHT);
}

function drawMaze(maze) {
  maze.grid.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex) {
      //console.log(rowIndex, colIndex, "VALUE:", cell);

      if (cell == 0) {
        color("red");
        rect(colIndex * maze.scale, rowIndex * maze.scale + 20, maze.scale);
      }
    });
  });
  //end();
}

// helper function - generates random number between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * max + min);
}
