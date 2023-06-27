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
    if (event.url) {
      eventsUrl = event.url; // Asignar el valor del campo "info" a la variable eventInfo
    }
    if (event._embedded.venues[0].markets) {
      localPlaces = event._embedded.venues[0].markets[0].name; // Asignar el valor del campo "info" a la variable eventInfo
    }
    if (event.priceRanges) {
      pricesStandars =
        event.priceRanges[0].min + ' ' + event.priceRanges[0].currency;
      pricesVIPS =
        event.priceRanges[0].max + ' ' + event.priceRanges[0].currency; // Asignar el valor del campo "info" a la variable eventInfo
    }

    return {
      name: event.name,
      date: event.dates.start.localDate,
      dateTimes: event.dates.start.localTime + ' ' + event.dates.timezone,
      place: event._embedded.venues[0].name,
      image: imageUrl,
      info: eventInfo, // Agregar el campo "info" al objeto retornado
      localPlace: localPlaces, // Agregar el campo "info" al objeto retornado
      pricesStandar: pricesStandars,
      pricesVIP: pricesVIPS,
      buyTickets: eventsUrl,
      //_embedded.events[15].url tickets
      //_embedded.events[13].products[0].name

      // link mas
      //https://www.livenation.com/artist/K8vZ91719n0/shania-twain-events
    };
  });
}
