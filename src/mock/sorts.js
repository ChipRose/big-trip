import { sort } from '../util';

export const generateSort = (points) => {
  return (
    Object.entries(sort).map(([sortName, sortPoints]) => ({
      name: sortName,
      count: sortPoints(points).length,
    }))
  );
};
