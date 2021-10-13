import { moreButton } from './refs';
import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const getImages = async (queryString, pages) => {
  try {
    if (queryString) {
      const { data: photos } = await axios.get(
        `?key=7055575-04a3ba49e3c82fdd87935eab9&q=${queryString}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pages}`,
      );
      // const success = Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`);
      // const failure = Notiflix.Notify.failure(
      //   'Sorry, there are no images matching your search query. Please try again.',
      // );

      // if (queryString && photos.totalHits > 0) {
      //   moreButton.classList.add('visible-button');
      // }

      // if (!photos.total) {
      //   Notiflix.Notify.failure(
      //     'Sorry, there are no images matching your search query. Please try again.',
      //   );
      // } else if (pages === 1) {
      //   success;
      // }
      // if (pages > Math.ceil(photos.total / photos.totalHits)) {
      //   moreButton.classList.add('hidden');
      //   info;
      // }
      if (photos.hits.length === 0) {
        moreButton.classList.add('hidden');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      } else if (photos.hits.length >= 40) {
        Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`);
        moreButton.classList.remove('hidden');
        moreButton.classList.add('visible-button');
      } else if (photos.hits.length < 40) {
        moreButton.classList.add('hidden');
        Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`);
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }

      if (photos.total === 0) {
        moreButton.classList.add('hidden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      }
      return photos;
    }
  } catch {
    // Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    console.log('Not OK');
  }
};

export default getImages;
