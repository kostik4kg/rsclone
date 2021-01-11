import '../css/canvas.css';
import * as PIXI from 'pixi.js-legacy';
import catPng from '../img/cat.png';
import bars from '../img/bars.png';
import bars2 from '../img/bars2.png';
import tileSprite from '../img/09.png';
import tileMap from '../img/222.png';


let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas"
}

PIXI.utils.sayHello(type);

const app = new PIXI.Application({ width: 256, height: 256 });
window.app = app;
let loader = app.loader;
let resources = loader.resources;

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.backgroundColor = 'e12236';
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

loader
  .add([catPng, bars, bars2, tileSprite])
  .add(tileMap)
  .load(setup);

let catObject = {
  posX: 100,
  posY: 100,
  vw: 5,
  vh: 2,
}
let cat, state;
function setup() {
  cat = new PIXI.Sprite(resources[catPng].texture);
  let b1 = new PIXI.Sprite(resources[bars].texture);
  let b2 = new PIXI.Sprite(resources[bars2].texture);
  // let tileM = new PIXI.Sprite(resources[tileMap].textire);
// rocket
  let texture = new PIXI.Texture.from(tileSprite);
  let rectangle = new PIXI.Rectangle(96, 64, 32, 32);
  texture.frame = rectangle;
  let rocket = new PIXI.Sprite(texture);

// tileMap
  let textureMap = new PIXI.Texture.from(tileMap); 
  let rectangle2 = new PIXI.Rectangle(0,0,200,200);
  textureMap.frame = rectangle2;
  let map = new PIXI.Sprite(textureMap);

  // произвольный обьект из мап
  let box = new PIXI.Texture.from(tileMap);
  let rectangle3 = new PIXI.Rectangle(0, 224, 32, 32);
  textureMap.frame = rectangle3;
  // let boxObj = new PIXI.Sprite(box);
  for(let i = 0; i< 2100; i++){
    const boxObj = new PIXI.Sprite(box);
    // boxObj.anchor.set(0.5);
    boxObj.x = Math.floor(i % 100) * 32;
    boxObj.y = Math.floor(i / 100) * 32;

    app.stage.addChild(boxObj);
  }
  // boxObj.x = 150;
  // boxObj.y = 250;

  rocket.x = 100;
  rocket.y = 100;

  b1.width = 120;
  b1.height = 80;
  b1.x = 150;

  b2.scale.x = 0.5;
  b2.scale.y = 0.5;
  b2.x = 300;

  cat.x = catObject.posX;
  cat.y = catObject.posY;

  state = play;
  app.stage.addChild(cat, b1, b2, rocket, map);

  // app.ticker.add(delta => gameLoop(delta));

  app.renderer.render(app.stage);

}
function gameLoop(delta) {
  state(delta);
}
function play(delta) {
  cat.x += catObject.vh;
  cat.y += catObject.vw;
}
