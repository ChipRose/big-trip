import { SortType } from '../const/const';

const sort = {
  [SortType.DAY]: (points) => [...points],
  [SortType.EVENT]: (points) => [...points],
  [SortType.TIME]: (points) => [...points],
  [SortType.PRICE]: (points) => [...points],
  [SortType.OFFERS]: (points) => [...points],
};

export { sort };