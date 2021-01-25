import mouseHover from '../sounds/mouse-hover.wav'
import soundSettings from '../js/sound-settings.data'

const mouseSound = new Audio(mouseHover);
mouseSound.volume = soundSettings.volume;

export default function playMouseHover() {
  if (soundSettings.isSoundOn) mouseSound.play();
}
