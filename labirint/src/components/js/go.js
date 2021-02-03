import { drawGame, startGame } from './canvas';
export default function go() {
  requestAnimationFrame(drawGame);
  startGame();
}
