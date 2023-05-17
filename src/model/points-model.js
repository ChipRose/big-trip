import { generatePoint } from '../mock/point';

export default class PointsModel {
  points = Array.from({ length: 10 }, generatePoint);

  getPoint = () => this.points;
}