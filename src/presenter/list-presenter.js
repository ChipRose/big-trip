import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType, UpdateType, UserAction } from '../const/const.js';
import { getSortCallback } from '../util';
import { ListView, ListEmptyView, SortView, BoardView } from '../view';
import { PointPresenter } from '../presenter';

export default class ListPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #sortComponent = null;

  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  #boardComponent = new BoardView();
  #listComponent = new ListView();
  #emptyListComponent = new ListEmptyView();

  constructor({ boardContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return [...this.#pointsModel.points].sort(getSortCallback(this.#currentSortType));
  }

  init = () => {
    this.#renderBoard();
  };

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#emptyListComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log({ updateType, data });
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log({ updateType, update });
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    };
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderEmptyList = () => {
    render(this.#emptyListComponent, this.#boardComponent.element, RenderPosition.BEFOREEND);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({ listContainer: this.#listComponent.element, onDataChange: this.#handleViewAction, onModeChange: this.#handleModeChange });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderBoard = () => {
    const points = this.points;
    const pointsCount = points?.length;

    render(this.#boardComponent, this.#boardContainer);

    if (!pointsCount) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();

    render(this.#listComponent, this.#boardComponent.element, RenderPosition.BEFOREEND);
    this.#renderPoints(this.points);
  };
}