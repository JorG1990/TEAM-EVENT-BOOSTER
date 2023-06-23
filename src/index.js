// En el archivo index.js

import { API_URL, API_KEY } from './js/config';

// Petición de eventos con paginación
export function fetchEvents(page, pageSize) {
  const offset = (page - 1) * pageSize; // Cálculo del offset para la paginación

  return fetch(
    `https://${API_URL}?apikey=${API_KEY}&` +
      new URLSearchParams({
        locale: '*',
        includeImages: 'yes',
        page: page,
        size: pageSize,
        offset: offset,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
  )
    .then(response => response.json())
    .then(data => {
      const events = data._embedded.events;
      const formattedEvents = formatEvents(events);
      return formattedEvents;
    })
    .catch(error => {
      console.log(error);
      throw new Error('Error al obtener los eventos');
    });
}

// Función para formatear los eventos y extraer la información necesaria
function formatEvents(events) {
  return events.map(event => {
    const defaultImageUrl = 'https://via.placeholder.com/150'; // URL de imagen por defecto
    let imageUrl = defaultImageUrl;

    if (event.images && event.images.length > 0) {
      for (let image of event.images) {
        if (image.url) {
          imageUrl = image.url;
          break; // Escapar del bucle una vez que se encuentre una imagen con URL válida
        }
      }
    }

    return {
      name: event.name,
      date: event.dates.start.localDate,
      place: event._embedded.venues[0].name,
      image: imageUrl,
    };
  });
}
