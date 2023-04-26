import { render } from './render.js'
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';

const pageHeaderElement = document.querySelector('.page-header');
const pageMainElement = document.querySelector('.page-main');

const pageFilterElement = pageHeaderElement.querySelector('.trip-controls__filters');
const pageSortingElement = pageMainElement.querySelector('.trip-events');

render(new FilterView(), pageFilterElement);
render(new SortView(), pageSortingElement);
