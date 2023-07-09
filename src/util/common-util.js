import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomDate = () => {
  const dateFrom = dayjs().set('d', getRandomInteger(0, 30)).set('M', getRandomInteger(0, 11)).set('h', getRandomInteger(0, 24)).set('m', getRandomInteger(0, 60));
  const dateTo = dayjs(dateFrom).add(getRandomInteger(0, 3), 'day').add(getRandomInteger(0, 24), 'hour').add(getRandomInteger(0, 60), 'minute');

  return { dateFrom, dateTo };
};

const updateItem = ({ items, update }) => {
  const index = items.findIndex((item) => item.id === update.id);
  const rezult = items.slice();

  if (index === -1) {
    return rezult;
  }

  rezult[index] = update;

  return rezult;
}

export { getRandomInteger, getRandomDate, updateItem };