import { getRandomInteger } from '../util/util';

export const getAvailableOffersIdByType = (pointType) => {
  const offersByType = {
    "taxi": [1, 4, 3, 5],
    "bus": [1, 2, 4],
    "train": null,
    "ship": [3],
    "drive": null,
    "flight": [4, 1],
    "check-in": [2, 3],
    "sightseeing": null,
    "restaurant": [5, 6, 7],
  };
  return offersByType[pointType];
};

export const getCheckedOffersIdByType = (pointType) => {
  const availableOffers = getAvailableOffersIdByType(pointType);
  const checkedOffersNonUniq = Array.from({ length: getRandomInteger(0, availableOffers?.length - 1) }, () => availableOffers[getRandomInteger(0, availableOffers?.length - 1)])
  const offersSet = Array.from(new Set(checkedOffersNonUniq));
  return availableOffers?.length ? offersSet : [];
};
