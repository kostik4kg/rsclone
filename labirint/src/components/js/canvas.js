import '../css/canvas.css';
import tilesetUrl from '../img/player.png';
import tile2 from '../img/222.png';
import { keyboard } from './keypressFn';
import { hitTestRectangle } from './keypressFn';
import { gameMap } from './gameMap';

import showMenu from './show-menu.nav';
import showCover from './show-cover.nav';

let ctx = null;
const titleW = 60, titleH = 60;
const mapW = 20, mapH = 20;
let currentSecond = 0, frameCount = 0, frameLasrSecond = 0;
let lastFrameTime = 0;
let gameTime = 0;
let gameSpeed = [
  { name: 'normal', mult: 1 },
  { name: 'slow', mult: 0.3 },
  { name: 'fast', mult: 3 },
  { name: 'paused', mult: 0 },
];

let tileset = null;
let tileset2 = null;
// let tilesetUrl = '../img/tileset.png';
let tilesetLoaded = false;
let currentSpeed = 0;

let floorTypes = {
  solid: 0,
  path: 1,
  water: 2,
  ice: 3,
  conveyorU: 4,
  conveyorD: 5,
  conveyorL: 6,
  conveyorR: 7,
  grass: 8,
};
let tileTypes = {
  0: { colour: '#685b48', floor: floorTypes.solid, sprite: [{ x: 320, y: 320, w: 32, h: 32 }] },
  1: { colour: '#5aa457', floor: floorTypes.path, sprite: [{ x: 0, y: 224, w: 32, h: 32 }] },
  2: { colour: '#e8bd7a', floor: floorTypes.path, sprite: [{ x: 32, y: 224, w: 32, h: 32 }] },
  3: { colour: '#286625', floor: floorTypes.solid, sprite: [{ x: 120, y: 0, w: 40, h: 40 }] },
  4: {
    colour: '#678fd9', floor: floorTypes.water, sprite: [
      { x: 864, y: 192, w: 32, h: 32, d: 200 }]
  },
  5: { colour: '#eeeeff', floor: floorTypes.ice, sprite: [{ x: 64, y: 224, w: 32, h: 32 }] },
  6: {
    colour: '#cccccc', floor: floorTypes.conveyorL, sprite: [
      { x: 0, y: 40, w: 40, h: 40, d: 200 }, { x: 40, y: 40, w: 40, h: 40, d: 200 },
      { x: 80, y: 40, w: 40, h: 40, d: 200 }, { x: 120, y: 40, w: 40, h: 40, d: 200 }]
  },
  7: {
    colour: '#cccccc', floor: floorTypes.conveyorR, sprite: [
      { x: 120, y: 80, w: 40, h: 40, d: 200 }, { x: 80, y: 80, w: 40, h: 40, d: 200 },
      { x: 40, y: 80, w: 40, h: 40, d: 200 }, { x: 0, y: 80, w: 40, h: 40, d: 200 }]
  },
  8: {
    colour: '#cccccc', floor: floorTypes.conveyorD, sprite: [
      { x: 160, y: 200, w: 40, h: 40, d: 200 }, { x: 160, y: 160, w: 40, h: 40, d: 200 },
      { x: 160, y: 120, w: 40, h: 40, d: 200 }, { x: 160, y: 80, w: 40, h: 40, d: 200 }]
  },
  9: {
    colour: '#cccccc', floor: floorTypes.conveyorU, sprite: [
      { x: 200, y: 80, w: 40, h: 40, d: 200 }, { x: 200, y: 120, w: 40, h: 40, d: 200 },
      { x: 200, y: 160, w: 40, h: 40, d: 200 }, { x: 200, y: 200, w: 40, h: 40, d: 200 }]
  },
  10: { colour: '#5aa457', floor: floorTypes.path, sprite: [{ x: 96, y: 224, w: 32, h: 32 }] },
  11: { colour: '#e8bd7a', floor: floorTypes.path, sprite: [{ x: 128, y: 224, w: 32, h: 32 }] },


}
let directions = {
  up: 0,
  right: 1,
  down: 2,
  left: 3
}
const keysDown = {
  37: false,
  38: false,
  39: false,
  40: false,
};
let player = new Character();
let tileEvent = {
  23: drawBridge,
  25: drawBridge,
  121: function (c) { c.placeAt(1, 8); },
  161: function (c) { c.placeAt(1, 6); },
}

function drawBridge() {
  gameMap[toIndex(4, 5)] = (gameMap[toIndex(4, 5)] === 4 ? 2 : 4)
}
let viewport = {
  screen: [0, 0],
  startTile: [0, 0],
  endTile: [0, 0],
  offset: [0, 0],
  update: function (px, py) {
    this.offset[0] = Math.floor((this.screen[0] / 2) - px);
    this.offset[1] = Math.floor((this.screen[1] / 2) - py);

    let tile = [
      Math.floor(px / titleW),
      Math.floor(py / titleH)
    ];
    this.startTile[0] = tile[0] - 1 -
      Math.ceil((this.screen[0] / 2) / titleW);
    this.startTile[1] = tile[1] - 1 -
      Math.ceil((this.screen[1] / 2) / titleH);

    if (this.startTile[0] < 0) { this.startTile[0] = 0; }
    if (this.startTile[1] < 0) { this.startTile[1] = 0; }

    this.endTile[0] = tile[0] + 1 +
      Math.ceil((this.screen[0] / 2) / titleW);
    this.endTile[1] = tile[1] + 1 +
      Math.ceil((this.screen[1] / 2) / titleH);

    if (this.endTile[0] >= mapW) { this.endTile[0] = mapW - 1; }
    if (this.endTile[1] >= mapH) { this.endTile[1] = mapH - 1; }
  }
}
function Character() {
  this.tileFrom = [0, 0];
  this.tileTo = [5, 5];
  this.timeMoves = 0;
  this.dimensions = [65, 65];
  this.position = [20, 20];

  this.delayMove = {};
  this.delayMove[floorTypes.path] = 400;
  this.delayMove[floorTypes.grass] = 800;
  this.delayMove[floorTypes.ice] = 300;
  this.delayMove[floorTypes.conveyorU] = 200;
  this.delayMove[floorTypes.conveyorD] = 200;
  this.delayMove[floorTypes.conveyorL] = 200;
  this.delayMove[floorTypes.conveyorR] = 200;
  this.direction = directions.down;

  this.sprites = {};
  // this.sprites[directions.idle] = [{ x: 0, y: 120, w: 30, h: 30, d: 200 }, { x: 0, y: 120, w: 30, h: 30, d: 200 }];
  this.sprites[directions.up] = [{ x: 10, y: 10, w: 40, h: 47, d: 120 }, { x: 74, y: 10, w: 40, h: 47, d: 120 }, { x: 138, y: 10, w: 40, h: 47, d: 120 }, { x: 202, y: 10, w: 40, h: 47, d: 120 }, { x: 266, y: 10, w: 40, h: 47, d: 120 }, { x: 332, y: 10, w: 40, h: 47, d: 120 }, { x: 396, y: 10, w: 40, h: 47, d: 120 }, { x: 460, y: 10, w: 40, h: 47, d: 120 }, { x: 524, y: 10, w: 40, h: 47, d: 120 }];
  this.sprites[directions.right] = [{ x: 10, y: 205, w: 40, h: 47, d: 120 }, { x: 74, y: 205, w: 40, h: 47, d: 120 }, { x: 138, y: 205, w: 40, h: 47, d: 120 }, { x: 202, y: 205, w: 40, h: 47, d: 120 }, { x: 266, y: 205, w: 40, h: 47, d: 120 }, { x: 332, y: 205, w: 40, h: 47, d: 120 }, { x: 396, y: 205, w: 40, h: 47, d: 120 }, { x: 460, y: 205, w: 40, h: 47, d: 120 }, { x: 524, y: 205, w: 40, h: 47, d: 120 }];
  this.sprites[directions.down] = [{ x: 10, y: 142, w: 40, h: 47, d: 120 }, { x: 74, y: 142, w: 40, h: 47, d: 120 }, { x: 138, y: 142, w: 40, h: 47, d: 120 }, { x: 202, y: 142, w: 40, h: 47, d:120 }, { x: 266, y: 142, w: 40, h: 47, d: 120 }, { x: 332, y: 142, w: 40, h: 47, d: 120 }, { x: 396, y: 142, w: 40, h: 47, d: 120 }, { x: 460, y: 142, w: 40, h: 47, d: 120 }, { x: 524, y: 142, w: 40, h: 47, d: 120 }];
  this.sprites[directions.left] = [{ x: 10, y: 78, w: 40, h: 47, d: 120 }, { x: 74, y: 78, w: 40, h: 47, d: 120 }, { x: 138, y: 78, w: 40, h: 47, d: 120 }, { x: 202, y: 78, w: 40, h: 47, d: 120 }, { x: 266, y: 78, w: 40, h: 47, d: 120 }, { x: 332, y: 78, w: 40, h: 47, d: 120 }, { x: 396, y: 78, w: 40, h: 47, d: 120 }, { x: 460, y: 78, w: 40, h: 47, d: 120 }, { x: 524, y: 78, w: 40, h: 47, d: 120 }];

}
Character.prototype.placeAt = function (x, y) {
  this.tileFrom = [x, y];
  this.tileTo = [x, y];
  this.position = [((titleW * x) + ((titleW - this.dimensions[0]) / 2)),
  ((titleH * y) + ((titleH - this.dimensions[1]) / 2))]
}
Character.prototype.processMovement = function (t) {
  if ((this.tileFrom[0] === this.tileTo[0]) &&
    (this.tileFrom[1] === this.tileTo[1])) {
    return false;
  }
  let moveSpeed = this.delayMove[tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor]
  if ((t - this.timeMoves) >= moveSpeed) {
    this.placeAt(this.tileTo[0], this.tileTo[1]);

    if (typeof tileEvent[toIndex(this.tileTo[0], this.tileTo[1])] !== 'undefined') {
      tileEvent[toIndex(this.tileTo[0], this.tileTo[1])](this);
    }

    let tileFloor = tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;

    if (tileFloor === floorTypes.ice) {
      if (this.canMoveDirection(this.direction)) {
        this.moveDirection(this.direction, t);
        finish();
      }
    }
    else if (tileFloor === floorTypes.conveyorL && this.canMoveLeft()) { this.moveLeft(t); }
    else if (tileFloor === floorTypes.conveyorR && this.canMoveRight()) { this.moveRight(t); }
    else if (tileFloor === floorTypes.conveyorU && this.canMoveUp()) { this.moveUp(t); }
    else if (tileFloor === floorTypes.conveyorD && this.canMoveDown()) { this.moveDown(t); }

  }
  else {
    this.position[0] = (this.tileFrom[0] * titleW) +
      ((titleW - this.dimensions[0]) / 2);
    this.position[1] = (this.tileFrom[1] * titleH) +
      ((titleH - this.dimensions[1]) / 2);

    if (this.tileTo[0] !== this.tileFrom[0]) {
      let diff = (titleW / moveSpeed) *
        (t - this.timeMoves);
      this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
    }
    if (this.tileTo[1] !== this.tileFrom[1]) {
      let diff = (titleH / moveSpeed) *
        (t - this.timeMoves);
      this.position[1] += (this.tileTo[1] < this.tileFrom[1] ?
        0 - diff : diff);
    }
    this.position[0] = Math.round(this.position[0]);
    this.position[1] = Math.round(this.position[1]);
  }
  return true;
};
Character.prototype.canMoveTo = function (x, y) {
  if (x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }
  if (typeof this.delayMove[tileTypes[gameMap[toIndex(x, y)]].floor] == 'undefined') { return false; }
  return true;
}
Character.prototype.canMoveUp = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1); };
Character.prototype.canMoveDown = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1); };
Character.prototype.canMoveLeft = function () { return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]); };
Character.prototype.canMoveRight = function () { return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]); };
Character.prototype.canMoveDirection = function (d) {
  switch (d) {
    case directions.up:
      return this.canMoveUp();
    case directions.down:
      return this.canMoveDown();
    case directions.left:
      return this.canMoveLeft();
    default:
      return this.canMoveRight();
  }
}
Character.prototype.moveLeft = function (t) { this.tileTo[0] -= 1; this.timeMoves = t; this.direction = directions.left; }
Character.prototype.moveRight = function (t) { this.tileTo[0] += 1; this.timeMoves = t; this.direction = directions.right; }
Character.prototype.moveUp = function (t) { this.tileTo[1] -= 1; this.timeMoves = t; this.direction = directions.up; }
Character.prototype.moveDown = function (t) { this.tileTo[1] += 1; this.timeMoves = t; this.direction = directions.down; }
Character.prototype.moveDirection = function (d, t) {
  switch (d) {
    case directions.up:
      return this.moveUp(t);
    case directions.down:
      return this.moveDown(t);
    case directions.left:
      return this.moveLeft(t);
    default:
      return this.moveRight(t);
  }
}
function toIndex(x, y) {
  return ((y * mapW) + x);
}

let canvas = document.createElement('canvas');
canvas.setAttribute('id', 'game');


window.onload = function () {
  document.body.append(canvas);
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  ctx = document.getElementById('game').getContext('2d');
  // requestAnimationFrame(drawGame);
  ctx.font = 'bold 10px sans-serif';

  window.addEventListener('keydown', function (e) {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      keysDown[e.keyCode] = true;
      player['animated'] = true;
      // console.log(player);
    }
  })
  window.addEventListener('keyup', function (e) {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      keysDown[e.keyCode] = false;
      player['animated'] = false;
    }
    if (e.keyCode == 83) {
      currentSpeed = (currentSpeed >= (gameSpeed.length - 1) ? 0 : currentSpeed + 1);
    }
  });

  viewport.screen = [
    document.getElementById('game').width,
    document.getElementById('game').height
  ];
  tileset = new Image();
  tileset2 = new Image();

  tileset2.src = tilesetUrl;
  tileset.src = tile2;

  for (let x in tileTypes) {
    tileTypes[x]['animated'] = tileTypes[x].sprite.length > 1 ? true : false;

    if (tileTypes[x].animated) {
      let t = 0;
      for (let s in tileTypes[x].sprite) {
        tileTypes[x].sprite[s]['start'] = t;

        t += tileTypes[x].sprite[s].d;
        tileTypes[x].sprite[s]['end'] = t;
      }
      tileTypes[x]['spriteDuration'] = t;
    }
  }
  for(let g in player.sprites) {
    if (player.sprites[g].length > 1){
      let t = 0;
      for (let f in player.sprites[g]){
        player.sprites[g][f]['start'] = t;
        t += player.sprites[g][f].d;
        player.sprites[g][f]['end'] = t;
      }
      player['spriteDuration'] = t;
      
    }
  
  }
}
function getFrame(sprite, duration, time, animated) {
  if (!animated) { return sprite[0]; }

  time = time % duration;

  for (let x in sprite) {
    if (sprite[x].end >= time) { return sprite[x]; }
  }
}
function getFramePlayer(sprite, duration, time, animated) {
  if (!animated) { return sprite[0]; }

  time = time % duration;

  for (let x in sprite) {
    if (sprite[x].end >= time) { return sprite[x]; }
  }
}
if (player.position[0] > 956 && player.position[1] > 1136) {
  finish()
  ctx.fillStyle = '#ff0000';
  ctx.fillText('finish' + frameLasrSecond, 10, 60);
}
function drawGame() {
  if (ctx == null) { return; }

  let currentFrameTime = Date.now();
  let timeElapsed = currentFrameTime - lastFrameTime;
  gameTime += Math.floor(timeElapsed * gameSpeed[currentSpeed].mult);

  let sec = Math.floor(Date.now() / 1000);
  if (sec !== currentSecond) {
    currentSecond = sec;
    frameLasrSecond = frameCount;
    frameCount = 1;
  }
  else { frameCount++; }

  if (!player.processMovement(gameTime) && gameSpeed[currentSpeed].mult != 0) {
    if (keysDown[38] && player.canMoveUp()) { player.moveUp(gameTime); }
    else if (keysDown[40] && player.canMoveDown()) { player.moveDown(gameTime); }
    else if (keysDown[37] && player.canMoveLeft()) { player.moveLeft(gameTime); }
    else if (keysDown[39] && player.canMoveRight()) { player.moveRight(gameTime); }

  }

  viewport.update(
    player.position[0] + (player.dimensions[0] / 2),
    player.position[1] + (player.dimensions[1] / 2),
  );

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

  for (let y = viewport.startTile[1]; y <= viewport.endTile[1]; y++) {
    for (let x = viewport.startTile[0]; x <= viewport.endTile[0]; x++) {

      let tile = tileTypes[gameMap[toIndex(x, y)]];
      let sprite = getFrame(tile.sprite, tile.spriteDuration,
        gameTime, tile.animated);
      
      ctx.drawImage(tileset,
        sprite.x, sprite.y, sprite.w, sprite.h,
        viewport.offset[0] + (x * titleW), viewport.offset[1] + (y * titleH),
        titleW, titleH);
    }
  }
  
  let sprite = getFramePlayer(player.sprites[player.direction], player.spriteDuration, 
    gameTime, player.animated);

  ctx.drawImage(tileset2,
    sprite.x, sprite.y, sprite.w, sprite.h,
    viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1],
    player.dimensions[0], player.dimensions[1]);

  ctx.fillStyle = '#ff0000';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('FPS ' + frameLasrSecond, 10, 20);
  ctx.fillText('Game speed ' + gameSpeed[currentSpeed].name, 10, 40);

  
  lastFrameTime = currentFrameTime;
  requestAnimationFrame(drawGame);
}
function startGame(){
  player.tileFrom = [1, 1];
  player.tileTo = [15, 15];
}

function finish(){
  showMenu();
  showCover();
}

export { drawGame, startGame} ;

