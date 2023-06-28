import dayjs from 'dayjs';
import { FilterType } from '../const/const';

const isPastEvent = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');
const isFutureEvent = (dueDate) => dueDate && !dayjs().isAfter(dueDate, 'D');

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter(({ dateFrom }) => isFutureEvent(dateFrom)),
  [FilterType.PAST]: (points) => points.filter(({ dateTo }) => isPastEvent(dateTo)),
};

export { filter };