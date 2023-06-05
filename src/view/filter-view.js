import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemBlock = ({ name: filterName = '', isChecked = false, isDisabled = false }) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${isChecked} ${isDisabled} value="${filterName}">
      <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
    </div>`
  );
}
const createFilterTemplate = ({ filters = {} }) => {
  return (
    `<div class="trip-main__trip-controls  trip-controls">
        <div class="trip-controls__filters">
          <h2 class="visually-hidden">Filter events</h2>
          <form class="trip-filters" action="#" method="get">
            ${filters?.map(({ name, count }, index) => (
      createFilterItemBlock({ name, isChecked: index === 0 ? 'checked' : '', isDisabled: count === 0 ? 'disabled' : '' })
    )).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>
        </div>
      </div>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate({ filters: this.#filters });
  }
}