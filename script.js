// Youtube API key AIzaSyCwkhIwHL4w-TCHeUTowvL877WKYxjADIY

const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen')
const speedDial = document.querySelector('.player-speed');
const expand = document.querySelector('.fa-expand')
const player = document.querySelector('.player')

// document.addEventListener('DOMContentLoaded', fetchVids)

// Fetch videos
// const YouTube_API_key =  "563492ad6f917000010000016fcf9a0d330d4ae89e364a5d50b2452b"
// const API_key =  "563492ad6f917000010000016fcf9a0d330d4ae89e364a5d50b2452b"
// const yTubeUrl = "https://www.googleapis.com/youtube/v3/channels"
// const url = "https://api.pexels.com/videos/popular?per_page=5"
// const configObj = {
//     method: 'GET',
//     headers: {
//         Accept: 'application/json',
//         Authorization: API_key
//     }
// }
// function fetchVids () {
//     fetch(url, configObj)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         video.src = data.videos[3].video_files[3].link;
//     })
// }

// Play & Pause ----------------------------------- //

function showPlayIcon(){
    // target css classes with btn element to remove or add a class
        // switch from class play to pause
        playBtn.classList.replace('fa-pause-circle', 'fa-play-circle')
        //Change the attribute title to Pause instead of Play
        playBtn.setAttribute('title','Play')
}

function togglePlay(){
    if(video.paused){
        //add video play method
        video.play();
        // target css classes with btn element to remove or add a class
        // switch from class play to pause
        playBtn.classList.replace('fa-play-circle', 'fa-pause-circle')
        //Change the attribute title to Pause instead of Play
        playBtn.setAttribute('title','Pause')
    }else{
        // Add video pause method
        video.pause();
        showPlayIcon();
    }
}

// On video End, show play button icon

video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Calculate vdieo time format
function displayTime(time){
    const minutes = Math.floor(time / 60)
    //return the remainder
    let seconds = Math.floor(time % 60)
    seconds = seconds > 9 ? seconds : `0${seconds}`
    //return value so tha it can be used by other elements in the code
    return `${minutes}:${seconds}`;
}

//  Update progress bar as video plays
function updateProgress(){
    //Target progress bar element to change it's with dinamicaly usong the resulting
    // percentage of deviding the videos current time by its duration.
    progressBar.style.width =`${(video.currentTime / video.duration) * 100}%`
    let time = video.currentTime;
    currentTime.textContent = `${displayTime(time)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

// Click to select time within video

function changeProgress(e){
    const newTime = e.offsetX / progressRange.offsetWidth // where we actually clicked devided by the total width of the parent element
    progressBar.style.width = `${(newTime * 100)}%`
    video.currentTime = newTime * video.duration
    updateProgress
}

// Volume Controls --------------------------- //

// Volume Bar
function volumeChange(e){
    // Use the offsetX event property to dynamically change the volume bar's width
    console.log(e)
    const volumeX = e.offsetX;
    console.log(volumeX/100)
    video.volume = volumeX /100;
    volumeBar.style.width = `${(volumeX)}%`
    return volumeX / 100;
}

//Volume icon
function toggleAudio(){
    video.muted = !video.muted
    if(video.muted === true){
        volumeIcon.className = 'fas fa-volume-down'
        volumeBar.style.width = `0%`
    }else{
        video.volume = 0.2;
        volumeBar.style.width = `20%`
        volumeIcon.className = 'fas fa-volume-up'
    }
    
}



// Change Playback Speed -------------------- //

function setVideoRate(){
    console.log(speedDial.value)
    video.playbackRate = speedDial.value
}

// Fullscreen ------------------------------- //

//Full screen API to turn any element into full screen
function fullScreen(){
    if (player.fullscreenElement) {
        player.exitFullscreen()
          .then(() => console.log("Document Exited from Full screen mode"))
          .catch((err) => console.error(err))
      } else {
        player.requestFullscreen();
      }
}
// Event Listeners

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay)

//Video Events taken from w3Schools
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress)

// event listener for progress bar
progressRange.addEventListener('click', changeProgress)

// Volume controls EVENT LISTENERS
volumeRange.addEventListener('click', volumeChange)
volumeIcon.addEventListener('click', toggleAudio)

// Video playBack rate event listener

speedDial.addEventListener('change', setVideoRate)

// Fullscreen element

fullscreenBtn.addEventListener('click', fullScreen);