const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video');

const captionBtn = document.querySelector('.captions-btn');

const playPauseBtn = document.querySelector('.play-pause-btn');
const miniPlayerBtn = document.querySelector('.mini-player-btn');
const theaterBtn = document.querySelector('.theater-btn');
const fullScreenBtn = document.querySelector('.full-screen-btn');

const volumeSlider = document.querySelector('.volume-slider');
const volumeContainer = document.querySelector('.volume-container');
const muteBtn = document.querySelector('.mute-btn');

const currentTimes = document.querySelector('.current-time');
const totalTimes = document.querySelector('.total-time');

const speedBtn = document.querySelector('.speed-btn');

const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress-bar');
const progressIndicator = document.querySelector('.progress-current');
const previewVideo = document.querySelector('.preview-video');
const previewDuratio = document.querySelector('.preview-duration');


// play and pause
playPauseBtn.addEventListener('click', togglePlayPause);

function togglePlayPause() {
    video.paused ? video.play() : video.pause();
}


// keyboard funcionality
document.addEventListener('keydown', e => {
    const activeElement = document.activeElement.tagName;
    if (activeElement === 'INPUT') return;
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


// progress

let isMouseDown = false;
let isPaused = false;
progress.addEventListener('mousedown', e => {
    isMouseDown = true;
    isPaused = video.paused;
    video.pause();
    handleMouseMove(e);
})

document.addEventListener('mouseup', e => {    
    if (isMouseDown) {
        isMouseDown = false;
        if (!isPaused) video.play();
    }
})

progress.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mousemove', e => {
    if ( isMouseDown ) handleMouseMove(e);
})

function handleMouseMove(e) {
    e.preventDefault();
    const rect = progress.getBoundingClientRect();
    const currentX = e.pageX - rect.left;
    const ratio =  currentX / rect.width;
    progress.style.setProperty(`--hoverPosition`, ratio);
    previewVideo.currentTime = ratio * previewVideo.duration;
    previewDuratio.textContent = formatTime(previewVideo.currentTime);
    videoContainer.classList.toggle('isMouseDown', isMouseDown);
    if ( isMouseDown ) {
        video.currentTime = video.duration * ratio;
    }
}

//play pause
video.addEventListener('click', () => {
    togglePlayPause();
})

video.addEventListener('play', () => {
    videoContainer.classList.remove('paused');
})

video.addEventListener('pause', () => {
    videoContainer.classList.add('paused');
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

    const ratio = (video.currentTime / video.duration) ;
    progress.style.setProperty(`--videoProgress`, ratio);
    progressIndicator.style.setProperty(`--videoProgress`, ratio);
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


// subtitle
const subtitle = video.textTracks[0];
subtitle.mode = 'hidden';

captionBtn.addEventListener('click', toggleSubtitle)
function toggleSubtitle() {
    const isShowing = subtitle.mode === 'showing';
    subtitle.mode = 
    isShowing ? 'hidden' : 'showing';
    videoContainer.classList.toggle('subtitle', !isShowing);
}

// playback speed
speedBtn.addEventListener('click', () => {
    if ( video.playbackRate < 3 ) {
        video.playbackRate += .5;
    } else {
        video.playbackRate = 1;
    }
    speedBtn.textContent = `${video.playbackRate}x`;
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



