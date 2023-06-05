import { render } from './framework/render.js';
import { FilterView } from './view';
import { ListPresenter } from './presenter';
import { PointsModel } from './model';
import { generateFilters } from './mock/filters.js';

const pageHeaderElement = document.querySelector('.page-header');
const pageMainElement = document.querySelector('.page-main');

const pageFilterElement = pageHeaderElement.querySelector('.trip-controls__filters');
const pageContentElement = pageMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const listPresenter = new ListPresenter(pageContentElement, pointsModel);

const filters = generateFilters(pointsModel.points);

render(new FilterView(filters), pageFilterElement);

listPresenter.init(pageContentElement, pointsModel);
