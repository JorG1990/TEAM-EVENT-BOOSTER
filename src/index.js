//index.js -- Importar las variables de configuración desde el archivo "./config"
import { API_URL, API_KEY } from './js/config';
import { fetchEventsName } from './js/search';
const input= document.querySelector(".header__inputs-1");


// Petición de eventos
export function fetchEvents(pageSize, pageNumber) {
  const queryParams = new URLSearchParams({
    apikey: API_KEY,
    locale: '*',
    includeImages: 'yes',
    size: pageSize,
    page: pageNumber,
  }
  );

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

    if (event.images && event.images.length > 0) {
      for (let image of event.images) {
        if (image.url) {
          imageUrl = image.url;
          break; // Escapar del bucle una vez que se encuentre una URL de imagen válida
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


input.addEventListener('blur',()=>{
  let searhInput = document.querySelector(".header__inputs-1").value
  console.log(searhInput)
  fetchEventsName(searhInput)
})