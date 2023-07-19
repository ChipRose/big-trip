import Observable from '../framework/observable.js';
import { generatePoint } from '../mock/point';

export default class PointsModel extends Observable {
  #points = Array.from({ length: 10 }, generatePoint);

  get points() {
    return this.#points;
  }
}