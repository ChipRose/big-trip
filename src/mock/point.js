import { getRandomInteger, getRandomDate } from '../util/util'

const generateDestination = () => {
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

  return destinations[randomIndex];
}

const generatePointType = () => {
  const types = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
}

export const generatePoint = () => {
  const date = getRandomDate();
  return({
  "basePrice": getRandomInteger(20, 100),
  "dateFrom": date.dateFrom,
  "dateTo": date.dateTo,
  "destination": generateDestination(),
  "id": "0",
  "isFavorite": Boolean(getRandomInteger(0,1)),
  // "offers": $Array < Offer.id > $,
  "type": generatePointType()
})
}
export const getOffer = () => {
  return [{
    "id": 1,
    "title": "Upgrade to a business class",
    "price": 120
  }]
}