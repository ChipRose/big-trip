import AbstractStatefullView from '../framework/view/abstract-stateful-view.js';
import { SortType } from '../const/const.js';
import { getSortCallback } from '../util/sorts-utils.js';

const createSortItem = ({ sortType = '', isChecked = '' }) => {
  const isDisabled = getSortCallback(sortType) ? '' : 'disabled';

  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortType}" ${isChecked} ${isDisabled}>
      <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
    </div>`
  )
};

const createSortTemplate = (state) => {
  const { currentSortType } = state;

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(SortType).map((type) => (
      createSortItem({ sortType: type, isChecked: type === currentSortType ? 'checked' : '' })
    )).join('')}
    </form>`
  )
};

export default class SortView extends AbstractStatefullView {
  #currentSortType = SortType.DAY;

  constructor() {
    super();

    this._state = SortView.getState({ currentSortType: this.#currentSortType });
    this.#setInnerHandlers();
  }

  get template() {
    return createSortTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSortTypeChangeHandler(this._callback.sortTypeChange);
  };

  #setInnerHandlers = () => {
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#currentSortType = evt.target.value;
    this._callback.sortTypeChange(evt.target.value);
    this.updateElement({ currentSortType: this.#currentSortType });
  };

  static getState = ({ currentSortType }) => {
    return ({
      currentSortType
    })
  };
}