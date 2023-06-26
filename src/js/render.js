// reder.js ---- Importar la función fetchEvents desde el archivo index.js
import { fetchEvents } from '../index';
import { renderEvents } from './renderEvents';
import { renderPagination } from './renderPagination';

// Obtener referencia a la galería
const gallery = document.querySelector('.gallery');

// Configuración de paginación
const pageSize = 16; // Cantidad por página inicial
let currentPage = 1;
let totalPages = 1;

// Función para inicializar la aplicación
function initializeApp() {
  fetchEvents(pageSize, currentPage)
    .then(data => {
      totalPages = data.totalPages;
      renderEvents(data.events);
      renderPagination(totalPages, currentPage);
    })
    .catch(error => {
      console.log(error);
    });
}

// Inicializar la aplicación al cargar la página
window.addEventListener('load', initializeApp);
