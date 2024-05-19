const srcArr = ['./scissors.png', './rock.png', './paper.png'];
const rspArr = ['scissors', 'rock', 'paper'];

const rspComputer = () => {
  const resultComputer = document.getElementById('resultComputer');
  const trigger = Math.trunc(Math.random()*3);
  resultComputer.firstElementChild.src = srcArr[trigger];
};
const rspMe = (nodeName, targetNode) => {
  const resultMe = document.getElementById('resultMe');
  resultMe.firstElementChild.src = nodeName === 'BUTTON' ? targetNode.firstElementChild.src : targetNode.src;
};
const rspCount = async (nodeName, targetNode) => {
  const versus = document.getElementById('versus');
  versus.innerText = '3';
  message.innerText = '게임중.';
  await new Promise(resolve => setTimeout(() => {
    versus.innerText = '2';
    message.innerText = '게임중..';
    resolve();
  }, 1000));
  await new Promise(resolve => setTimeout(() => {
    versus.innerText = '1';
    message.innerText = '게임중...';
    resolve();
  }, 1000));
  await new Promise(resolve => setTimeout(() => {
    versus.innerText = 'vs';
    resolve();
  }, 1000));
  rspComputer();
  rspMe(nodeName, targetNode);
};

const checkWin = () => {
  const srcComputer = document.getElementById('resultComputer').firstElementChild.src;
  const srcMe = document.getElementById('resultMe').firstElementChild.src;
  let idxComputer;
  rspArr.forEach((rsp, i) => {
    if (srcComputer.indexOf(rsp) !== -1) {
      idxComputer = i;
    }
  });
  let idxMe;
  rspArr.forEach((rsp, i) => {
    if (srcMe.indexOf(rsp) !== -1) {
      idxMe = i;
    }
  });
  if (idxMe === idxComputer) {
    return '비겼습니다~';
  } else if (idxMe === (idxComputer + 1)%3) {
    return '승리!';
  } else {
    return '졌습니다ㅠㅠ';
  }
};

let timer;
const handleRsp = event => {
  event.preventDefault();
  
  const targetNode = event.target;
  const nodeName = targetNode.nodeName
  
  if (!(nodeName === 'BUTTON' || nodeName === 'IMG')) return;
  if (!timer) {
    timer = setTimeout(async () => {
      const message = document.getElementById('message');
      message.innerText = '게임중';
      await rspCount(nodeName, targetNode);
      const resultMessage = checkWin();
      message.innerText = resultMessage;
      timer = null;
    });
  }
};

export default handleRsp;