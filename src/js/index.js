import '../sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

import PixabeyService from './fetch-api';
import renderGallery from './renderImages';
import LoadMoreBtn from './lodeMoreImages';

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('#search-form');

const apiService = new PixabeyService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const gallery = new SimpleLightbox('.gallery__link', {});

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', onLoadBtnClick);

function onLoadBtnClick() {
  loadMoreBtn.disable();

  apiService.fetchGallery().then(images => {
    if (images.length === 0) {
      nothingFound();

      loadMoreBtn.hide();
    }

    renderGallery(images);
    gallery.refresh();
    loadMoreBtn.enable();

    const currentPage = PixabeyService.page;
    const totalPages = Math.ceil(Number(images.totalHits) / 40);
    if (currentPage > totalPages) {
      endOfCollection();
      loadMoreBtn.hide();
    }
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  apiService.searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (apiService.query === '') {
    return Notiflix.Notify.failure('Enter some text');
  }

  loadMoreBtn.show();
  apiService.resetPage();
  galleryEl.innerHTML = '';
  onLoadBtnClick();
}

function nothingFound() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
  );
}
function endOfCollection() {
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}
