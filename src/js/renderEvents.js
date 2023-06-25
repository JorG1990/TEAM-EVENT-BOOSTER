// renderEvents.js

// Obtener referencia a la galería
const gallery = document.querySelector('.gallery');

// Función para renderizar los eventos en el HTML
export function renderEvents(events) {
  // Limpiar el contenido actual de la galería
  gallery.innerHTML = '';

  // Recorrer los eventos y generar el HTML para cada uno
  events.forEach(event => {
    const cardBox = document.createElement('div');
    cardBox.classList.add('gallery__box');
    const card = document.createElement('div');
    card.classList.add('gallery__card');
    card.setAttribute('data-modal-open', ''); // Agregar atributo para abrir el modal al hacer clic

    const image = document.createElement('img');
    image.classList.add('gallery__image');
    image.src = event.image;
    image.width = '267px';
    image.height = '220px';

    const title = document.createElement('h2');
    title.classList.add('gallery__title');
    title.textContent = event.name;

    const date = document.createElement('p');
    date.classList.add('gallery__date');
    date.textContent = event.date;

    const place = document.createElement('p');
    place.classList.add('gallery__place');
    place.textContent = event.place;

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(place);
    cardBox.appendChild(card);
    gallery.appendChild(cardBox);
  });
}
