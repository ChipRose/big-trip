import { getRandomInteger } from '../util/util'

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

export const generatePoint = () => ({
  "base_price": getRandomInteger(2000, 5000),
  "date_from": "2019-07-10T22:55:56.845Z",
  "date_to": "2019-07-11T11:22:13.375Z",
  "destination": generateDestination(),
  "id": "0",
  "isFavorite": false,
  // "offers": $Array < Offer.id > $,
  "type": generatePointType()
})