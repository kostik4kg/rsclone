export default function showHideSoundBtn() {
  const btnOn = document.querySelectorAll('.soundOnBtn');
  const btnOff = document.querySelectorAll('.soundOffBtn');

  const switcher = (btn) => {
    btn.classList.toggle('disabledElement');
    btn.classList.toggle('enabledElement');
  }

  btnOff.forEach(x => switcher(x));
  btnOn.forEach(x => switcher(x));

}
