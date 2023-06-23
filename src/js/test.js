// En el archivo test.js

import { fetchEvents } from '../index'; // Importa la función fetchEvents desde el archivo index.js

// Importar las variables de configuración desde el archivo "./js/config"
import { API_URL, API_KEY } from './config';

// Obtener referencia a la galería
const gallery = document.querySelector('.gallery');

// Constantes para la paginación
const ITEMS_PER_PAGE = 28; // 7 filas * 4 columnas = 28 elementos por página
let currentPage = 1; // Página actual, inicializada en 1

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

    // Agregar los elementos al card y al gallery
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(place);
    gallery.appendChild(card);
  });
}

// Función para manejar el cambio de página
function handlePageChange(page) {
  currentPage = page; // Actualizar la página actual

  // Llamar a fetchEvents para obtener los eventos de la nueva página y renderizarlos
  fetchEvents(currentPage, ITEMS_PER_PAGE)
    .then(events => {
      renderEvents(events);
    })
    .catch(error => {
      console.log(error);
      // Manejar el error en caso de que ocurra
    });
}

// Llamar a fetchEvents para obtener los eventos de la primera página y renderizarlos
fetchEvents(currentPage, ITEMS_PER_PAGE)
  .then(events => {
    renderEvents(events);
    createPaginationButtons(events.length);
  })
  .catch(error => {
    console.log(error);
    // Manejar el error en caso de que ocurra
  });

// Función para crear los botones de paginación
function createPaginationButtons(totalItems) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginationContainer = document.querySelector('.pagination');

  // Limpiar el contenido actual del contenedor de paginación
  paginationContainer.innerHTML = '';

  // Crear los botones de paginación
  for (let page = 1; page <= totalPages; page++) {
    const button = document.createElement('button');
    button.classList.add('pagination__button');
    button.textContent = page;

    // Agregar un event listener al botón para manejar el cambio de página
    button.addEventListener('click', () => {
      handlePageChange(page);
    });

    paginationContainer.appendChild(button);
  }
}
