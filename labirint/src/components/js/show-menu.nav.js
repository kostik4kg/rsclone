export default function showMenu() {
  const menuContainer = document.querySelector('.menu');
  menuContainer.classList.toggle('menu-shown');
  menuContainer.classList.toggle('menu-hidden');
}
