import { ListView, FormPointView, PointView, ListEmptyView, SortView, BoardView } from '../view';
import { OffersModel } from '../model';
import { render, RenderPosition, replace } from '../framework/render.js';
import { generateSort } from '../mock/sorts';

export default class ListPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #listComponent = new ListView();
  #emptyListComponent = new ListEmptyView();

  #listPoints = [];
  #listOffersByType = [];
  #sorts = [];

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;

    this.#sorts = generateSort(this.#pointsModel.points);
  }

  init = () => {
    this.#listPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #renderEmptyList = () => {
    render(this.#emptyListComponent, this.#boardComponent.element, RenderPosition.BEFOREEND);
  }

  #renderSort = () => {
    render(new SortView(this.#sorts), this.#boardComponent.element, RenderPosition.BEFOREEND);
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

  #renderPoints = () => {
    this.#listPoints
      .slice()
      .forEach((point, index) => this.#renderPoint({ point, offersByType: this.#listOffersByType[index] }));
  }

  #renderList = () => {
    render(this.#listComponent, this.#boardComponent.element, RenderPosition.BEFOREEND);
    this.#renderPoints();
  }

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#listPoints?.length) {
      this.#renderEmptyList();
      return;
    } 
    this.#renderSort();
    this.#renderList();
  }
}