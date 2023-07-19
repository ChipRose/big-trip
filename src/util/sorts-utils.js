import dayjs from 'dayjs';
import { SortType } from '../const/const';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortDateDown = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).isBefore(dayjs(pointB.dateFrom)) ? -1 : 1;
};

const sortPriceDown = (pointA, pointB) => {
  return pointB.basePrice - pointA.basePrice;
};

const sortTimeDown = (pointA, pointB) => {
  const pointADiff = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDiff = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return dayjs(pointBDiff).diff(dayjs(pointADiff));
};

const getSortCallback = (sortType) => {
  const SortProperties = {
    [SortType.DAY]: sortDateDown,
    [SortType.PRICE]: sortPriceDown,
    [SortType.TIME]: sortTimeDown,
  };

  return SortProperties[sortType] ? SortProperties[sortType] : null;
}

export { getSortCallback };