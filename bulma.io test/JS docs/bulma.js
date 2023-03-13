// modal js according to the video i provided in the comments at the bottom of the about-tab.html file

const moreinfoButton = document.querySelector('#infoRoxy');
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');

moreinfoButton.addEventListener('click', () => {
  modal.classList.add('is-active');
});

modalBg.addEventListener('click', () => {
  modal.classList.remove('is-active');
});