import dayjs from 'dayjs';
import { filterTypes } from '../const/const';

const isPastEvent = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');
const isFutureEvent = (dueDate) => dueDate && !dayjs().isAfter(dueDate, 'D');

const filter = {
  [filterTypes.EVERYTHING]: (points) => points,
  [filterTypes.FUTURE]: (points) => points.filter(({ dateFrom }) => isFutureEvent(dateFrom)),
  [filterTypes.PAST]: (points) => points.filter(({ dateTo }) => isPastEvent(dateTo)),
};

export { filter };