import { render } from './render.js'
import { FilterView, SortView } from './view';
import { ListPresenter } from './presenter'

const pageHeaderElement = document.querySelector('.page-header');
const pageMainElement = document.querySelector('.page-main');

const pageFilterElement = pageHeaderElement.querySelector('.trip-controls__filters');
const pageContentElement = pageMainElement.querySelector('.trip-events');

const listPresenter = new ListPresenter();

render(new FilterView(), pageFilterElement);
render(new SortView(), pageContentElement);

listPresenter.init(pageContentElement);
