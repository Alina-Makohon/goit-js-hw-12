import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-container');
const btnLoadMore = document.querySelector('.btn-load-more');
const lightbox = new SimpleLightbox('.gallery-link', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export const createGallery = images => {
  const galleryItems = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img
      class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
      width="360"
    />
  </a>
<div class="image-info">
          <div class="info-item">
            <h3>Likes</h3>
            <p>${likes}</p>
          </div>

          <div class="info-item">
            <h3>Views</h3>
            <p>${views}</p>
          </div>

          <div class="info-item">
            <h3>Comments</h3>
            <p>${comments}</p>
          </div>

          <div class="info-item">
            <h3>Downloads</h3>
            <p>${downloads}</p>
          </div>
        </div>
</li>
`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryItems);

  lightbox.refresh();
};

export const clearGallery = () => {
  gallery.innerHTML = '';
};
export const showLoader = () => {
  loader.classList.add('is-visible');
};
export const hideLoader = () => {
  loader.classList.remove('is-visible');
};
export const showLoadMoreButton = () => {
  btnLoadMore.classList.remove('is-hidden');
};
export const hideLoadMoreButton = () => {
  btnLoadMore.classList.add('is-hidden');
};
