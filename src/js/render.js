//este es el archivo render.js
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
    // Crear los elementos HTML necesarios para mostrar el evento
    const card = document.createElement('div');
    card.classList.add('gallery__card');

    const image = document.createElement('img');
    image.classList.add('gallery__image');
    image.src = event.image;

    const title = document.createElement('h2');
    title.classList.add('gallery__title');
    title.textContent = event.name;

    const date = document.createElement('p');
    date.classList.add('gallery__date');
    date.textContent = event.date;

    const place = document.createElement('p');
    place.classList.add('gallery__place');
    place.textContent = event.place;

    // Agregar los elementos al card y a la galería
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(place);
    gallery.appendChild(card);
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
    return; // No hacer nada si se hace clic en la página actual
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
      // Manejar el error en caso de que ocurra
    });
}

// Función para renderizar la paginación en el HTML
function renderPagination(totalPages, currentPage) {
  paginationSection.innerHTML = '';

  // Calcular el rango de páginas a mostrar
  let startPage, endPage;
  if (totalPages <= 10) {
    // Mostrar todas las páginas si hay menos de 10
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 6) {
      // Mostrar las primeras 10 páginas si la página actual está cerca del inicio
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      // Mostrar las últimas 10 páginas si la página actual está cerca del final
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      // Mostrar 10 páginas alrededor de la página actual
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  // Agregar botón de página anterior
  if (currentPage > 1) {
    const prevButton = createPaginationButton('Prev', 'prev');
    const prev10Button = createPaginationButton('Prev 10', currentPage - 10);
    paginationSection.appendChild(prev10Button);
    paginationSection.appendChild(prevButton);
  }

  // Agregar botones de páginas
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = createPaginationButton(i, i);
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    paginationSection.appendChild(pageButton);
  }

  // Agregar botón de página siguiente
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
    // Manejar el error en caso de que ocurra
  });
