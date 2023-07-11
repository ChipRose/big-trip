import {nanoid} from 'nanoid';
import { getRandomInteger, getRandomDate } from '../util';
import { getCheckedOffersIdByType } from '../mock/offers.js';
import { POINT_TYPES } from '../const/const.js';

export const destinations = [
  {
    description: "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
    name: "Chamonix",
    pictures: [
      {
        src: `http://placeimg.com/300/200/nature`,
        description: "Chamonix parliament building"
      },
      {
        src: `http://placeimg.com/300/200/nature`,
        description: "Chamonix parliament building"
      },
      {
        src: `http://placeimg.com/300/200/nature`,
        description: "Chamonix parliament building"
      },
      {
        src: `http://placeimg.com/300/200/nature`,
        description: "Chamonix parliament building"
      },
    ]
  },
  {
    description: "Geneva, is a beautiful city, a true asian pearl, with crowded streets.",
    name: "Geneva",
    pictures: [
      {
        src: `http://via.placeholder.com/300x200`,
        description: "Geneva building"
      },
      {
        src: `http://via.placeholder.com/300x200`,
        description: "Geneva building"
      },
      {
        src: `http://via.placeholder.com/300x200`,
        description: "Geneva building"
      },
      {
        src: `http://via.placeholder.com/300x200`,
        description: "Geneva building"
      },
      {
        src: `http://via.placeholder.com/300x200`,
        description: "Geneva building"
      },
      {
        src: `http://via.placeholder.com/300x200`,
        description: "Geneva building"
      },
    ]
  },
  {
    description: "Amsterdam, aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget.  Nullam nunc ex, convallis sed finibus eget.  Nullam nunc ex, convallis sed finibus eget.",
    name: "Amsterdam",
    pictures: [
      {
        src: `http://via.placeholder.com/300x200`,
        description: "Amsterdam building"
      },
      {
        src: `http://via.placeholder.com/300x200`,
        description: "Amsterdam building"
      },
      {
        src: `http://via.placeholder.com/300x200`,
        description: "Amsterdam building"
      },
      {
        src: `http://via.placeholder.com/300x200`,
        description: "Amsterdam building"
      },
      {
        src: `http://via.placeholder.com/300x200`,
        description: "Amsterdam building"
      },
      {
        src: `http://via.placeholder.com/300x200`,
        description: "Amsterdam building"
      },
    ]
  },
];

const generateDestination = () => {
  const isDestinationExist = Boolean(getRandomInteger(0, 1));
  const randomIndex = getRandomInteger(1, destinations.length - 1);

  return isDestinationExist ? destinations[randomIndex] : null;
};

const generatePointType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);

  return POINT_TYPES[randomIndex];
};

export const DESTINATIONS_LIST = destinations?.map(({ name }) => name);

export const generatePoint = () => {
  const date = getRandomDate();
  const type = generatePointType();

  return ({
    basePrice: getRandomInteger(20, 100),
    dateFrom: date.dateFrom,
    dateTo: date.dateTo,
    destination: generateDestination(),
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getCheckedOffersIdByType(type),
    type: type
  });
};


