const imageContainer = document.getElementById('imageContainer');

const opacityAnimation = (element, start, end) => {
  element.animate(
    {opacity: [start, end]},
    {
      duration: 500,
      easing: 'ease',
      iteration: 1,
      fill: 'both',
    });
}


const getSrc = (id, data) => {
  switch(id) {
    case 'catImageButton':
      return data?.[0].url;
    case 'dogImageButton':
      return data?.message;
    default:
      return './cat.png'
  };
};

const getImage = async event => {
  event.preventDefault();
  if (event.target.classList.contains('deActive')) {return;}
  if (imageContainer.firstElementChild) {
    opacityAnimation(imageContainer.firstElementChild, 1, 0);
  }
  
  const id =  event.target.id;
  const urlMap = {
    dogImageButton: 'https://dog.ceo/api/breeds/image/random',
    catImageButton: 'https://api.thecatapi.com/v1/images/search'
  };
  const data = await fetch(urlMap[id]).then(res => res.json());
  const src = getSrc(id, data);

  await new Promise(resolve => {
    let firstImage;
    if (!imageContainer.children.length) {
      const newImage = document.createElement('img');
      newImage.src = src;
      newImage.style = "width: 100%; height: 100%; z-index: -1;";
      imageContainer.appendChild(newImage);
      firstImage = imageContainer.firstElementChild;
    } else {
      imageContainer.firstElementChild.src = src;
      firstImage = imageContainer.firstElementChild;
    }
    resolve(firstImage);
  }).then((element) => {
    opacityAnimation(element, 0, 1);
  });
};

export default getImage;