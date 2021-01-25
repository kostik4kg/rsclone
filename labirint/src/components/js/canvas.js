import '../css/canvas.css';
import * as PIXI from 'pixi.js';
import catPng from '../img/cat.png';
import tileMap from '../img/222.png';
import { keyboard } from './keypressFn';
import { hitTestRectangle } from './keypressFn';
import { map } from './gameMap';


let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas"
}

PIXI.utils.sayHello(type);

const app = new PIXI.Application({ width: 256, height: 256 });
window.app = app;
let loader = app.loader;
let resources = loader.resources;

// app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.backgroundColor = 'e12236';
// const canvasContainer = document.querySelector('.')
app.renderer.resize(window.innerWidth, window.innerHeight);


document.body.appendChild(app.view);

loader
  .add([catPng])
  .add(tileMap)
  .load(setup);

let catObject = {
  posX: 100,
  posY: 100,
  speedX: 0,
  speedY: 0,
}

let cat, state, cat2;
let rectangleArr = [];

console.log(map);

function setup() {
  cat = new PIXI.Sprite(resources[catPng].texture);
  cat2 = new PIXI.Sprite(resources[catPng].texture);

  for (let q = 0; q < map.length; q++) {
    for (let w = 0; w < map[q].length; w++){
      if(map[q][w] === 1){
        let rectangle = new PIXI.Graphics();
        rectangle.beginFill(0xccff99);
        rectangle.drawRect(0, 0, 64, 64);
        rectangle.endFill();
        rectangle.x = 0 + 64 * w;
        rectangle.y = 0 + 64 * q;

        rectangleArr.push(rectangle);
      }
    }
  }


  // произвольный обьект из мап
  let box = new PIXI.Texture.from(tileMap);
  let rectangle3 = new PIXI.Rectangle(0, 224, 32, 32);

  box.frame = rectangle3;
  
  for(let i = 0; i< 2100; i++){

    const boxObj = new PIXI.Sprite(box);
    // boxObj.anchor.set(0.5);
    boxObj.x = Math.floor(i % 100) * 32;
    boxObj.y = Math.floor(i / 100) * 32;

    app.stage.addChild(boxObj);
  }
  let left = keyboard("ArrowLeft"),
      up = keyboard("ArrowUp"),
      right = keyboard("ArrowRight"),
      down = keyboard("ArrowDown");

  left.press = () => {
    catObject.speedX = -5;
    catObject.speedY = 0;
  };
  left.release = () => {
    if (!right.isDown && catObject.speedY === 0) {
      catObject.speedX = 0;
    }
  };
  up.press = () => {
    catObject.speedY = -5;
    catObject.speedX = 0;
  };
  up.release = () => {
    if (!down.isDown && catObject.speedX === 0) {
      catObject.speedY = 0;
    }
  };
  right.press = () => {
    catObject.speedX = 5;
    catObject.speedY = 0;
  };
  right.release = () => {
    if (!left.isDown && catObject.speedY === 0) {
      catObject.speedX = 0;
    }
  };

  //Down
  down.press = () => {
    catObject.speedY = 5;
    catObject.speedX = 0;
  };
  down.release = () => {
    if (!up.isDown && catObject.speedX === 0) {
      catObject.speedY = 0;
    }
  };

  cat.x = catObject.posX;
  cat.y = catObject.posY;
  console.log(cat.getGlobalPosition().x);
  state = play;
  // superFastSprites.appendChild(cat);

  // app.stage.addChild(rectangle);
  app.stage.addChild(cat, cat2);
  rectangleArr.forEach((item) => {
    app.stage.addChild(item);
  })
  
  app.ticker.add(delta => gameLoop(delta));

  app.renderer.render(app.stage);

}

function gameLoop(delta) {
  state(delta);
}

function play(delta) {
  cat.x += catObject.speedX;
  cat.y += catObject.speedY;
  
  rectangleArr.forEach((item) => {
    if (hitTestRectangle(cat, item)) {
      item.tint = 0xff3300;
      catObject.speedX = 0;
      catObject.speedY = 0;
    } else {
      item.tint = 0xccff99;
    }
  });
}
console.log(app.view)
function Camera(map, width, height) {
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.maxX = map.cols * map.tsize - width;
  this.maxY = map.rows * map.tsize - height;
}
Camera.SPEED = 256; // pixels per second

Camera.prototype.move = function (delta, dirx, diry) {
  // move camera
  this.x += dirx * Camera.SPEED * delta;
  this.y += diry * Camera.SPEED * delta;
  // clamp values
  this.x = Math.max(0, Math.min(this.x, this.maxX));
  this.y = Math.max(0, Math.min(this.y, this.maxY));
};
