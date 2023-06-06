import { ListView, FormPointView, PointView, ListEmpty, SortView } from '../view';
import { OffersModel } from '../model';
import { render, replace } from '../framework/render.js';
import { generateSort } from '../mock/sorts';

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
      const sorts = generateSort(this.#pointsModel.points);
      render(new SortView(sorts), this.#listContainer);
      render(this.#listComponent, this.#listContainer);
    }

    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint({ point: this.#listPoints[i], offersByType: this.#listOffersByType[i] });
    }
  }

  #renderPoint = ({ point }) => {
    const offersModel = new OffersModel({ pointType: point.type, offersChecked: point.offers });
    const pointComponent = new PointView({ point, offersModel });
    const pointEditComponent = new FormPointView({ point, offersModel });

    const replaceCardToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToCard = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listComponent.element);
  }
}