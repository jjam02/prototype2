title = "Maze Quest";

description = `  
  move mouse
  to bottom
  then click the x



            x
`;

characters = [
  `
	yy
	yy
`,
];

let maze = {
  grid: [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 2, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 2, 0],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 2, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 2, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  ],

  scale: 5,
};

const G = {
  WIDTH: 100,
  HEIGHT: 150,
  VIEW: 4,
  VIEW2: 23,
};

options = {
  isCapturing: true,
  isCapturingGameCanvasOnly: true,
  captureCanvasScale: 2,
  seed: 1,
  isPlayingBgm: true,
  isReplayEnabled: false,
  theme: "dark",
};

/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

/**
 * @type { rect[] }
 */
let collect = [];

let player;
let width;
let found = 0;

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
    };

    G.WIDTH = 100;
    G.HEIGHT = 150;
    G.VIEW = 4;
    G.VIEW2 = 23;
    maze.grid = [
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 2, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 2, 0],
      [0, 1, 1, 1, 0, 0, 1, 0, 0, 2, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 2, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    ];
  }

  drawMaze(maze);
  player.pos = vec(input.pos.x, input.pos.y);

  char("a", player.pos);
  const wall = char("a", player.pos).isColliding.rect.red;

  if (input.isPressed || input.pos.y > 80 || input.pos.y < 20 || wall) {
    // color("black");
    // rect(player.pos.x, 20, G.WIDTH - player.pos.x, G.HEIGHT - 20);
    // rect(0, 20, player.pos.x, G.HEIGHT - 20);
  } else {
    color("black");
    updateRect();
  }

  text("Cubes\ncollected:  /6", 3, 10, {
    color: "black",
    scale: { x: 1, y: 1 },
  });
  console.log(player.pos);

  const grow = char("a", player.pos).isColliding.rect.green;

  if (grow) {
    play("powerUp");
    G.VIEW += 1;
    G.VIEW2 += 0.5;
    maze.grid[Math.floor((player.pos.y - 21) / maze.scale)][
      (player.pos.x - 1) / maze.scale
    ] = 1;
  }

  if (wall) {
    play("explosion");
    color("green");
    end("Mouse to bottom");
  }
}

function updateRect() {
  color("black");
  rect(player.pos.x + G.VIEW, 20, G.WIDTH - player.pos.x, G.HEIGHT - 20); //right wall

  rect(0, 20, player.pos.x - G.VIEW, G.HEIGHT - 20); // left wall

  rect(player.pos.x - 10, 20, 20, player.pos.y - G.VIEW2); // top

  rect(player.pos.x - 10, player.pos.y + 5, 20, G.HEIGHT); // bottom
}

function drawMaze(maze) {
  maze.grid.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex) {
      //console.log(rowIndex, colIndex, "VALUE:", cell);

      if (cell == 0) {
        color("red");
        rect(colIndex * maze.scale, rowIndex * maze.scale + 20, maze.scale);
      } else if (cell == 2) {
        color("green");
        //console.log("rect,", colIndex, rowIndex);
        rect(colIndex * maze.scale + 1, rowIndex * maze.scale + 21, 1);
      }
    });
  });
  //end();
}

// helper function - generates random number between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * max + min);
}
