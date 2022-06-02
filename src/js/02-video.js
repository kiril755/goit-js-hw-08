import Player from '@vimeo/player';
import Throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const CURRENT_KEY = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const currentTime = function (data) {
  console.log(data.seconds);
  localStorage.setItem(CURRENT_KEY, data.seconds);
  if (data.seconds === data.duration) {
    localStorage.removeItem(CURRENT_KEY);
  }
};

player.on('timeupdate', Throttle(currentTime, 1000));

const localStorageCurrentTime = localStorage.getItem(CURRENT_KEY);
// console.log(currentTime);

player
  .setCurrentTime(localStorageCurrentTime)
  .then(function (seconds) {
    seconds = localStorageCurrentTime;
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        seconds <= 0;
        break;

      default:
        'Locale storage clear';
        break;
    }
  });
