import { formatDate, formatTime, formatDurationTime } from '../util';
import AbstractView from '../framework/view/abstract-view.js';

const createScheduleBlock = (point) => {
  const { dateFrom, dateTo } = point;
  const timeStart = formatTime(dateFrom);
  const timeEnd = formatTime(dateTo);
  const timeDuration = formatDurationTime({ dateFrom, dateTo });

  return (
    `<div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${dateFrom}>${timeStart}</time>
        &mdash;
        <time class="event__end-time" datetime=${dateTo}>${timeEnd}</time>
      </p>
      <p class="event__duration">${timeDuration}</p>
    </div>`
  )
};

const createOffersListBlock = (checkedOffers) => {
  console.log(checkedOffers)

  return (
    checkedOffers?.length ?
      `<ul class="event__selected-offers">
        ${checkedOffers.map(({ title, price }) => `
          <li class="event__offer">
            <span class="event__offer-title">${title}</span> &plus;&nbsp;&euro;&nbsp;<span class="event__offer-price">${price}</span>
          </li>
        `).join('')}
      </ul>`
      : ''
  )
};

const createPointTemplate = ({ point = {}, offersModel = null }) => {
  const { dateFrom, type, destination, basePrice, isFavorite } = point;

  const dateStart = formatDate(dateFrom);
  const title = `${type}${destination ? ` ${destination.name}` : ''}`;
  const favoriteClassActive = isFavorite ? 'event__favorite-btn--active' : '';

  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${dateFrom}">${dateStart}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type} icon">
        </div>
        <h3 class="event__title">${title}</h3>
        ${createScheduleBlock(point)}
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${createOffersListBlock(offersModel.getCheckedOffers(point.offers))}
        <button class="event__favorite-btn ${favoriteClassActive}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `);
};

export default class PointView extends AbstractView {
  #point = null;
  #offersModel = null;

  constructor({ point, offersModel }) {
    super();
    this.#point = point;
    this.#offersModel = offersModel;
  }

  get template() {
    return createPointTemplate({ point: this.#point, offersModel: this.#offersModel });
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  setFavoriteClickHandler = (callback) =>{
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #favoriteClickHandler = (evt) =>{
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }
}