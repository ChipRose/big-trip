import { render } from './framework/render.js';
import { FilterView } from './view';
import { ListPresenter } from './presenter';
import { PointsModel } from './model';
import { generateFilters } from './mock/filters.js';

const pageHeaderElement = document.querySelector('.page-header');
const pageMainElement = document.querySelector('.page-main');
const pageContentElement = pageMainElement.querySelector('.page-body__container');

const pageFilterElement = pageHeaderElement.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const listPresenter = new ListPresenter({ boardContainer: pageContentElement, pointsModel });

const filters = generateFilters(pointsModel.points);

render(new FilterView(filters), pageFilterElement);

listPresenter.init(pageContentElement, pointsModel);
