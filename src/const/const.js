const POINT_TYPES = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const ModeType = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export { POINT_TYPES, FilterType, SortType, ModeType };