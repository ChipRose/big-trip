import { render, RenderPosition } from '../framework/render.js';
import { SortType } from '../const/const.js';
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

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    return [...this.#pointsModel.points].sort(getSortCallback(this.#currentSortType));
  }

  init = () => {
    this.#renderBoard();
  };

  #clearList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView();
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderEmptyList = () => {
    render(this.#emptyListComponent, this.#boardComponent.element, RenderPosition.BEFOREEND);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({ listContainer: this.#listComponent.element, onDataChange: this.#handlePointChange, onModeChange: this.#handleModeChange });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderList = () => {
    render(this.#listComponent, this.#boardComponent.element, RenderPosition.BEFOREEND);
    this.#renderPoints(this.points);
  };

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.points?.length) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();
    this.#renderList();
  };
}