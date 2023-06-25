//renderEvents.js -- Obtener referencia a la galería y al modal
const gallery = document.querySelector('.gallery');
const modalBox = document.querySelector('.gallery__box__modal');

// Función para abrir el modal al hacer clic en una tarjeta
function openModalOnCardClick(card) {
  const modal = document.querySelector('[data-modal]');
  modal.classList.toggle('is-hidden');

  // Obtener la información de la tarjeta seleccionada
  const imageSrc = card.querySelector('.gallery__image').src;
  const titleText = card.querySelector('.gallery__title').textContent;
  const dateText = card.querySelector('.gallery__date').textContent;
  const placeText = card.querySelector('.gallery__place').textContent;

  // Limpiar el contenido actual del modal
  modalBox.innerHTML = '';

  // Crear elementos HTML para mostrar la información en el modal
  const modalImage = document.createElement('img');
  modalImage.classList.add('gallery__image');
  modalImage.src = imageSrc;
  modalImage.width = 0;
  modalImage.height = 0;

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('gallery__title');
  modalTitle.textContent = titleText;

  const modalDate = document.createElement('p');
  modalDate.classList.add('gallery__date');
  modalDate.textContent = dateText;

  const modalPlace = document.createElement('p');
  modalPlace.classList.add('gallery__place');
  modalPlace.textContent = placeText;

  // Agregar los elementos al modal
  modalBox.appendChild(modalImage);
  modalBox.appendChild(modalTitle);
  modalBox.appendChild(modalDate);
  modalBox.appendChild(modalPlace);
}

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

    // Agregar evento de clic a la tarjeta para abrir el modal
    card.addEventListener('click', () => openModalOnCardClick(card));

    const image = document.createElement('img');
    image.classList.add('gallery__image');
    image.src = event.image;
    image.width = 0;
    image.height = 0;

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
