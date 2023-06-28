import { render, RenderPosition, replace } from '../framework/render.js';
import { updateItem } from '../util/common-util.js';
import { ListView, ListEmptyView, SortView, BoardView } from '../view';
import { PointPresenter } from '../presenter';
import { generateSort } from '../mock/sorts';

export default class ListPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #listPoints = [];
  #sorts = [];
  #pointPresenter = new Map();

  #boardComponent = new BoardView();
  #listComponent = new ListView();
  #emptyListComponent = new ListEmptyView();

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#listPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #clearList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #modeChangeHandler = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #pointChangeHandler = (updatedPoint) => {
    this.#listPoints = updateItem({ items: this.#listPoints, update: updatedPoint });
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #renderSort = () => {
    this.#sorts = generateSort(this.#pointsModel.points);
    render(new SortView(this.#sorts), this.#boardComponent.element, RenderPosition.BEFOREEND);
  }

  #renderEmptyList = () => {
    render(this.#emptyListComponent, this.#boardComponent.element, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({ listContainer: this.#listComponent.element, changeData: this.#pointChangeHandler, changeMode: this.#modeChangeHandler });
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