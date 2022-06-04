import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '27709793-70db8ead1ecb9db11e2fbbafc';

export default class PixabeyService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.totalHits = null;
  }
  async fetchGallery() {
    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${this.searchQuery}+flowers&image_type=photo&page=${this.page}&per_page=${this.per_page}`,
    );

    if (this.page === 1 && response.data.totalHits !== 0) {
      Notiflix.Notify.success('Hooray! We found totalHits images.');
    }
    this.incrementPage();

    return response.data.hits;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
    this.totalHits = null;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
