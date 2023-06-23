import axios from 'axios'; // Importa la biblioteca Axios desde npm
import Notiflix from 'notiflix'; // Importa la biblioteca Notiflix desde npm
import SimpleLightbox from 'simplelightbox'; // Importa la biblioteca SimpleLightbox desde npm
import 'simplelightbox/dist/simple-lightbox.min.css';

// Importar las variables de configuración desde el archivo "./js/config.js"
import { API_URL, API_KEY } from './js/config.js';

// Array para almacenar los eventos
const arrayEvents = [];
const arrayEventsName = [];
const arrayPais = [];

// Petición de eventos
export function fetchEvents() {
  fetch(
    `https://${API_URL}?apikey=${API_KEY}&` +
      new URLSearchParams({
        locale: '*',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
  )
    .then(response => response.json())
    .then(data => {
      // Almacenar los datos en la variable "render"
      const render = data;
      console.log(render);

      // Recorrer el objeto "render" para obtener los eventos
      for (let value in render) {
        if (arrayEvents.length === 1) {
          continue;
        } else {
          const evento = render._embedded.events;
          arrayEvents.push(evento);
        }
      }

      // Recorrer los eventos para obtener el nombre y agregarlo al array "arrayEventsName"
      for (let event of arrayEvents[0]) {
        arrayEventsName.push(event.name);
        arrayPais.push(event.locale);
      }

      console.log(arrayEventsName);
      console.log(arrayPais);
    })
    .catch(error => {
      console.log(error);
    });
}
