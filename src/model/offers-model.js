const offers = [
  {
    "id": 1,
    "title": "Upgrade to a business class",
    "price": 120
  },
  {
    "id": 2,
    "title": "Lunch in city",
    "price": 30
  },
  {
    "id": 3,
    "title": "Switch to comfort class",
    "price": 100
  },
  {
    "id": 4,
    "title": "Add luggage",
    "price": 30
  },
  {
    "id": 5,
    "title": "Add breakfast",
    "price": 50
  },
  {
    "id": 6,
    "title": "Add meal",
    "price": 15
  },
  {
    "id": 7,
    "title": "Choose seats",
    "price": 5
  },
  {
    "id": 8,
    "title": "Travel by train",
    "price": 40
  },

];

export const getAvailableOffersIdByType = (pointType) => {
  const offersByType = {
    "taxi": [1, 4, 3, 5],
    "bus": [1, 2, 4],
    "train": null,
    "ship": [3],
    "drive": null,
    "flight": [4, 1],
    "check-in": [2, 3],
    "sightseeing": null,
    "restaurant": [5, 6, 7],
  };
  return offersByType[pointType];
};

export default class OffersModel {
  #pointType = null;
  #offersChecked = [];
  #offersByType = [];

  constructor({ pointType = '', offersChecked = [] }) {
    this.#pointType = pointType;
    this.#offersChecked = offersChecked;
  }

  #getOffersList = (listId) => {
    return listId?.length ? offers.filter(({ id }) => listId?.includes(id)) : null;
  }

  get offersAvailable() {
    this.#offersByType = this.#getOffersList(getAvailableOffersIdByType(this.#pointType));

    return this.#offersByType?.length ? this.#offersByType : null;
  }

  get offersChecked() {
    return this.#offersChecked?.length ? this.#getOffersList(this.#offersChecked) : null;
  }
}