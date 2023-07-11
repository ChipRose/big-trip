import { isItemChecked, formatDateTime, getDestination } from '../util';
import AbstractStatefullView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../const/const.js';
import { DESTINATIONS_LIST } from '../mock/point.js';

const BLANK_POINT = {
  id: "0",
  basePrice: 0,
  dateFrom: '0000-00-00T00:00:00.000Z',
  dateTo: '0000-00-00T00:00:00.000Z',
  destination: {},
  offers: [],
  type: 'drive',
  isFavorite: false
};

const createEventChooseBlock = (state) => {
  const { type } = state;
  return (`
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type} type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" value="${type}">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${POINT_TYPES.map((pointType, index) => (`
            <div class="event__type-item">
              <input id="event-type-${pointType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}">
              <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${index}">${pointType}</label>
            </div>
          `)).join('')}
        </fieldset>
      </div>
    </div>
  `)
};

const createTimeFieldBlock = (state) => {
  const { dateFrom, dateTo, id } = state;
  const dateEnd = formatDateTime(dateTo);
  const dateStart = formatDateTime(dateFrom);

  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value=${dateStart}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value=${dateEnd}>
    </div>
  `);
};

const createOffersBlock = (state) => {
  const { type, availableOffers, checkedOffers } = state;

  return (
    availableOffers?.length ?
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${availableOffers.map(({ title, price, id }) => (`
              <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${isItemChecked({ id, list: checkedOffers })}>
              <label class="event__offer-label" for="event-offer-${type}-${id}">
                <span class="event__offer-title">${title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
            </div>
          `)).join('')}
        </div>
      </section>`
      : ''
  );
};

const createDistinationBlock = (state) => {
  const { description = '', pictures = [] } = state.destination || {};

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures?.length ? pictures.map(({ src, description }) => (`
            <img class="event__photo" src=${src} alt=${description}>
          `)).join('')
      : ''}
        </div>
      </div>
    </section>`
  );
};

const createFormPointTemplate = (state = BLANK_POINT) => {
  const {
    basePrice,
    type,
    destination,
    isDestinationExist,
  } = state;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createEventChooseBlock(state)}
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${isDestinationExist ? destination.name : ''}" list="destination-list-1">
            <datalist id="destination-list-1">
            ${DESTINATIONS_LIST.map((destination) => (`
              <option value="${destination}"></option>
            `)).join('')}
            </datalist>
          </div>

          ${createTimeFieldBlock(state)}

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
          </div>
  
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          ${createOffersBlock(state)}
          ${isDestinationExist ? createDistinationBlock(state) : ''}
        </section>
      </form>
    </li>`
  )
};

export default class FormPointView extends AbstractStatefullView {
  #offersModel = null;

  constructor({ point, offersModel }) {
    super();
    this.#offersModel = offersModel;
    this._state = FormPointView.parsePointToState({ point, offersModel: this.#offersModel });

    this.#setInnerHandlers();
  }

  get template() {
    return createFormPointTemplate(this._state);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormPointView.parseStateToPoint(this._state));
  }

  #eventTypeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      availableOffers: this.#offersModel.getAvailableOffers(evt.target.value),
      checkedOffers:[]
    });
  }

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: getDestination(evt.target.value),
      isDestinationExist: evt.target.value ? true : false,
    });
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  #setInnerHandlers = () =>{
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
  };

  static parsePointToState = ({ point, offersModel }) => {
    return ({
      ...point,
      isDestinationExist: Boolean(point.destination),
      availableOffers: offersModel.getAvailableOffers(point.type),
      checkedOffers: offersModel.offersChecked
    })
  };

  static parseStateToPoint = (state) => {
    const point = { ...state };

    if (!state.isDestinationExist) {
      point.destination = null;
    }

    delete point.isDestinationExist;
    delete point.availableOffers;
    delete point.checkedOffers;

    return point;
  };
}