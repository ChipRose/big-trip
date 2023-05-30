import { generatePoint } from '../mock/point';
import { getAvailableOffersListByType } from '../mock/point';

export default class PointsModel {
  #points = Array.from({ length: 10 }, generatePoint);
  #offersByType = this.#points.map(({ type }) => (getAvailableOffersListByType(type)));

  get points() {
    return this.#points;
  }

  get offersByType() {
    return this.#offersByType;
  }
}