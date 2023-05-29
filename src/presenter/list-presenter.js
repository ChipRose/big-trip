import { ListView, EditPointView, PointView } from '../view';
import { render } from '../render';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new ListView();

  #listPoints = [];

  init = (listContainer, pointsModel) => {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#listPoints = [...this.#pointsModel.points];

    render(this.#listComponent, this.#listContainer);

    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint(this.#listPoints[i]);
    }
  }

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditPointView(point);

    const replaceCardToForm = () => {
      this.#listComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToCard = () => {
      this.#listComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listComponent.element);
  }
}