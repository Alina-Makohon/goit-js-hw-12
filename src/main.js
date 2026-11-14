import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
} from './js/render-functions';

let pageNumber = 1;
let clearInput = '';
const form = document.querySelector('.form');
const inputText = document.querySelector('input');
export const btnLoadMore = document.querySelector('.btn-load-more');

form.addEventListener('submit', event => {
  event.preventDefault();
  clearInput = inputText.value.trim();
  if (clearInput.length === 0) {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }
  clearGallery();
  hideLoadMoreButton();
  pageNumber = 1;
  changeGallaryBySeah();
});
btnLoadMore.addEventListener('click', event => {
  pageNumber += 1;
  changeGallaryBySeah();
});

const changeGallaryBySeah = async () => {
  showLoader();
  hideLoadMoreButton();
  try {
    const data = await getImagesByQuery(clearInput, pageNumber);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return false;
    }
    createGallery(data.hits);
    const item = document.querySelector('.gallery-item');
    const itemHeight = item.getBoundingClientRect().height;
    scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
    const totalPages = Math.ceil(data.totalHits / 15);
    if (pageNumber < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    return true;
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again!',
      position: 'topRight',
    });
    if (pageNumber > 1) {
      pageNumber -= 1;
      showLoadMoreButton();
    }
  } finally {
    hideLoader();
  }
};
