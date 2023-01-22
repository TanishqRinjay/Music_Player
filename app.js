const playButton = document.getElementById("play");
const songTitle = document.getElementById("title");
const songArtist = document.getElementById("artist");
const prev = document.getElementById("previous");
const next = document.getElementById("next");
const music = document.querySelector("audio");
let img = document.querySelector("img");
let isPlaying = false;
let songIndex = 0;
let isFirstTime = true;
const buttonIcon = document.getElementById("play");

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

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
}
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
}
