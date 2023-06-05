import { filter } from '../util';

export const generateFilters = (points) => {
  return (
    Object.entries(filter).map(([filterName, filterPoints]) => ({
      name: filterName,
      count: filterPoints(points).length,
    }))
  );
};
