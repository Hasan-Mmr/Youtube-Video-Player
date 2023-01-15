const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video');

const playPauseBtn = document.querySelector('.play-pause-btn');
const miniPlayerBtn = document.querySelector('.mini-player-btn');
const theaterBtn = document.querySelector('.theater-btn');
const fullScreenBtn = document.querySelector('.full-screen-btn');


// play and pause
playPauseBtn.addEventListener('click', togglePlayPause);

function togglePlayPause() {
    video.paused ? video.play() : video.pause();
}

document.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    switch (key) {
        case 'k':
            togglePlayPause();
            break;

        case 'i':
            togglePictureInPicture();
            break;
        case 't':
            toggleTheaterMode();
            break;
        default:
            break;
    }
})

video.addEventListener('click', () => {
    togglePlayPause();
})

video.addEventListener('play', () => {
    videoContainer.classList.remove('paused');
})

video.addEventListener('pause', () => {
    videoContainer.classList.add('paused');
})

// mini player
miniPlayerBtn.addEventListener('click', togglePictureInPicture);
function togglePictureInPicture() {
    document.pictureInPictureElement ? document.exitPictureInPicture() : video.requestPictureInPicture();
}

// theater mode
theaterBtn.addEventListener('click', toggleTheaterMode)
function toggleTheaterMode() {
    videoContainer.classList.toggle('theater');
}