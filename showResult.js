const resultMap = {
  '비겼습니다~': '무승부',
  '승리!': '승리',
  '졌습니다ㅠㅠ': '패배',
};

const makeElement = (name, tag) => {
  const newElement = document.createElement(tag);
  newElement.classList.add(name);
  return newElement;
}

const makeNewMessage = (name, message) => {
  const newElement = makeElement(name, 'h3');
  const newText = document.createTextNode(message);
  newElement.appendChild(newText);
  return newElement;
}

const showResult = (resultMessage) => {
  const buttons = document.getElementsByTagName('button');
  for (let button of buttons) {
    button.classList.add('deActive');
  }

  const newResultMessage = makeNewMessage('newResultMessage', resultMap[resultMessage]);
  const retryMessage = makeNewMessage('retryMessage', '재도전 하시겠습니까?');
  const retryButton = makeElement('retryButton', 'button');
  retryButton.innerText = '다시하기';
  const resultContainer = makeElement('resultContainer', 'div');
  const main = document.querySelector('main');
  
  resultContainer.append(newResultMessage, retryMessage, retryButton);
  retryButton.addEventListener('click', event => {
    event.preventDefault();
    main.removeChild(resultContainer);
    for (let button of buttons) {
      button.classList.remove('deActive');
    }
  });
  main.appendChild(resultContainer);

}

export default showResult;