function csl(elem) {
  console.log(elem);
}

import './index.css';
import ResultRender from './js/components/ResultRender';
import BarList from './js/components/BarList';
import { setStyleNone, setStyleBlock } from './js/utils/utils';
import {
  CHANGE_VOIT,
  SHOW_RESULTS,
  FORM,
  RESULT,
  RESULT_TOTAL,
  BARS_CONTAINER,
} from './js/constans/constans';

const barsTemplate = document.getElementById('BarTemplate').content;
const barsList = new BarList(BARS_CONTAINER);

//  начальные значения для наглядности
let voting = {
  totalIntovert: 10,
  totalExtrovert: 15,
  totalDntknow: 30,
};

// считаем количество голосов
function sumVoting(voting) {
  return Object.values(voting).reduce((a, b) => a + b, 0);
}

function resultTotalVoits(obj) {
  RESULT_TOTAL.textContent = `Всего голосов ${sumVoting(obj)} `;
}

function getWidth(array, total) {
  return array.map((data) => {
    return Math.round((data * 100) / total);
  });
}

// собираем гоолоса
function hendler(evt, obj) {
  evt.preventDefault();
  if (evt.target.classList.contains('introvert-btn')) {
    obj.totalIntovert++;
  } else if (evt.target.classList.contains('extrovert-btn')) {
    obj.totalExtrovert++;
  } else if (evt.target.classList.contains('dntknow-btn')) {
    obj.totalDntknow++;
  }
  return obj;
}

function reRender(evt, obj) {
  barsList.remove();
  hendler(evt, obj);
  let arrForBars = Object.keys(voting).map((key) => {
    return obj[key];
  });
  let total = sumVoting(obj);
  let width = getWidth(arrForBars, total);
  resultTotalVoits(obj);
  //отрисовываем график
  const bars = width.map((data) => {
    return new ResultRender(data, barsTemplate).createBar();
  });
  barsList.render(bars);
}

FORM.addEventListener('click', (evt) => {
  reRender(evt, voting);
  setStyleNone(FORM);
  setStyleBlock(RESULT);
});

CHANGE_VOIT.addEventListener('click', () => {
  setStyleNone(RESULT);
  setStyleBlock(FORM);
});
SHOW_RESULTS.addEventListener('click', () => {
  setStyleNone(FORM);
  setStyleBlock(RESULT);
});
