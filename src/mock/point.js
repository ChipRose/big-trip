import { getRandomInteger, getRandomDate } from '../util/util'

const pointTypes = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"];
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

const generateDestination = () => {
  const isDestinationExist = Boolean(getRandomInteger(0, 1));

  const destinations = [
    {
      description: "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
      name: "Chamonix",
      pictures: [
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Chamonix parliament building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Chamonix parliament building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Chamonix parliament building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Chamonix parliament building"
        },
      ]
    },
    {
      description: "Geneva, is a beautiful city, a true asian pearl, with crowded streets.",
      name: "Geneva",
      pictures: [
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Geneva building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Geneva building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Geneva building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Geneva building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Geneva building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Geneva building"
        },
      ]
    },
    {
      description: "Amsterdam, aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget.  Nullam nunc ex, convallis sed finibus eget.  Nullam nunc ex, convallis sed finibus eget.",
      name: "Amsterdam",
      pictures: [
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Amsterdam building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Amsterdam building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Amsterdam building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Amsterdam building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Amsterdam building"
        },
        {
          src: `https://picsum.photos/id/${getRandomInteger(1, 100)}/300/200`,
          description: "Amsterdam building"
        },
      ]
    },
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return isDestinationExist ? destinations[randomIndex] : null;
};

const generatePointType = () => {
  const randomIndex = getRandomInteger(0, pointTypes.length - 1);

  return pointTypes[randomIndex];
}

export const getAvailableOffersIdByType = (pointType) => {
  const offersByType = [
    { type: pointTypes[0], offers: [1, 4, 3, 5] },
    { type: pointTypes[1], offers: [1, 2, 4] },
    { type: pointTypes[2], offers: null },
    { type: pointTypes[3], offers: [3] },
    { type: pointTypes[4], offers: null },
    { type: pointTypes[5], offers: [4, 1] },
    { type: pointTypes[6], offers: [2, 3] },
    { type: pointTypes[7], offers: null },
    { type: pointTypes[8], offers: [5, 6, 7] },
  ];
  const { offers } = offersByType.filter(({ type }) => type === pointType)[0] || '';
  return offers ? offers : null;
};

export const getAvailableOffersListByType = (pointType) => {
  const offersIdList = getAvailableOffersIdByType(pointType);

  return offers.filter(({ id }) => offersIdList?.includes(id));
};

export const getCheckedOffersList = (checkedOffers) => {
  return offers.filter(({ id }) => checkedOffers?.includes(id));
};

export const generatePoint = () => {
  const date = getRandomDate();
  const type = generatePointType();
  const availableOffers = getAvailableOffersIdByType(type);
  const checkedOffers = Array.from({ length: getRandomInteger(0, availableOffers?.length-1) }, () => availableOffers[getRandomInteger(0, availableOffers?.length - 1)])
  const offersSet = Array.from(new Set(checkedOffers));
  return ({
    basePrice: getRandomInteger(20, 100),
    dateFrom: date.dateFrom,
    dateTo: date.dateTo,
    destination: generateDestination(),
    id: "0",
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: availableOffers?.length ? offersSet : [],
    type: type
  });
};


