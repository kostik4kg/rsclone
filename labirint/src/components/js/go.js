import { drawGame, startGame } from './canvas';
export default function go() {
  // const menuContainer = document.querySelector('.menu');
  // menuContainer.classList.toggle('menu-shown');
  // menuContainer.classList.toggle('menu-hidden');
  requestAnimationFrame(drawGame);
  startGame();
}
