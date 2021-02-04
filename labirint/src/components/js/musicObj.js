import soundSettings from '../js/sound-settings.data';
import theMusic from '../sounds/bgrnd.mp3';

const musicObj = {
  music: null,

  init() {
    // const btnToListen1 = document.querySelectorAll('.soundOnBtn');
    // const btnToListen2 = document.querySelectorAll('.soundOffBtn');

    musicObj.music = new Audio(theMusic);
    musicObj.music.volume = soundSettings.volume;
    musicObj.music.loop = true;
    musicObj.music.autoPlay = true;

    // btnToListen1.forEach(x => x.addEventListener('click', musicObj.pauseResume));
    // btnToListen2.forEach(x => x.addEventListener('click', musicObj.pauseResume));
    document.addEventListener('click', musicObj.pauseResume);
  },

  pauseResume() {
    if (soundSettings.isSoundOn) musicObj.music.play();
    else musicObj.music.pause();
  }

}

export default function playMusic() {
  musicObj.init();

}; 