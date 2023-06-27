// Importar las variables de configuración desde el archivo "./config"
import { API_URL, API_KEY } from './js/config';

// Petición de eventos
export function fetchEvents(pageSize, pageNumber) {
  const queryParams = new URLSearchParams({
    apikey: API_KEY,
    locale: '*',
    includeImages: 'yes',
    size: pageSize,
    page: pageNumber,
  });

  return fetch(`https://${API_URL}?${queryParams}`)
    .then(response => response.json())
    .then(data => {
      const events = formatEvents(data._embedded.events); // Formatear los eventos
      const totalPages = Math.ceil(data.page.totalElements / pageSize);
      return { events, totalPages };
    })
    .catch(error => {
      console.log(error);
      throw new Error('Error al obtener los eventos');
    });
}

// Función para formatear los eventos y extraer la información necesaria
export function formatEvents(events) {
  return events.map(event => {
    const defaultImageUrl = 'https://via.placeholder.com/150'; // URL de imagen por defecto
    let imageUrl = defaultImageUrl;
    let eventInfo = ''; // Variable para almacenar la información del evento

    if (event.images && event.images.length > 0) {
      for (let image of event.images) {
        if (image.url) {
          imageUrl = image.url;
          break; // Escapar del bucle una vez que se encuentre una URL de imagen válida
        }
      }
    }

    if (event.info) {
      eventInfo = event.info; // Asignar el valor del campo "info" a la variable eventInfo
    }
    if (event.dates.start.localTime) {
      dateTimes = event.dates.start.localTime; // Asignar el valor del campo "info" a la variable eventInfo
    }

    return {
      name: event.name,
      date: event.dates.start.localDate,
      dateTime: dateTimes,
      place: event._embedded.venues[0].name,
      image: imageUrl,
      info: eventInfo, // Agregar el campo "info" al objeto retornado
    };
  });
}
