//archivo render.js
// Importar la función fetchEvents desde el archivo index.js
import { fetchEvents } from '../index';

// Importar las variables de configuración desde el archivo "./config"
import { API_URL, API_KEY } from './config';

// Obtener referencia a la galería y a la sección de paginación
const gallery = document.querySelector('.gallery');
const paginationSection = document.querySelector('.pagination');

// Configuración de paginación
const pageSize = 100;
let currentPage = 1;
let totalPages = 1;

// Función para renderizar los eventos en el HTML
function renderEvents(events) {
  // Limpiar el contenido actual de la galería
  gallery.innerHTML = '';

  // Recorrer los eventos y generar el HTML para cada uno
  events.forEach(event => {
    const cardBox = document.createElement('div');
    cardBox.classList.add('gallery__box');
    const card = document.createElement('div');
    card.classList.add('gallery__card');
    card.setAttribute('data-modal-open', '');

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

// Función para crear un botón de paginación
function createPaginationButton(label, page) {
  const button = document.createElement('button');
  button.textContent = label;
  button.addEventListener('click', () => handlePaginationClick(page));
  return button;
}

// Función para manejar el clic en un botón de paginación
function handlePaginationClick(page) {
  if (page === currentPage) {
    return;
  }

  if (page === 'prev') {
    currentPage -= 1;
    if (currentPage < 1) {
      currentPage = 1;
    }
  } else if (page === 'next') {
    currentPage += 1;
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
  } else {
    currentPage = page;
  }

  fetchEvents(pageSize, currentPage)
    .then(data => {
      renderEvents(data.events);
      renderPagination(data.totalPages, currentPage);
    })
    .catch(error => {
      console.log(error);
    });
}

// Función para renderizar la paginación en el HTML
function renderPagination(totalPages, currentPage) {
  paginationSection.innerHTML = '';

  let startPage, endPage;
  if (totalPages <= 10) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  if (currentPage > 1) {
    const prevButton = createPaginationButton('Prev', 'prev');
    const prev10Button = createPaginationButton('Prev 10', currentPage - 10);
    paginationSection.appendChild(prev10Button);
    paginationSection.appendChild(prevButton);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = createPaginationButton(i, i);
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    paginationSection.appendChild(pageButton);
  }

  if (currentPage < totalPages) {
    const nextButton = createPaginationButton('Next', 'next');
    const next10Button = createPaginationButton('Next 10', currentPage + 10);
    paginationSection.appendChild(nextButton);
    paginationSection.appendChild(next10Button);
  }
}

// Llamar a fetchEvents para obtener los eventos y renderizarlos
fetchEvents(pageSize, currentPage)
  .then(data => {
    totalPages = data.totalPages;
    renderEvents(data.events);
    renderPagination(totalPages, currentPage);
  })
  .catch(error => {
    console.log(error);
  });
