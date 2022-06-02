// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const galleryMarkup = createGalleryItems(galleryItems);
gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

function createGalleryItems(item) {
  return item
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" onclick="event.preventDefault()" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
          </a>`;
    })
    .join('');
}

var lightbox = new SimpleLightbox('.gallery__item', { captionsData: 'alt', captionDelay: 250 });
