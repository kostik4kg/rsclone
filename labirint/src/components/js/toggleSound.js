import showHideSoundBtn from './showHideSoundBtn';
import soundSettings from './sound-settings.data';

export default function toggleSound() {
  soundSettings.isSoundOn = soundSettings.isSoundOn ? false : true;
  showHideSoundBtn();
}