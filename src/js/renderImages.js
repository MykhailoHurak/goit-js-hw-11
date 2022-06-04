const galleryRef = document.querySelector('.gallery');

export default function renderGallery(images) {
  const markup = images
    .map(image => {
      const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
      return `<a class="gallery__link" href="${largeImageURL}">
                <div class="gallery-card">
                  <img class="gallery-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" width="375"/>
                <div class="info">
                  <p class="info-item"><b>Likes</b><br>${likes}</p>
                  <p class="info-item"><b>Views</b><br>${views}</p>
                  <p class="info-item"><b>Comments</b><br>${comments}</p>
                  <p class="info-item"><b>Downloads</b><br>${downloads}</p>
                </div>
                </div>
              </a>`;
    })
    .join('');
  galleryRef.insertAdjacentHTML('beforeend', markup);
}
