import { ListView, EditPointView, PointView } from '../view';
import { render } from '../render';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new ListView();

  #listPoints=[];

  init = (listContainer, pointsModel) => {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#listPoints = [...this.#pointsModel.points];

    render(this.#listComponent, this.#listContainer);
    render(new EditPointView(this.#listPoints[0]), this.#listComponent.element);

    for (let i = 1; i < this.#listPoints.length; i++) {
      render(new PointView(this.#listPoints[i]), this.#listComponent.element);
    }
  }
}