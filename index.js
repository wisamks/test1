import getImage from './getImage.js';
import handleRsp from './handleRsp.js';

const buttonContainer = document.getElementById('home').firstElementChild;
buttonContainer.addEventListener('click', getImage);

const selectButton = document.getElementById('selectButton');
selectButton.addEventListener('click', handleRsp);

const top = document.getElementById('top');
top.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
