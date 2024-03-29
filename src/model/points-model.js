import Observable from '../framework/observable.js';
import { generatePoint } from '../mock/point';

export default class PointsModel extends Observable {
  #points = Array.from({ length: 10 }, generatePoint);

  get points() {
    return this.#points;
  }

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = this.#points.slice();
    this.#points[index] = update;

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = this.#points.slice().filter((item) => item.id !== update.id);

    this._notify(updateType, update);
  };
}