import AbstractView from '../framework/view/abstract-view.js';

const createSortItem = ({ name: sortName = '', isChecked = false }) => {
  return (
    `<div class="trip-sort__item  trip-sort__item--${sortName}">
      <input id="sort-${sortName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortName}" ${isChecked}>
      <label class="trip-sort__btn" for="sort-${sortName}">${sortName}</label>
    </div>`
  )
};

const createSortTemplate = (sorts = {}) => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sorts?.map(({ name }, index) => (
      createSortItem({ name, isChecked: index === 0 ? 'checked' : '' })
    )).join('')}
    </form>`
  )
};

export default class SortView extends AbstractView {
  #sorts = null;
  constructor(sorts) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return createSortTemplate(this.#sorts);
  }
}