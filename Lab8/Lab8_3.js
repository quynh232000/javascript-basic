const videoEl = document.querySelector(".video");
const replayEl = document.querySelector(".btn-replay");
const playPauseEl = document.querySelector(".play-pause");

const muteUnmuteEl = document.querySelector(".mute-unmute");
const volumeEl = document.querySelector(".input-range");
const timePlayEl = document.querySelector(".time-playing");
const totalTimeEl = document.querySelector(".total-time");

let volumeInit = 0.5;
volumeEl.value = volumeInit;
videoEl.volume = volumeInit;

let idPlay;

// render list
const dataVideos = [
  "../audio/video.mp4",
  "../audio/video1.mp4",
  "../audio/video2.mp4",
  "../audio/video3.mp4",
  "../audio/video4.webm",
  "../audio/video1.mp4",
  "../audio/video2.mp4",
  "../audio/video3.mp4",
];
const showList = document.querySelector(".right");
const html = dataVideos.map((item, index) => {
  return `
        <div class="r-item" data-index=${index}>
            <video src=${item} class="r-video"></video>
            <div class="icon-body">
              <i class="fa-solid fa-play icon-play"></i>
            </div>
        </div>
  `;
});
showList.innerHTML = html.join("");

// video list mouse over
const videoListEl = document.querySelectorAll(".r-item");
videoListEl.forEach((element) => {
  element.addEventListener("click", (e) => {
    const node = element.childNodes[1];
    if (node) {
      videoEl.src = dataVideos[+element.dataset.index];
      videoEl.play();
      totalTimeEl.textContent = convertStoMs(videoEl.duration);
      controlVideo();
    }
  });
  element.addEventListener("mouseover", (e) => {
    const node = element.childNodes[1];
    if (node) {
      node.volume = 0;
      node.play();
    }
  });
  element.addEventListener("mouseout", (e) => {
    const node = element.childNodes[1];
    if (node) {
      node.pause();
    }
  });
});

// render list

const replayVideo = () => {
  replayEl.onclick = () => {
    videoEl.currentTime = 0;
    videoEl.play();
    playPauseEl.innerHTML = '<i class="fa-solid fa-pause btn-pause"></i>';
  };
};
const controlVideo = () => {
  // format seconds
  function convertStoMs(seconds) {
    seconds = Math.floor(seconds);
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    let result = minutes + ":" + extraSeconds;
    return result;
  }
  // toggle video
  const playAndPause = () => {
    if (!videoEl.paused) {
      clearInterval(idPlay);
      videoEl.pause();
      playPauseEl.innerHTML = '<i class="fa-solid fa-play btn-play"></i>';
    } else {
      totalTimeEl.textContent = convertStoMs(videoEl.duration);

      // console.log();
      videoEl.play();
      playPauseEl.innerHTML = '<i class="fa-solid fa-pause btn-pause"></i>';
      idPlay = setInterval(() => {
        timePlayEl.textContent = convertStoMs(videoEl.currentTime);
      }, 1000);
    }
  };
  // play video
  playPauseEl.onclick = (e) => {
    playAndPause();
  };
  videoEl.onclick = () => {
    playAndPause();
  };
  // replay
  replayVideo();

  // volume;
  volumeEl.onchange = (e) => {
    volumeInit = e.target.value;
    videoEl.volume = volumeInit;
    if (volumeInit == 0) {
      muteUnmuteEl.innerHTML = `<i class="fa-solid fa-volume-xmark btn-mute"></i>`;
    } else {
      muteUnmuteEl.innerHTML = `<i class="fa-solid fa-volume-high btn-unmute"></i>`;
    }
  };
  muteUnmuteEl.onclick = () => {
    if (videoEl.volume != 0) {
      muteUnmuteEl.innerHTML = `<i class="fa-solid fa-volume-xmark btn-mute"></i>`;
      videoEl.volume = 0;
      volumeEl.value = 0;
    } else {
      muteUnmuteEl.innerHTML = `<i class="fa-solid fa-volume-high btn-unmute"></i>`;
      videoEl.volume = volumeInit;
      volumeEl.value = volumeInit;
    }
  };
};
controlVideo();
