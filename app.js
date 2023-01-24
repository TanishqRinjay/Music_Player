const playButton = document.getElementById("play");
const songTitle = document.getElementById("title");
const songArtist = document.getElementById("artist");
const prev = document.getElementById("previous");
const next = document.getElementById("next");
const music = document.querySelector("audio");
const keyboardPlayButton = window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "MediaStop") {
    pauseMusic();
    music.currentTime = 0;
  } else if (e.key === "MediaTrackPrevious") {
    if (music.currentTime > 1) {
      music.currentTime = 0;
    } else {
      prevSong();
    }
  } else if (e.key === "MediaTrackNext") {
    nextSong();
  } else if (e.key === "MediaPlayPause") {
    isPlaying ? pauseMusic() : playMusic();
  }
});
let img = document.querySelector("img");
let isPlaying = false;
let songIndex = 0;
let isFirstTime = true;
const buttonIcon = document.getElementById("play");
let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");

//      Array of Songs
const songs = [
  {
    name: "Perfect",
    title: "PERFECT",
    artist: "Ed Sheeran",
  },
  {
    name: "Closer",
    title: "CLOSER",
    artist: "The Chainsmokers",
  },
  {
    name: "Industry_Baby",
    title: "INDUSTRY BABY",
    artist: "Lil Nas X",
  },
  {
    name: "Night_Changes",
    title: "NIGHT CHANGES",
    artist: "One Direction",
  },
];

//      Playing Music

function playMusic() {
  if (isFirstTime) {
    loadSong(songs[songIndex]);
    isFirstTime = false;
  }
  music.play();
  buttonIcon.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
  isPlaying = true;
}

//      Pausing Music

function pauseMusic() {
  music.pause();
  buttonIcon.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
  isPlaying = false;
}
playButton.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

//      Changing Music

const loadSong = (songs) => {
  songTitle.innerText = songs.title;
  songArtist.innerText = songs.artist;
  music.src = "./songs/" + songs.name + ".mp3";
  img.src = "./images/" + songs.name + ".jpg";
  if (isPlaying) {
    music.play();
  }
};

//    Song Progress Bar

music.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.srcElement;
  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;

  //    Music duration update

  let min_duration = Math.floor(duration / 60);
  let sec_duration = String(Math.floor(duration % 60)).padStart(2, "0");

  let totalDuration = `${min_duration}:${sec_duration}`;
  if (duration) {
    total_duration.textContent = `${totalDuration}`;
  }

  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = String(Math.floor(currentTime % 60)).padStart(2, "0");

  let newCurrentTime = `${min_currentTime}:${sec_currentTime}`;
  if (currentTime) {
    current_time.textContent = `${newCurrentTime}`;
  }
});

progress_div.addEventListener("click", (e) => {
  const duration = music.duration;
  let move_progress = (e.offsetX / progress_div.offsetWidth) * duration;
  music.currentTime = move_progress;
});

//    Start new Song when current song ends
music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

function nextSong() {
  progress.style.width = 0;
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
}
function prevSong() {
  progress.style.width = 0;
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
}
