export default function showHideSoundBtn() {
  const btnOn = document.getElementById('soundOnBtn');
  const btnOff = document.getElementById('soundOffBtn');

  btnOff.classList.toggle('disabledElement');
  btnOn.classList.toggle('disabledElement');

  btnOff.classList.toggle('enabledElement');
  btnOn.classList.toggle('enabledElement');
}