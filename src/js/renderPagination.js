// renderPagination.js

// Importar la función fetchEvents y la función renderEvents desde el archivo index.js
import { fetchEvents } from '../index';
import { renderEvents } from './renderEvents';

// Obtener referencia a la sección de paginación
const paginationSection = document.querySelector('.pagination');

// Configuración de paginación
export const pageSize = 16; // Cantidad por página por pestaña
export let currentPage = 1;
export let totalPages = 1;

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

  currentPage = page;

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
export function renderPagination(totalPages, currentPage) {
  paginationSection.innerHTML = '';

  // Lógica de paginación para mostrar solo una cantidad apropiada de páginas
  const visiblePages = 10; // Número de páginas visibles en la paginación

  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = startPage + visiblePages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  // Añadir botón para avanzar una página de uno en uno
  const prevButton = createPaginationButton('<', currentPage - 1);
  paginationSection.appendChild(prevButton);

  // Añadir botones para avanzar de 10 en 10
  if (startPage > 1) {
    const jumpBackButton = createPaginationButton('<<', currentPage - 10);
    paginationSection.appendChild(jumpBackButton);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = createPaginationButton(i, i);
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    paginationSection.appendChild(pageButton);
  }

  // Añadir botones para avanzar de 10 en 10
  if (endPage < totalPages) {
    const jumpForwardButton = createPaginationButton('>>', currentPage + 10);
    paginationSection.appendChild(jumpForwardButton);
  }

  // Añadir botón para avanzar una página de uno en uno
  const nextButton = createPaginationButton('>', currentPage + 1);
  paginationSection.appendChild(nextButton);
}
