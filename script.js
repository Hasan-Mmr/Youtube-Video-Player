const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video');

const playPauseBtn = document.querySelector('.play-pause-btn');
const miniPlayerBtn = document.querySelector('.mini-player-btn');
const theaterBtn = document.querySelector('.theater-btn');
const fullScreenBtn = document.querySelector('.full-screen-btn');

const volumeSlider = document.querySelector('.volume-slider');
const volumeContainer = document.querySelector('.volume-container');
const muteBtn = document.querySelector('.mute-btn');

const currentTimes = document.querySelector('.current-time');
const totalTimes = document.querySelector('.total-time');

// play and pause
playPauseBtn.addEventListener('click', togglePlayPause);

function togglePlayPause() {
    video.paused ? video.play() : video.pause();
}

document.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    console.log(key);
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

        case 'f':
            toggleFullsreen();
            break;
          
        case 'm':
            toggleMute();
            break;
        
        case 'arrowright':
        case 'l':
            forwardBackward(10);
            break;
        
        case 'arrowleft':
        case 'j':
            forwardBackward(-10);
            break;

        default:
        break;
    }
})


//pal pause
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

// fllscreen mode
fullScreenBtn.addEventListener('click', toggleFullsreen);
function toggleFullsreen () {
    if ( document.fullscreenElement === null ) {
        videoContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener('fullscreenchange', () => {
    if ( document.fullscreenElement ) {
        videoContainer.classList.add('full-screen');
    } else {
        videoContainer.classList.remove('full-screen')
    }
})

// volume control

volumeSlider.addEventListener('input', changeVolume);
function changeVolume(e) {
    const val = e.target.value;
    video.volume = val;
    video.muted = e.target.value === 0;
}

muteBtn.addEventListener('click', toggleMute);
function toggleMute() {
    video.muted = !video.muted;
}

video.addEventListener('volumechange', showVolumeIcon);
function showVolumeIcon()  {
    const vol = video.volume;
    let volLevel;

    if ( video.muted || vol === 0 ) {
        volLevel =  'muted';
    } else if ( vol > 0.5 ) {
        volLevel =  'high';
    } else {
        volLevel =  'low';
    }
    volumeContainer.dataset.volume = volLevel;
}


// time update

video.addEventListener('loadeddata', showTotalTime);
function showTotalTime() {
    totalTimes.textContent = formatTime(video.duration);
}

video.addEventListener('timeupdate', showCureentTime);
function showCureentTime() {
    currentTimes.textContent = formatTime(video.currentTime);
}

const timeFormatter = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2});

function formatTime(time) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time  % 3600) / 60);
    const hours = Math.floor(time / 3600);
    if ( hours == 0  ) {
        return `${timeFormatter.format(minutes)}:${timeFormatter.format(seconds)}`;
    } else {
        return `${timeFormatter.format(hours)}:${timeFormatter.format(minutes)}:${timeFormatter.format(seconds)}`;
    }
}

function forwardBackward(duraion) {
    video.currentTime += duraion;
}