import { render, RenderPosition, replace, remove } from '../framework/render.js';
import { updateItem } from '../util/common-util.js';
import { ListView, ListEmptyView, SortView, BoardView } from '../view';
import { PointPresenter } from '../presenter';
import { getSortCallBack } from '../util';
import { SortType } from '../const/const.js';

export default class ListPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #sortComponent = null;

  #listPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #initialPointsList = [];

  #boardComponent = new BoardView();
  #listComponent = new ListView();
  #emptyListComponent = new ListEmptyView();

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#initialPointsList = [...this.#pointsModel.points];
    this.#listPoints = [...this.#pointsModel.points].sort(getSortCallBack(this.#currentSortType));
    this.#renderBoard();
  }

  #clearList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #sortPoints = (sortType) => {
    this.#listPoints.sort(getSortCallBack(sortType));
    this.#currentSortType = sortType;
    remove(this.#sortComponent);
    this.#renderSort();
  }

  #handlePointChange = (updatedPoint) => {
    this.#listPoints = updateItem({ items: this.#listPoints, update: updatedPoint });
    this.#initialPointsList = updateItem({ items: this.#initialPointsList, update: updatedPoint });
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearList();
    this.#renderList();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView({ currentSortType: this.#currentSortType })
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderEmptyList = () => {
    render(this.#emptyListComponent, this.#boardComponent.element, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({ listContainer: this.#listComponent.element, onDataChange: this.#handlePointChange, onModeChange: this.#handleModeChange });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#listPoints
      .slice()
      .forEach((point) => this.#renderPoint(point));
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