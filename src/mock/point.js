import { getRandomInteger, getRandomDate } from '../util/util'
import { getAvailableOffersIdByType } from '../model/offers-model';

const pointTypes = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"];


const generateDestination = () => {
  const isDestinationExist = Boolean(getRandomInteger(0, 1));

  const destinations = [
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


