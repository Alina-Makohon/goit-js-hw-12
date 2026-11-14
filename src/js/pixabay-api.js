import axios from 'axios';

/**
 * 58590690-6f7ca58f788725446c101d2a7
 *
 * https://pixabay.com/api/
 *
 */
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '58590690-6f7ca58f788725446c101d2a7';

export const getImagesByQuery = async (query, pageNumber) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: pageNumber,
    },
  });
  return response.data;
};
