import { render } from './framework/render.js';
import { FilterView } from './view';
import { ListPresenter } from './presenter';
import { PointsModel } from './model';

const pageHeaderElement = document.querySelector('.page-header');
const pageMainElement = document.querySelector('.page-main');

const pageFilterElement = pageHeaderElement.querySelector('.trip-controls__filters');
const pageContentElement = pageMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const listPresenter = new ListPresenter(pageContentElement, pointsModel);

render(new FilterView(), pageFilterElement);

listPresenter.init(pageContentElement, pointsModel);
