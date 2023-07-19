import { render, replace, remove } from '../framework/render';
import { ModeType } from '../const/const';
import { OffersModel } from '../model';
import { PointView, FormPointView } from '../view';

export default class PointPresenter {
  #listContainer = null;
  #changeData = null;
  #changeMode = null;

  #offersModel = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #mode = ModeType.DEFAULT;

  constructor({ listContainer, onDataChange, onModeChange }) {
    this.#listContainer = listContainer;
    this.#changeData = onDataChange;
    this.#changeMode = onModeChange;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#offersModel = new OffersModel();
    this.#pointComponent = new PointView({ point, offersModel: this.#offersModel });
    this.#pointEditComponent = new FormPointView({ point, offersModel: this.#offersModel });

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handlefavoriteClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handlerSubmitForm);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listContainer);
      return;
    }

    if (this.#mode === ModeType.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === ModeType.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== ModeType.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = ModeType.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = ModeType.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handlefavoriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  }

  #handlerSubmitForm = (point) => {
    this.#changeData(point);
    this.#replaceFormToCard();
  };
}