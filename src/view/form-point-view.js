import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import AbstractStatefullView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../const/const.js';
import { DESTINATIONS_LIST } from '../mock/point.js';
import { isItemChecked, getDestination } from '../util';

import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';

const BLANK_POINT = {
  id: "0",
  basePrice: 0,
  dateFrom: "0000-01-01T00:00:00.000Z",
  dateTo: "0000-01-01T00:00:00.000Z",
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
  const { dateFrom, dateTo } = state;

  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time">From</label>
      <input class="event__input  event__input--time" id="event-start-time" data-id="start" type="text" name="event-start-time" value="${dateFrom || ''}" >
      &mdash;
      <label class="visually-hidden" for="event-end-time">To</label>
      <input class="event__input  event__input--time" id="event-end-time" type="text" data-id="end" name="event-end-time" value="${dateTo || ''}" >
    </div>
  `);
};

const createOffersBlock = (state) => {
  const { type, availableOffers, offers } = state;

  return (
    availableOffers?.length ?
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${availableOffers.map(({ title, price, id }) => (`
              <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" data-offer-id="${id}" type="checkbox" name="event-offer-${type}" ${isItemChecked({ id, list: offers })}>
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
    isDateExist
  } = state;
  const isFormSubmitDisabled = isDateExist ? '' : 'disabled';

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post" autocomplete="off" >
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
  
          <button class="event__save-btn  btn  btn--blue" type="submit" ${isFormSubmitDisabled}>Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          </header>
        <section class="event__details">
          ${createOffersBlock(state)}
          ${isDestinationExist ? createDistinationBlock(state) : ''}
        </section>
      </form>
    </li>`
  )
};

const Selector = {
  EVENT_TYPE_GROUP: '.event__type-group',
  EVENT_DESTINATION_INPUT: '.event__input--destination',
  AVAILABLE_OFFERS_GROUP: '.event__available-offers',
  OFFER_CHECKBOX: '.event__offer-checkbox',
  FORM: 'form',
  DELETE_BTN: '.event__reset-btn',
  START_TIME: '#event-start-time',
  END_TIME: '#event-end-time'
}

export default class FormPointView extends AbstractStatefullView {
  #offersModel = null;
  #point = null;
  #datepicker = null;
  #offersList = [];

  constructor({ point, offersModel }) {
    super();
    this.#offersModel = offersModel;
    this.#point = point;
    this._state = FormPointView.parsePointToState({ point: this.#point, offersModel: this.#offersModel });

    this.#setInnerHandlers();
  }

  get template() {
    return createFormPointTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      FormPointView.parsePointToState({ point, offersModel: this.#offersModel })
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector(Selector.FORM).addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector(Selector.DELETE_BTN).addEventListener('click', this.#pointDeleteHandler);
  }

  #setDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector(Selector.START_TIME),
      {
        plugins: [new rangePlugin({ input: this.element.querySelector(Selector.END_TIME) })],
        onChange: this.#dateChangeHandler,
        dateFormat: "d/m/y H:i",
        // dateDefalt: [this.#point.dateFrom, this.#point.dateTo],
        enableTime: true,
        theme: "material_blue"
      }
    );
  };

  #setOfferChange = () => {
    if (this._state.availableOffers) {
      this.element.querySelector(Selector.AVAILABLE_OFFERS_GROUP).addEventListener('change', this.#offersChangeHandler);
    }
  };

  #setInnerHandlers = () => {
    this.element.querySelector(Selector.EVENT_TYPE_GROUP).addEventListener('change', this.#eventTypeToggleHandler);
    this.element.querySelector(Selector.EVENT_DESTINATION_INPUT).addEventListener('change', this.#destinationToggleHandler);
    this.#setOfferChange();
    this.#setDatepicker();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormPointView.parseStateToPoint(this._state));
  };

  #pointDeleteHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(FormPointView.parseStateToPoint(this._state));
  };

  #eventTypeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      availableOffers: this.#offersModel.getAvailableOffers(evt.target.value),
      offers: null
    });
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: getDestination(evt.target.value),
      isDestinationExist: evt.target.value ? true : false,
    });
  };

  #dateChangeHandler = (selectedDates) => {
    this.updateElement({
      dateFrom: selectedDates[0] || null,
      dateTo: selectedDates[1] || null,
      isDateExist: Boolean(selectedDates[0] && selectedDates[1])
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const offersElements = Array.from(this.element.querySelectorAll(Selector.OFFER_CHECKBOX));
    const checkedOffersElements = offersElements?.filter(({ checked }) => checked);
    this.#offersList = checkedOffersElements?.length ? Array.from(checkedOffersElements, ({ dataset }) => dataset.offerId) : null;
    this._setState({
      offers: this.#offersList,
    });
  };

  static parsePointToState = ({ point, offersModel }) => {
    return ({
      ...point,
      isDestinationExist: Boolean(point?.destination),
      availableOffers: offersModel?.getAvailableOffers(point.type),
      isDateExist: Boolean(point?.dateFrom && point?.dateTo)
    })
  };

  static parseStateToPoint = (state) => {
    const point = { ...state };

    if (!state.isDestinationExist) {
      point.destination = null;
    }

    if (!state.offers?.length) {
      point.offers = null;
    }

    delete point.isDestinationExist;
    delete point.availableOffers;
    delete point.isDateExist;

    return point;
  };
}