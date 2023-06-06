import { sortTypes } from '../const/const';

const sort = {
  [sortTypes.DAY]: (points) => [...points],
  [sortTypes.EVENT]: (points) => [...points],
  [sortTypes.TIME]: (points) => [...points],
  [sortTypes.PRICE]: (points) => [...points],
  [sortTypes.OFFERS]: (points) => [...points],
};

export { sort };