import { getRandomInteger, getRandomDate } from '../util/util'

const pointTypes = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"];

const generateDestination = () => {
  const isDestinationExist = Boolean(getRandomInteger(0, 1));

  const destinations = [
    {
      "description": "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
      "name": "Chamonix",
      "pictures": [
        {
          "src": "http://picsum.photos/300/200?r=0.0762563005163317",
          "description": "Chamonix parliament building"
        }
      ]
    },
    {
      "description": "Geneva, is a beautiful city, a true asian pearl, with crowded streets.",
      "name": "Geneva",
      "pictures": [
        {
          "src": "http://picsum.photos/300/200?r=8767.87766554433",
          "description": "Geneva building"
        }
      ]
    },
    {
      "description": "Amsterdam, aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget.",
      "name": "Amsterdam",
      "pictures": [
        {
          "src": "http://picsum.photos/300/200?r=0.0775443486870954",
          "description": "Amsterdam building"
        }
      ]
    },
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return isDestinationExist?destinations[randomIndex]:null;
}

const generatePointType = () => {
  const randomIndex = getRandomInteger(0, pointTypes.length - 1);

  return pointTypes[randomIndex];
}

const getOffersByType = (pointType) => {
  const offersByType = [
    { type: pointTypes[0], offers: [1] },
    { type: pointTypes[1], offers: [1, 2] },
    { type: pointTypes[2], offers: null },
    { type: pointTypes[3], offers: [3] },
    { type: pointTypes[4], offers: null },
    { type: pointTypes[5], offers: [4, 1] },
    { type: pointTypes[6], offers: [2, 3] },
    { type: pointTypes[7], offers: null },
    { type: pointTypes[8], offers: [5] },
  ];
  const { offers } = offersByType.filter(({ type }) => type === pointType)[0] || '';
  return offers ? offers : null;
}

const getOffer = (offersIdList) => {
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
      "title": "Switch to comfort",
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
  ];

  return offers.filter(({ id }) => offersIdList?.includes(id));
}

export const generatePoint = () => {
  const date = getRandomDate();
  const type = generatePointType();
  return ({
    "basePrice": getRandomInteger(20, 100),
    "dateFrom": date.dateFrom,
    "dateTo": date.dateTo,
    "destination": generateDestination(),
    "id": "0",
    "isFavorite": Boolean(getRandomInteger(0, 1)),
    "offers": getOffer(getOffersByType(type)),
    "type": type
  });
}


