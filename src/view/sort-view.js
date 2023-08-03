import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const/const.js';
import { getSortCallback } from '../util/';

const createSortItem = ({ sortType = '', isChecked = '' }) => {
  const isDisabled = getSortCallback(sortType) ? '' : 'disabled';

  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortType}" ${isChecked} ${isDisabled}>
      <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
    </div>`
  )
};

const createSortTemplate = (currentSortType) => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(SortType).map((type) => (
      createSortItem({ sortType: type, isChecked: type === currentSortType ? 'checked' : '' })
    )).join('')}
    </form>`
  )
};

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();

    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#currentSortType = evt.target.value;
    this._callback.sortTypeChange(evt.target.value);
  };
}