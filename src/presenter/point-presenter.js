import { render, replace, remove } from '../framework/render';
import { ModeType, UpdateType, UserAction } from '../const/const';
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
    this.#pointComponent = new PointView({ point: this.#point, offersModel: this.#offersModel });
    this.#pointEditComponent = new FormPointView({ point: this.#point, offersModel: this.#offersModel });

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleSubmitForm);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

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

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      { ...this.#point, isFavorite: !this.#point.isFavorite }
    );
  }

  #handleSubmitForm = (update) => {
    const isMinorUpdate = this.#point.offers?.length !== update.offers?.length || this.#point.destination !== update.destination || this.#point.isFavorite !== update.isFavorite|| this.#point.type !== update.type;
    
    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
    this.#replaceFormToCard();
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    )
  };
}