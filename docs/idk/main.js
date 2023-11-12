title = "I dont know";

description = ` I dont know what this game is right now at all
`;

characters = [
  `

	ll
	ll
	ll
	ll
	ll
`,
];

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
  updateRect();
  if (input.isPressed) {
    rect(player.pos.x, 20, G.WIDTH - player.pos.x, G.HEIGHT - 20);
    rect(0, 20, player.pos.x, G.HEIGHT - 20);
  }

  player.pos = vec(input.pos.x, input.pos.y);
}

function updateRect() {
  color("black");
  rect(player.pos.x + 3, 20, G.WIDTH - player.pos.x, G.HEIGHT - 20);
  rect(0, 20, player.pos.x - 3, G.HEIGHT - 20);

  rect(player.pos.x - 10, 20, 20, player.pos.y - 23);

  rect(player.pos.x - 10, player.pos.y + 5, 20, G.HEIGHT);
}

// helper function - generates random number between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * max + min);
}
