const POINT_TYPES = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"];

const filterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const sortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export { POINT_TYPES, filterTypes, sortTypes };