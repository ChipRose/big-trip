import dayjs from 'dayjs';
import duration  from 'dayjs/plugin/duration'
dayjs.extend(duration)


const dateFormat = {
  'date': 'D MMM',
  'time': 'HH:mm',
}

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomDate = () => {
  const dateFrom = dayjs().set('d', getRandomInteger(0, 30)).set('M', getRandomInteger(1, 12)).set('h', getRandomInteger(0, 24)).set('m', getRandomInteger(0, 60));
  const dateTo = dayjs(dateFrom).add(getRandomInteger(0, 3), 'day').add(getRandomInteger(0, 24), 'hour').add(getRandomInteger(0, 60), 'minute');

  return { dateFrom, dateTo }
};

const formatDate = (date) => dayjs(date).format(dateFormat.date);
const formatTime = (date) => dayjs(date).format(dateFormat.time);

const getDiffTime = ({ dateFrom, dateTo }) => {
  const dateStart = dayjs(dateFrom);
  const dateEnd = dayjs(dateTo);
  const dayDuration = dayjs.duration(dateEnd.diff(dateStart));
  const days = dayDuration.get('days');
  if (days) return dayDuration.format('DD[D] HH[H] mm[M]');
  if (!days && dayDuration.get('hours')) return dayDuration.format('HH[H] mm[M]');
  return dayDuration.format('mm[M]');
}

export { getRandomInteger, formatDate, formatTime, getDiffTime, getRandomDate };