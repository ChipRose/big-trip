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

const sortDateUp = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortDateDown = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
};

const sortPriceDown = (pointA, pointB) => {
  return pointB.basePrice - pointA.basePrice;
}

const sortTimeDown = (pointA, pointB) => {
  const pointADiff = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDiff = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return dayjs(pointBDiff).diff(dayjs(pointADiff));
}

const sortOffersDown = (pointA, pointB) => {
  return pointB.offers.length - pointA.offers.length;
}

const SortProperties = {
  [SortType.DAY]: { sortFunc: sortDateUp, isDisabled: false },
  [SortType.PRICE]: { sortFunc: sortPriceDown, isDisabled: false },
  [SortType.TIME]: { sortFunc: sortTimeDown, isDisabled: false },
  [SortType.OFFERS]: { isDisabled: true },
  [SortType.EVENT]: { isDisabled: true },
}

const getSortCallBack = (sortType) => {
  return SortProperties[sortType]?.sortFunc ? SortProperties[sortType]?.sortFunc : SortProperties[sortType]?.isDisabled;
}

export { sortDateUp, sortDateDown, getSortCallBack };