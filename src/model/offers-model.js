import { getAvailableOffersIdByType } from '../mock/offers';

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

export default class OffersModel {
  #offers = offers.map((offer) => ({ ...offer, id: String(offer.id) }));

  getAvailableOffers = (pointType) => {
    const offersIdList = getAvailableOffersIdByType(pointType);
    return offersIdList?.length ? offers.filter(({ id }) => offersIdList?.includes(id)) : null;
  };

  getCheckedOffers = (offersIdList) => {
    const list = offersIdList.map((id) => String(id));
    return offersIdList?.length ? this.#offers.filter(({ id }) => list?.includes(String(id))) : null;
  };
}