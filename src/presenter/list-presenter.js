import { ListView, EditPointView, PointView, ListEmpty, SortView } from '../view';
import { OffersModel } from '../model';
import { render } from '../render';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new ListView();

  #listPoints = [];
  #listOffersByType = [];

  constructor(listContainer, pointsModel) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#listPoints = [...this.#pointsModel.points];
    this.#renderList();
  }

  #renderList = () => {
    render(this.#listComponent, this.#listContainer);

    if (!this.#listPoints?.length) {
      render(new ListEmpty(), this.#listContainer);
    } else {
      render(new SortView(), this.#listContainer);
      render(this.#listComponent, this.#listContainer);
    }

    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint({ point: this.#listPoints[i], offersByType: this.#listOffersByType[i] });
    }
  }

  #renderPoint = ({ point }) => {
    const offersModel = new OffersModel({ pointType: point.type, offersChecked: point.offers });
    const pointComponent = new PointView({ point, offersModel });
    const pointEditComponent = new EditPointView({ point, offersModel });

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