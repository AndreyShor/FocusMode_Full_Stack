// Modal (settings button)
const modal = document.getElementById('image-modal');
const modalBtn = document.querySelector('.top-header .modal-image-btn');
const modalCloseBtn = document.querySelector('.modal-content .close-btn');

// Listen for open click
modalBtn.addEventListener('click', openModal);
// Listen for close click
modalCloseBtn.addEventListener('click', closeModal);
// Listen for outside click (in window)
window.addEventListener('click', clickOutside);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Image select
// const images = document.querySelectorAll('.images-container .box');
// images.forEach((box) =>
//   box.addEventListener('click', () => {
//     const img = box.style.src;
//     document.documentElement.style.setProperty(
//       '--background-img',
//       `url(${img})`
//     );
//   })
// );

// Fullscreen toggle
const fsBtn = document.querySelector('.focus-btn');
const stopClock = document.getElementById('stop-clock');
const clockDisplay = document.querySelector('.clock-display');

let interval;
let s = 0;
function startTime() {
  interval = setInterval(() => {
    let mins = Math.floor(s / 60);
    let seconds = s % 60;
    clockDisplay.textContent = `${mins < 10 ? '0' + mins : mins}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
    s++;
  }, 1000);
}

fsBtn.addEventListener('click', () => {
  document.documentElement.requestFullscreen();
});

document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    startTime();
    stopClock.classList.remove('hidden');
  } else {
    clearInterval(interval);
    stopClock.classList.add('hidden');
  }
});

// Lofi Playlist
const iframe = document.querySelector('.bg-music iframe');
const playLofi = document.querySelector('.play-music');
const pauseLofi = document.querySelector('.pause-music');

paused = true;

playLofi.addEventListener('click', () => {
  if (paused) {
    iframe.src += '?autoplay=1&loop=1';
  }
  paused = false;
});

pauseLofi.addEventListener('click', () => {
  if (!paused) {
    iframe.src = 'https://www.youtube.com/embed/lTRiuFIWV54';
  }
  paused = true;
});



const reader = new FileReader();
const fileInput = document.getElementById("image");
const img_pre = document.getElementById("image_pre");
let imageIs = false;

document.getElementById('add-btn').addEventListener('click', () => {
  document.getElementById('image').click()
})


fileInput.addEventListener('change', e => {
    const f = e.target.files[0];

    reader.onload = e => {
        let formData = new FormData();
        formData.append("image", f)
        formData.append("text", "success")
        fetch('http://localhost:800/api/uploadImage', {method: "POST", body: formData}).then((result)=> {
          window.location.replace("/main");
        })
      }
    
    reader.readAsDataURL(f)
})

function changeBackground(elPath) {
  const background = document.getElementById('background-container');

  background.style.backgroundImage = elPath;

}
